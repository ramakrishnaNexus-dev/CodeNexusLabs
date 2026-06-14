// src/components/resume/premium/TemplateClassic.tsx
// Classic — Traditional serif, authoritative hierarchy, ATS-optimised

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateClassicProps {
  contactInfo: ContactInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
}

/** Safely render technologies whether stored as string[] or legacy string */
function techString(t: string[] | string | unknown): string {
  if (Array.isArray(t)) return t.join(' · ');
  if (typeof t === 'string') return t;
  return '';
}

function techArray(t: string[] | string | unknown): string[] {
  if (Array.isArray(t)) return t;
  if (typeof t === 'string' && t.trim()) return t.split(',').map((x) => x.trim()).filter(Boolean);
  return [];
}

export default function TemplateClassic({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateClassicProps) {
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
        lineHeight: '1.6',
        color: '#1c1c1c',
        background: '#ffffff',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* ─── HEADER ─── */}
      <div style={{ textAlign: 'center', paddingBottom: '18px', marginBottom: '20px' }}>
        <h1
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '26pt',
            fontWeight: '700',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: '0 0 5px 0',
            color: '#0f0f0f',
            lineHeight: '1.05',
          }}
        >
          {contactInfo.fullName || 'Your Name'}
        </h1>

        {contactInfo.title && (
          <p
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: 'italic',
              fontSize: '11.5pt',
              color: '#555555',
              margin: '0 0 14px 0',
              letterSpacing: '0.5px',
              fontWeight: '400',
            }}
          >
            {contactInfo.title}
          </p>
        )}

        {/* Ornamental rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ width: '60px', height: '1px', background: '#1c1c1c' }} />
          <div style={{ width: '5px', height: '5px', background: '#1c1c1c', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ width: '60px', height: '1px', background: '#1c1c1c' }} />
        </div>

        {/* Contact row */}
        <div
          style={{
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: '8pt',
            color: '#4a4a4a',
            letterSpacing: '0.3px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            lineHeight: '1.8',
          }}
        >
          {contactItems.map((item, idx) => (
            <span key={idx}>
              {item}
              {idx < contactItems.length - 1 && (
                <span style={{ margin: '0 9px', color: '#cccccc' }}>|</span>
              )}
            </span>
          ))}
        </div>

        <div style={{ height: '2px', background: '#1c1c1c', marginTop: '16px' }} />
      </div>

      {/* ─── BODY ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* Professional Summary */}
        {summary && (
          <section>
            <ClassicHeading>Professional Summary</ClassicHeading>
            <p
              style={{
                margin: '9px 0 0 0',
                color: '#2d2d2d',
                lineHeight: '1.72',
                fontSize: '9.5pt',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section>
            <ClassicHeading>Professional Experience</ClassicHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '9px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '12px' : '0',
                    borderBottom: i < experiences.length - 1 ? '0.5px solid #ebebeb' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontWeight: '700',
                        fontSize: '10.5pt',
                        color: '#0f0f0f',
                      }}
                    >
                      {exp.jobTitle}
                    </span>
                    <span style={{ fontFamily: "'Arial', sans-serif", fontSize: '8pt', color: '#888888' }}>
                      {exp.startMonth} {exp.startYear} – {exp.isPresent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '2px 0 7px 0',
                      fontStyle: 'italic',
                      fontSize: '9.5pt',
                      color: '#555555',
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Arial', Helvetica, sans-serif",
                      fontSize: '9pt',
                      color: '#333333',
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

        {/* Education */}
        {educations.length > 0 && (
          <section>
            <ClassicHeading>Education</ClassicHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '9px' }}>
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontWeight: '700',
                        fontSize: '10pt',
                        color: '#0f0f0f',
                      }}
                    >
                      {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    </span>
                    <span style={{ fontFamily: "'Arial', sans-serif", fontSize: '8pt', color: '#888888' }}>
                      {edu.endMonth ? `${edu.endMonth} ` : ''}{edu.endYear}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0 0', fontStyle: 'italic', fontSize: '9.5pt', color: '#555555', fontFamily: "'Georgia', serif" }}>
                    {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                  </p>
                  {edu.cgpa && (
                    <p style={{ margin: '2px 0 0 0', fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#777777' }}>
                      CGPA: {edu.cgpa}
                    </p>
                  )}
                  {edu.description && (
                    <p style={{ margin: '3px 0 0 0', fontFamily: "'Arial', sans-serif", fontSize: '9pt', color: '#444444', lineHeight: '1.6' }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <ClassicHeading>Skills</ClassicHeading>
            <p
              style={{
                margin: '9px 0 0 0',
                fontFamily: "'Arial', Helvetica, sans-serif",
                fontSize: '9.5pt',
                color: '#333333',
                lineHeight: '1.85',
                letterSpacing: '0.05px',
              }}
            >
              {skills.map((s) => s.name).join('   ·   ')}
            </p>
          </section>
        )}

        {/* Selected Projects */}
        {projects.length > 0 && (
          <section>
            <ClassicHeading>Selected Projects</ClassicHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '9px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div key={project.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                      <span
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontWeight: '700',
                          fontSize: '10pt',
                          color: '#0f0f0f',
                        }}
                      >
                        {project.name}
                      </span>
                      <div style={{ fontFamily: "'Arial', sans-serif", display: 'flex', gap: '14px', fontSize: '8pt', color: '#666666' }}>
                        {project.githubLink && <span>GitHub</span>}
                        {project.liveLink && <span>Live Demo</span>}
                      </div>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontFamily: "'Arial', sans-serif", fontSize: '9pt', color: '#444444', lineHeight: '1.65' }}>
                      {project.description}
                    </p>
                    {project.achievements && (
                      <p style={{ margin: '3px 0 0 0', fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#555555', fontStyle: 'italic' }}>
                        {project.achievements}
                      </p>
                    )}
                    {tech.length > 0 && (
                      <p style={{ margin: '4px 0 0 0', fontFamily: "'Arial', sans-serif", fontSize: '8.5pt', color: '#888888', fontStyle: 'italic' }}>
                        {tech.join(', ')}
                      </p>
                    )}
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

function ClassicHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '0' }}>
      <h2
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '8pt',
          fontWeight: '700',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: '#1c1c1c',
          margin: '0 0 5px 0',
        }}
      >
        {children}
      </h2>
      <div style={{ height: '1.5px', background: '#1c1c1c' }} />
    </div>
  );
}
