import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug German overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Manometer",
    summary: "Bourdonrohr-Manometer zur lokalen Anzeige des Prozessdrucks.",
    description: "Das Bourdonrohr wandelt den Prozessdruck in eine elastische Auslenkung; ein Übersetzungsgetriebe bewegt den Zeiger für eine lokale Anzeige ohne Hilfsenergie. Geeignet für Pumpen, Druckluft, Prozessleitungen und Druckbehälter mit stabilen Druckverhältnissen. Messbereich, Medienverträglichkeit, Temperatur, Anschlussorientierung und Vibration im Vorfeld klären; bei Druckpulsation Drossel oder Dämpfer vorsehen.",
    highlights: ["Bereiche 0–60 MPa", "Genauigkeit ±1,6 % FS", "Radial-/Axialanschluss"],
    specs: [["Messbereich", "0–0,1 bis 0–60 MPa"], ["Genauigkeit", "±1,6 % FS"], ["Anschluss", "M20×1,5, radial oder axial"], ["Gehäuse", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Edelstahl-Manometer",
    summary: "Komplett-Edelstahlmanometer für korrosive Medien und raue Umgebungen.",
    description: "Vollständige Edelstahlausführung (304/316L) für korrosive Medien, optional mit Glycerinfüllung gegen Vibration. Geeignet für Chemie-, Petrochemie- und Außenaufstellungen. Medienverträglichkeit, Bereich und Anschluss vor Bestellung klären.",
    highlights: ["316L mediumskontaktiert", "Glycerinfüllung optional", "Bis 100 MPa"],
    specs: [["Messbereich", "0–0,1 bis 0–100 MPa"], ["Genauigkeit", "±1,6 % FS"], ["Mediumskontakt", "Edelstahl 304 / 316L"], ["Anschluss", "M20×1,5 oder kundenspezifisch"]],
  },
  "capsule-pressure-gauge": {
    name: "Kapsel-Manometer",
    summary: "Kapselfedermanometer für Nieder- und Kleindruckmessung von Gasen.",
    description: "Das Kapselfederelement ermöglicht zuverlässige Messung kleiner Gasdrücke im kPa-Bereich. Edelstahlgehäuse, Schalttafel- oder Wandmontage. Geeignet für Brenner, Gebläse und Gasanlagen; Medienverträglichkeit und Bereich prüfen.",
    highlights: ["kPa-Bereiche", "316L-Kapsel", "Einbau-/Wandmontage"],
    specs: [["Messbereich", "0–2,5 bis 0–60 kPa, ±kPa"], ["Genauigkeit", "±1,6 % FS"], ["Mediumskontakt", "316L-Kapsel"], ["Anschluss", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Ammoniak-Manometer",
    summary: "Edelstahlmanometer für Ammoniak- und Kälteanlagen, mit Sicherheitsboden.",
    description: "Speziell für Ammoniak- und Kältekreisläufe: mediumskontaktierte Edelstahlteile und berstsicherer Gehäuseboden. Bereich und Anschluss anlageabhängig festlegen; nur mit ammoniakkompatiblen Medien einsetzen.",
    highlights: ["Ammoniak / Kälte", "Sicherheitsboden", "Edelstahl-mediumskontakt"],
    specs: [["Messbereich", "0–1 bis 0–40 MPa, Compound + Vakuum"], ["Genauigkeit", "±1,6 % FS"], ["Mediumskontakt", "Edelstahl"], ["Anschluss", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Bimetallthermometer",
    summary: "Bimetall-Anzeigethermometer für lokale Temperaturmessung ohne Hilfsenergie.",
    description: "Das Bimetallelement wandelt die Temperatur in eine Zeigerbewegung auf der Skala — ohne Hilfsenergie. Axiale, radiale oder universelle Montage; Schaft und Länge nach Bestellung. Geeignet für Leitungen, Behälter und Maschinen; Bereich, Schaftlänge und Medium klären.",
    highlights: ["-80 bis 500 °C", "Axial / radial / universal", "Ohne Hilfsenergie"],
    specs: [["Messbereich", "-80 bis 500 °C"], ["Genauigkeit", "±1,5 % FS"], ["Skala", "φ60 / φ100 / φ150 mm"], ["Schaft", "Ø6 / Ø10 mm, Länge nach Bestellung"]],
  },
  "surface-thermistor": {
    name: "Oberflächen-Widerstandsthermometer",
    summary: "Pt-100-Oberflächensonde für Lagertemperatur- und Rohrwandmessung.",
    description: "Pt-100-Element in Frontflächenbauweise für direkten Kontakt an Lagern, Gehäusen und Rohrwänden. Anlagefläche 316L, kompakte Bauform; Silikankabel mit verschraubtem Kabelverschraubung. Mediumtemperatur und Kabellänge im Vorfeld klären.",
    highlights: ["Pt-100-Element", "Plane Kontaktfläche", "Kompakte Bauform"],
    specs: [["Element", "Pt 100, Klasse B"], ["Messbereich", "-50 bis 200 °C"], ["Kontaktfläche", "Edelstahl 316L"], ["Kabel", "Silikon, wasserdichter Verschraubung"]],
  },
  "assembly-thermistor": {
    name: "Widerstandsthermometer-Einbausonde",
    summary: "Platin-Widerstandsthermometer mit Schutzrohr für Leitungen und Behälter.",
    description: "Pt-100/PT1000-Sonde im wechselbaren Schutzrohr (304/316/316L) zur Prozess-Temperaturmessung. 2/3/4-Leiter-Anschluss; Klasse A oder B. Schutzrohrdurchmesser und -länge prozessabhängig wählen.",
    highlights: ["Pt 100 / PT1000", "Klasse A / B", "Schutzrohr 304 / 316 / 316L"],
    specs: [["Element", "Pt 100 / PT1000, Klasse A oder B"], ["Messbereich", "-200 bis 500 °C"], ["Schutzrohr", "304 / 316 / 316L"], ["Verdrahtung", "2 / 3 / 4-leitig"]],
  },
  "explosion-proof-thermistor": {
    name: "Druckfeste Widerstandsthermometer",
    summary: "Pt-100-Sonde mit druckfestem Klemmenkopf für Messungen in Ex-Bereichen.",
    description: "Druckfester Klemmenkopf Ex d IIC T6 für den Einsatz in explosionsgefährdeten Bereichen. Pt-100-Element, Edelstahl-Schutzrohr. Zoneneinteilung und Eintauchtiefe vor Bestellung prüfen.",
    highlights: ["Ex d IIC T6", "Druckfester Klemmenkopf", "Pt-100-Element"],
    specs: [["Element", "Pt 100, Klasse B"], ["Messbereich", "-200 bis 450 °C"], ["Explosionsschutz", "Ex d IIC T6"], ["Schutzrohr", "Edelstahl"]],
  },
  "integrated-thermistor": {
    name: "Integrierter Ex-Widerstandsthermometer-Umformer",
    summary: "Pt-100-Sonde mit integriertem Kopfümformer, direkte 4–20 mA-Ausgabe im Ex-Bereich.",
    description: "Kopfümformer direkt in der Sonde integriert: 4–20-mA-Zweileiterausgabe ohne Kompensationsleitung. Druckfester Kopf Ex d IIC T6, LCD-Anzeige optional. Ideal für weit abgelegene Messstellen; Bereich und Eintauchtiefe klären.",
    highlights: ["Integrierter 4–20-mA-Umformer", "Ex d IIC T6", "LCD-Anzeige optional"],
    specs: [["Element", "Pt 100, Klasse B"], ["Messbereich", "-200 bis 450 °C"], ["Ausgang", "4–20 mA, 2-leitig"], ["Explosionsschutz", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Verschleißfeste Widerstandsthermometer",
    summary: "Gepanzerte Pt-100-Sonde mit Verschleißschutz für Kohlemühlen und staubige Strömungen.",
    description: "Hartmetall-Schutzkappe widersteht der Abrasion staubiger Hochgeschwindigkeitsströmungen in Kraftwerken (Kohlemühlen). Pt-100-Element Klasse B; Eintauchtiefe und Rohrdurchmesser anpassen.",
    highlights: ["Verschleißfeste Spitze", "Kraftwerkseinsatz", "Widerstandsfähig gegen Staub"],
    specs: [["Element", "Pt 100, Klasse B"], ["Messbereich", "0 bis 600 °C"], ["Spitze", "Hartmetall-Verschleißkappe"], ["Anwendung", "Kohlemühlen, staubbeladene Luft"]],
  },
  "explosion-proof-thermocouple": {
    name: "Druckfestes Thermoelement",
    summary: "Thermoelement mit Schutzrohr und druckfestem Kopf für hohe Temperaturen im Ex-Bereich.",
    description: "K/N-Thermoelement im Gewinde- oder Flanschschutzrohr, druckfester Kopf Ex d IIC T6, bis 1000 °C. Geeignet für Öfen, Abgaswege und Prozessleitungen in Ex-Zonen; Kalibrierung, Eintauchtiefe und Flansch klären.",
    highlights: ["Typen K / N", "Bis 1000 °C", "Ex d IIC T6"],
    specs: [["Kalibrierung", "Typ K / N"], ["Messbereich", "0 bis 1000 °C"], ["Explosionsschutz", "Ex d IIC T6"], ["Montage", "Gewinde- oder Flanschschutzrohr"]],
  },
  "power-plant-thermocouple": {
    name: "Thermoelement für Kraftwerke",
    summary: "Verstärktes Thermoelement für Messstellen an Kesseln, Dampfleitungen und Turbinen.",
    description: "Verstärkte Ausführung mit spritzwassergeschütztem Kopf für Kessel-, Dampfleitungs- und Turbinenmessstellen. Typen K/E bis 900 °C, Flanschmontage mit Schutzrohr; Eintauchtiefe und Dampfbedingungen klären.",
    highlights: ["Kessel / Dampf", "Spritzwassergeschützter Kopf", "Bis 900 °C"],
    specs: [["Kalibrierung", "Typ K / E"], ["Messbereich", "0 bis 900 °C"], ["Klemmenkopf", "Spritzwassergeschützt / wetterfest"], ["Montage", "Flansch, mit Schutzrohr"]],
  },
  "petrochemical-thermocouple": {
    name: "Thermoelement / Pt-100-Sonde für Petrochemie",
    summary: "Thermoelement- und Pt-100-Familie mit Flanschanschluss für Petrochemie-Anlagen.",
    description: "Thermoelemente (K/E) und Pt-100-Sonden mit DN25–80-Flanschanschluss, 316L-Schutzrohren gebohrt oder geschweißt — ausgelegt für Raffinerie- und Petrochemie-Anlagen. Medium, Temperatur und Flanschnorm leitungsabhängig festlegen.",
    highlights: ["Optionen K / E / PT100", "Flansche DN25–80", "Raffinerieerprobte Bauweise"],
    specs: [["Kalibrierung", "Typ K / E, PT100"], ["Messbereich", "-200 bis 1000 °C"], ["Prozessanschluss", "Flansch DN25–80"], ["Schutzrohr", "316L"]],
  },
  "magnetic-level": {
    name: "Magnetischer Füllstandsmesser",
    summary: "Bypass-Füllstandsmesser mit magnetischem Umkehranzeige für Tanks und Behälter.",
    description: "Bypass-Kammer mit Magnet Schwimmer, der die zweifarbigen Klappanzeigen mitführt: direkte Ablesung bis 6 m. Seiten- oder Topmontage, mediumskontaktierte Teile 304/316L/PP; 4–20-mA-Transmitter und Grenzschalter optional. Dichte und Mitteleabstand klären.",
    highlights: ["Bereiche 0–6 m", "Genauigkeit ±10 mm", "4–20 mA optional"],
    specs: [["Messbereich", "0,3 bis 6 m Mitte-Mitte"], ["Genauigkeit", "±10 mm"], ["Mediumskontakt", "304 / 316L / PP"], ["Montage", "Seiten- oder Topmontage"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Korrosionsbeständiger Füllstandsmesser",
    summary: "Magnetischer Füllstandsmesser mit PTFE-Auskleidung für Säuren, Laugen und aggressive Medien.",
    description: "PTFE/PP-ausgekleidete Kammer beständig gegen konzentrierte Säuren und Laugen, mit Klappanzeige sowie optionalen Grenzschaltern oder Transmitter. Mindestdichte (≥0,45 g/cm³) und Mitteleabstand klären.",
    highlights: ["PTFE-ausgekleidete Kammer", "Säuren / Laugen", "Grenzschiene optional"],
    specs: [["Messbereich", "0,3 bis 6 m"], ["Genauigkeit", "±10 mm"], ["Auskleidung", "PTFE / PP"], ["Mediendichte", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Eintauch-Schwimmer-Füllstandsmesser",
    summary: "Eintauchender Schwimmersender mit ReedException für Behälter und Brunnen.",
    description: "Eintauchsonde mit Reed-Kette: 4–20-mA-Ausgang proportional zum Füllstand, ±5 mm Genauigkeit, bis 10 m Tiefe. Schwimmer aus 304/316L; Eintauchtiefe, Brunnendurchmesser und Mediendichte klären.",
    highlights: ["Eintauchtiefe 0–10 m", "Genauigkeit ±5 mm", "Reed-Ausgang 4–20 mA"],
    specs: [["Messbereich", "0,5 bis 10 m"], ["Genauigkeit", "±5 mm"], ["Ausgang", "4–20 mA, Reed-Kette"], ["Schwimmer", "Edelstahl 304 / 316L"]],
  },
  "radar-level": {
    name: "Radar-Füllstandsmesser",
    summary: "Berührungsloses 26-GHz-Radar für Behälter mit Dämpfen, Schaum oder Staub.",
    description: "Berührungsloses 26-GHz-Radar unempfindlich gegen Dämpfe, Schaum und Staub; ±3 mm Genauigkeit bis 30 m. Horn- oder Linsenantenne aus PP/316L, Ausgang 4–20 mA + HART. Dielektrizitätskonstante des Produkts und Prozessanschluss klären.",
    highlights: ["Genauigkeit ±3 mm", "26 GHz berührungslos", "4–20 mA + HART"],
    specs: [["Messbereich", "0,3 bis 30 m"], ["Genauigkeit", "±3 mm"], ["Antenne", "Horn oder Linse PP / 316L"], ["Ausgang", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Glas-Füllstandsmesser",
    summary: "Direkt ablesbarer Glas-Füllstandsmesser für Niederdrucktanks und Kessel.",
    description: "Direkte visuelle Ablesung durch ein Quarz-/Borosilikatglas, für Niederdrucktanks und Kessel (≤0,6 MPa, ≤150 °C). Absperr- und Entwässerungsventile; Betriebsdruck und -temperatur klären.",
    highlights: ["Direkte visuelle Ablesung", "Quarzglas", "Einfache Wartung"],
    specs: [["Messbereich", "0,3 bis 3 m"], ["Ablesung", "Direkt visuell"], ["Rohr", "Quarz / Borosilikatglas"], ["Belastbarkeit", "≤0,6 MPa, ≤150 °C"]],
  },
};
