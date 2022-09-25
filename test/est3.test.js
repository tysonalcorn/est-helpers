const {ioArray} = require('./test_data/test-data.js');
const {Devices} = require('../index.js');

const config = {
    restartLoopsAfterPanel: false, 
    continuousAddressing: false, 
    separateAddressing: false, 
    facp: 'io' 
}

const deviceSetter = new Devices(ioArray, config);

console.log(deviceSetter.init());

