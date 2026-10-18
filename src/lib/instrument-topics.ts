export const instrumentTopics = {
  temperature: {
    path: "/temperature-instruments",
    title: "Industrial Temperature Instruments: RTDs, Thermocouples & Thermometers",
    heading: "Temperature instruments for your measurement point.",
    description: "Compare Jingfeng bimetal thermometers, RTDs and thermocouples. Review catalogue samples and prepare the probe, connection and output details for an enquiry.",
    intro: "Start with the measurement location: a surface, a process connection or an insertion point. Compare local dial indication with an electrical sensor, then confirm the probe and installation details for your equipment.",
    label: "Temperature instruments",
    decisions: [
      ["Local indication", "A bimetal thermometer provides a local dial reading. Confirm the required scale, dial position, stem dimensions and process connection."],
      ["RTD measurement", "For an RTD enquiry, specify the required element, wiring, accuracy standard, temperature range and connection to the measuring system. A photographed wire count does not establish the complete sensor specification."],
      ["Thermocouple measurement", "Confirm the thermocouple type, junction arrangement, sheath, extension cable and compatible input. Head markings alone do not establish approval for a hazardous location."],
    ],
    requirements: ["Normal and maximum process temperature; ambient conditions", "Medium, pressure, flow and mechanical loading at the measuring point", "Sensor type, required accuracy, wiring and signal or transmitter requirements", "Insertion length, stem diameter, thermowell and mounting drawing", "Thread or flange standard, size, wetted materials and seals", "Quantity, destination and required inspection or calibration documents"],
    resources: [
      ["Local indication or remote measurement?", "/en/blog/local-vs-remote-temperature"],
      ["RTD and thermocouple installation", "/en/docs/installing-rtd-thermocouple"],
      ["Bimetal thermometer installation", "/en/docs/installing-bimetal-thermometer"],
    ],
  },
  level: {
    path: "/level-instruments",
    title: "Industrial Level Instruments: Radar, Magnetic & Float Gauges",
    heading: "Level instruments selected around your vessel and medium.",
    description: "Compare Jingfeng radar, magnetic, float and glass level instruments. Review catalogue samples and confirm the vessel, medium, connection and output requirements.",
    intro: "Tank geometry, the medium and the required indication determine the starting point. Compare direct visual reading, magnetic indication, float-based measurement and radar before confirming a configuration.",
    label: "Level instruments",
    decisions: [
      ["Local visual indication", "Glass and magnetic indicators provide a local reading. Confirm vessel connections, centre-to-centre distance, visibility, isolation arrangements and the operating pressure and temperature."],
      ["Float-based measurement", "Confirm medium density, float compatibility, insertion depth, available space and output requirements. Coatings and solids may affect movement and maintenance."],
      ["Radar measurement", "Describe tank geometry, obstructions, foam, vapour and the medium's properties. Confirm the measurement distance, antenna, process connection and signal for the ordered instrument."],
    ],
    requirements: ["Medium, density, corrosive components, coating and solids", "Vessel dimensions, connection locations and measurement distance", "Normal and maximum pressure and temperature", "Foam, vapour, agitation, obstructions and installation clearance", "Local indication, remote signal and alarm requirements", "Materials, connections, drawings, quantity and project documentation"],
    resources: [
      ["Choosing a level measurement approach", "/en/blog/level-gauge-selection"],
      ["Magnetic level gauge installation", "/en/docs/installing-magnetic-level-gauge"],
    ],
  },
} as const;

export type InstrumentTopic = keyof typeof instrumentTopics;
