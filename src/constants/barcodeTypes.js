const barcodeTypes = [
    {
        type: 'io',
        dual: false,
        module: true,
        defaultModel: 'IO',
        value: 47,
    },
    {
        type: 'input',
        dual: false,
        module: true,
        defaultModel: 'CT1',
        value: 48
    },
    {
        type: 'input',
        dual: true,
        module: true,
        defaultModel: 'CT2',
        value: 49
    },
    {
        type: 'signal_output',
        dual: false,
        module: true,
        defaultModel: 'CC1',
        value: 50
    },
    {
        type: 'signal_output',
        dual: true,
        module: true,
        defaultModel: 'CC2',
        value: 51
    },
    {
        type: 'relay_output',
        dual:false,
        module: true,
        defaultModel: 'CR',
        value: 52
    },
    {
        type: 'rel',
        dual: true,
        module: true,
        defaultModel: 'REL',
        value: 53
    },
    {
        type: 'co',
        module: false,
        defaultModel: 'CO Detector',
        value: 28
    },
    {
        type: 'phcos',
        module: false,
        defaultModel: 'Smoke-Heat-CO',
        value: 30
    },
    {
        type: 'pcos',
        module: false,
        defaultModel: 'Smoke-CO',
        value: 31
    },
    {
        type: 'hcos',
        module: false,
        defaultModel: 'Heat-CO',
        value: 32
    },
    {
        type: 'iphs',
        module: false,
        defaultModel: '4-D Multisensor',
        value: 33
    },
    {
        type: 'phs',
        module: false,
        defaultModel: '3-d Multisensor',
        value: 34
    },
    {
        type: 'is',
        module: false,
        defaultModel: 'Ionization Smoke',
        value: 35
    },
    {
        type: 'fixed_heat_im',
        module: false,
        defaultModel: 'Fixed-Temp Heat',
        value: 36
    },
    {
        type: 'ros_heat',
        module: false,
        defaultModel: 'Rate-of-Rise Heat',
        value: 38
    },
    {
        type: 'smoke',
        module: false,
        defaultModel: 'Smoke',
        value: 38
    }
]

module.exports = barcodeTypes;