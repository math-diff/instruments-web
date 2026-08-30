import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug Italian overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Manometro",
    summary: "Manometro a tubo di Bourdon per l'indicazione locale della pressione di processo.",
    description: "Il tubo di Bourdon converte la pressione in spostamento elastico; un movimento moltiplicatore comanda la lancetta per un'indicazione locale senza alimentazione. Adatto a pompe, aria compressa, linee di processo e recipienti a pressione stabile. Confermare campo, compatibilità del fluido, temperatura, orientamento del raccordo e vibrazioni; prevedere restrittore o smorzatore in caso di pulsazioni.",
    highlights: ["Campi 0–60 MPa", "Precisione ±1,6% FS", "Montaggio radiale / assiale"],
    specs: [["Campo", "0–0,1 a 0–60 MPa"], ["Precisione", "±1,6% FS"], ["Raccordo", "M20×1,5, radiale o assiale"], ["Cassa", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Manometro in acciaio inox",
    summary: "Manometro interamente in acciaio inox per fluidi corrosivi e ambienti difficili.",
    description: "Costruzione interamente inox (304/316L) resistente alla corrosione, con riempimento in glicerina opzionale contro le vibrazioni. Adatto a chimica, petrochimica e installazioni esterne. Confermare compatibilità del fluido, campo e raccordo prima dell'ordine.",
    highlights: ["Parti a contatto 316L", "Riempimento in glicerina opzionale", "Fino a 100 MPa"],
    specs: [["Campo", "0–0,1 a 0–100 MPa"], ["Precisione", "±1,6% FS"], ["Parti a contatto", "Acciaio inox 304 / 316L"], ["Raccordo", "M20×1,5 o su misura"]],
  },
  "capsule-pressure-gauge": {
    name: "Manometro a capsula",
    summary: "Manometro a elemento capsula per la misura di basse e micro-pressioni gassose.",
    description: "L'elemento a capsula consente la misura affidabile di basse pressioni di gas nell'ordine dei kPa. Cassa in acciaio inox, montaggio a pannello o a parete. Adatto a bruciatori, ventilatori e impianti gas; verificare compatibilità e campo.",
    highlights: ["Campi in kPa", "Capsula 316L", "Montaggio a incasso / parete"],
    specs: [["Campo", "0–2,5 a 0–60 kPa, ±kPa"], ["Precisione", "±1,6% FS"], ["Parti a contatto", "Capsula inox 316L"], ["Raccordo", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Manometro per ammoniaca",
    summary: "Manometro inox dedicato ad ammoniaca e impianti frigoriferi, con fondello di sicurezza.",
    description: "Progettato per circuiti di ammoniaca e refrigerazione: parti a contatto in inox e fondello di sicurezza. Campo e raccordo da definire secondo l'impianto; utilizzare solo con fluidi compatibili con l'ammoniaca.",
    highlights: ["Ammoniaca / refrigerazione", "Fondello di sicurezza", "Parti a contatto in inox"],
    specs: [["Campo", "0–1 a 0–40 MPa, composto + vuoto"], ["Precisione", "±1,6% FS"], ["Parti a contatto", "Acciaio inossidabile"], ["Raccordo", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Termometro bimetallico",
    summary: "Termometro a quadrante bimetallico per l'indicazione locale della temperatura senza alimentazione.",
    description: "L'elemento bimetallico trasforma la temperatura in rotazione della lancetta sul quadrante, senza alimentazione. Montaggio assiale, radiale o universale; fusto e lunghezza su ordinazione. Adatto a tubazioni, serbatoi e macchine; confermare campo, lunghezza del fusto e fluido.",
    highlights: ["Da -80 a 500 °C", "Assiale / radiale / universale", "Senza alimentazione"],
    specs: [["Campo", "Da -80 a 500 °C"], ["Precisione", "±1,5% FS"], ["Quadrante", "φ60 / φ100 / φ150 mm"], ["Fusto", "Ø6 / Ø10 mm, lunghezza su misura"]],
  },
  "surface-thermistor": {
    name: "Sonda a resistenza di superficie",
    summary: "Sonda Pt 100 a superficie per la misura di temperatura su cuscinetti e pareti.",
    description: "Elemento Pt 100 a contatto diretto su cuscinetti, manicotti e pareti di tubazioni. Faccia d'appoggio in acciaio 316L, costruzione compatta; cavo in silicone con pressacavo stagnò. Verificare temperatura del supporto e lunghezza del cavo.",
    highlights: ["Elemento Pt 100", "Superficie di contatto piana", "Costruzione compatta"],
    specs: [["Elemento", "Pt 100, classe B"], ["Campo", "Da -50 a 200 °C"], ["Superficie di contatto", "Acciaio inox 316L"], ["Cavo", "Silicone, pressacavo stagnò"]],
  },
  "assembly-thermistor": {
    name: "Termoresistenza assemblata",
    summary: "Termometro a resistenza al platino con pozzetto per condotte e serbatoi.",
    description: "Sonda Pt 100/PT1000 in pozzetto amovibile (304/316/316L) per la misura di temperatura di processo. Cablaggio 2/3/4 fili; versioni classe A o B. Selezionare diametro e immersione del pozzetto secondo il processo.",
    highlights: ["Pt 100 / PT1000", "Classe A / B", "Pozzetto 304 / 316 / 316L"],
    specs: [["Elemento", "Pt 100 / PT1000, classe A o B"], ["Campo", "Da -200 a 500 °C"], ["Pozzetto", "304 / 316 / 316L"], ["Cablaggio", "2 / 3 / 4 fili"]],
  },
  "explosion-proof-thermistor": {
    name: "Termoresistenza a prova di esplosione",
    summary: "Sonda Pt 100 con testa a prova di esplosione per zone pericolose.",
    description: "Testa di collegamento a prova di esplosione Ex d per l'uso in zone a rischio. Elemento Pt 100, pozzetto in acciaio inox; conforme Ex d IIC T6. Verificare classificazione della zona e immersione prima dell'ordine.",
    highlights: ["Ex d IIC T6", "Testa a prova di esplosione", "Elemento Pt 100"],
    specs: [["Elemento", "Pt 100, classe B"], ["Campo", "Da -200 a 450 °C"], ["Protezione Ex", "Ex d IIC T6"], ["Pozzetto", "Acciaio inox"]],
  },
  "integrated-thermistor": {
    name: "Termoresistenza Ex con trasmettitore integrato",
    summary: "Sonda Pt 100 con trasmettitore di testa integrato, uscita 4–20 mA diretta in zona Ex.",
    description: "Trasmettitore di testa integrato nella sonda: uscita 4–20 mA a due fili senza cavi di compensazione. Testa a prova di esplosione Ex d IIC T6, display LCD opzionale. Ideale per punti di misura lontani; confermare campo e immersione.",
    highlights: ["Trasmettitore 4–20 mA integrato", "Ex d IIC T6", "Display LCD opzionale"],
    specs: [["Elemento", "Pt 100, classe B"], ["Campo", "Da -200 a 450 °C"], ["Uscita", "4–20 mA, 2 fili"], ["Protezione Ex", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Termoresistenza anti-usura",
    summary: "Sonda Pt 100 corazzata con punta anti-usura per mulini a carbone e flussi polverosi.",
    description: "Punta in lega dura resistente all'abrasione dei flussi polverosi ad alta velocità delle centrali (macinazione carbone). Elemento Pt 100 classe B; definire immersione e diametro secondo la linea.",
    highlights: ["Punta anti-usura", "Uso in centrali", "Resiste a flussi polverosi"],
    specs: [["Elemento", "Pt 100, classe B"], ["Campo", "Da 0 a 600 °C"], ["Punta", "Calotta anti-usura in lega dura"], ["Applicazione", "Macinazione carbone, aria polverosa"]],
  },
  "explosion-proof-thermocouple": {
    name: "Termocoppia a prova di esplosione",
    summary: "Termocoppia con pozzetto e testa a prova di esplosione per alte temperature in zona Ex.",
    description: "Termocoppia K/N in pozzetto filettato o a flangia, testa a prova di esplosione Ex d IIC T6, fino a 1000 °C. Adatta a forni, condotti fumi e linee di processo in zona pericolosa; confermare calibrazione, immersione e flangia.",
    highlights: ["Calibrazioni tipo K / N", "Fino a 1000 °C", "Ex d IIC T6"],
    specs: [["Calibrazione", "Tipo K / N"], ["Campo", "Da 0 a 1000 °C"], ["Protezione Ex", "Ex d IIC T6"], ["Montaggio", "Pozzetto filettato o a flangia"]],
  },
  "power-plant-thermocouple": {
    name: "Termocoppia per centrali",
    summary: "Termocoppia rinforzata per punti di misura di caldaie, linee vapore e turbine.",
    description: "Costruzione rinforzata con testa a prova di spruzzi per punti di misura di caldaie, linee vapore e turbine. Tipi K/E fino a 900 °C, montaggio a flangia con pozzetto; confermare immersione e condizioni del vapore.",
    highlights: ["Caldaia / vapore", "Testa anti-spruzzi", "Fino a 900 °C"],
    specs: [["Calibrazione", "Tipo K / E"], ["Campo", "Da 0 a 900 °C"], ["Testa", "Anti-spruzzi / stagna"], ["Montaggio", "A flangia, con pozzetto"]],
  },
  "petrochemical-thermocouple": {
    name: "Termocoppia / Pt 100 per petrolchimica",
    summary: "Famiglia di termocoppie e sonde Pt 100 a flangia per unità petrolchimiche.",
    description: "Termocoppie (K/E) e sonde Pt 100 con flangia DN25–80, pozzetti 316L forati o saldati, progettate per raffinerie e petrolchimica. Confermare fluido, temperatura e standard di flangia secondo la linea.",
    highlights: ["Opzioni K / E / PT100", "Flange DN25–80", "Costruzione collaudata in raffineria"],
    specs: [["Calibrazione", "Tipo K / E, PT100"], ["Campo", "Da -200 a 1000 °C"], ["Raccordo di processo", "Flangia DN25–80"], ["Pozzetto", "316L"]],
  },
  "magnetic-level": {
    name: "Livellometro magnetico",
    summary: "Livellometro a bypass con alette magnetiche per l'indicazione locale su serbatoi.",
    description: "Camera di bypass con galleggiante magnetico che comanda le alette bicolore: lettura diretta del livello fino a 6 m. Montaggio laterale o superiore, parti a contatto 304/316L/PP; trasmettitore 4–20 mA e interruttori opzionali. Confermare densità del fluido e interasse.",
    highlights: ["Campi 0–6 m", "Precisione ±10 mm", "4–20 mA opzionale"],
    specs: [["Campo", "0,3 a 6 m tra assi"], ["Precisione", "±10 mm"], ["Parti a contatto", "304 / 316L / PP"], ["Montaggio", "Laterale o superiore"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Livellometro magnetico anticorrosione",
    summary: "Livellometro magnetico rivestito in PTFE per acidi forti, alcali e fluidi corrosivi.",
    description: "Camera rivestita in PTFE/PP resistente ad acidi e alcali concentrati, con indicazione ad alette e interruttori o trasmettitore opzionali. Confermare densità minima del fluido (≥0,45 g/cm³) e interasse.",
    highlights: ["Camera rivestita PTFE", "Acidi / alcali forti", "Interruttori opzionali"],
    specs: [["Campo", "0,3 a 6 m"], ["Precisione", "±10 mm"], ["Rivestimento", "PTFE / PP"], ["Densità del fluido", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Livellometro a galleggiante inseribile",
    summary: "Trasmettitore di livello a galleggiante inseribile con catena reed per serbatoi e pozzi.",
    description: "Asta inseribile con catena a lame reed: uscita 4–20 mA proporzionale al livello, precisione ±5 mm, fino a 10 m di profondità. Galleggiante inox 304/316L; confermare profondità di inserimento, diametro del pozzo e densità del fluido.",
    highlights: ["Profondità 0–10 m", "Precisione ±5 mm", "Uscita reed 4–20 mA"],
    specs: [["Campo", "0,5 a 10 m"], ["Precisione", "±5 mm"], ["Uscita", "4–20 mA, catena reed"], ["Galleggiante", "Acciaio inox 304 / 316L"]],
  },
  "radar-level": {
    name: "Misuratore di livello radar",
    summary: "Radar non a contatto 26 GHz per serbatoi con vapori, schiuma o polveri.",
    description: "Radar non a contatto 26 GHz insensibile a vapori, schiuma e polveri; precisione ±3 mm fino a 30 m. Antenna a corno o lente PP/316L, uscita 4–20 mA + HART. Confermare costante dielettrica del prodotto e raccordo di processo.",
    highlights: ["Precisione ±3 mm", "26 GHz non a contatto", "4–20 mA + HART"],
    specs: [["Campo", "0,3 a 30 m"], ["Precisione", "±3 mm"], ["Antenna", "Corno o lente PP / 316L"], ["Uscita", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Livellometro a tubo di vetro",
    summary: "Livellometro a tubo di vetro a lettura diretta per serbatoi e caldaie a bassa pressione.",
    description: "Lettura visiva diretta del livello attraverso un tubo in vetro quarzo/borosilicato, per serbatoi e caldaie a bassa pressione (≤0,6 MPa, ≤150 °C). Valvole di spurgo e scarico; confermare pressione e temperatura di esercizio.",
    highlights: ["Lettura visiva diretta", "Tubo in quarzo", "Manutenzione semplice"],
    specs: [["Campo", "0,3 a 3 m"], ["Lettura", "Visiva diretta"], ["Tubo", "Vetro quarzo / borosilicato"], ["Portata", "≤0,6 MPa, ≤150 °C"]],
  },
};
