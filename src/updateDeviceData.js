const updateDeviceData = (newDevices = [], oldDevices = []) => {
    let devices = {
      new: [],
      updated: [],
      deleted: [],
    };
    newDevices.forEach((newDevice) => {
      const oldDevice = oldDevices.find((device) =>
          device.data.loop == newDevice.loop &&
          device.data.panel == newDevice.panel &&
          device.data.address == newDevice.address
      );
      if (!oldDevice) {
        devices.new.push(newDevice);
      } else {
        if (
          oldDevice.data.message != newDevice.message ||
          oldDevice.data.deviceType != newDevice.deviceType ||
          !oldDevice.data.logicalAddress ||
          oldDevice.data.notInProgram ||
          oldDevice.data.shouldBeDeleted ||
          oldDevice.data.barcode != newDevice.barcode ||
          oldDevice.data.model != newDevice.model ||
          oldDevice.data.secondPort != newDevice.secondPort ||
          oldDevice.data.message1 != newDevice.message1 ||
          oldDevice.data.message2 != newDevice.message2
        ) {
          const updatedDevice = {
            ...newDevice,
            notInProgram: false,
            shouldBeDeleted: false,
            message: null
          };
          const fullDevice = {
            ref: oldDevice.ref,
            data: updatedDevice,
          };
          devices.updated.push(fullDevice);
        }
      }
    });
    oldDevices.forEach((oldDevice) => {
      if (
        !newDevices.filter((newDevice) =>
              oldDevice.data.loop == newDevice.loop &&
              oldDevice.data.panel == newDevice.panel &&
              oldDevice.data.address == newDevice.address
        ).length
      ) {
        devices.deleted.push(oldDevice);
      }
    });
    return devices;
  };

  module.exports = updateDeviceData;