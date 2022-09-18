const setLoop = (loops, device) => {
    let newDevice = {};
    loops.forEach((loop) => {
      if (loop.panel === device.panel && loop.card === device.card) {
        newDevice = {
          ...device,
          loop:
            device.address >= 1 && device.address <= 250
              ? loop.loops[0]
              : device.address >= 251 && device.address <= 500
              ? loop.loops[1]
              : null,
        };
      }
    });
    return newDevice;
  };

  module.exports = setLoop;