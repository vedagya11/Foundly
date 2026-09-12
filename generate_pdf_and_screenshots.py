import asyncio
import os
from playwright.async_api import async_playwright
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

async def capture_all_screenshots():
    os.makedirs("screenshots", exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            device_scale_factor=2
        )
        page = await context.new_page()

        print("Navigating to http://localhost:3000...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # 1. Community Feed
        print("Capturing 1: Community Feed...")
        await page.screenshot(path="screenshots/shot1_feed.png")

        # 2. Creator Profile
        print("Capturing 2: Creator Profile...")
        await page.click("text=Skill Profile")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshots/shot2_profile.png")

        # 3. AI Evaluator Entry
        print("Capturing 3: AI Evaluator Entry...")
        await page.click("text=AI Evaluator")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshots/shot3_eval_entry.png")

        # 4. AI Skill Insights
        print("Capturing 4: AI Skill Insights...")
        await page.click("text=Try Pre-loaded Category Demo")
        await page.wait_for_timeout(3500)
        await page.screenshot(path="screenshots/shot4_eval_insights.png")

        # 5. Talent Discovery (Switch to Provider Mode)
        print("Capturing 5: Talent Discovery...")
        await page.click("text=Switch Experience: Creator")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshots/shot5_discovery.png")

        # 6. Skill Matching
        print("Capturing 6: Skill Matching...")
        await page.evaluate("window.scrollBy(0, 260)")
        await page.wait_for_timeout(500)
        await page.screenshot(path="screenshots/shot6_matching.png")

        # 7. Opportunity Inquiry Modal
        print("Capturing 7: Inquiry Modal...")
        await page.click("button:has-text('Inquire Anonymously')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshots/shot7_inquiry.png")

        # Close Modal & Send Inquiry
        await page.click("button:has-text('Send Opportunity Inquiry')")
        await page.wait_for_timeout(1000)

        # 8. 2-Pane Messages
        print("Capturing 8: 2-Pane Messages...")
        await page.screenshot(path="screenshots/shot8_messages.png")

        # 9. Saved Talent
        print("Capturing 9: Saved Talent...")
        await page.click("text=Saved Talent")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshots/shot9_saved.png")

        await browser.close()
        print("Screenshots captured cleanly!")

class PageDecoratorCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(PageDecoratorCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(PageDecoratorCanvas, self).showPage()
        super(PageDecoratorCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Top Accent Line
        self.setFillColor(colors.HexColor("#4f46e5"))
        self.rect(0, A4[1] - 5, A4[0], 5, fill=True, stroke=False)

        # Header on pages 2+
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#4f46e5"))
            self.drawString(36, A4[1] - 22, "FOUNDLY")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawString(84, A4[1] - 22, "|   Talent Deserves to Be Found.   (MeitY GENESIS EIR Application)")
            
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(36, A4[1] - 28, A4[0] - 36, A4[1] - 28)

        # Footer on all pages
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(36, 36, A4[0] - 36, 36)

        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 22, "Foundly Prototype Overview • Functional Web Prototype")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 36, 22, page_str)
        self.restoreState()

def build_pdf():
    pdf_filename = "FOUNDLY_Prototype_Overview.pdf"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=40,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#4f46e5")    # Indigo Accent
    DARK = colors.HexColor("#0f172a")       # Dark Slate Text
    MUTED = colors.HexColor("#475569")      # Slate Body Text
    LIGHT_BG = colors.HexColor("#f8fafc")   # Card Light BG
    BORDER = colors.HexColor("#cbd5e1")     # Border

    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=30,
        leading=36,
        textColor=DARK,
        spaceAfter=4
    )

    tagline_style = ParagraphStyle(
        'CoverTagline',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=PRIMARY,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=MUTED,
        spaceAfter=14
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=DARK,
        spaceBefore=8,
        spaceAfter=4
    )

    body_text = ParagraphStyle(
        'BodyTextCustom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
        spaceAfter=8
    )

    caption_style = ParagraphStyle(
        'ImageCaption',
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=PRIMARY,
        spaceBefore=4,
        spaceAfter=8,
        alignment=1
    )

    story = []

    # PAGE 1 — COVER
    story.append(Paragraph("FOUNDLY", title_style))
    story.append(Paragraph("Talent Deserves to Be Found.", tagline_style))
    story.append(Paragraph("AI-Enabled Social Platform for Skill-Based Talent Discovery", subtitle_style))
    
    meta_data = [
        [Paragraph("<b>Founder:</b> Vedagya Sharma", body_text), Paragraph("<b>Program:</b> MeitY GENESIS EIR", body_text)],
        [Paragraph("<b>Stage:</b> Functional Web Prototype", body_text), Paragraph("<b>Target Sector:</b> Creator Economy / AI Talent Discovery", body_text)]
    ]
    meta_table = Table(meta_data, colWidths=[250, 250])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    if os.path.exists("screenshots/shot1_feed.png"):
        img = Image("screenshots/shot1_feed.png", width=520, height=310)
        story.append(img)
        story.append(Paragraph("Foundly Interactive Web Prototype — Main Interface Spotlight", caption_style))

    story.append(PageBreak())

    # PAGE 2 — PRODUCT OVERVIEW
    story.append(Paragraph("From Showcase to Opportunity", section_heading))
    story.append(Paragraph(
        "Foundly combines social networking with an AI-powered talent discovery layer. Creators showcase their work, receive structured AI-assisted skill insights, and become discoverable to opportunity providers based on demonstrated ability.",
        body_text
    ))
    story.append(Spacer(1, 4))

    if os.path.exists("screenshots/shot1_feed.png"):
        img1 = Image("screenshots/shot1_feed.png", width=500, height=270)
        story.append(img1)
        story.append(Paragraph("Community Feed — Creators showcase their work, build communities and gain visibility through demonstrated ability.", caption_style))

    story.append(Spacer(1, 6))

    if os.path.exists("screenshots/shot2_profile.png"):
        img2 = Image("screenshots/shot2_profile.png", width=500, height=270)
        story.append(img2)
        story.append(Paragraph("Creator Profile — A dedicated profile where talent, work and AI-assisted skill insights are presented together.", caption_style))

    story.append(PageBreak())

    # PAGE 3 — AI-ASSISTED SKILL EVALUATION
    story.append(Paragraph("Turning Content Into Skill Insights", section_heading))
    story.append(Paragraph(
        "Foundly's AI layer analyzes creator content and converts it into structured skill insights, helping creators understand their strengths while making talent easier for opportunity providers to evaluate.",
        body_text
    ))
    story.append(Spacer(1, 4))

    if os.path.exists("screenshots/shot4_eval_insights.png"):
        img4 = Image("screenshots/shot4_eval_insights.png", width=510, height=390)
        story.append(img4)
        story.append(Paragraph("AI-Assisted Skill Insights — Uploaded work is translated into an overall score, category-specific skill scores and structured feedback.", caption_style))

    story.append(Spacer(1, 6))
    disclaimer_table = Table([[
        Paragraph("<b>Prototype Concept Notice:</b> AI-assisted evaluation is intended to provide structured skill insights, not an absolute judgment of talent.", body_text)
    ]], colWidths=[500])
    disclaimer_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#e0e7ff")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#6366f1")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(disclaimer_table)

    story.append(PageBreak())

    # PAGE 4 — TALENT DISCOVERY
    story.append(Paragraph("Discover Talent by Demonstrated Skill", section_heading))
    story.append(Paragraph(
        "Opportunity providers can search and filter talent using category-specific skill insights instead of relying solely on followers, popularity or existing networks.",
        body_text
    ))
    story.append(Spacer(1, 4))

    if os.path.exists("screenshots/shot5_discovery.png"):
        img5 = Image("screenshots/shot5_discovery.png", width=500, height=270)
        story.append(img5)
        story.append(Paragraph("Talent Discovery — Opportunity providers can search and filter creators using AI-assisted skill insights.", caption_style))

    story.append(Spacer(1, 6))

    if os.path.exists("screenshots/shot6_matching.png"):
        img6 = Image("screenshots/shot6_matching.png", width=500, height=270)
        story.append(img6)
        story.append(Paragraph("Skill-Based Matching — Opportunity providers can evaluate talent using individual skill dimensions rather than relying only on follower count or popularity.", caption_style))

    story.append(PageBreak())

    # PAGE 5 — OPPORTUNITY PROVIDER EXPERIENCE
    story.append(Paragraph("From Discovery to Opportunity", section_heading))
    story.append(Paragraph(
        "Opportunity providers can explore talent privately, evaluate relevant skills, shortlist promising creators and initiate opportunity-related conversations.",
        body_text
    ))
    story.append(Spacer(1, 4))

    if os.path.exists("screenshots/shot9_saved.png"):
        img9 = Image("screenshots/shot9_saved.png", width=510, height=390)
        story.append(img9)
        story.append(Paragraph("Saved Talent Workspace — Opportunity providers track candidate shortlists and manage direct outreach.", caption_style))

    story.append(Spacer(1, 8))
    stealth_box = Table([[
        Paragraph("<b>Stealth Discovery Concept:</b> Verified opportunity providers can browse creators anonymously. Identity and credentials remain private until direct outreach is initiated.", body_text)
    ]], colWidths=[500])
    stealth_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#dcfce7")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#16a34a")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(stealth_box)

    story.append(PageBreak())

    # PAGE 6 — CONNECTION & MESSAGING
    story.append(Paragraph("Connecting Talent With Opportunities", section_heading))
    story.append(Paragraph(
        "Once a potential match is identified, creators and opportunity providers can communicate directly and explore collaborations or project offers.",
        body_text
    ))
    story.append(Spacer(1, 4))

    if os.path.exists("screenshots/shot7_inquiry.png"):
        img7 = Image("screenshots/shot7_inquiry.png", width=500, height=260)
        story.append(img7)
        story.append(Paragraph("Opportunity Inquiry — Opportunity providers can initiate a conversation regarding potential project opportunities.", caption_style))

    story.append(Spacer(1, 6))

    if os.path.exists("screenshots/shot8_messages.png"):
        img8 = Image("screenshots/shot8_messages.png", width=500, height=260)
        story.append(img8)
        story.append(Paragraph("Messaging — Creators and opportunity providers can communicate directly after discovery.", caption_style))

    story.append(PageBreak())

    # PAGE 7 — END-TO-END PRODUCT FLOW & STATUS
    story.append(Paragraph("Foundly Product Journey & Prototype Status", section_heading))
    story.append(Paragraph(
        "Foundly aims to make talent discoverable for what people can demonstrate — not simply for how many followers they have.",
        body_text
    ))
    story.append(Spacer(1, 6))

    flow_text = Paragraph("<font color='#4f46e5'><b>SHOWCASE</b></font> &nbsp;➔&nbsp; <font color='#0284c7'><b>AI ANALYSIS</b></font> &nbsp;➔&nbsp; <font color='#9333ea'><b>SKILL INSIGHTS</b></font> &nbsp;➔&nbsp; <font color='#0284c7'><b>TALENT DISCOVERY</b></font> &nbsp;➔&nbsp; <font color='#d97706'><b>SHORTLIST</b></font> &nbsp;➔&nbsp; <font color='#16a34a'><b>CONNECTION</b></font>", ParagraphStyle('FlowStyle', fontName='Helvetica-Bold', fontSize=9.5, leading=14, alignment=1))
    flow_table = Table([[flow_text]], colWidths=[500])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, PRIMARY),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 12))

    status_data = [
        [
            Paragraph("<b>Demonstrated Capabilities:</b><br/>"
                      "✓ Social/community feed<br/>"
                      "✓ Creator profiles & portfolios<br/>"
                      "✓ AI-assisted skill evaluation concept<br/>"
                      "✓ Skill-based talent discovery engine<br/>"
                      "✓ Anonymous recruiter stealth mode<br/>"
                      "✓ Candidate shortlisting<br/>"
                      "✓ Direct inquiry & 2-pane messaging", body_text),
            Paragraph("<b>Next Development Areas:</b><br/>"
                      "• Production AI/ML audio & visual evaluation model<br/>"
                      "• Authentication & secure profile accounts<br/>"
                      "• Production database infrastructure<br/>"
                      "• Industry partner pilots & label trials<br/>"
                      "• Multi-discipline category expansion", body_text)
        ]
    ]
    status_table = Table(status_data, colWidths=[250, 250])
    status_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(status_table)
    story.append(Spacer(1, 10))

    if os.path.exists("screenshots/shot1_feed.png"):
        img_final = Image("screenshots/shot1_feed.png", width=500, height=230)
        story.append(img_final)
        story.append(Paragraph("Foundly — Beyond Followers. Beyond Connections.", caption_style))

    doc.build(story, canvasmaker=PageDecoratorCanvas)
    print(f"PDF generated successfully at {os.path.abspath(pdf_filename)}")

if __name__ == "__main__":
    asyncio.run(capture_all_screenshots())
    build_pdf()
