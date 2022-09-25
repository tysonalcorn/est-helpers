# est-helpers

Helpers for EST device data. Work in progress.

## Table of Contents

- [Usage](#usage)
  - [Devices](#devices)
    - [Return Values](#return-values)
      - [Loop Data](#loop-data)
      - [Device Data](#device-data)
        - [EST3](#est3)
        - [IO](#io)
  - [Create Dialer Strings](#create-dialer-strings)
  - [Create N-Variable Inputs](#create-n-variable-inputs)
  - [Constants](#constants)

## Usage

### Devices

```javascript
import {Devices} from '@tysonalcorn/est-helpers';

/*
logic to extract device data from EST report
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true, // resets loop to 1 for each panel; loops are numbered consecutively by panel and then card otherwise
    continuousAddressing: false, //if true, device addressing continues after each loop, even if on different cards (i.e. loop 3 would start with device 501)
    separateAddressing: true, //restart device numbering after each loop, even if on the same card
    facp: 'est3' //or 'io'; type of panel being used
};

const deviceSetter = new Devices(devices, config);

let loops = deviceSetter().getLoops(); //returns array with loop data

/*
logic to allow user to edit loop numbers if necessary to match fire alarm drawings
...
*/

//to merge devices with existing device data
devices = deviceSetter().setLoops(loops).init().merge(oldDevices);

//without merging with existing device data
devices = deviceSetter().setLoops(loops).init(); //returns array of device objects with loop data included
```

Without editing loops:

```javascript
import {Devices} from '@tysonalcorn/est-helpers';

/*
logic to extract device data from EST report
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true, // resets loop to 1 for each panel; loops are numbered consecutively by panel and then card otherwise
    continuousAddressing: false, //if true, device addressing continues after each loop, even if on different cards (i.e. loop 3 would start with device 501)
    separateAddressing: true, //restart device numbering after each loop, even if on the same card. Will restart after panel if restartLoopsAfterPanel is true
    facp: 'est3' //or 'io'; type of panel being used
};

const deviceSetter = new Devices(devices, config);

//to merge devices with existing device data
devices = deviceSetter().update(oldDevices);

//without merging with existing device data
devices = deviceSetter().init();
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

###### EST3

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

###### IO

```javascript
```

### Create Dialer Strings

```javascript
```

### Create N-Variable Inputs

```javascript
```

### Constants
