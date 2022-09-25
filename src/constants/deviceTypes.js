const deviceTypes = [
    {
      type: "Smoke",
      value: 12,
      validBarcodes: [30, 31, 33, 34, 35, 38, 48],
      names: ["SMOKE", "SMOKEPRE", "SMOKEVFY"],
      event: "ALARM",
      cid: 111
    },
    {
      type: "Heat",
      value: 10,
      validBarcodes: [36, 38, 48],
      names: ["HEAT"],
      event: "ALARM",
      cid: 114
    },
    {
      type: "CO Alarm",
      value: 139,
      validBarcodes: [28],
      names: ["COALARM", "CO ALARM"],
      event: "COALARM",
      cid: 162
    },
    {
      type: "CO Supervisory",
      value: 141,
      validBarcodes: [28],
      names: ["COSUPERVISORY", "CO SUPV", "CO MON"],
      event: "COSUPERVISORY",
      cid: 200
    },
    {
      type: "Isolator Module",
      value: 15,
      validBarcodes: [36],
      names: ["ISOLATOR"],
      event: "TROUBLE",
    },
    {
      type: "Supervisory",
      value: 6,
      validBarcodes: [38, 48, 49],
      names: ["SUPERVISORY"],
      event: "SUP",
      cid: 200
    },
    {
      type: "Tamper",
      value: 7,
      validBarcodes: [48, 49],
      names: ["TAMPER"],
      event: "SUP",
      cid: 200
    },
    {
      type: "General Alarm",
      value: 19,
      validBarcodes: [48, 49],
      names: ["GENALARM", "ALARM"],
      event: "ALARM",
      cid: 110
    },
    {
      type: "Pull Station",
      value: 11,
      validBarcodes: [48],
      names: ["PULL"],
      event: "ALARM",
      cid: 115
    },
    {
      type: "Waterflow",
      value: 17,
      validBarcodes: [48, 49],
      names: ["WATERFLOW"],
      event: "ALARM",
      cid: 113
    },
    {
      type: "24V Riser Monitor",
      value: 38,
      validBarcodes: [48],
      names: ["24VRISER"],
      event: "SUP",
      cid: 200
    },
    {
      type: "AC Fail",
      value: 183,
      validBarcodes: [48],
      names: ["ACFAIL"],
      event: "MON",
      cid: 301
    },
    {
      type: "Damper Feedback",
      value: 40,
      validBarcodes: [47, 48, 49],
      names: ["DAMPERFEEDBACK"],
      event: "MON",
    },
    {
      type: "Door Feedback",
      value: 41,
      validBarcodes: [47, 48, 49],
      names: ["DOORFEEDBACK"],
      event: "MON",
    },
    {
      type: "Fan Feedback",
      value: 42,
      validBarcodes: [47, 48, 49],
      names: ["FANFEEDBACK"],
      event: "MON",
    },
    {
      type: "Monitor",
      value: 32,
      validBarcodes: [48, 49],
      names: ["MONITOR"],
      event: "MON",
    },
    {
      type: "Phone Riser Monitor",
      value: 37,
      validBarcodes: [48, 49],
      names: ["PHONERISER"],
      event: "MON",
    },
    {
      type: "Non-Supervised Output",
      value: 44,
      validBarcodes: [52],
      names: [
        "NONSUPERVISEDOUTPUT",
        "NSCOMMONALARMOUTPUT",
        "NSCOMMONMONITOROUTPUT",
        "NSCOMMONSUPERVISORYOUTPUT",
        "NSCOMMONTROUBLEOUTPUT",
        "COMMONALARMOUTPUT",
        "COMMONMONITOROUTPUT",
        "COMMONSUPERVISORYOUTPUT",
        "COMMONTROUBLEOUTPUT",
        "RELAY",
      ],
      event: "TROUBLE",
    },
    {
      type: "Audible",
      value: 50,
      validBarcodes: [50, 51],
      names: ["AUDIBLE", "CONTINUOUS"],
      event: "TROUBLE",
    },
    {
      type: "Visible",
      value: 57,
      validBarcodes: [50],
      names: ["VISIBLE", "GENESIS"],
      event: "TROUBLE",
    },
    {
      type: "Damper Control",
      value: 33,
      validBarcodes: [50, 51, 52],
      names: ["DAMPERCONTROL"],
      event: "TROUBLE",
    },
    {
      type: "Door Control",
      value: 34,
      validBarcodes: [50, 51, 52],
      names: ["DOORCONTROL"],
      event: "TROUBLE",
    },
    {
      type: "Fan Control",
      value: 35,
      validBarcodes: [50, 51, 52],
      names: ["FANCONTROL"],
      event: "TROUBLE",
    },
    {
      type: "Fire Phone",
      value: 55,
      validBarcodes: [50, 51],
      names: ["FIREPHONE"],
      event: "TROUBLE",
    },
  ];

module.exports = deviceTypes;