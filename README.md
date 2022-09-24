# est-helpers

Helpers for EST device data

## Usage

### Devices

```javascript
import {Devices} from '@tysonalcorn/est-helpers';

const deviceSetter = new Devices;

/*
logic to extract device data from EST report
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true // resets loop to 1 for each panel; loops are numbered consecutively by panel and then card otherwise
};

const loops = deviceSetter(devices, config).getLoops(); //returns array with loop data

/*
logic to allow user to edit loop numbers if necessary to match fire alarm drawings
...
*/
config = {
    continuousAddressing: false, //if true, device addressing continues after each loop, even if on different cards (i.e. loop 3 would start with device 501)
    separateAddressing: true, //restart device numbering after each loop, even if on the same card
    facp: 'est3' //or 'io'; type of panel being used
}

devices = deviceSetter(devices, config, loops).init(); //returns array of device objects with loop data included
```

If loops variable is not provided with init() method, the getLoops() method will be called internally
```javascript
import {Devices} from '@tysonalcorn/est-helpers';

const deviceSetter = new Devices;

/*
logic to extract device data from EST report
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true // resets loop to 1 for each panel; loops are numbered consecutively by panel and then card otherwise
    continuousAddressing: false, //if true, device addressing continues after each loop, even if on different cards (i.e. loop 3 would start with device 501)
    separateAddressing: true, //restart device numbering after each loop, even if on the same card. Will restart after panel if restartLoopsAfterPanel is true
    facp: 'est3' //or 'io'; type of panel being used
};

const devices = deviceSetter(devices, config).init(); //returns array with loop data
```

#### Return Values

##### Loop Data

```javascript
[
    {
        panelCard: '0102',
        panel: 1,
        card: 2,
        loop1: 1,
        loop2: 2,
        loops: [1,2]
    }
]
```

##### Device Data

```javascript
[
    {
    panelName: 'FACP',
    label: 'SD_1_DLR',
    panel: 1,
    card: 2,
    address: 1,
    message1: 'SMOKE DETECTOR L1D1',
    message2: 'AT FACP',
    model: 'PS',
    barcode: '3902009904',
    logicalAddress: '01020001',
    type: 'SMOKE',
    deviceType: '12',
    scanned: true,
    dualModule: false,
    secondPort: false,
    loop: 1,
    alias: {},
    custom: {},
    shortName: 'Smoke',
    message: 'SMOKE DETECTOR L1D1 AT FACP'
  }
]
```
