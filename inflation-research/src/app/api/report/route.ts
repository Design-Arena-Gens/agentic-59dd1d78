import { NextResponse } from "next/server";
import path from "path";
import { reportMeta, reportSections } from "@/lib/reportContent";

export const runtime = "nodejs";

export async function GET() {
  const PdfPrinter = (await import("pdfmake")).default;

  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "NotoSansArabic-Regular.ttf",
  );

  const printer = new PdfPrinter({
    NotoSansArabic: {
      normal: fontPath,
      bold: fontPath,
      italics: fontPath,
      bolditalics: fontPath,
    },
  });

  const docDefinition = {
    info: {
      title: reportMeta.title,
      author: reportMeta.author,
      subject: "بحث حول التضخم",
    },
    defaultStyle: {
      font: "NotoSansArabic",
      fontSize: 12,
      alignment: "right" as const,
    },
    content: [
      {
        text: reportMeta.title,
        style: "title",
        rtl: true,
      },
      {
        text: reportMeta.subtitle,
        style: "subtitle",
        rtl: true,
      },
      {
        columns: [
          { text: `${reportMeta.author}`, rtl: true, style: "meta" },
          { text: `${reportMeta.published}`, rtl: true, style: "meta" },
        ],
      },
      {
        canvas: [
          {
            type: "line" as const,
            x1: 0,
            y1: 5,
            x2: 500,
            y2: 5,
            lineWidth: 1,
          },
        ],
      },
      ...reportSections.flatMap((section, index) => [
        {
          text: `${index + 1}. ${section.title}`,
          style: "sectionHeader",
          rtl: true,
        },
        {
          text: section.summary,
          style: "sectionSummary",
          rtl: true,
        },
        {
          ul: section.points.map((point) => ({
            text: point,
            rtl: true,
          })),
          style: "sectionList",
        },
      ]),
      {
        text: "الخلاصة",
        style: "sectionHeader",
        rtl: true,
      },
      {
        text:
          "يتطلب التعامل مع التضخم حزمة من السياسات المتكاملة التي تراعي الظروف الهيكلية والظرفية للاقتصاد. إن التنسيق بين السياسة النقدية والمالية، وتحسين مرونة العرض، وتعزيز إنتاجية القطاعات الرئيسة تعد مداخل أساسية لتحقيق الاستقرار السعري على المدى المتوسط والطويل.",
        rtl: true,
        style: "sectionSummary",
      },
    ],
    styles: {
      title: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 12] as [number, number, number, number],
      },
      subtitle: {
        fontSize: 14,
        color: "#475569",
        margin: [0, 0, 0, 18] as [number, number, number, number],
      },
      meta: {
        fontSize: 12,
        color: "#64748b",
        margin: [0, 0, 0, 8] as [number, number, number, number],
      },
      sectionHeader: {
        fontSize: 18,
        bold: true,
        margin: [0, 16, 0, 8] as [number, number, number, number],
      },
      sectionSummary: {
        fontSize: 12,
        margin: [0, 0, 0, 10] as [number, number, number, number],
        lineHeight: 1.5,
      },
      sectionList: {
        margin: [0, 0, 0, 10] as [number, number, number, number],
        lineHeight: 1.5,
        color: "#0f172a",
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", reject);
    pdfDoc.end();
  });

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(pdfBuffer);
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="inflation-report.pdf"`,
      "Content-Length": pdfBuffer.length.toString(),
    },
  });
}
