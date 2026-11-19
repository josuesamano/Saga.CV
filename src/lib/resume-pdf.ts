import { arrayBuffer } from 'node:stream/consumers';
import PDFDocument from 'pdfkit';
import { certifications, educationInstitution, learningTechnologies, name, resume, type Locale } from '../data/resume.ts';

const colors = {
  canvas: '#f1f5f8',
  white: '#ffffff',
  ink: '#152b41',
  body: '#314458',
  muted: '#4b6073',
  accent: '#076961',
  line: '#d9e3eb',
  navy: '#14283d',
  navyEdge: '#173950',
  profile: '#112a3e',
  profileLine: '#56728a',
  lightTeal: '#9ce0d6',
  paleBlue: '#d5e3ee',
  lightText: '#ecf3f8',
  learning: '#eaf5f3',
  tagLine: '#a8d1ca',
};

type TextRow = {
  text: string;
  size: number;
  color: string;
  bold?: boolean;
  gap?: number;
  indent?: number;
  divider?: boolean;
  link?: string;
  end?: string;
};

type Column = {
  x: number;
  y: number;
  width: number;
};

const leading = 1.2;
const padding = 11;
const gutter = 11;

interface Contact {
  email: string;
  phone: string;
  whatsapp: string;
}

export async function renderResumePdf(locale: Locale, { email, phone, whatsapp }: Contact) {
  const copy = resume[locale];
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    lang: locale,
    info: { Title: `${name} | ${copy.title}`, Author: name, Subject: copy.profile },
  });
  const bytes = arrayBuffer(doc);
  const page = doc.page;
  const inset = 25;
  const leftWidth = 320;
  const rightX = inset + leftWidth + gutter;
  const rightWidth = page.width - rightX - inset;

  function textStyle(row: TextRow) {
    doc.font(row.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(row.size).fillColor(row.color);
  }

  function rowsHeight(rows: TextRow[], width: number) {
    return rows.reduce((height, row) => {
      textStyle(row);
      return height + doc.heightOfString(row.text, { width: width - (row.indent ?? 0), lineGap: leading })
        + (row.gap ?? 0);
    }, 0);
  }

  function drawRows(rows: TextRow[], { x, y, width }: Column) {
    for (const row of rows) {
      if (row.divider) {
        doc.moveTo(x, y - 4).lineTo(x + width, y - 4).lineWidth(0.55).strokeColor(colors.line).stroke();
      }
      textStyle(row);
      const indent = row.indent ?? 0;
      doc.text(row.text, x + indent, y, { width: width - indent, lineGap: leading, link: row.link });
      const nextY = doc.y + (row.gap ?? 0);
      if (row.end) {
        doc.font('Helvetica').fontSize(9.1).fillColor(colors.muted)
          .text(row.end, x, y + 1.2, { width, align: 'right' });
      }
      y = nextY;
    }
    return y;
  }

  function drawTagRows(technologies: string[], x: number, y: number, width: number, draw: boolean) {
    const tagSize = 9.5;
    const tagHeight = 17;
    const spacing = 4;
    let tagX = x;
    doc.font('Helvetica-Bold').fontSize(tagSize);
    for (const technology of technologies) {
      const tagWidth = Math.ceil(doc.widthOfString(technology)) + 12;
      if (tagX > x && tagX + tagWidth > x + width) {
        tagX = x;
        y += tagHeight + spacing;
      }
      if (draw) {
        doc.roundedRect(tagX, y, tagWidth, tagHeight, 3)
          .lineWidth(0.5).fillAndStroke(colors.learning, colors.tagLine);
        doc.fillColor(colors.accent).text(technology, tagX + 6, y + 3.2, { lineBreak: false });
      }
      tagX += tagWidth + spacing;
    }
    return y + tagHeight;
  }

  function card(title: string, rows: TextRow[], column: Column, learning = false) {
    const x = column.x + padding;
    const y = column.y + padding;
    const width = column.width - 2 * padding;
    const content = [{ text: title, size: 17, color: colors.ink, bold: true, gap: 8 }, ...rows];
    let bottom = y + rowsHeight(content, width);
    const learningTop = bottom + 9;
    const learningHeading = { text: copy.learning, size: 10.5, color: colors.ink, bold: true, gap: 5 };
    const tagTop = learningTop + 8 + rowsHeight([learningHeading], width - 16);
    if (learning) {
      bottom = drawTagRows(learningTechnologies, x + 8, tagTop, width - 16, false) + 8;
    }
    doc.roundedRect(column.x, column.y, column.width, bottom + padding - column.y, 8)
      .lineWidth(0.6).fillAndStroke(colors.white, colors.line);
    drawRows(content, { x, y, width });
    if (learning) {
      doc.roundedRect(x, learningTop, width, bottom - learningTop, 5).fill(colors.learning);
      drawRows([learningHeading], { x: x + 8, y: learningTop + 8, width: width - 16 });
      drawTagRows(learningTechnologies, x + 8, tagTop, width - 16, true);
    }
    return bottom + padding + gutter;
  }

  const identityRows: TextRow[] = [
    { text: copy.location.toUpperCase(), size: 9, color: colors.lightTeal, bold: true, gap: 8 },
    { text: name, size: 30, color: colors.white, bold: true, gap: 7 },
    { text: copy.title, size: 13.5, color: colors.white, bold: true, gap: 4 },
    { text: copy.subtitle, size: 10.5, color: colors.paleBlue },
  ];
  const profileRows: TextRow[] = [
    { text: copy.profile, size: 11, color: colors.lightTeal, bold: true, gap: 6 },
    { text: copy.summary, size: 9.6, color: colors.lightText, gap: 8 },
    { text: email, size: 9.5, color: colors.lightTeal, link: `mailto:${email}`, gap: 2 },
    { text: phone, size: 9.5, color: colors.lightTeal, link: whatsapp },
  ];
  const profilePadding = 11;
  const identityWidth = 270;
  const heroProfileX = 311;
  const heroProfileWidth = page.width - heroProfileX - inset;
  const profileWidth = heroProfileWidth - 2 * profilePadding;
  const identityHeight = rowsHeight(identityRows, identityWidth);
  const profileHeight = rowsHeight(profileRows, profileWidth) + 2 * profilePadding;
  const heroHeight = Math.max(identityHeight, profileHeight) + 32;
  const profileY = (heroHeight - profileHeight) / 2;

  doc.rect(0, 0, page.width, page.height).fill(colors.canvas);
  const background = doc.linearGradient(0, 0, page.width, heroHeight);
  background.stop(0, colors.navy).stop(1, colors.navyEdge);
  doc.rect(0, 0, page.width, heroHeight).fill(background);
  drawRows(identityRows, { x: inset, y: (heroHeight - identityHeight) / 2, width: identityWidth });
  doc.roundedRect(heroProfileX, profileY, heroProfileWidth, profileHeight, 7)
    .lineWidth(0.65).fillAndStroke(colors.profile, colors.profileLine);
  drawRows(profileRows, {
    x: heroProfileX + profilePadding,
    y: profileY + profilePadding,
    width: profileWidth,
  });

  const experienceRows = copy.jobs.flatMap((job, jobIndex) => [
    { text: job.company, end: job.period, size: 11, color: colors.accent, bold: true, gap: 2, divider: true },
    { text: job.role, size: 10.7, color: colors.ink, bold: true, gap: 4 },
    ...job.highlights.map((text, highlightIndex) => ({
      text: `•  ${text}`,
      size: 9.7,
      color: colors.body,
      indent: 2,
      gap: highlightIndex === job.highlights.length - 1 && jobIndex < copy.jobs.length - 1 ? 8 : 1,
    })),
  ]);

  const stackRows = copy.groups.flatMap(([label, technologies]) => [
    { text: label, size: 10.5, color: colors.ink, bold: true, gap: 1, divider: true },
    { text: technologies, size: 9.8, color: colors.muted, gap: 7 },
  ]);
  const educationRows = [
    { text: copy.degree, size: 10.8, color: colors.ink, bold: true, gap: 3 },
    { text: educationInstitution, size: 9.8, color: colors.body, gap: 2 },
    { text: copy.graduation, size: 9.5, color: colors.muted },
  ];
  const certificationRows = certifications.map(({ name, year }) => ({
    text: `${name} (${year})`, size: 9.8, color: colors.body, gap: 4,
  }));

  const top = heroHeight + gutter;
  let leftY = card(copy.experience, experienceRows, { x: inset, y: top, width: leftWidth });
  card(copy.stack, stackRows, { x: rightX, y: top, width: rightWidth }, true);
  leftY = card(copy.education, educationRows, { x: inset, y: leftY, width: leftWidth });
  card(copy.certifications, certificationRows, { x: inset, y: leftY, width: leftWidth });

  doc.end();
  return bytes;
}
