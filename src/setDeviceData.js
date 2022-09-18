const compareValues = require('./helpers/compareValues.js');
const deviceTypes = require('./constants/deviceTypes');

const setDeviceData = (loops, data = [], continuousAddressing, separateAddressing, facp) => {
    console.log(continuousAddressing, separateAddressing)
    let array = [];
    data.sort(compareValues('abbreviation')).forEach((item) => {
      const {abbreviation, type, message1, message2, model, barcode, loop, label, panelName} = item;
      const panel = facp === 'io' ? 1 : parseInt(abbreviation[0] + abbreviation[1]);
      const card = facp === 'io' ? 2 : parseInt(abbreviation[2] + abbreviation[3]);
      const address = facp === 'io' ? parseInt(item.address) : parseInt(
        abbreviation[4] + abbreviation[5] + abbreviation[6] + abbreviation[7]
      );
        const typeValue = deviceTypes.find(typeItem => typeItem.names.find(name => type.toUpperCase().includes(name.toUpperCase())));
        const deviceType = typeValue ? typeValue.value : null
        const shortName = typeValue?.shortName || null;
      const lastDevice = array[array.length - 1];
      let deviceObject = {
        panelName,
        label,
        panel,
        card,
        address,
        message1: message1 ? message1.trim() : '',
        message2: message2 ? message2.trim() : '',
        model,
        barcode: barcode && barcode != '0000000000' ? barcode : null,
        abbreviation: facp === 'io' ? '' : abbreviation,
        type,
        deviceType: deviceType ? `${deviceType}` : 0,
        scanned: barcode && barcode != '0000000000' ? true : false,
        dualModule: model.endsWith('2'),
        secondPort: lastDevice ? model.endsWith('2') && lastDevice.dualModule && !lastDevice.secondPort : false,
        loop: loop ? parseInt(loop) : null,
        alias: {},
        custom: {},
        shortName
      };
      deviceObject = {...deviceObject, message: deviceObject.message1 + ' ' + deviceObject.message2};
      const newDevice = facp === 'io' ? deviceObject : setLoop(loops, deviceObject);
      let realDevice = Object.keys(newDevice).length && newDevice.loop;
  
      if(continuousAddressing && realDevice) {
        let thisAddress;
        if(newDevice.loop > 2) {
        const startAddress = 250 * newDevice.loop - 250;
        thisAddress = startAddress + address;
        } else thisAddress = address;
        const newerDevice = {
          ...newDevice, 
          userAddress: thisAddress
        };
        array.push(newerDevice);
      }
      if(separateAddressing && realDevice) {
        let thisAddress;
        if(Number.isInteger(newDevice.loop/2)) {
          thisAddress = address - 250;
        } else {
          thisAddress = address;
        };
        const newerDevice = {
          ...newDevice,
          userAddress: thisAddress
        }
        array.push(newerDevice);
      };
      if(!separateAddressing && !continuousAddressing && realDevice) {
        array.push(newDevice)
      }
    });
    return array;
  };

  module.exports = setDeviceData;