// src/components/resume/premium/TemplateExecutive.tsx
// Executive — Authoritative serif, amber-gold accent, boardroom quality

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateExecutiveProps {
  contactInfo: ContactInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
}

function techArray(t: string[] | string | unknown): string[] {
  if (Array.isArray(t)) return t;
  if (typeof t === 'string' && t.trim()) return t.split(',').map((x) => x.trim()).filter(Boolean);
  return [];
}

export default function TemplateExecutive({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateExecutiveProps) {
  const contactItems = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.city
      ? `${contactInfo.city}${contactInfo.state ? `, ${contactInfo.state}` : ''}`
      : null,
    contactInfo.linkedin
      ? `linkedin.com/in/${contactInfo.linkedin.replace(/.*\/in\//, '').replace(/\/$/, '')}`
      : null,
    contactInfo.github
      ? `github.com/${contactInfo.github.split('/').filter(Boolean).pop()}`
      : null,
    contactInfo.website
      ? contactInfo.website.replace(/https?:\/\//, '')
      : null,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '10pt',
        lineHeight: '1.55',
        color: '#1a1a1a',
        background: '#ffffff',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* ─── HEADER ─── */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '28pt',
            fontWeight: '700',
            color: '#111111',
            margin: '0 0 6px 0',
            letterSpacing: '-0.5px',
            lineHeight: '1.05',
          }}
        >
          {contactInfo.fullName || 'Your Name'}
        </h1>

        {contactInfo.title && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '3px', background: '#b45309', borderRadius: '1px', flexShrink: 0 }} />
            <p
              style={{
                fontFamily: "'Arial', Helvetica, sans-serif",
                fontSize: '10pt',
                fontWeight: '600',
                color: '#b45309',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {contactInfo.title}
            </p>
          </div>
        )}

        {/* Contact row */}
        <div
          style={{
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: '8pt',
            color: '#6b6b6b',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            lineHeight: '1.8',
          }}
        >
          {contactItems.map((item, idx) => (
            <span key={idx}>
              {item}
              {idx < contactItems.length - 1 && (
                <span style={{ margin: '0 10px', color: '#d4a843' }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Double-rule */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ height: '2px', background: '#b45309' }} />
          <div style={{ height: '1px', background: '#e8d5b5', marginTop: '3px' }} />
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Executive Summary */}
        {summary && (
          <section>
            <ExecHeading>Executive Summary</ExecHeading>
            <p
              style={{
                margin: '10px 0 0 0',
                color: '#2d2d2d',
                lineHeight: '1.75',
                fontSize: '9.5pt',
                fontFamily: "'Georgia', serif",
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section>
            <ExecHeading>Professional Experience</ExecHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '11px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '14px' : '0',
                    borderBottom: i < experiences.length - 1 ? '0.5px solid #f0e8d8' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                    <div>
                      <span
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontWeight: '700',
                          fontSize: '11pt',
                          color: '#111111',
                          display: 'block',
                          lineHeight: '1.25',
                        }}
                      >
                        {exp.jobTitle}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Arial', sans-serif",
                          fontSize: '9pt',
                          color: '#7b6b4f',
                          fontStyle: 'italic',
                        }}
                      >
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Arial', sans-serif",
                        fontSize: '8pt',
                        color: '#9ca3af',
                        whiteSpace: 'nowrap',
                        paddingTop: '2px',
                      }}
                    >
                      {exp.startYear} – {exp.isPresent ? 'Present' : exp.endYear}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '7px 0 0 0',
                      fontFamily: "'Arial', Helvetica, sans-serif",
                      fontSize: '9pt',
                      color: '#4b5563',
                      lineHeight: '1.68',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education — ALL entries */}
        {educations.length > 0 && (
          <section>
            <ExecHeading>Education</ExecHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '11px' }}>
              {educations.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontWeight: '700',
                        fontSize: '10.5pt',
                        color: '#111111',
                        display: 'block',
                        lineHeight: '1.3',
                      }}
                    >
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Arial', sans-serif",
                        fontSize: '9pt',
                        color: '#7b6b4f',
                        fontStyle: 'italic',
                      }}
                    >
                      {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                    </span>
                    {edu.cgpa && (
                      <span
                        style={{
                          fontFamily: "'Arial', sans-serif",
                          fontSize: '8.5pt',
                          color: '#9ca3af',
                          display: 'block',
                        }}
                      >
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                    {edu.description && (
                      <span style={{ fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#6b7280', display: 'block', marginTop: '2px' }}>
                        {edu.description}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Arial', sans-serif",
                      fontSize: '8pt',
                      color: '#9ca3af',
                      paddingTop: '2px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {edu.endMonth ? `${edu.endMonth} ` : ''}{edu.endYear}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <ExecHeading>Core Competencies</ExecHeading>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0',
                marginTop: '10px',
                fontFamily: "'Arial', Helvetica, sans-serif",
                fontSize: '9pt',
                color: '#3a3a3a',
                lineHeight: '1.85',
              }}
            >
              {skills.map((s, i) => (
                <span key={s.id}>
                  {s.name}
                  {i < skills.length - 1 && (
                    <span style={{ margin: '0 8px', color: '#b45309' }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Key Achievements / Projects */}
        {projects.length > 0 && (
          <section>
            <ExecHeading>Key Achievements</ExecHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginTop: '11px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div key={project.id} style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#b45309', fontSize: '10pt', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>▸</span>
                    <div>
                      <span style={{ fontFamily: "'Georgia', serif", fontWeight: '700', fontSize: '10.5pt', color: '#111111' }}>
                        {project.name}
                      </span>
                      {project.description && (
                        <p style={{ fontFamily: "'Arial', sans-serif", fontSize: '9pt', color: '#4b5563', margin: '3px 0 0 0', lineHeight: '1.65' }}>
                          {project.description}
                        </p>
                      )}
                      {project.achievements && (
                        <p style={{ fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#b45309', margin: '3px 0 0 0', fontStyle: 'italic' }}>
                          {project.achievements}
                        </p>
                      )}
                      {tech.length > 0 && (
                        <p style={{ fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#9ca3af', margin: '3px 0 0 0', fontStyle: 'italic' }}>
                          {tech.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ExecHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2
          style={{
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: '7.5pt',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#b45309',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </h2>
        <div style={{ flex: 1, height: '0.5px', background: '#e8d5b5' }} />
      </div>
    </div>
  );
}
