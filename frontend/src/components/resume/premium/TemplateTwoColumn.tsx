// src/components/resume/premium/TemplateTwoColumn.tsx
// Two-Column — Structured sidebar identity, main column for depth

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateTwoColumnProps {
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

export default function TemplateTwoColumn({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateTwoColumnProps) {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#1e1e2e',
        background: '#ffffff',
        maxWidth: '100%',
        overflowX: 'hidden',
        display: 'flex',
        minHeight: '100%',
      }}
    >
      {/* ─── LEFT SIDEBAR ─── */}
      <div
        style={{
          width: '205px',
          flexShrink: 0,
          background: '#1e2d3d',
          color: '#e8edf2',
          padding: '28px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        {/* Name + Title */}
        <div>
          <h1
            style={{
              fontSize: '15pt',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 4px 0',
              lineHeight: '1.15',
              letterSpacing: '-0.2px',
            }}
          >
            {contactInfo.fullName || 'Your Name'}
          </h1>
          {contactInfo.title && (
            <p
              style={{
                fontSize: '7.5pt',
                fontWeight: '500',
                color: '#7eb8d4',
                margin: '0',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
              }}
            >
              {contactInfo.title}
            </p>
          )}
          <div style={{ width: '28px', height: '2px', background: '#7eb8d4', marginTop: '10px', borderRadius: '1px' }} />
        </div>

        {/* Contact */}
        <div>
          <SidebarHeading>Contact</SidebarHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '9px' }}>
            {contactInfo.email && (
              <SidebarContactRow icon="@" value={contactInfo.email} />
            )}
            {contactInfo.phone && (
              <SidebarContactRow icon="✆" value={contactInfo.phone} />
            )}
            {(contactInfo.city || contactInfo.state) && (
              <SidebarContactRow icon="◎" value={`${contactInfo.city || ''}${contactInfo.state ? `, ${contactInfo.state}` : ''}`} />
            )}
            {contactInfo.linkedin && (
              <SidebarContactRow icon="in" value={contactInfo.linkedin.replace(/.*\/in\//, '').replace(/\/$/, '') || 'LinkedIn'} />
            )}
            {contactInfo.github && (
              <SidebarContactRow icon="gh" value={contactInfo.github.split('/').filter(Boolean).pop() || 'GitHub'} />
            )}
            {contactInfo.website && (
              <SidebarContactRow icon="↗" value={contactInfo.website.replace(/https?:\/\//, '')} />
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SidebarHeading>Skills</SidebarHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '9px' }}>
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  style={{
                    fontSize: '7.5pt',
                    color: '#c5d5e0',
                    background: 'rgba(126,184,212,0.12)',
                    border: '1px solid rgba(126,184,212,0.25)',
                    borderRadius: '3px',
                    padding: '2px 7px',
                    lineHeight: '1.6',
                    fontWeight: '500',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education — ALL entries */}
        {educations.length > 0 && (
          <div>
            <SidebarHeading>Education</SidebarHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '9px' }}>
              {educations.map((edu) => (
                <div key={edu.id}>
                  <p style={{ margin: '0 0 1px 0', fontSize: '8.5pt', fontWeight: '700', color: '#eaf0f5', lineHeight: '1.3' }}>
                    {edu.degree}
                  </p>
                  {edu.fieldOfStudy && (
                    <p style={{ margin: '0 0 1px 0', fontSize: '8pt', color: '#94b8cc', lineHeight: '1.3' }}>
                      {edu.fieldOfStudy}
                    </p>
                  )}
                  <p style={{ margin: '0 0 2px 0', fontSize: '8pt', color: '#7eb8d4', lineHeight: '1.3' }}>
                    {edu.institution}
                  </p>
                  <p style={{ margin: 0, fontSize: '7.5pt', color: '#64899b' }}>
                    {edu.endMonth ? `${edu.endMonth} ` : ''}{edu.endYear}
                  </p>
                  {edu.cgpa && (
                    <p style={{ margin: '2px 0 0 0', fontSize: '7.5pt', color: '#64899b' }}>CGPA: {edu.cgpa}</p>
                  )}
                  {edu.description && (
                    <p style={{ margin: '3px 0 0 0', fontSize: '7.5pt', color: '#7eb8d4', lineHeight: '1.4' }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT MAIN ─── */}
      <div
        style={{
          flex: 1,
          padding: '28px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          overflowX: 'hidden',
        }}
      >
        {/* Summary */}
        {summary && (
          <section>
            <MainHeading>Profile</MainHeading>
            <p style={{ margin: '9px 0 0 0', color: '#374151', lineHeight: '1.75', fontSize: '9.5pt' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <MainHeading>Experience</MainHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '13px' : '0',
                    borderBottom: i < experiences.length - 1 ? '1px solid #f0f4f8' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '10.5pt', color: '#1e2d3d', display: 'block', lineHeight: '1.25' }}>
                        {exp.jobTitle}
                      </span>
                      <span style={{ fontSize: '9pt', color: '#3b7ea1', fontWeight: '600' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>
                    <span style={{ fontSize: '8pt', color: '#94a3b8', whiteSpace: 'nowrap', paddingTop: '2px' }}>
                      {exp.startMonth} {exp.startYear} – {exp.isPresent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p style={{ margin: '7px 0 0 0', fontSize: '9pt', color: '#4b5563', lineHeight: '1.68', whiteSpace: 'pre-wrap' }}>
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
            <MainHeading>Projects</MainHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div key={project.id} style={{ paddingLeft: '12px', borderLeft: '2px solid #dbe9f4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontWeight: '700', fontSize: '9.5pt', color: '#1e2d3d' }}>{project.name}</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {project.githubLink && (
                          <span style={{ fontSize: '7.5pt', color: '#3b7ea1', fontWeight: '500' }}>GitHub →</span>
                        )}
                        {project.liveLink && (
                          <span style={{ fontSize: '7.5pt', color: '#3b7ea1', fontWeight: '500' }}>Live →</span>
                        )}
                      </div>
                    </div>
                    <p style={{ margin: '5px 0 0 0', fontSize: '9pt', color: '#4b5563', lineHeight: '1.65' }}>
                      {project.description}
                    </p>
                    {project.achievements && (
                      <p style={{ margin: '4px 0 0 0', fontSize: '8.5pt', color: '#374151', fontStyle: 'italic' }}>
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
                              color: '#1e2d3d',
                              background: '#eaf2f8',
                              border: '1px solid #c8dcea',
                              borderRadius: '3px',
                              padding: '2px 7px',
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

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '6.5pt',
        fontWeight: '700',
        letterSpacing: '1.8px',
        textTransform: 'uppercase',
        color: '#7eb8d4',
        margin: '0',
        paddingBottom: '6px',
        borderBottom: '1px solid rgba(126,184,212,0.2)',
      }}
    >
      {children}
    </h3>
  );
}

function SidebarContactRow({ icon, value }: { icon: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
      <span style={{ color: '#7eb8d4', fontSize: '8pt', marginTop: '1px', flexShrink: 0, minWidth: '12px' }}>{icon}</span>
      <span style={{ fontSize: '8pt', color: '#c5d5e0', wordBreak: 'break-all', lineHeight: '1.4' }}>{value}</span>
    </div>
  );
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0' }}>
      <h2
        style={{
          fontSize: '7pt',
          fontWeight: '700',
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          color: '#3b7ea1',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: '1px', background: '#dbe9f4' }} />
    </div>
  );
}
