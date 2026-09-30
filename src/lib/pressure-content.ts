/** Purchasing context; numerical specifications remain in the product catalogue. */
export const pressureSelection: Record<string, { focus: string; confirm: string }> = {
  "pressure-gauge": {
    focus: "Bourdon-tube indication for general industrial pressure monitoring.",
    confirm: "Confirm the sensing-element and connection materials against the process medium, as well as pressure peaks and pulsation.",
  },
  "stainless-pressure-gauge": {
    focus: "Stainless-case configuration with the flange assembly shown in the product photograph.",
    confirm: "The visible 316L marking applies to the marked component only. Request a component-level wetted-material specification, flange standard, pressure rating and seal details.",
  },
  "capsule-pressure-gauge": {
    focus: "Capsule-element indication for low gas pressures.",
    confirm: "Confirm gas compatibility, overpressure limits and installation orientation. A low-pressure scale does not establish suitability for a particular gas or process.",
  },
  "ammonia-pressure-gauge": {
    focus: "Mechanical indication for ammonia-system selection enquiries.",
    confirm: "Confirm the exact refrigerant, operating conditions and compatibility of every wetted component and seal before ammonia service.",
  },
};

export const pressureQuoteChecklist = [
  "Process medium, concentration and any contaminants",
  "Normal pressure, maximum pressure, surges and required units",
  "Process and ambient temperatures; vibration and pulsation",
  "Dial diameter, mounting orientation and available installation space",
  "Connection type, thread or flange standard, size and pressure rating",
  "Required wetted materials, seals and compatibility requirements",
  "Quantity, destination country and required delivery date",
  "Required drawings, inspection records, calibration or certification documents",
];

export const pressureConfirmationFields = [
  "Available ranges and accuracy for the ordered configuration",
  "Dial diameter and mounting dimensions",
  "Thread/flange standard, size and pressure rating",
  "Sensing-element, connector and seal materials",
  "Process/ambient temperature and overpressure limits",
  "Damping, isolation and accessory availability",
];
