import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug Swedish overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Tryckmätare",
    summary: "Bourdontryckmätare för lokal avläsning av processtryck.",
    description: "Bourdonröret omvandlar processtrycket till en elastisk förflyttning; ett mekanisk växeldrivning styr visaren för lokal avläsning utan hjälpenergi. Lämplig för pumpar, tryckluft, processledningar och tryckkärl med stabilt tryck. Bekräfta område, mediekompatibilitet, temperatur, anslutningsriktning och vibrationer; vid pulsering tillhandahåll rebell eller dämpare.",
    highlights: ["Områden 0–60 MPa", "Noggrannhet ±1,6 % FS", "Radial / axial montering"],
    specs: [["Område", "0–0,1 till 0–60 MPa"], ["Noggrannhet", "±1,6 % FS"], ["Anslutning", "M20×1,5, radial eller axial"], ["Hölje", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Rostfria tryckmätaren",
    summary: "Helt rostfri tryckmätare för korrosiva medier och tuffa miljöer.",
    description: "Helt rostfri utförande (304/316L) för korrosiva medier, med valbar glycerinfyllning mot vibrationer. Lämplig för kemi, petrokemi och utomhusinstallationer. Bekräfta mediekompatibilitet, område och anslutning före beställning.",
    highlights: ["Medieskydd 316L", "Glycerinfyllning valfri", "Upp till 100 MPa"],
    specs: [["Område", "0–0,1 till 0–100 MPa"], ["Noggrannhet", "±1,6 % FS"], ["Medieskydd", "Rostfritt 304 / 316L"], ["Anslutning", "M20×1,5 eller special"]],
  },
  "capsule-pressure-gauge": {
    name: "Kapselmanometern",
    summary: "Manometern med kapselelement för mätning av låga tryck och mikrotryck i gaser.",
    description: "Kapselelementet möjliggör tillförlitlig mätning av små gastryck i kPa-området. Rostfritt hölje, panel- eller väggmontering. Lämplig för brännare, fläktar och gasinstallationer; kontrollera mediekompatibilitet och område.",
    highlights: ["kPa-områden", "316L-kapsel", "Panel-/väggmontering"],
    specs: [["Område", "0–2,5 till 0–60 kPa, ±kPa"], ["Noggrannhet", "±1,6 % FS"], ["Medieskydd", "316L-kapsel"], ["Anslutning", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Ammoniaktryckmätaren",
    summary: "Rostfri manometern för ammoniak- och kylsystem, med säkerhetsbotten.",
    description: "Designad för ammoniak- och kylkretsar: mediumskontakt i rostfritt och säkerhetsbotten. Område och anslutning anpassas efter installationen; använd endast med ammoniakkompatibla medier.",
    highlights: ["Ammoniak / kylning", "Säkerhetsbotten", "Rostfri medieskydd"],
    specs: [["Område", "0–1 till 0–40 MPa, övertryck + vakuum"], ["Noggrannhet", "±1,6 % FS"], ["Medieskydd", "Rostfritt stål"], ["Anslutning", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Bimetalltermometer",
    summary: "Bimetallvisarttermometer för lokal temperaturvisning utan hjälpenergi.",
    description: "Bimetrallelementet omvandlar temperaturen till visarrörelse på skalan — utan hjälpenergi. Axial, radial eller universell montering; hals och längd på beställning. Lämplig för ledningar, kärl och maskiner; bekräfta område, halslängd och medium.",
    highlights: ["-80 till 500 °C", "Axial / radial / universell", "Utan hjälpenergi"],
    specs: [["Område", "-80 till 500 °C"], ["Noggrannhet", "±1,5 % FS"], ["Skala", "φ60 / φ100 / φ150 mm"], ["Hals", "Ø6 / Ø10 mm, längd på beställning"]],
  },
  "surface-thermistor": {
    name: "Ytmonterad PT100-sond",
    summary: "Pt 100-ytsond för temperaturmätning på lager och rörväggar.",
    description: "Pt 100-element i frontflänsdesign för direkt kontakt mot lager, skjortor och rörväggar. Kontaktfläns 316L, kompakt utförande; silikonsladd med vattentät kabelgenomföring. Bekräfta yttemperatur och kabellängd.",
    highlights: ["Pt 100-element", "Plan kontaktyta", "Kompakt utförande"],
    specs: [["Element", "Pt 100, klass B"], ["Område", "-50 till 200 °C"], ["Kontaktyta", "Rostfritt stål 316L"], ["Kabel", "Silikon, vattentät kabelgenomföring"]],
  },
  "assembly-thermistor": {
    name: "Monterad PT100-sond",
    summary: "Platinamotståndstermometer med skyddsrör för ledningar och behållare.",
    description: "Pt 100/PT1000-sond i utbytbar skyddsrmuff (304/316/316L) för processtemperaturmätning. 2/3/4-ledaranslutning; klass A eller B. Välj muffdiameter och längd efter processen.",
    highlights: ["Pt 100 / PT1000", "Klass A / B", "Skyddsrör 304 / 316 / 316L"],
    specs: [["Element", "Pt 100 / PT1000, klass A eller B"], ["Område", "-200 till 500 °C"], ["Skyddsrör", "304 / 316 / 316L"], ["Koppling", "2 / 3 / 4-ledig"]],
  },
  "explosion-proof-thermistor": {
    name: "Tryckhållfast PT100-sond",
    summary: "Pt 100-sond med tryckhållfast anslutningshuvud för mätning i Ex-områden.",
    description: "Tryckhållfast anslutningshuvud Ex d för användning i explosionsfarliga områden. Pt 100-element, skyddsrör i rostfritt; uppfyller Ex d IIC T6. Kontrollera zonklassificering och nedsänkningsdjup före beställning.",
    highlights: ["Ex d IIC T6", "Tryckhållfast huvud", "Pt 100-element"],
    specs: [["Element", "Pt 100, klass B"], ["Område", "-200 till 450 °C"], ["Explosionsskydd", "Ex d IIC T6"], ["Skyddsrör", "Rostfritt stål"]],
  },
  "integrated-thermistor": {
    name: "Ex-PT100-sändare med integrerad omvandlare",
    summary: "Pt 100-sond med integrerat huvudomvandlare, direkt 4–20 mA-utgång i Ex-område.",
    description: "Huvudomvandlare integrerad direkt i sonden: 4–20-mA tvåledarutgång utan kompensationsledningar. Tryckhållfast huvud Ex d IIC T6, LCD-display valfri. Ideal för avlägsna mätpunkter; bekräfta område och nedsänkningsdjup.",
    highlights: ["Integrerad 4–20 mA-sändare", "Ex d IIC T6", "LCD-display valfri"],
    specs: [["Element", "Pt 100, klass B"], ["Område", "-200 till 450 °C"], ["Utgång", "4–20 mA, 2-ledig"], ["Explosionsskydd", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Slitstark PT100-sond",
    summary: "Pansad Pt 100-sond med slitstark spets för kolmillar och dammiga flöden.",
    description: "Hårdmetallspets motstår abrasionen från dammiga höghastighetsflöden i kraftverk (kolmälning). Pt 100-element klass B; anpassa nedsänkningsdjup och rördiameter.",
    highlights: ["Slitstark spets", "Kraftverksanvändning", "Tål dammiga flöden"],
    specs: [["Element", "Pt 100, klass B"], ["Område", "0 till 600 °C"], ["Spets", "Slitstark hårdmetallkåpa"], ["Tillämpning", "Kolmälning, dammig luft"]],
  },
  "explosion-proof-thermocouple": {
    name: "Tryckhållfast termoelement",
    summary: "Termoelement med skyddsrör och tryckhållfast huvud för höga temperaturer i Ex-områden.",
    description: "K/N-termoelement i gängat eller flänsskyddsrör, tryckhållfast huvud Ex d IIC T6, upp till 1000 °C. Lämplig för ugnar, rökgaskanaler och procesledningar i Ex-zoner; bekräfta kalibrering, nedsänkningsdjup och fläns.",
    highlights: ["Kalibreringar typ K / N", "Upp till 1000 °C", "Ex d IIC T6"],
    specs: [["Kalibrering", "Typ K / N"], ["Område", "0 till 1000 °C"], ["Explosionsskydd", "Ex d IIC T6"], ["Montering", "Gängat eller flänsskyddsrör"]],
  },
  "power-plant-thermocouple": {
    name: "Termoelement för kraftverk",
    summary: "Förstärkt termoelement för mätpunkter i pannor, ångledningar och turbiner.",
    description: "Förstärkt utförande med stänkskyddat huvud för mätpunkter i pannor, ångledningar och turbiner. Typer K/E upp till 900 °C, flänsmontering med skyddsrör; bekräfta nedsänkningsdjup och ångförhållanden.",
    highlights: ["Panna / ånga", "Stänkskyddat huvud", "Upp till 900 °C"],
    specs: [["Kalibrering", "Typ K / E"], ["Område", "0 till 900 °C"], ["Huvud", "Stänkskyddat / vädertätt"], ["Montering", "Fläns, med skyddsrör"]],
  },
  "petrochemical-thermocouple": {
    name: "Termoelement / PT100 för petrokemi",
    summary: "Termoelement- och PT100-familj med flänsanslutning för petrokemiska anläggningar.",
    description: "Termoelement (K/E) och PT100-sonder med DN25–80-flänsanslutning, 316L-skyddsrör borrade eller svetsade — designade för raffinaderier och petrokemi. Bekräfta medium, temperatur och flänsstandard efter ledningen.",
    highlights: ["Alternativ K / E / PT100", "Flänsar DN25–80", "Raffineriebeprövad konstruktion"],
    specs: [["Kalibrering", "Typ K / E, PT100"], ["Område", "-200 till 1000 °C"], ["Procesanslutning", "Fläns DN25–80"], ["Skyddsrör", "316L"]],
  },
  "magnetic-level": {
    name: "Magnetisk nivåmätare",
    summary: "Bypassnivåmätare med magnetiska klaffar för lokal avläsning i tankar.",
    description: "Bypasskammare med magnetflottör som styr tvåfärgade klaffar: direkt nivåavläsning upp till 6 m. Sidomontering eller toppmontering, mediedel 304/316L/PP; 4–20 mA-sändare och brytare valfritt. Bekräfta mediets densitet och mittemotstånd.",
    highlights: ["Områden 0–6 m", "Noggrannhet ±10 mm", "4–20 mA valfri"],
    specs: [["Område", "0,3 till 6 m mitt-i-mitt"], ["Noggrannhet", "±10 mm"], ["Mediedel", "304 / 316L / PP"], ["Montering", "Sidomontering eller topp"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Korrosionsbeständig nivåmätare",
    summary: "Magnetisk nivåmätare med PTFE-fovoder för syror, baser och korrosiva medier.",
    description: "PTFE/PP-fovoderad kammare tål koncentrerade syror och baser, med klaffvisning samt valfria brytare eller sändare. Bekräfta mediets minsta densitet (≥0,45 g/cm³) och mittemotstånd.",
    highlights: ["PTFE-fovoderad kammare", "Syror / baser", "Nivåbrytare valfri"],
    specs: [["Område", "0,3 till 6 m"], ["Noggrannhet", "±10 mm"], ["Foder", "PTFE / PP"], ["Mediedensitet", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Insättningsbar flottörnivåmätare",
    summary: "Nedsänkbar flottörsändare med reedkedja för tankar och brunnar.",
    description: "Nedsänkbar stav med reedkedja: 4–20-mA-utgång proportionell mot nivån, ±5 mm noggrannhet, upp till 10 m djup. Flottör i rostfritt 304/316L; bekräfta nedsänkningsdjup, brunnens diameter och mediets densitet.",
    highlights: ["Nedsänkningsdjup 0–10 m", "Noggrannhet ±5 mm", "Reedutgång 4–20 mA"],
    specs: [["Område", "0,5 till 10 m"], ["Noggrannhet", "±5 mm"], ["Utgång", "4–20 mA, reedkedja"], ["Flottör", "Rostfritt stål 304 / 316L"]],
  },
  "radar-level": {
    name: "Radarnivåmätare",
    summary: "Beröringsfri 26 GHz-radar för tankar med ångor, skum eller damm.",
    description: "Beröringsfri 26 GHz-radar okänslig för ångor, skum och damm; ±5 mm noggrannhet upp till 30 m. Horn- eller linsantenn PP/316L, utgång 4–20 mA + HART. Bekräfta produktens dielektricitetskonstant och procesanslutning.",
    highlights: ["Noggrannhet ±3 mm", "26 GHz beröringsfri", "4–20 mA + HART"],
    specs: [["Område", "0,3 till 30 m"], ["Noggrannhet", "±3 mm"], ["Antenn", "Horn eller lins PP / 316L"], ["Utgång", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Glasnivåmätare",
    summary: "Direktavläsande glasnivåmätare för lågtryckstankar och pannor.",
    description: "Direkt visuell avläsning av nivån genom ett kvarts-/borosilikatglas, för lågtryckstankar och pannor (≤0,6 MPa, ≤150 °C). Avstängnings- och avtappningsventiler; bekräfta drifttryck och temperatur.",
    highlights: ["Direkt visuell avläsning", "Kvartsglasrör", "Enkelt underhåll"],
    specs: [["Område", "0,3 till 3 m"], ["Avläsning", "Direkt visuell"], ["Rör", "Kvarts / borosilikatglas"], ["Klass", "≤0,6 MPa, ≤150 °C"]],
  },
};
