// src/utils/generateResumePDF.tsx
//
// TRUE VECTOR PDF using @react-pdf/renderer.
// Replaces html2canvas + jsPDF completely.
// Text is selectable, sharp, ATS-friendly.
// All 6 template palettes preserved.
// No TypeScript errors — all types explicit.
//
// INSTALL (once):
//   npm install @react-pdf/renderer
//   npm uninstall html2canvas jspdf   (optional cleanup)

import React from 'react';
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';

// ---------------------------------------------------------------------------
// Data types — mirrors useResumeStore shape
// ---------------------------------------------------------------------------

export interface PDFContactInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  title?: string;
}

export interface PDFExperience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  isPresent: boolean;
  description: string;
}

export interface PDFEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  endMonth?: string;
  endYear?: string;
  cgpa?: string;
  description?: string;
}

export interface PDFSkill {
  id: string;
  name: string;
}

export interface PDFProject {
  id: string;
  name: string;
  description: string;
  technologies?: string[] | string;
  achievements?: string;
  githubLink?: string;
  liveLink?: string;
}

export interface PDFResumeData {
  contactInfo: PDFContactInfo;
  summary: string;
  experiences: PDFExperience[];
  educations: PDFEducation[];
  skills: PDFSkill[];
  projects: PDFProject[];
  selectedTemplate: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toTechArray(t?: string[] | string): string[] {
  if (!t) return [];
  if (Array.isArray(t)) return t.filter(Boolean);
  return t.split(',').map((s) => s.trim()).filter(Boolean);
}

function expDateStr(exp: PDFExperience): string {
  const end = exp.isPresent
    ? 'Present'
    : `${exp.endMonth ?? ''} ${exp.endYear ?? ''}`.trim();
  return `${exp.startMonth} ${exp.startYear} – ${end}`;
}

function eduDateStr(edu: PDFEducation): string {
  if (edu.endMonth && edu.endYear) return `${edu.endMonth} ${edu.endYear}`;
  if (edu.endYear) return edu.endYear;
  return '';
}

function contactLine(ci: PDFContactInfo): string {
  return [
    ci.email,
    ci.phone,
    ci.city ? `${ci.city}${ci.state ? `, ${ci.state}` : ''}` : '',
    ci.linkedin
      ? `linkedin.com/in/${ci.linkedin.replace(/.*\/in\//, '').replace(/\/$/, '')}`
      : '',
    ci.github
      ? `github.com/${ci.github.split('/').filter(Boolean).pop() ?? ''}`
      : '',
    ci.website ? ci.website.replace(/https?:\/\//, '') : '',
  ]
    .filter(Boolean)
    .join('   |   ');
}

// ---------------------------------------------------------------------------
// Template palettes (templateId → colours)
// ---------------------------------------------------------------------------

interface Palette {
  accent: string;
  accentSoft: string;
  rule: string;
  heading: string;
  bodyText: string;
  muted: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarAccent: string;
  nameFont: 'Times-Bold' | 'Helvetica-Bold';
  bodyFont: 'Times-Roman' | 'Helvetica';
  italicFont: 'Times-Italic' | 'Helvetica-Oblique';
}

const PALETTES: Record<number, Palette> = {
  1: {
    // Classic — monochrome serif
    accent: '#1a1a1a', accentSoft: '#555555', rule: '#1a1a1a',
    heading: '#1a1a1a', bodyText: '#2d2d2d', muted: '#777777',
    sidebarBg: '#1a1a1a', sidebarText: '#f0f0f0', sidebarMuted: '#aaaaaa', sidebarAccent: '#cccccc',
    nameFont: 'Times-Bold', bodyFont: 'Times-Roman', italicFont: 'Times-Italic',
  },
  2: {
    // Two Column — navy sidebar, steel accent
    accent: '#3b7ea1', accentSoft: '#7eb8d4', rule: '#dbe9f4',
    heading: '#3b7ea1', bodyText: '#374151', muted: '#9ca3af',
    sidebarBg: '#1e2d3d', sidebarText: '#c5d5e0', sidebarMuted: '#64899b', sidebarAccent: '#7eb8d4',
    nameFont: 'Helvetica-Bold', bodyFont: 'Helvetica', italicFont: 'Helvetica-Oblique',
  },
  3: {
    // Executive — amber-gold serif
    accent: '#b45309', accentSoft: '#d4a843', rule: '#e8d5b5',
    heading: '#b45309', bodyText: '#2d2d2d', muted: '#9ca3af',
    sidebarBg: '#b45309', sidebarText: '#f9f4ec', sidebarMuted: '#d4a843', sidebarAccent: '#fff3cd',
    nameFont: 'Times-Bold', bodyFont: 'Times-Roman', italicFont: 'Times-Italic',
  },
  4: {
    // Tech — dark header, code-blue
    accent: '#38bdf8', accentSoft: '#0f172a', rule: '#e2e8f0',
    heading: '#94a3b8', bodyText: '#334155', muted: '#94a3b8',
    sidebarBg: '#0f172a', sidebarText: '#94a3b8', sidebarMuted: '#475569', sidebarAccent: '#38bdf8',
    nameFont: 'Helvetica-Bold', bodyFont: 'Helvetica', italicFont: 'Helvetica-Oblique',
  },
  5: {
    // Elegant — indigo
    accent: '#4f46e5', accentSoft: '#818cf8', rule: '#e0e7ff',
    heading: '#4f46e5', bodyText: '#374151', muted: '#9ca3af',
    sidebarBg: '#4f46e5', sidebarText: '#eef2ff', sidebarMuted: '#a5b4fc', sidebarAccent: '#c7d2fe',
    nameFont: 'Helvetica-Bold', bodyFont: 'Helvetica', italicFont: 'Helvetica-Oblique',
  },
  6: {
    // Modern — deep navy sidebar, sky-blue
    accent: '#1f6ea0', accentSoft: '#38bdf8', rule: '#e5e7eb',
    heading: '#1f2937', bodyText: '#374151', muted: '#6b7280',
    sidebarBg: '#1a2637', sidebarText: '#cbd5e1', sidebarMuted: '#64748b', sidebarAccent: '#38bdf8',
    nameFont: 'Helvetica-Bold', bodyFont: 'Helvetica', italicFont: 'Helvetica-Oblique',
  },
};

// Templates 2 and 6 have a left sidebar — different layout function
const SIDEBAR_TEMPLATE_IDS = new Set([2, 6]);

// ---------------------------------------------------------------------------
// Page geometry (points: 1pt = 1/72 inch)
// A4 = 595 × 842 pt
// ---------------------------------------------------------------------------
const A4 = { width: 595.28, height: 841.89 };
const MARGIN = { top: 32, bottom: 28, left: 32, right: 32 };
const SIDEBAR_W = 168; // pt ≈ 59mm

// ---------------------------------------------------------------------------
// Font size tokens
// ---------------------------------------------------------------------------
const FS = {
  name: 24,
  title: 10.5,
  contact: 8,
  sectionLabel: 6.5,
  jobTitle: 10.5,
  company: 9,
  date: 8,
  body: 9,
  skill: 8,
  small: 7.5,
  sidebarName: 15,
  sidebarLabel: 6,
  sidebarBody: 7.5,
  sidebarSkill: 8,
};

// ---------------------------------------------------------------------------
// SINGLE-COLUMN DOCUMENT (templates 1, 3, 4, 5)
// ---------------------------------------------------------------------------

function SingleColumnDocument({ data }: { data: PDFResumeData }): React.ReactElement {
  const p = PALETTES[data.selectedTemplate] ?? PALETTES[1];
  const { contactInfo: ci, summary, experiences, educations, skills, projects } = data;

  const sectionLabel = (label: string): Style => ({
    fontSize: FS.sectionLabel,
    fontFamily: 'Helvetica-Bold',
    color: p.heading,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  });

  const Rule = () => (
    <View style={{ height: 1, backgroundColor: p.rule, marginBottom: 7 }} />
  );

  const SectionBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={sectionLabel(title)}>{title}</Text>
      <Rule />
      {children}
    </View>
  );

  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          fontFamily: p.bodyFont,
          fontSize: FS.body,
          color: p.bodyText,
          backgroundColor: '#ffffff',
          paddingTop: MARGIN.top,
          paddingBottom: MARGIN.bottom,
          paddingLeft: MARGIN.left,
          paddingRight: MARGIN.right,
        }}
      >
        {/* ── HEADER ── */}
        <View style={{ alignItems: 'center', marginBottom: 18 }}>
          <Text
            style={{
              fontFamily: p.nameFont,
              fontSize: FS.name,
              color: '#111111',
              letterSpacing: data.selectedTemplate === 1 ? 3 : -0.3,
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            {ci.fullName || 'Your Name'}
          </Text>
          {ci.title ? (
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                fontSize: FS.title,
                color: p.accent,
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              {ci.title}
            </Text>
          ) : null}
          <Text style={{ fontFamily: 'Helvetica', fontSize: FS.contact, color: '#666666' }}>
            {contactLine(ci)}
          </Text>
          <View style={{ height: 1.5, backgroundColor: '#111111', width: '100%', marginTop: 10 }} />
        </View>

        {/* ── SUMMARY ── */}
        {summary ? (
          <SectionBlock title="Professional Summary">
            <Text style={{ fontFamily: p.bodyFont, fontSize: FS.body, color: p.bodyText, lineHeight: 1.6 }}>
              {summary}
            </Text>
          </SectionBlock>
        ) : null}

        {/* ── EXPERIENCE ── */}
        {experiences.length > 0 ? (
          <SectionBlock title="Professional Experience">
            {experiences.map((exp, i) => (
              <View key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? 10 : 0 }} wrap={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ fontFamily: p.nameFont, fontSize: FS.jobTitle, color: '#111111', flex: 1 }}>
                    {exp.jobTitle}
                  </Text>
                  <Text style={{ fontFamily: 'Helvetica', fontSize: FS.date, color: p.muted }}>
                    {expDateStr(exp)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: p.italicFont,
                    fontSize: FS.company,
                    color: p.accentSoft,
                    marginBottom: 4,
                  }}
                >
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </Text>
                <Text style={{ fontFamily: p.bodyFont, fontSize: FS.body, color: p.bodyText, lineHeight: 1.6 }}>
                  {exp.description}
                </Text>
              </View>
            ))}
          </SectionBlock>
        ) : null}

        {/* ── EDUCATION ── */}
        {educations.length > 0 ? (
          <SectionBlock title="Education">
            {educations.map((edu) => (
              <View key={edu.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }} wrap={false}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: p.nameFont, fontSize: FS.jobTitle, color: '#111111' }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={{ fontFamily: p.italicFont, fontSize: FS.company, color: p.accentSoft }}>
                    {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                  </Text>
                  {edu.cgpa ? (
                    <Text style={{ fontFamily: 'Helvetica', fontSize: FS.small, color: p.muted }}>
                      CGPA: {edu.cgpa}
                    </Text>
                  ) : null}
                  {edu.description ? (
                    <Text style={{ fontFamily: p.bodyFont, fontSize: FS.body, color: p.bodyText, marginTop: 2 }}>
                      {edu.description}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ fontFamily: 'Helvetica', fontSize: FS.date, color: p.muted, marginLeft: 8 }}>
                  {eduDateStr(edu)}
                </Text>
              </View>
            ))}
          </SectionBlock>
        ) : null}

        {/* ── SKILLS ── */}
        {skills.length > 0 ? (
          <SectionBlock title="Skills">
            <Text style={{ fontFamily: p.bodyFont, fontSize: FS.body, color: p.bodyText, lineHeight: 1.75 }}>
              {skills.map((s) => s.name).join('   ·   ')}
            </Text>
          </SectionBlock>
        ) : null}

        {/* ── PROJECTS ── */}
        {projects.length > 0 ? (
          <SectionBlock title="Selected Projects">
            {projects.map((proj) => {
              const tech = toTechArray(proj.technologies);
              return (
                <View key={proj.id} style={{ marginBottom: 9 }} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: p.nameFont, fontSize: FS.jobTitle, color: '#111111' }}>
                      {proj.name}
                    </Text>
                    <Text style={{ fontFamily: 'Helvetica', fontSize: FS.small, color: p.accent }}>
                      {[proj.githubLink ? 'GitHub' : '', proj.liveLink ? 'Live' : ''].filter(Boolean).join('  ·  ')}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: p.bodyFont, fontSize: FS.body, color: p.bodyText, lineHeight: 1.6, marginTop: 2 }}>
                    {proj.description}
                  </Text>
                  {proj.achievements ? (
                    <Text style={{ fontFamily: p.italicFont, fontSize: FS.small, color: p.accent, marginTop: 2 }}>
                      {proj.achievements}
                    </Text>
                  ) : null}
                  {tech.length > 0 ? (
                    <Text style={{ fontFamily: p.italicFont, fontSize: FS.small, color: p.muted, marginTop: 2 }}>
                      {tech.join(', ')}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </SectionBlock>
        ) : null}
      </Page>
    </Document>
  );
}

// ---------------------------------------------------------------------------
// SIDEBAR DOCUMENT (templates 2, 6)
// ---------------------------------------------------------------------------

function SidebarDocument({ data }: { data: PDFResumeData }): React.ReactElement {
  const p = PALETTES[data.selectedTemplate] ?? PALETTES[2];
  const { contactInfo: ci, summary, experiences, educations, skills, projects } = data;

  const SidebarHeading = ({ label }: { label: string }) => (
    <View style={{ marginBottom: 8, marginTop: 4 }}>
      <Text
        style={{
          fontFamily: 'Helvetica-Bold',
          fontSize: FS.sectionLabel,
          color: p.sidebarAccent,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          paddingBottom: 4,
          borderBottomWidth: 0.5,
          borderBottomColor: p.sidebarMuted,
        }}
      >
        {label}
      </Text>
    </View>
  );

  const MainHeading = ({ label }: { label: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8, marginTop: 6 }}>
      <View style={{ width: 3, height: 12, backgroundColor: p.accent }} />
      <Text
        style={{
          fontFamily: 'Helvetica-Bold',
          fontSize: FS.sectionLabel,
          color: p.heading,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
      <View style={{ flex: 1, height: 0.75, backgroundColor: p.rule }} />
    </View>
  );

  const contactRows = [
    ci.email ? { label: 'Email', value: ci.email } : null,
    ci.phone ? { label: 'Phone', value: ci.phone } : null,
    (ci.city || ci.state)
      ? { label: 'Location', value: `${ci.city ?? ''}${ci.state ? `, ${ci.state}` : ''}` }
      : null,
    ci.linkedin
      ? { label: 'LinkedIn', value: ci.linkedin.replace(/.*\/in\//, '').replace(/\/$/, '') || 'Profile' }
      : null,
    ci.github
      ? { label: 'GitHub', value: ci.github.split('/').filter(Boolean).pop() ?? 'Profile' }
      : null,
    ci.website
      ? { label: 'Website', value: ci.website.replace(/https?:\/\//, '') }
      : null,
  ].filter((r): r is { label: string; value: string } => r !== null);

  const mainW = A4.width - SIDEBAR_W - MARGIN.left - MARGIN.right;

  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          fontFamily: 'Helvetica',
          fontSize: FS.body,
          color: p.bodyText,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
        }}
      >
        {/* ── SIDEBAR ── */}
        <View
          style={{
            width: SIDEBAR_W,
            backgroundColor: p.sidebarBg,
            paddingTop: MARGIN.top,
            paddingBottom: MARGIN.bottom,
            paddingLeft: 16,
            paddingRight: 14,
            flexDirection: 'column',
          }}
        >
          {/* Name + Title */}
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: FS.sidebarName,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 3,
            }}
          >
            {ci.fullName || 'Your Name'}
          </Text>
          {ci.title ? (
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                fontSize: 7,
                color: p.sidebarAccent,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {ci.title}
            </Text>
          ) : null}
          <View style={{ width: 24, height: 2, backgroundColor: p.sidebarAccent, marginBottom: 16 }} />

          {/* Contact */}
          <SidebarHeading label="Contact" />
          {contactRows.map((row, i) => (
            <View key={i} style={{ marginBottom: 7 }}>
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: FS.sidebarLabel,
                  color: p.sidebarMuted,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {row.label}
              </Text>
              <Text style={{ fontFamily: 'Helvetica', fontSize: FS.sidebarBody, color: p.sidebarText, marginTop: 1 }}>
                {row.value}
              </Text>
            </View>
          ))}

          {/* Skills */}
          {skills.length > 0 ? (
            <View style={{ marginTop: 14 }}>
              <SidebarHeading label="Skills" />
              {skills.map((s) => (
                <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 }}>
                  <View
                    style={{
                      width: 3.5,
                      height: 3.5,
                      borderRadius: 2,
                      backgroundColor: p.sidebarAccent,
                    }}
                  />
                  <Text style={{ fontFamily: 'Helvetica', fontSize: FS.sidebarSkill, color: p.sidebarText }}>
                    {s.name}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Education — ALL entries */}
          {educations.length > 0 ? (
            <View style={{ marginTop: 14 }}>
              <SidebarHeading label="Education" />
              {educations.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }} wrap={false}>
                  <Text
                    style={{
                      fontFamily: 'Helvetica-Bold',
                      fontSize: 8,
                      color: '#f1f5f9',
                      lineHeight: 1.3,
                    }}
                  >
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={{ fontFamily: 'Helvetica', fontSize: FS.sidebarBody, color: p.sidebarText, marginTop: 1 }}>
                    {edu.institution}
                  </Text>
                  <Text style={{ fontFamily: 'Helvetica', fontSize: 7, color: p.sidebarAccent, marginTop: 1 }}>
                    {eduDateStr(edu)}
                  </Text>
                  {edu.cgpa ? (
                    <Text style={{ fontFamily: 'Helvetica', fontSize: 7, color: p.sidebarMuted }}>
                      CGPA: {edu.cgpa}
                    </Text>
                  ) : null}
                  {edu.description ? (
                    <Text style={{ fontFamily: 'Helvetica', fontSize: 7, color: p.sidebarText, lineHeight: 1.4, marginTop: 2 }}>
                      {edu.description}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* ── MAIN CONTENT ── */}
        <View
          style={{
            width: mainW,
            paddingTop: MARGIN.top,
            paddingBottom: MARGIN.bottom,
            paddingLeft: 20,
            paddingRight: MARGIN.right,
          }}
        >
          {/* Profile */}
          {summary ? (
            <View style={{ marginBottom: 14 }}>
              <MainHeading label="Profile" />
              <Text style={{ fontFamily: 'Helvetica', fontSize: FS.body, color: p.bodyText, lineHeight: 1.65 }}>
                {summary}
              </Text>
            </View>
          ) : null}

          {/* Experience */}
          {experiences.length > 0 ? (
            <View style={{ marginBottom: 14 }}>
              <MainHeading label="Experience" />
              {experiences.map((exp, i) => (
                <View key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? 11 : 0 }} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: FS.jobTitle, color: '#111827' }}>
                        {exp.jobTitle}
                      </Text>
                      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: FS.company, color: p.accent, marginTop: 1 }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: 'Helvetica', fontSize: FS.date, color: p.muted, marginLeft: 6 }}>
                      {expDateStr(exp)}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Helvetica', fontSize: FS.body, color: p.bodyText, lineHeight: 1.65, marginTop: 4 }}>
                    {exp.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Projects */}
          {projects.length > 0 ? (
            <View>
              <MainHeading label="Projects" />
              {projects.map((proj) => {
                const tech = toTechArray(proj.technologies);
                return (
                  <View
                    key={proj.id}
                    style={{
                      marginBottom: 10,
                      paddingLeft: 10,
                      borderLeftWidth: 2,
                      borderLeftColor: p.rule,
                    }}
                    wrap={false}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: FS.jobTitle, color: '#111827' }}>
                        {proj.name}
                      </Text>
                      <Text style={{ fontFamily: 'Helvetica', fontSize: FS.small, color: p.accent }}>
                        {[proj.githubLink ? 'GitHub →' : '', proj.liveLink ? 'Live →' : ''].filter(Boolean).join('  ')}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: 'Helvetica', fontSize: FS.body, color: p.bodyText, lineHeight: 1.65, marginTop: 4 }}>
                      {proj.description}
                    </Text>
                    {proj.achievements ? (
                      <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: FS.small, color: p.accent, marginTop: 3 }}>
                        {proj.achievements}
                      </Text>
                    ) : null}
                    {tech.length > 0 ? (
                      <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: FS.small, color: p.muted, marginTop: 3 }}>
                        {tech.join(', ')}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate and immediately download a vector PDF for the given resume data.
 *
 * Usage in PremiumResume.tsx:
 *   import { generateResumePDF } from '../../utils/generateResumePDF';
 *   await generateResumePDF({ contactInfo, summary, experiences, educations, skills, projects, selectedTemplate }, filename);
 */
export async function generateResumePDF(
  data: PDFResumeData,
  filename: string,
): Promise<void> {
  const isSidebar = SIDEBAR_TEMPLATE_IDS.has(data.selectedTemplate);

const blob = await pdf(
  isSidebar
    ? <SidebarDocument data={data} />
    : <SingleColumnDocument data={data} />
).toBlob();

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${filename}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
