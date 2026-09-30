---
title: "NPT vs BSP Pressure Gauge Connections: What to Specify Before Ordering"
status: "draft — pending engineering review; do not publish"
intendedPath: "/en/blog/npt-vs-bsp-pressure-gauge-connections"
draftPrepared: "2026-09-30"
technicalReviewer: null
approvedAt: null
---

# NPT vs BSP Pressure Gauge Connections: What to Specify Before Ordering

“Half-inch connection” is not a complete pressure gauge specification. Different thread families can share a nominal size while having different profiles, pitches and sealing arrangements. A connection that starts to screw together is not proof of a correct pressure-tight joint.

## The main families

| Identification | Basic distinction | What to check |
| --- | --- | --- |
| NPT | Tapered pipe thread, commonly specified to ASME B1.20.1; 60-degree thread profile | Exact size, male/female end and approved sealing method |
| BSPT / ISO 7-1 | British pipe thread family with a 55-degree profile; R identifies an external tapered thread, Rc an internal tapered thread, Rp an internal parallel thread | The actual designation and intended mating pair, not only “BSP” |
| BSPP / G / ISO 228-1 | Parallel pipe thread with a 55-degree profile; the pressure seal is not made by the thread alone | Specified face, gasket, bonded seal or other designed sealing interface |

These are identification distinctions, not assembly instructions. Follow the selected gauge and fitting manufacturer's drawings and installation instructions for sealing materials, torque and service conditions.

## Why matching the nominal size is not enough

The nominal label is not simply the measured outside diameter. Establish whether a thread is parallel or tapered, measure the appropriate diameter, check pitch with a suitable gauge, and compare the thread profile and reference tables. Check the sealing face as well as the thread.

Swagelok specifically notes that some 1/2-inch and 3/4-inch BSPT and NPT threads are difficult to distinguish because their geometry is close. When identification is uncertain, use qualified inspection and the original part specification; do not force the connection to test a guess.

## Sealing method belongs in the purchase specification

For a tapered-thread connection, follow the manufacturer's specified thread engagement and compatible sealing method. For a parallel connection designed to seal at a face or shoulder, wrapping thread tape around the thread does not replace the required sealing interface. The suitability of a seal depends on pressure, temperature, process medium and connection design.

If an adapter is necessary, assess its complete pressure rating, material, sealing surfaces and mechanical loading. An adapter adds joints and can change the installed height or load on a gauge connection. It should not be treated as a universal way to make incompatible threads acceptable.

## What is known for the current Jingfeng catalogue?

The [JF-1543 capsule gauge](/en/products/capsule-pressure-gauge) description identifies a side threaded connection, but does not establish its thread standard or size. The [JF-1542 ammonia gauge](/en/products/ammonia-pressure-gauge) shows a bottom connection assembly. The [JF-1545 stainless gauge](/en/products/stainless-pressure-gauge) shows a flange assembly and therefore needs flange identification rather than an assumed pipe-thread size.

Those visible features do not confirm an NPT, G or R option for any model. Request the model-specific connection drawing and availability before ordering.

## A complete connection enquiry

Send the thread marking, nominal size, gender, mounting position, medium, pressure and temperature. Include the existing equipment drawing if available and a clear photograph of the connection and sealing surface. For flanges, specify standard, nominal size, rating and facing.

Return to the [pressure gauge overview](/en/pressure-gauges), review the [selection guide](/en/blog/selecting-pressure-gauge), or [send a connection enquiry](/en/contact). A final quotation should identify the supplied connection explicitly.

## Editorial evidence and release checklist (remove from public article)

- [Swagelok Thread and End Connection Identification Guide](https://www.swagelok.com/downloads/webcatalogs/EN/ms-13-77.pdf), retrieved through Exa 2026-09-30: thread profiles, identification sequence, difficulty distinguishing certain BSPT/NPT sizes.
- [WIKA 232.50/233.50 data sheet](https://www.wika.com/media/Data-sheets/Pressure/Pressure-gauges/ds_pm0202_en_co.pdf): examples of explicitly distinguished G, R and NPT options. These are WIKA options, not evidence of Jingfeng availability.
- `src/lib/products.ts`: current sample connection descriptions only.

- [ ] Engineer confirms ISO/ASME terminology and sealing discussion; no generic assembly torque added.
- [ ] Obtain approved connection drawings for all four Jingfeng models; only then add confirmed options.
- [ ] Do not claim all NPT/BSP connections are interchangeable, or infer a standard from photographs.
- [ ] Add real reviewer and approval date; verify existing internal destinations before publishing.
