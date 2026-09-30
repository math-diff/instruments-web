# Pressure product pack - internal draft

- `pressure-product-pack-draft.pdf`: 5-page English review pack, not an approved datasheet.
- `build_pressure_pack.py`: editable source with content and ReportLab layout; resolves repository images relative to itself.
- `review-page-1.png` through `review-page-5.png`: Poppler-rendered visual QA pages.

The pack covers JF-1541, JF-1545, JF-1543 and JF-1542, an inquiry worksheet and an engineering release checklist. Values are taken from existing website sample descriptions in `src/lib/products.ts`, not independent manufacturer verification. The capsule image is the existing edited website asset and is identified as such.

Every page is marked `DRAFT - ENGINEERING REVIEW REQUIRED`. The reviewer, evidence and approval date remain pending. No dimensions, certifications, order options, delivery promises or material compatibility are fabricated. Do not copy this PDF to `public/` or treat it as a released sales catalog before review.

## Rebuild

Run `python artifacts/seo/build_pressure_pack.py` with ReportLab installed. Generate QA images with `pdftoppm -scale-to 1100 -png artifacts/seo/pressure-product-pack-draft.pdf artifacts/seo/review-page`.

## Verification - 2026-09-30

All five rendered pages were visually inspected: headings, images, table text, margins and page numbers are legible without clipping or overlap. PDF text extraction verified five pages and the mandatory review label on each page. Poppler emitted missing fallback-font warnings for Symbol/ArialUnicode, but rendered the English Helvetica content without visible missing characters.
