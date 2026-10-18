/** Purchasing context; numerical specifications remain in the product catalogue. */
export const pressureSelection: Record<string, { focus: string; application: string; confirm: string }> = {
  "pressure-gauge": {
    focus: "Bourdon-tube indication for general industrial pressure monitoring.",
    application: "Start with this Bourdon-tube configuration when an operator needs a local pressure reading on a pump, compressed-air system or process line. Describe whether the pressure is steady, cyclic or subject to surges; the photographed scale alone does not establish the permissible loading. For a replacement, provide the existing instrument label and connection drawing as well as the required scale and accuracy.",
    confirm: "Confirm the sensing-element and connection materials against the process medium, as well as pressure peaks and pulsation.",
  },
  "stainless-pressure-gauge": {
    focus: "Stainless-case configuration with the flange assembly shown in the product photograph.",
    application: "This configuration is a starting point for enquiries where the external environment and a flanged process connection need attention. Evaluate the case environment separately from the fluid contacting the sensing element, connector and seals. When replacing an existing flanged instrument, include the mating flange dimensions, sealing face and pressure rating so the visible assembly can be checked against the installation.",
    confirm: "The visible 316L marking applies to the marked component only. Request a component-level wetted-material specification, flange standard, pressure rating and seal details.",
  },
  "capsule-pressure-gauge": {
    focus: "Capsule-element indication for low gas pressures.",
    application: "Consider a capsule-element enquiry when the measurement task involves a small gas pressure, such as ventilation, dust collection or a low-pressure process line. State the smallest reading that matters and any pressure peaks, reverse pressure or vacuum conditions. The pictured positive-pressure Pa scale does not establish a bidirectional range or an allowable overload. Include the mounting orientation and the gas composition when requesting a configuration.",
    confirm: "Confirm gas compatibility, overpressure limits and installation orientation. A low-pressure scale does not establish suitability for a particular gas or process.",
  },
  "ammonia-pressure-gauge": {
    focus: "Mechanical indication for ammonia-system selection enquiries.",
    application: "For a refrigeration-system enquiry, identify the exact refrigerant and the measurement location, such as a compressor, receiver or connected line. State operating, standby and transient pressures, temperature and vibration conditions. The pictured MPa / psi scales help identify the sample but do not establish refrigerant compatibility or the complete ordered construction. Provide the existing connection details when replacing an installed gauge.",
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
