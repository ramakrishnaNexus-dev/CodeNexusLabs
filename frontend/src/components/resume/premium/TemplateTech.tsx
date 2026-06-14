// src/components/resume/premium/TemplateTech.tsx
// Tech — Dark header, monospace accents, developer-optimised hierarchy

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateTechProps {
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

export default function TemplateTech({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateTechProps) {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '10pt',
        lineHeight: '1.55',
        color: '#0f172a',
        background: '#ffffff',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* ─── HEADER ─── */}
      {/*
        Negative margins bleed to the preview container's 24px padding.
        TemplateTech is NOT a sidebar template — preview adds padding: 24px.
      */}
      <div
        style={{
          background: '#0f172a',
          color: '#f8fafc',
          padding: '22px 24px 20px',
          marginTop: '-24px',
          marginLeft: '-24px',
          marginRight: '-24px',
          marginBottom: '24px',
          width: 'calc(100% + 48px)',
        }}
      >
        <h1
          style={{
            fontSize: '22pt',
            fontWeight: '800',
            color: '#f8fafc',
            margin: '0 0 3px 0',
            letterSpacing: '-0.5px',
            lineHeight: '1.1',
          }}
        >
          {contactInfo.fullName || 'Your Name'}
        </h1>
        <p
          style={{
            fontSize: '10.5pt',
            fontWeight: '500',
            color: '#38bdf8',
            margin: '0 0 14px 0',
            letterSpacing: '0.2px',
          }}
        >
          {contactInfo.title || 'Software Engineer'}
        </p>

        {/* Contact row — monospace */}
        <div
          style={{
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: '8pt',
            color: '#94a3b8',
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '4px',
            columnGap: '0',
            alignItems: 'center',
          }}
        >
          {contactInfo.email && (
            <span style={{ marginRight: '18px' }}>{contactInfo.email}</span>
          )}
          {contactInfo.phone && (
            <span style={{ marginRight: '18px' }}>{contactInfo.phone}</span>
          )}
          {contactInfo.github && (
            <span style={{ marginRight: '18px', color: '#38bdf8' }}>
              github/{contactInfo.github.split('/').filter(Boolean).pop()}
            </span>
          )}
          {contactInfo.linkedin && (
            <span style={{ marginRight: '18px', color: '#38bdf8' }}>linkedin</span>
          )}
          {contactInfo.website && (
            <span style={{ marginRight: '18px', color: '#38bdf8' }}>
              {contactInfo.website.replace(/https?:\/\//, '')}
            </span>
          )}
          {contactInfo.city && (
            <span style={{ color: '#64748b' }}>{contactInfo.city}{contactInfo.state ? `, ${contactInfo.state}` : ''}</span>
          )}
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Summary */}
        {summary && (
          <section>
            <TechHeading>Summary</TechHeading>
            <p style={{ margin: '8px 0 0 0', color: '#334155', lineHeight: '1.72', fontSize: '9.5pt' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Technical Skills — tag cloud */}
        {skills.length > 0 && (
          <section>
            <TechHeading>Technical Skills</TechHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    fontSize: '8pt',
                    color: '#0f172a',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: '3px 9px',
                    lineHeight: '1.5',
                    fontWeight: '500',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <TechHeading>Experience</TechHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '10px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '14px' : '0',
                    marginBottom: i < experiences.length - 1 ? '14px' : '0',
                    borderBottom: i < experiences.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '10.5pt', color: '#0f172a', display: 'block', lineHeight: '1.3' }}>
                        {exp.jobTitle}
                      </span>
                      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '8pt', color: '#38bdf8', fontWeight: '500' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: '7.5pt',
                        color: '#94a3b8',
                        whiteSpace: 'nowrap',
                        paddingTop: '2px',
                      }}
                    >
                      {exp.startYear}–{exp.isPresent ? 'present' : exp.endYear}
                    </span>
                  </div>
                  <p style={{ margin: '7px 0 0 0', fontSize: '9pt', color: '#475569', lineHeight: '1.65', whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <TechHeading>Projects</TechHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div
                    key={project.id}
                    style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '12px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontWeight: '700', fontSize: '10pt', color: '#0f172a', fontFamily: "'Fira Code', monospace" }}>
                        {project.name}
                      </span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {project.githubLink && (
                          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '7.5pt', color: '#38bdf8', fontWeight: '500' }}>
                            repo →
                          </span>
                        )}
                        {project.liveLink && (
                          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '7.5pt', color: '#38bdf8', fontWeight: '500' }}>
                            live →
                          </span>
                        )}
                      </div>
                    </div>
                    <p style={{ margin: '5px 0 0 0', fontSize: '9pt', color: '#475569', lineHeight: '1.65' }}>
                      {project.description}
                    </p>
                    {project.achievements && (
                      <p style={{ margin: '4px 0 0 0', fontSize: '8.5pt', color: '#334155', fontStyle: 'italic' }}>
                        {project.achievements}
                      </p>
                    )}
                    {tech.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                        {tech.map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontFamily: "'Fira Code', monospace",
                              fontSize: '7.5pt',
                              color: '#64748b',
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
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

        {/* Education — ALL entries */}
        {educations.length > 0 && (
          <section>
            <TechHeading>Education</TechHeading>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {educations.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '10pt', color: '#0f172a', display: 'block', lineHeight: '1.3' }}>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </span>
                    <span style={{ fontSize: '9pt', color: '#64748b', display: 'block' }}>{edu.institution}</span>
                    {edu.cgpa && (
                      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '8.5pt', color: '#94a3b8', display: 'block', marginTop: '1px' }}>
                        GPA: {edu.cgpa}
                      </span>
                    )}
                    {edu.description && (
                      <span style={{ fontSize: '8.5pt', color: '#64748b', display: 'block', marginTop: '2px' }}>
                        {edu.description}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '7.5pt',
                      color: '#94a3b8',
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
      </div>
    </div>
  );
}

function TechHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
      <h2
        style={{
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontSize: '7pt',
          fontWeight: '700',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#94a3b8',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
    </div>
  );
}
