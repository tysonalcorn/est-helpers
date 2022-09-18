const deviceTypes = [
    {
        type: 'Smoke',
        value: 12,
        validBarcodes: [30, 31, 33, 34, 35, 38, 48],
        names: ['SMOKE', 'SMOKEPRE', 'SMOKEVFY'],
        event: 'ALARM',
        shortName: 'Smoke'
    },
    {
        type: 'Heat',
        value: 10,
        validBarcodes: [36, 38, 48],
        names: ['HEAT'],
        event: 'ALARM',
        shortName: 'Heat'
    },
    {
        type: 'CO Alarm',
        value: 139,
        validBarcodes: [28],
        names: ['COALARM', 'CO ALARM'],
        event: ['COALARM'],
        shortName: 'CO'
    },
    {
        type: 'CO Supervisory',
        value: 141,
        validBarcodes: [28],
        names: ['COSUPERVISORY', 'CO SUPV', 'CO MON' ],
        event: 'COSUPERVISORY',
        shortName: 'CO'
    },
    {
        type: 'Isolator Module',
        value: 15,
        validBarcodes: [36],
        names: ['ISOLATOR'],
        shortName: 'Iso.'
    },
    {
        type: 'Supervisory',
        value: 6,
        validBarcodes: [38, 48, 49],
        names: ['SUPERVISORY'],
        event: 'SUP',
        shortName: 'Sup'
    },
    {
        type: 'Tamper',
        value: 7,
        validBarcodes: [48, 49],
        names: ['TAMPER'],
        event: 'SUP',
        shortName: 'Tamp'
    },
    {
        type: 'General Alarm',
        value: 19,
        validBarcodes: [48, 49],
        names: ['GENALARM', 'ALARM'],
        event: 'ALARM',
        shortName: 'Gen Alarm'
    },
    {
        type: 'Pull Station',
        value: 11,
        validBarcodes: [48],
        names: ['PULL'],
        event: 'ALARM',
        shortName: 'Pull'
    },
    {
        type: 'Waterflow',
        value: 17,
        validBarcodes: [48, 49],
        names: ['WATERFLOW'],
        event: 'ALARM',
        shortName: 'Flow'
    },
    {
        type: '24V Riser Monitor',
        value: 38,
        validBarcodes: [48],
        names: ['24VRISER'],
        event: 'MON',
        shortName: '24V Mon'
    },
    {
        type: 'AC Fail',
        value: 183,
        validBarcodes: [48],
        names: ['ACFAIL'],
        event: 'MON',
        shortName: 'AC Mon'
    },
    {
        type: 'Damper Feedback',
        value: 40,
        validBarcodes: [47, 48, 49] ,
        names: ['DAMPERFEEDBACK'],
        event: 'MON',
        shortName: 'Damp Mon'
    },
    {
        type: 'Door Feedback',
        value: 41,
        validBarcodes: [47, 48, 49],
        names: ['DOORFEEDBACK'],
        event: 'MON',
        shortName: 'Door Mon'
    },
    {
        type: 'Fan Feedback',
        value: 42,
        validBarcodes: [47, 48, 49],
        names: ['FANFEEDBACK'],
        event: 'MON',
        shortName: 'Fan Mon'
    },
    {
        type: 'Monitor',
        value: 32,
        validBarcodes: [48, 49],
        names: ['MONITOR'],
        event: 'MON',
        shortName: 'Mon'
    },
    {
        type: 'Phone Riser Monitor',
        value: 37,
        validBarcodes: [48, 49],
        names: ['PHONERISER'],
        event: 'MON',
        shortName: 'Phone Mon'
    },
    {
        type: 'Non-Supervised Output',
        value: 44,
        validBarcodes: [52],
        names: [
            'NONSUPERVISEDOUTPUT', 'NSCOMMONALARMOUTPUT', 'NSCOMMONMONITOROUTPUT', 
            'NSCOMMONSUPERVISORYOUTPUT', "NSCOMMONTROUBLEOUTPUT", "COMMONALARMOUTPUT", 
            "COMMONMONITOROUTPUT", "COMMONSUPERVISORYOUTPUT", "COMMONTROUBLEOUTPUT", 
            'RELAY'
        ],
        shortName: 'Relay',
        output: true
    },
    {
        type: 'Audible',
        value: 50,
        validBarcodes: [50, 51],
        names: ['AUDIBLE', 'CONTINUOUS'],
        shortName: 'Aud',
        output: true
    },
    {
        type: 'Visible',
        value: 57,
        validBarcodes: [50],
        names: ['VISIBLE', 'GENESIS'],
        shortName: 'Vis',
        output: true
    },
    {
        type: 'Damper Control',
        value: 33,
        validBarcodes: [50, 51, 52],
        names: ['DAMPERCONTROL'],
        shortName: 'Damp',
        output: true
    },
    {
        type: 'Door Control',
        value: 34,
        validBarcodes: [50, 51, 52],
        names: ['DOORCONTROL'],
        shortName: 'Door',
        output: true
    },
    {
        type: 'Fan Control',
        value: 35,
        validBarcodes: [50, 51, 52],
        names: ['FANCONTROL'],
        shortName: 'Fan',
        output: true
    },
    {
        type: 'Fire Phone',
        value: 55,
        validBarcodes: [50, 51],
        names: ['FIREPHONE'],
        shortName: 'Fire Phone',
        output: true
    }
]

module.exports = deviceTypes;