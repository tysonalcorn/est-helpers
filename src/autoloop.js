const autoloop = (
    data = [],
    numberSeparately
  ) => {
    const array = [];
    const loops = [];
    data.forEach((item) => {
      const {logicalAddress} = item;
      const abbreviation = logicalAddress;
      const panelCard =
        abbreviation[0] + abbreviation[1] + abbreviation[2] + abbreviation[3];
      const device = parseInt(
        abbreviation[4] + abbreviation[5] + abbreviation[6] + abbreviation[7]
      );
      const loop =
        device >= 1 && device <= 250
          ? "1"
          : device >= 251 && device <= 500
          ? "2"
          : null;
      const panelCardLoop = panelCard + loop;
      if(!array.find(x => panelCardLoop === x)) array.push(panelCardLoop);
    });
    array.sort();
    console.log(array);
    let firstLoop = 1;
    let lastPanel = 1;
    array.forEach((item) => {
      let obj;
      if (numberSeparately) {
        if (parseInt(item[0] + item[1]) > lastPanel) {
          firstLoop = 1;
          lastPanel = parseInt(item[0] + item[1]);
        }
      }
      if (
        array.filter(
          (filterItem) =>
            item[0] + item[1] + item[2] + item[3] ===
            filterItem[0] + filterItem[1] + filterItem[2] + filterItem[3]
        ).length === 2
      ) {
        obj = {
          panelCard: item[0] + item[1] + item[2] + item[3],
          panel: parseInt(item[0] + item[1]),
          card: parseInt(item[2] + item[3]),
          loop1: firstLoop,
          loop2: firstLoop + 1,
          loops: [firstLoop, firstLoop + 1],
        };
      } else {
        if (item[4] == 2) {
                (obj = {
                panelCard: item[0] + item[1] + item[2] + item[3],
                panel: parseInt(item[0] + item[1]),
                card: parseInt(item[2] + item[3]),
                loop2: firstLoop,
                loops: [null, firstLoop],
              });
        } else {
          obj = {
            panelCard: item[0] + item[1] + item[2] + item[3],
            panel: parseInt(item[0] + item[1]),
            card: parseInt(item[2] + item[3]),
            loop1: firstLoop,
            loops: [firstLoop],
          };
        }
      }
      if (
        !loops.filter((filterItem) => filterItem.panelCard === obj.panelCard)
          .length
      ) {
        loops.push(obj);
        firstLoop = obj.loop2 && obj.loop1 ? firstLoop + 2 : firstLoop + 1;
      }
    });
    return loops;
  };

  module.exports = autoloop;