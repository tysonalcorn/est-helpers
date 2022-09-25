# est-helpers

CommonJS Helpers for EST device data. Work in progress.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Devices](#devices)
    - [Return Values](#return-values)
      - [Loop Data](#loop-data)
      - [Device Data](#device-data)
        - [EST3](#est3)
        - [IO](#io)
  - [Create Dialer Strings](#create-dialer-strings)
    - [Inputs](#inputs)
  - [Create N-Variable Inputs](#create-n-variable-inputs)
    - [Inputs](#inputs-1)
  - [Constants](#constants)
    - [Device Types](#device-types)
    - [Barcode Types](#barcode-types)

## Installation

```yarn add @tysonalcorn/est-helpers```

or

```npm install @tysonalcorn/est-helpers```

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
devices = deviceSetter().setLoops(loops).merge(oldDevices);

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
devices = deviceSetter().merge(oldDevices);

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
[
    {
        panel: 1,
        card: 2,
        address: 1,
        message1: 'SMOKE DETECTOR L1D1',
        message2: 'ABOVE FACP',
        model: 'PS',
        barcode: null,
        type: 'Smoke',
        deviceType: '12',
        scanned: false,
        dualModule: false,
        secondPort: false,
        loop: 1,
        alias: {},
        custom: {},
        shortName: 'Smoke',
        message: 'SMOKE DETECTOR L1D1 ABOVE FACP'
    }
]
```

### Create Dialer Strings

```javascript
import {Devices, createDialerStrings} from '@tysonalcorn/est-helpers';

/*
logic to extract device data from EST report and accept user input
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true,
    continuousAddressing: false,
    separateAddressing: true,
    facp: 'est3'
};

const defaultStrings = ['trouble, sup, alarm'], defaultPartition = '01', defaultZone = '001';

const deviceSetter = new Devices(devices, config);
devices = deviceSetter().init();
const dialerStrings = createDialerStrings(devices, matchLabel, modcomLabel, defaultStrings, defaultPartition, defaultZone); //[{input: '', output: ''}...]
```

#### Inputs

`devices`: Array of device objects with loop data

`matchLabel`: User defined match string for device labels where '*' is used as a wild card, '@' is used to match the partition n-variable, and '#' is used to match the zone n-variable

- Given the device label `'SD_ANN3_1-2'`, match label `'*_@-#'` would include the device in the dialer string input with a partition number of 1 and a zone number of 2

`modcomLabel`: User defined string that should be equal to the modcom label intended to be used in the 3-SDU rules

`defaultStrings`: Array of first event dialer strings to include by default. Can include 'trouble', 'sup', and 'alarm'

`defaultPartition`: User defined string that defines the partition for any first event dialer strings

`defaultZone`: User defined string that defines the zone for any first event dialer strings

### Create N-Variable Inputs

```javascript
import {Devices, createNVarInput} from '@tysonalcorn/est-helpers';

/*
logic to extract device data from EST report and accept user input
...
let devices = data
*/
let config = {
    restartLoopsAfterPanel: true,
    continuousAddressing: false,
    separateAddressing: true,
    facp: 'est3'
};

const defaultStrings = ['trouble, sup, alarm'], defaultPartition = '01', defaultZone = '001';

const deviceSetter = new Devices(devices, config);
devices = deviceSetter().init();
const nVarInputs = createNVarInput(devices, matchLabel); //[{input: ''}...]
```

#### Inputs

`devices`: Array of device objects with loop data

`matchLabel`: User defined match string for device labels where '*' is used as a wild card and '#' is used to match the n-variable

- Given the device label `'SD_ANN3_1-2'`, match label `'*_ANN#_*'` would include '3' in the n-variable input

### Constants

#### Device Types

Array of device type objects

```javascript
import {constants} from '@tysonalcorn/est-helpers';

console.log(constants.deviceTypes);

/*
[
    {
      type: "Heat",
      value: 10,
      validBarcodes: [36, 38, 48],
      names: ["HEAT"],
      shortName: 'Heat',
      event: "ALARM",
      cid: 114
    },
    ...
]
*/
```

#### Barcode Types

Array of objects containing data relevant to device barcodes

```javascript
import {constants} from '@tysonalcorn/est-helpers';

console.log(constants.barcodeTypes);

/*
[
    {
        type: 'io',
        dual: false,
        module: true,
        defaultModel: 'IO',
        value: 47,
    },
    ...
]
*/
```
