"""Build a review-only pressure product pack. Run from any working directory."""
from pathlib import Path
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
W, H = 595.28, 841.89
NAVY, BLUE, GRAY = map(HexColor, ['#102856', '#2269B5', '#526172'])
body = ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=15, textColor=GRAY)
small = ParagraphStyle('small', parent=body, fontSize=8.5, leading=12)
c = canvas.Canvas(str(OUT / 'pressure-product-pack-draft.pdf'), pagesize=(W, H))
c.setTitle('Jingfeng pressure instruments | Engineering review draft')
c.setAuthor('Jingfeng website project - draft compilation')

def text(t, x, y, width=499, style=body):
    p = Paragraph(t, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, y-height)
    return y-height

def page(n, label, title, subtitle):
    c.setFillColor(NAVY); c.rect(0, H-44, W, 44, fill=1, stroke=0)
    c.setFillColor(white); c.setFont('Helvetica-Bold', 9)
    c.drawString(48, H-27, 'DRAFT - ENGINEERING REVIEW REQUIRED')
    c.setFillColor(BLUE); c.setFont('Helvetica-Bold', 9); c.drawString(48, 763, label.upper())
    text(title, 48, 741, style=ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=26, leading=31, textColor=NAVY))
    text(subtitle, 48, 661)
    c.setStrokeColor(HexColor('#DCE3ED')); c.line(48, 53, W-48, 53)
    c.setFillColor(GRAY); c.setFont('Helvetica', 8)
    c.drawString(48, 36, 'INTERNAL REVIEW ONLY | 30 September 2026 | Revision 0.1')
    c.drawRightString(W-48, 36, f'{n} / 5')

def heading(t, y):
    return text(t,48,y,style=ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=14,leading=19,textColor=NAVY))-9

def note(t, y):
    c.setFillColor(HexColor('#EFF5FC')); c.roundRect(48,y-65,499,65,6,fill=1,stroke=0)
    text(t,60,y-12,475,small)
    return y-82

def rows(items, y, left=160, rowh=43):
    for i,(a,b) in enumerate(items):
        c.setFillColor(HexColor('#F2F6FA') if i%2==0 else white)
        c.rect(48,y-rowh,499,rowh,fill=1,stroke=0)
        text(escape(a),58,y-8,left-20,small)
        text(escape(b),48+left,y-8,489-left,small)
        y-=rowh
    return y

page(1,'Pressure measurement','Product information pack','Anhui Jingfeng Instrument Co., Ltd. | English review edition')
y=note('<b>Not a released datasheet.</b> This pack compiles current website descriptions and sample information. Numerical values, materials, compatibility and supply capability have not been independently manufacturer-verified.',615)
y=heading('Four product records, one selection workflow',y)
y=rows([
('JF-1541','Pressure Gauge | Bourdon-tube description'),
('JF-1545','Stainless Steel Pressure Gauge | flange sample'),
('JF-1543','Capsule Pressure Gauge | low-pressure gas description'),
('JF-1542','Ammonia Pressure Gauge | dual-scale sample'),
],y)
y=heading('How to use this pack',y-28)
y=text('1. Identify the instrument family using the sample summaries.<br/>2. Complete the inquiry worksheet with your actual operating conditions.<br/>3. Obtain a manufacturer-approved specification and dimensional drawing.<br/>4. Release the final purchase specification only after engineering review.',48,y)
text('<b>Source:</b> repository <font name="Courier">src/lib/products.ts</font> and existing product images. The site model identifiers are reproduced for inquiry matching. No order code, product certification, pressure rating or performance guarantee is established by this draft.',48,y-25,style=small)
c.showPage()

products=[
('JF-1541','Pressure Gauge','pressure-gauge.jpg','0-1.6 MPa; accuracy class 1.6','Bourdon-tube mechanical pointer indication is described on the website.','Case described as black and circular. Thread, diameter, wetted materials and temperature limits are not confirmed.','pressure-gauge'),
('JF-1545','Stainless Steel Pressure Gauge','stainless-pressure-gauge.jpg','0-2.5 MPa; accuracy class 1.6','Mechanical pressure gauge with a flange assembly shown.','The website reports a 316L marking on the lower connector. This does not establish the alloy of all wetted parts, flange standard or pressure rating.','stainless-pressure-gauge'),
('JF-1543','Capsule Pressure Gauge','capsule-pressure-gauge-repaired.png','0-10,000 Pa; accuracy class 2.5','Capsule-element local indication for low gas pressure is described.','Side threaded connection is reported. Thread standard, element material, gas compatibility and overload limit require confirmation. Image is an existing edited website asset.','capsule-pressure-gauge'),
('JF-1542','Ammonia Pressure Gauge','ammonia-pressure-gauge.jpg','0-4 MPa / 0-580 psi; accuracy class 1.6','Mechanical dual-scale indication with a bottom connection shown.','The product name is not proof of compatibility. Confirm exact refrigerant, all wetted materials, seals, pressure and temperature ratings before ammonia service.','ammonia-pressure-gauge'),
]
for pageno, pair in [(2,products[:2]),(3,products[2:])]:
    page(pageno,'Sample product records','Identify the instrument','All values below are existing website/sample information, not a verified supply specification.')
    for top,p in zip([611,354],pair):
        model,name,img,spec,principle,limit,slug=p
        text(model+' | '+name,48,top,style=ParagraphStyle('product',fontName='Helvetica-Bold',fontSize=14,leading=18,textColor=NAVY))
        c.setFillColor(HexColor('#F2F6FA')); c.roundRect(48,top-179,125,143,5,fill=1,stroke=0)
        c.drawImage(ImageReader(str(ROOT/'public/products'/img)),58,top-167,width=105,height=119,preserveAspectRatio=True,anchor='c',mask='auto')
        y=text('<b>Reported sample:</b> '+spec,189,top-36,358)
        y=text(principle,189,y-10,358)
        text('<b>Selection limits:</b> '+limit,189,y-10,358,small)
        text('Website reference: /en/products/'+slug,48,top-195,499,small)
    c.showPage()

page(4,'Inquiry specification worksheet','Define the application','Complete one worksheet per duty. Attach the process specification and installation drawing where available.')
y=rows([
('Project / destination','____________________________________________'),
('Model / quantity','____________________________________________'),
('Medium / composition','____________________________________________'),
('Normal / min / max pressure','____________________________________________'),
('Pressure unit / gauge type','____________________________________________'),
('Process / ambient temperature','____________________________________________'),
('Vibration / pulsation / shock','____________________________________________'),
('Connection / mounting','Thread standard, size, male/female OR flange standard and rating: ______________________________'),
('Dial / orientation / space','____________________________________________'),
('Material / seal requirements','____________________________________________'),
('Documents / inspection','Required drawing, calibration, inspection or material records: __________________________________'),
],613,rowh=43)
text('Also provide required delivery date, packaging and commercial terms separately. Submission of requirements does not confirm availability or acceptance. Never substitute a visually similar thread or infer material compatibility from case appearance.',48,y-18,style=small)
c.showPage()

page(5,'Release checklist','From draft to datasheet','Engineering and business owners must complete the evidence review before this pack is published or sent as an approved catalog.')
y=rows([
('Product identity','Confirm each model against a current manufacturer record.'),
('Measurement specification','Approve range options, accuracy basis, operating limits and overload conditions for each model.'),
('Materials and compatibility','Record case, sensing element, connector and seal materials separately; confirm application suitability.'),
('Installation','Supply dimensioned drawings, connection standards, sizes, orientation and mounting clearances.'),
('Options and documentation','Confirm actual accessories and available inspection/calibration records. Do not imply unavailable certifications.'),
('Photos and commercial terms','Approve images and product labels; verify MOQ, lead time, packing and export information.'),
('Approval and release','Name the engineering reviewer, evidence references, review date and revision. Publish only the approved revision.'),
],612,rowh=55)
text('<b>Engineering reviewer:</b> Not assigned<br/><b>Evidence files:</b> Not supplied<br/><b>Approval date:</b> Pending<br/><b>Release state:</b> Internal draft; not for procurement specification or installation.',48,y-20)
c.showPage()
c.save()
print(OUT / 'pressure-product-pack-draft.pdf')
