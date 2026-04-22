"use client";

import { useEffect, useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default function CertificatePage() {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    try {
      // 1. Load template first to initialize pdfDoc
      const existingPdfBytes = await fetch(
        "/assets/certificate/ijarmy.pdf",
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to load PDF template");
        return res.arrayBuffer();
      });

      // 2. Load PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // 3. Register fontkit on the instance
      pdfDoc.registerFontkit(fontkit);

      // 4. Load Amita font from the correct path (/assets/font/)
      const fontBytes = await fetch("/assets/font/Amita-Regular.ttf").then(
        (res) => {
          if (!res.ok) throw new Error("Failed to load Amita font");
          return res.arrayBuffer();
        },
      );

      // 5. Embed the font
      const amitaFont = await pdfDoc.embedFont(fontBytes);

      // 6. Get page
      const page = pdfDoc.getPages()[0];
      const { width, height } = page.getSize();

      // 7. Styling
      const orange = rgb(224 / 255, 122 / 255, 0 / 255);

      // 8. Dynamic data
      const authorName = "Lokendra Rajpurohit";
      const title = `"A Study on Secure Authentication Systems Using Blockchain Technology "`;
      const published = "Volume 1 Issue 2, Date of Publication: 22 April 2026";
      const paperId = "858a643b-0e39-4cae-8b6a-a4ba72de6679";
      const resignId = Math.random().toString(36).substring(2, 6).toUpperCase();

      // 9. Draw text
      page.drawText("Dr Author Raj", {
        x: width / 2 - 250,
        y: height / 2 + 150,
        size: 100,
        color: orange,
      });

      page.drawText(title, {
        x: width / 4,
        y: height / 2 - 40,
        size: 60,
        color: orange,
      });

      page.drawText(published, {
        x: width / 3 + 190,
        y: height / 2 - 190,
        size: 35,
        color: rgb(0, 0, 0),
        font: amitaFont,
      });

      page.drawText(paperId, {
        x: 510,
        y: height / 3 - 45,
        size: 45,
        color: orange,
      });

      page.drawText(`IJARMY-${resignId}`, {
        x: 550,
        y: height / 3 - 105,
        size: 40,
        color: rgb(0, 0, 0),
      });

      // 10. Save PDF
      const pdfBytes = await pdfDoc.save();

      // 11. Convert to URL and set state
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
    } catch (err) {
      console.error("PDF Generation Error:", err);
    }
  };

  return (
    <div className="w-full h-screen">
      {pdfUrl ? (
        <iframe src={pdfUrl} className="w-full h-full" />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>Generating certificate...</p>
        </div>
      )}
    </div>
  );
}
