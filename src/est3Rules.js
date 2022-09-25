const defaultDialer = [
    {
      name: 'FIRST TROUBLE DIALER',
      event: 'CMSFT',
      cid: 300,
      type: 'trouble'
    },
    {
      name: 'FIRST SUP DIALER',
      event: 'FS',
      cid: 200,
      type: 'sup'
    },
    {
      name: 'FIRST ALARM DIALER',
      event: 'FA',
      cid: 110,
      type: 'alarm'
    }
  ]

  const createRegex = (matchLabel = "") => {
    const regexString = matchLabel
      .toUpperCase()
      .replace(/\*/g, ".*")
      .replace("#", "(?<value>\\d?\\d?\\d)")
      .replace("@", "(?<partition>\\d?\\d)")
    console.log(regexString);
    return new RegExp('^' + regexString + '$', 'i');
  };
  
  const parseLabels = (devices = [], matchLabel = "", dialer) => {
    const matchRegex = createRegex(matchLabel);
  
    const matchedDevices = devices.filter((device) =>
      matchRegex.test(device.label)
    );
  
    let numbers = [];
  
    matchedDevices.forEach((device) => {
      let match = matchRegex.exec(device.label);
      let {value, partition} = match.groups;
      if(dialer && !partition) partition = '01';
      console.log(match[0], match.groups);
      numbers.push({
        value: parseInt(value),
        partition: partition || '01',
        event: deviceTypes.find((type) => type.names.includes(device.type)) ? deviceTypes.find((type) => type.names.includes(device.type)).event :'TROUBLE',
        type: deviceTypes.find((type) => type.names.includes(device.type)) ? deviceTypes.find((type) => type.names.includes(device.type)).type : 'TROUBLE',
      });
    });
    return numbers;
  };
  
  const createDefaultDialerStr = (included = [], modcom = 'DIALER', partition = '00', zone = '000',) => { //included array should include 'alarm', 'sup', and/or 'trouble'
    let arr = [];
  
    defaultDialer.forEach(dialerStr => {
      if(included.includes(dialerStr.type)) arr.push({
        name: `[${dialerStr.name}]\n`,
        input: `${dialerStr.event}`,
        output: [`  :  +SEND '${modcom}' MSG "1${dialerStr.cid}${partition || '00'}${zone || '000'}",\n`, `     -SEND '${modcom}' MSG "3${dialerStr.cid}${partition || '00'}${zone || '000'}";\n`]
      });
    });
  
    return arr;
  }
  
  const createRules = (devices = [], matchLabel = "", dialer, modcom='DIALER', included = [], defaultPartition = '00', defaultZone = '000') => {
    const numbers = parseLabels(devices, matchLabel);
    //console.log(numbers);
    let sortedNumbers = dialer ? {} : {trouble: []};
  
    numbers.forEach((number) => {
      if(number.event !== 'TROUBLE' && number.event !== 'MON') {
      if (!dialer) {
        sortedNumbers[number.event]
          ? sortedNumbers[number.event].push(number.value)
          : (sortedNumbers[number.event] = [number.value]);
      } else {
        if(sortedNumbers[number.partition]) {
        if (sortedNumbers[number.partition][number.event]) {
          sortedNumbers[number.partition][number.event][number.type]
            ? sortedNumbers[number.partition][number.event][number.type].push(number.value)
            : (sortedNumbers[number.partition][number.event][number.type] = [number.value]);
        }
        if (!sortedNumbers[number.partition][number.event]) {
          sortedNumbers[number.partition][number.event] = {};
          sortedNumbers[number.partition][number.event][number.type] = [number.value];
        }
      } else {
        sortedNumbers[number.partition]= {trouble: {trouble: []}};
        sortedNumbers[number.partition][number.event] = {};
        sortedNumbers[number.partition][number.event][number.type] = [number.value]
      }
      }
    }
    if (!dialer) {
      sortedNumbers.trouble.push(number.value)
    } else {
      sortedNumbers[number.partition] 
        ? sortedNumbers[number.partition].trouble.trouble.push(number.value)
        : sortedNumbers[number.partition] = {trouble: {trouble: []}}
    }
    });
    const rangeNumbers = (sortedArray = []) => {
      let firstNum = null;
      let nStr = "";
      const start = sortedArray[0];
      const stop = sortedArray[sortedArray.length - 1];
      for (let i = start; i <= stop; i++) {
        let prevNum = sortedArray.find((num) => num === i - 1);
        if (!sortedArray.find((num) => num == i)) {
          if (firstNum && prevNum && prevNum !== firstNum)
            nStr = nStr.concat(firstNum.toString(), "-", (i - 1).toString(), ",");
          if (firstNum && prevNum && prevNum === firstNum)
            nStr = nStr.concat((i - 1).toString(), ",");
          if (!firstNum && prevNum) nStr = nStr.concat((i - 1).toString(), ",");
          firstNum = null;
        } else {
          if (!firstNum) firstNum = i;
        }
        if (i === stop) {
          if (firstNum && firstNum !== i)
            nStr = nStr.concat(firstNum.toString(), "-", i.toString());
          if (firstNum && firstNum === i) nStr = nStr.concat(i.toString());
          if (!firstNum) nStr = nStr.concat(i.toString());
        }
      }
      return nStr;
    };
    const makeInputString = (numberString, event, ruleName, partition) => {
      const numIndex = matchLabel.indexOf("#");
      const beforeString = matchLabel.substring(0, numIndex);
      const afterString = matchLabel.substring(numIndex + 1);
      let rule = {name: `[${ruleName}]\n`, input: `${event} '${beforeString}<N:${numberString}>${afterString}'`}
      if(partition) rule.input = rule.input.replace('@', partition);
      return rule;
    };
  
    const makeOutputString = (type = '', partition = '') => {
      const newPartition = partition.length === 2 ? partition : '0' + partition;
      const cid = type.toUpperCase() === 'TROUBLE' ? '300' : deviceTypes.find(devType => devType.type === type).cid;
      const rule = [`  :  +SEND '${modcom}' MSG "1${cid}${newPartition}<N:3>",\n`, `     -SEND '${modcom}' MSG "3${cid}${newPartition}<N:3>";\n`];
      return rule;
    }
  
    const makeRules = (numObj = {}, e, partition = '01') => {
      console.log(numObj)
      let rules = [];
      for (const array in numObj) {
        const event = e ? e.toUpperCase() : array.toUpperCase();
        const numArray = numObj[array];
        const sortedArray = numArray.sort((a, b) => a - b);
        let rule = makeInputString(
          rangeNumbers(sortedArray),
          `${event}`,
          `${e ? `${partition || '01'} DIALER` : "ANN"} - ${e ? array.toUpperCase() : event}`,
          partition
        )
        if(dialer) rule.output = makeOutputString(array, partition || '01')
        rules.push(rule);
      }
      return rules;
    };
  
    if (dialer) {
      let rules = [];
      for (const partition in sortedNumbers) {
        for(const array in sortedNumbers[partition]) {
        rules.push(makeRules(sortedNumbers[partition][array], array, partition));
        }
      }
      if(included.length) rules.push(createDefaultDialerStr(included, modcom, defaultPartition, defaultZone));
      return rules.flat();
    }
    if (!dialer) return makeRules(sortedNumbers);
  };

  module.exports = createRules;