// src/components/resume/premium/TemplateElegant.tsx
// Elegant — Indigo editorial, refined hierarchy, premium feel

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateElegantProps {
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

export default function TemplateElegant({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateElegantProps) {
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
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#1a1a2e',
        background: '#ffffff',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* ─── HEADER ─── */}
      <div style={{ marginBottom: '26px' }}>
        {/* Gradient top bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #4f46e5 0%, #818cf8 100%)', borderRadius: '2px', marginBottom: '20px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h1
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: '26pt',
                fontWeight: '700',
                letterSpacing: '-0.5px',
                color: '#1a1a2e',
                margin: '0 0 4px 0',
                lineHeight: '1.05',
              }}
            >
              {contactInfo.fullName || 'Your Name'}
            </h1>
            {contactInfo.title && (
              <p
                style={{
                  fontSize: '11pt',
                  fontWeight: '600',
                  color: '#4f46e5',
                  margin: '0',
                  letterSpacing: '0.3px',
                }}
              >
                {contactInfo.title}
              </p>
            )}
          </div>

          {/* Contact block — right-aligned */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8pt',
              color: '#6b7280',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              lineHeight: '1.7',
            }}
          >
            {contactItems.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: '#e0e7ff', marginTop: '18px' }} />
      </div>

      {/* ─── BODY ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

        {/* Profile */}
        {summary && (
          <section>
            <ElegantHeading>Profile</ElegantHeading>
            <p style={{ color: '#374151', lineHeight: '1.75', margin: '9px 0 0 0', fontSize: '9.5pt' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <ElegantHeading>Experience</ElegantHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '14px' : '0',
                    borderBottom: i < experiences.length - 1 ? '1px solid #f0f0f8' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '10.5pt', color: '#1a1a2e', display: 'block', lineHeight: '1.25' }}>
                        {exp.jobTitle}
                      </span>
                      <span style={{ color: '#4f46e5', fontSize: '9pt', fontWeight: '500' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>
                    <span style={{ fontSize: '8pt', color: '#94a3b8', whiteSpace: 'nowrap', paddingTop: '2px' }}>
                      {exp.startMonth} {exp.startYear} – {exp.isPresent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p style={{ margin: '7px 0 0 0', color: '#4b5563', fontSize: '9pt', lineHeight: '1.68', whiteSpace: 'pre-wrap' }}>
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
            <ElegantHeading>Education</ElegantHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginTop: '10px' }}>
              {educations.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '10pt', color: '#1a1a2e', display: 'block', lineHeight: '1.3' }}>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '9pt', display: 'block' }}>{edu.institution}</span>
                    {edu.cgpa && (
                      <span style={{ fontSize: '8.5pt', color: '#9ca3af', display: 'block' }}>CGPA: {edu.cgpa}</span>
                    )}
                    {edu.description && (
                      <span style={{ fontSize: '8.5pt', color: '#6b7280', display: 'block', marginTop: '2px' }}>{edu.description}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '8pt', color: '#94a3b8', whiteSpace: 'nowrap', paddingTop: '2px' }}>
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
            <ElegantHeading>Skills</ElegantHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    fontSize: '8pt',
                    color: '#3730a3',
                    background: '#eef2ff',
                    border: '1px solid #c7d2fe',
                    borderRadius: '4px',
                    padding: '3px 10px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <ElegantHeading>Projects</ElegantHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div key={project.id} style={{ paddingLeft: '12px', borderLeft: '2px solid #e0e7ff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontWeight: '700', fontSize: '9.5pt', color: '#1a1a2e' }}>{project.name}</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {project.githubLink && (
                          <span style={{ fontSize: '8pt', color: '#4f46e5', fontWeight: '500' }}>GitHub →</span>
                        )}
                        {project.liveLink && (
                          <span style={{ fontSize: '8pt', color: '#4f46e5', fontWeight: '500' }}>Live →</span>
                        )}
                      </div>
                      
                    </div>
                    <p style={{ margin: '5px 0 0 0', fontSize: '9pt', color: '#4b5563', lineHeight: '1.65' }}>
                      {project.description}
                    </p>
                    {project.achievements && (
                      <p style={{ margin: '4px 0 0 0', fontSize: '8.5pt', color: '#4f46e5', fontStyle: 'italic' }}>
                        {project.achievements}
                      </p>
                    )}
                    {tech.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '7px' }}>
                        {tech.map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '7.5pt',
                              color: '#6b7280',
                              background: '#f8fafc',
                              border: '1px solid #e5e7eb',
                              borderRadius: '3px',
                              padding: '2px 6px',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
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

function ElegantHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
      <h2
        style={{
          fontSize: '7pt',
          fontWeight: '700',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#4f46e5',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: '1px', background: '#e0e7ff' }} />
    </div>
  );
}
