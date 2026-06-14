// src/components/resume/premium/TemplateModern.tsx
// Modern — Deep navy sidebar, sky-blue accents, clean right column

import type { ContactInfo, Experience, Education, Skill, Project } from '../../../hooks/useResumeStore';

interface TemplateModernProps {
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

export default function TemplateModern({
  contactInfo,
  summary,
  experiences,
  educations,
  skills,
  projects,
}: TemplateModernProps) {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#1f2937',
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
          width: '215px',
          flexShrink: 0,
          background: '#1a2637',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Name block */}
        <div style={{ background: '#131e2b', padding: '30px 20px 24px' }}>
          <div style={{ width: '30px', height: '3px', background: '#38bdf8', borderRadius: '2px', marginBottom: '14px' }} />
          <h1
            style={{
              fontSize: '17pt',
              fontWeight: '800',
              color: '#f9fafb',
              margin: '0 0 5px 0',
              lineHeight: '1.1',
              letterSpacing: '-0.3px',
            }}
          >
            {contactInfo.fullName || 'Your Name'}
          </h1>
          <p
            style={{
              fontSize: '7.5pt',
              fontWeight: '600',
              color: '#38bdf8',
              margin: '0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {contactInfo.title || 'Professional'}
          </p>
        </div>

        {/* Sidebar sections */}
        <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>

          {/* Contact */}
          <div>
            <ModernSidebarHeading>Contact</ModernSidebarHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '11px' }}>
              {contactInfo.email && (
                <ModernContactRow label="Email">
                  <span style={{ wordBreak: 'break-all', lineHeight: '1.4' }}>{contactInfo.email}</span>
                </ModernContactRow>
              )}
              {contactInfo.phone && (
                <ModernContactRow label="Phone"><span>{contactInfo.phone}</span></ModernContactRow>
              )}
              {(contactInfo.city || contactInfo.state) && (
                <ModernContactRow label="Location">
                  <span>{contactInfo.city}{contactInfo.state ? `, ${contactInfo.state}` : ''}</span>
                </ModernContactRow>
              )}
              {contactInfo.linkedin && (
                <ModernContactRow label="LinkedIn">
                  <span style={{ color: '#38bdf8', wordBreak: 'break-all', lineHeight: '1.4' }}>
                    {contactInfo.linkedin.replace(/.*\/in\//, '').replace(/\/$/, '') || 'Profile'}
                  </span>
                </ModernContactRow>
              )}
              {contactInfo.github && (
                <ModernContactRow label="GitHub">
                  <span style={{ color: '#38bdf8', wordBreak: 'break-all', lineHeight: '1.4' }}>
                    {contactInfo.github.split('/').filter(Boolean).pop() || 'Profile'}
                  </span>
                </ModernContactRow>
              )}
              {contactInfo.website && (
                <ModernContactRow label="Website">
                  <span style={{ color: '#38bdf8', wordBreak: 'break-all', lineHeight: '1.4' }}>
                    {contactInfo.website.replace(/https?:\/\//, '')}
                  </span>
                </ModernContactRow>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <ModernSidebarHeading>Skills</ModernSidebarHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '11px' }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }} />
                    <span style={{ fontSize: '8.5pt', color: '#cbd5e1', fontWeight: '500', lineHeight: '1.5' }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education — ALL entries rendered */}
          {educations.length > 0 && (
            <div>
              <ModernSidebarHeading>Education</ModernSidebarHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '11px' }}>
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p style={{ margin: '0 0 2px 0', fontSize: '8.5pt', fontWeight: '700', color: '#f1f5f9', lineHeight: '1.3' }}>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </p>
                    <p style={{ margin: '0 0 2px 0', fontSize: '8pt', color: '#94a3b8', lineHeight: '1.35' }}>
                      {edu.institution}
                    </p>
                    <p style={{ margin: 0, fontSize: '7.5pt', color: '#38bdf8' }}>
                      {edu.endMonth ? `${edu.endMonth} ` : ''}{edu.endYear}
                    </p>
                    {edu.cgpa && (
                      <p style={{ margin: '2px 0 0 0', fontSize: '7.5pt', color: '#94a3b8' }}>CGPA: {edu.cgpa}</p>
                    )}
                    {edu.description && (
                      <p style={{ margin: '3px 0 0 0', fontSize: '7.5pt', color: '#94a3b8', lineHeight: '1.4' }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT MAIN CONTENT ─── */}
      <div
        style={{
          flex: 1,
          padding: '30px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          overflowX: 'hidden',
        }}
      >
        {/* Profile */}
        {summary && (
          <section>
            <ModernMainHeading>Profile</ModernMainHeading>
            <p style={{ margin: '8px 0 0 0', color: '#374151', lineHeight: '1.75', fontSize: '9.5pt' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <ModernMainHeading>Experience</ModernMainHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  style={{
                    paddingBottom: i < experiences.length - 1 ? '14px' : '0',
                    borderBottom: i < experiences.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '3px' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '10.5pt', color: '#111827', display: 'block', lineHeight: '1.25' }}>
                        {exp.jobTitle}
                      </span>
                      <span style={{ fontSize: '9pt', color: '#1f6ea0', fontWeight: '600' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '7.5pt',
                        color: '#6b7280',
                        whiteSpace: 'nowrap',
                        background: '#f3f4f6',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontWeight: '500',
                      }}
                    >
                      {exp.startMonth} {exp.startYear} – {exp.isPresent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0 0', fontSize: '9pt', color: '#4b5563', lineHeight: '1.65', whiteSpace: 'pre-wrap' }}>
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
            <ModernMainHeading>Projects</ModernMainHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {projects.map((project) => {
                const tech = techArray(project.technologies);
                return (
                  <div key={project.id} style={{ borderLeft: '3px solid #dbeafe', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: '700', fontSize: '9.5pt', color: '#111827' }}>{project.name}</span>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {project.githubLink && (
                          <span style={{ fontSize: '7.5pt', color: '#1f6ea0', fontWeight: '500' }}>GitHub →</span>
                        )}
                        {project.liveLink && (
                          <span style={{ fontSize: '7.5pt', color: '#1f6ea0', fontWeight: '500' }}>Live →</span>
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
                              color: '#374151',
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
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

function ModernSidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '6.5pt',
        fontWeight: '700',
        letterSpacing: '1.8px',
        textTransform: 'uppercase',
        color: '#38bdf8',
        margin: '0',
        paddingBottom: '7px',
        borderBottom: '1px solid #273d53',
      }}
    >
      {children}
    </h3>
  );
}

function ModernContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <span style={{ fontSize: '6.5pt', fontWeight: '700', color: '#64748b', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontSize: '8pt', color: '#cbd5e1' }}>{children}</span>
    </div>
  );
}

function ModernMainHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
      <div style={{ width: '3px', height: '14px', background: '#1f6ea0', borderRadius: '1px', flexShrink: 0 }} />
      <h2
        style={{
          fontSize: '7pt',
          fontWeight: '700',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#1f2937',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
    </div>
  );
}
