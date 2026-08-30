import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/**
 * Per-slug French overrides for the product catalog.
 * Missing slugs/fields fall back to English.
 */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Manomètre",
    summary: "Manomètre à tube de Bourdon pour l'indication locale de la pression des procédés.",
    description: "Le tube de Bourdon convertit la pression du procédé en déplacement élastique ; un mécanisme démultiplié entraîne l'aiguille pour une indication locale sans alimentation externe. Adapté aux pompes, à l'air comprimé, aux lignes de processus et aux réservoirs sous pression stable. Confirmer la plage, la compatibilité du fluide, la température, l'orientation du raccordement et les vibrations ; prévoir un restricteur ou un amortisseur en cas de pulsations.",
    highlights: ["Plages 0–60 MPa", "Précision ±1,6 % FS", "Montage radial / axial"],
    specs: [["Plage", "0–0,1 à 0–60 MPa"], ["Précision", "±1,6 % FS"], ["Raccordement", "M20×1,5, radial ou axial"], ["Boîtier", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Manomètre inox",
    summary: "Manomètre tout inox pour fluides corrosifs et environnements sévères.",
    description: "Construction entièrement inox (304/316L) résistant à la corrosion, avec remplissage glycérine en option contre les vibrations. Adapté à l'industrie chimique, pétrochimique et aux installations en extérieur. Confirmer la compatibilité du fluide, la plage et le raccordement avant commande.",
    highlights: ["Parties mouillées 316L", "Remplissage glycérine en option", "Jusqu'à 100 MPa"],
    specs: [["Plage", "0–0,1 à 0–100 MPa"], ["Précision", "±1,6 % FS"], ["Parties mouillées", "Inox 304 / 316L"], ["Raccordement", "M20×1,5 ou sur mesure"]],
  },
  "capsule-pressure-gauge": {
    name: "Manomètre à capsule inox",
    summary: "Manomètre à élément capsule pour la mesure des basses et micro-pressions gazeuses.",
    description: "L'élément capsule permet la mesure fiable des faibles pressions de gaz (kPa). Boîtier inox, montage panneau ou mural. Adapté aux brûleurs, ventilateurs et installations de gaz ; vérifier la compatibilité du fluide et la plage.",
    highlights: ["Plages kPa", "Capsule 316L", "Montage encastré / mural"],
    specs: [["Plage", "0–2,5 à 0–60 kPa, ±kPa"], ["Précision", "±1,6 % FS"], ["Parties mouillées", "Capsule inox 316L"], ["Raccordement", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Manomètre inox pour ammoniac",
    summary: "Manomètre inox dédié à l'ammoniac et aux installations frigorifiques, avec fond d'évent de sécurité.",
    description: "Conçu pour les circuits d'ammoniac et de réfrigération : parties mouillées inox et fond d'évent de sécurité. La plage et le raccordement sont confirmés selon l'installation ; utiliser uniquement avec des fluides compatibles ammoniac.",
    highlights: ["Ammoniac / froid", "Fond d'évent de sécurité", "Parties mouillées inox"],
    specs: [["Plage", "0–1 à 0–40 MPa, composé + vide"], ["Précision", "±1,6 % FS"], ["Parties mouillées", "Acier inoxydable"], ["Raccordement", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Thermomètre bimétallique",
    summary: "Thermomètre à cadran bimétallique pour l'indication locale de température sans alimentation.",
    description: "L'élément bimétallique convertit la température en rotation de l'aiguille sur le cadran, sans alimentation externe. Montage axial, radial ou universel ; tige et longueur selon commande. Adapté aux tuyauteries, cuves et machines ; confirmer la plage, la longueur de tige et le fluide.",
    highlights: ["-80 à 500 °C", "Axial / radial / universel", "Sans alimentation"],
    specs: [["Plage", "-80 à 500 °C"], ["Précision", "±1,5 % FS"], ["Cadran", "φ60 / φ100 / φ150 mm"], ["Tige", "Ø6 / Ø10 mm, longueur sur mesure"]],
  },
  "surface-thermistor": {
    name: "Sonde à résistance de surface",
    summary: "Sonde Pt 100 à surface pour la mesure de température de paliers et de parois.",
    description: "Élément Pt 100 monté en face avant pour un contact direct sur paliers, chemises et parois de tuyauterie. Face d'appui inox 316L, compacte ; câble silicone avec presse-étoupe étanche. Confirmer la température du support et la longueur de câble.",
    highlights: ["Élément Pt 100", "Face de contact plane", "Conception compacte"],
    specs: [["Élément", "Pt 100, classe B"], ["Plage", "-50 à 200 °C"], ["Face de contact", "Acier inoxydable 316L"], ["Câble", "Silicone, presse-étoupe étanche"]],
  },
  "assembly-thermistor": {
    name: "Sonde à résistance assemblée",
    summary: "Thermomètre à résistance de platine avec doigt de gant pour conduites et réservoirs.",
    description: "Sonde Pt 100/PT1000 montée dans un doigt de gant amovible (304/316/316L) pour la mesure de température de process. Câblage 2/3/4 fils ; versions classe A ou B. Sélectionner le diamètre et la longueur du doigt de gant selon le procédé.",
    highlights: ["Pt 100 / PT1000", "Classe A / B", "Doigt de gant 304 / 316 / 316L"],
    specs: [["Élément", "Pt 100 / PT1000, classe A ou B"], ["Plage", "-200 à 500 °C"], ["Doigt de gant", "304 / 316 / 316L"], ["Câblage", "2 / 3 / 4 fils"]],
  },
  "explosion-proof-thermistor": {
    name: "Sonde à résistance antidéflagrante",
    summary: "Sonde Pt 100 à boîtier antidéflagrant pour la mesure de température en zone dangereuse.",
    description: "Boîtier de raccordement antidéflagrant Ex d pour l'utilisation en zones à risque. Élément Pt 100, doigt de gant inox ; conforme Ex d IIC T6. Vérifier la classification de la zone et la longueur d'immersion avant commande.",
    highlights: ["Ex d IIC T6", "Boîtier antidéflagrant", "Élément Pt 100"],
    specs: [["Élément", "Pt 100, classe B"], ["Plage", "-200 à 450 °C"], ["Antidéflagrance", "Ex d IIC T6"], ["Doigt de gant", "Acier inoxydable"]],
  },
  "integrated-thermistor": {
    name: "Transmetteur de température antidéflagrant intégré",
    summary: "Sonde Pt 100 avec transmetteur de tête intégré, sortie 4–20 mA directe en zone dangereuse.",
    description: "Transmetteur monté en tête intégré à la sonde : sortie 4–20 mA deux fils sans câblage de compensation. Boîtier antidéflagrant Ex d IIC T6, afficheur LCD en option. Idéal pour les points de mesure éloignés des armoires ; confirmer la plage et la longueur d'immersion.",
    highlights: ["Transmetteur 4–20 mA intégré", "Ex d IIC T6", "Afficheur LCD en option"],
    specs: [["Élément", "Pt 100, classe B"], ["Plage", "-200 à 450 °C"], ["Sortie", "4–20 mA, 2 fils"], ["Antidéflagrance", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Sonde à résistance anti-usure",
    summary: "Sonde Pt 100 blindée anti-usure pour broyeurs à charbon et écoulements poussiéreux.",
    description: "Embout anti-usure en alliage dur résistant à l'abrasion des flux poussiéreux à grande vitesse des centrales (broyage de charbon). Élément Pt 100 classe B ; confirmer la profondeur d'insertion et le diamètre de tube selon la conduite.",
    highlights: ["Embout anti-usure", "Usage centrales", "Résiste aux flux chargés"],
    specs: [["Élément", "Pt 100, classe B"], ["Plage", "0 à 600 °C"], ["Embout", "Capuchon anti-usure en alliage dur"], ["Application", "Broyage de charbon, air chargé de poussières"]],
  },
  "explosion-proof-thermocouple": {
    name: "Thermocouple antidéflagrant",
    summary: "Thermocouple avec doigt de gant antidéflagrant pour les hautes températures en zone ATEX.",
    description: "Thermocouple K/N monté dans un doigt de gant fileté ou à bride, boîtier antidéflagrant Ex d IIC T6, jusqu'à 1000 °C. Adapté aux fours, cheminées et lignes de procédé en zone dangereuse ; confirmer le calibration, la longueur d'immersion et la bride.",
    highlights: ["Étalonnages type K / N", "Jusqu'à 1000 °C", "Ex d IIC T6"],
    specs: [["Étalonnage", "Type K / N"], ["Plage", "0 à 1000 °C"], ["Antidéflagrance", "Ex d IIC T6"], ["Montage", "Doigt de gant fileté ou à bride"]],
  },
  "power-plant-thermocouple": {
    name: "Thermocouple pour centrales",
    summary: "Thermocouple renforcé pour points de mesure de chaudières, lignes de vapeur et turbines.",
    description: "Conception renforcée avec boîtier anti-projections pour les points de mesure des chaudières, lignes de vapeur et turbines. Types K/E jusqu'à 900 °C, montage à bride avec doigt de gant ; confirmer la longueur d'immersion et les conditions de vapeur.",
    highlights: ["Chaudière / vapeur", "Boîtier anti-projections", "Jusqu'à 900 °C"],
    specs: [["Étalonnage", "Type K / E"], ["Plage", "0 à 900 °C"], ["Boîtier de raccordement", "Anti-projections / étanche"], ["Montage", "À bride, avec doigt de gant"]],
  },
  "petrochemical-thermocouple": {
    name: "Thermocouple / sonde PT 100 pétrochimique",
    summary: "Famille de thermocouples et sondes à bride pour les unités pétrochimiques.",
    description: "Thermocouples (K/E) et sondes Pt 100 à montage par bride DN25–80, doigts de gant 316L percés ou soudés, conçus pour les unités de raffinage et de pétrochimie. Confirmer le fluide, la température et les normes de bride selon la ligne.",
    highlights: ["Options K / E / PT100", "Brides DN25–80", "Conception éprouvée en raffinerie"],
    specs: [["Étalonnage", "Type K / E, PT100"], ["Plage", "-200 à 1000 °C"], ["Raccordement procédé", "Bride DN25–80"], ["Doigt de gant", "316L"]],
  },
  "magnetic-level": {
    name: "Niveaumètre magnétique",
    summary: "Jauge de niveau àBy-pass magnétique à papillons pour l'indication locale sur cuves et réservoirs.",
    description: "Chambre de by-pass avec flotteur magnétique entraînant les papillons bicolores : lecture directe du niveau, jusqu'à 6 m. Montage latéral ou supérieur, parties mouillées 304/316L/PP ; transmetteur 4–20 mA et interrupteurs en option. Confirmer la densité du fluide et la distance entre axes.",
    highlights: ["Portées 0–6 m", "Précision ±10 mm", "4–20 mA en option"],
    specs: [["Plage", "0,3 à 6 m entraxe"], ["Précision", "±10 mm"], ["Parties mouillées", "304 / 316L / PP"], ["Montage", "Latéral ou supérieur"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Niveaumètre magnétique anticorrosion",
    summary: "Jauge de niveau magnétique gainée PTFE pour acides forts, alcalis et fluides corrosifs.",
    description: "Chambre gainée PTFE/PP résistant aux acides et alcalis concentrés, avec indication par papillons et interrupteurs ou transmetteur en option. Confirmer la densité minimale du fluide (≥0,45 g/cm³) et la distance entre axes.",
    highlights: ["Chambre gainée PTFE", "Acides / alcalis forts", "Contacts de niveau en option"],
    specs: [["Plage", "0,3 à 6 m"], ["Précision", "±10 mm"], ["Gaine", "PTFE / PP"], ["Densité du fluide", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Niveaumètre à flotteur insérable",
    summary: "Transmetteur de niveau à flotteur insérable avec chaîne à lames reed pour réservoirs et puits.",
    description: "Tige insérable avec chaîne de lames reed : sortie 4–20 mA proportionnelle au niveau, précision ±5 mm, profondeur jusqu'à 10 m. Flotteur inox 304/316L ; confirmer la profondeur d'insertion, le diamètre du puits et la densité du fluide.",
    highlights: ["Profondeur 0–10 m", "Précision ±5 mm", "Sortie reed 4–20 mA"],
    specs: [["Plage", "0,5 à 10 m"], ["Précision", "±5 mm"], ["Sortie", "4–20 mA, chaîne reed"], ["Flotteur", "Acier inoxydable 304 / 316L"]],
  },
  "radar-level": {
    name: "Niveaumètre radar",
    summary: "Radar non contact 26 GHz pour cuves avec vapeurs, mousses ou poussières.",
    description: "Mesure radar non contact 26 GHz insensible aux vapeurs, mousses et poussières ; précision ±3 mm jusqu'à 30 m. Antenne corne ou lentille PP/316L, sortie 4–20 mA + HART. Confirmer la constante diélectrique du produit et le raccordement.",
    highlights: ["Précision ±3 mm", "26 GHz non contact", "4–20 mA + HART"],
    specs: [["Plage", "0,3 à 30 m"], ["Précision", "±3 mm"], ["Antenne", "Corne ou lentille PP / 316L"], ["Sortie", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Niveaumètre à tube en verre",
    summary: "Jauge de niveau à tube en verre à lecture directe pour réservoirs et chaudières basse pression.",
    description: "Lecture visuelle directe du niveau à travers un tube en verre quartz/borosilicate, pour réservoirs et chaudières basse pression (≤0,6 MPa, ≤150 °C). Robinet de purge et de vidange ; confirmer la pression et la température de service.",
    highlights: ["Lecture visuelle directe", "Tube en quartz", "Maintenance simple"],
    specs: [["Plage", "0,3 à 3 m"], ["Lecture", "Visuelle directe"], ["Tube", "Verre quartz / borosilicate"], ["Classe", "≤0,6 MPa, ≤150 °C"]],
  },
};
