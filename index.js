const extractLoops = require('./src/extractLoops.js');
const setDeviceData = require('./src/setDeviceData.js');
const updateDeviceData = require('./src/updateDeviceData');
const createRules = require('./src/est3Rules');

const deviceTypes = require('./src/constants/deviceTypes.js');
const barcodeTypes = require('./src/constants/barcodeTypes.js');

class Devices {
    #config = {};
    #devicesParsed = false;
    constructor (devices = [{}], config = {}, loops = null) {
        this.devices = devices;
        this.#config = config;
        this.loops = loops;
    }
    #set (devices, config, loops) {
        if(devices) this.devices = devices;
        if(config) this.#config = config;
        if(loops) this.loops = loops;
    }
    getLoops (devices, config) {
        this.#set(devices, config)
        this.loops = extractLoops(this.devices, this.#config);
        return this.loops;
    }
    setLoops (loops) {
        this.loops = loops;
    }
    init (devices, config) {
        if(!this.#devicesParsed) {
            this.#set(devices, config)
            if(!this.loops && this.#config.facp !== 'io') this.getLoops();
            this.devices = setDeviceData(this.loops, this.devices, this.#config);
            this.#devicesParsed = true;
        }
        return this.devices;
    }
    merge (oldDevices = [{}]) {
        if(!this.#devicesParsed) this.init();
        this.devices = updateDeviceData(this.devices, oldDevices);
        return this.devices;
    }
};

const constants = {
    deviceTypes, 
    barcodeTypes
};

function createDialerStrings (devices = [], matchLabel = '', modcomLabel = '', defaultStrings = [''], defaultPartition = '', defaultZone = '') {
    return createRules(devices, matchLabel, true, modcomLabel, defaultStrings, defaultPartition, defaultZone);
};

function createNVarInput (devices = [], matchLabel = '') {
    return createRules(devices, matchLabel);
};

exports.Devices = Devices;
exports.createDialerStrings = createDialerStrings;
exports.createNVarInput = createNVarInput;
exports.constants = constants;