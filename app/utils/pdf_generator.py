from fpdf import FPDF

def generate_pdf(report: dict) -> bytes:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.write_html(f"""
<h1>Patient Report</h1>
<hr>
<h2>Reason for Visit:</h2>
<p>{report["reason"]}</p>

<h2>Symptoms:</h2>
<p>{report["symptoms"]}</p>

<h2>Additional Notes:</h2>
<p>{report["additional"]}</p>
""")

    return bytes(pdf.output())
