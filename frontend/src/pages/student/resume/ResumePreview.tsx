import type { ResumeTemplate } from './ResumeTemplates';

interface Props {
  formData: any;
  skills: string[];
  projects: any[];
  selectedTemplate: ResumeTemplate;
}

const ResumePreview = ({ formData, skills, projects, selectedTemplate }: Props) => {
  const { colors, id } = selectedTemplate;

  // ============================================================
  // TEMPLATE 1: Modern Two-Column (Sidebar + Main)
  // ============================================================
  if (id === 'modern-2col') {
    return (
      <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] flex" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Left Sidebar */}
        <div className="w-[35%] text-white p-6" style={{ backgroundColor: colors.sidebar }}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center text-3xl font-bold">
              {formData.fullName?.charAt(0) || '?'}
            </div>
            <h1 className="text-lg font-bold">{formData.fullName || 'Name'}</h1>
            <p className="text-xs opacity-80">{formData.title || 'Title'}</p>
          </div>
          
          <div className="space-y-4">
            <SideSection title="Contact" icon="📞">
              {formData.email && <p className="text-xs">✉️ {formData.email}</p>}
              {formData.phone && <p className="text-xs">📱 {formData.phone}</p>}
              {formData.address && <p className="text-xs">📍 {formData.address}</p>}
            </SideSection>

            {skills.length > 0 && (
              <SideSection title="Skills" icon="⚡">
                <div className="space-y-1.5">
                  {skills.slice(0, 8).map((s, i) => (
                    <div key={i}>
                      <p className="text-xs mb-0.5">{s}</p>
                      <div className="w-full h-1 bg-white/20 rounded-full">
                        <div className="h-full bg-white/60 rounded-full" style={{ width: `${70 + Math.random() * 30}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </SideSection>
            )}

            {formData.languages && (
              <SideSection title="Languages" icon="🗣️">
                <p className="text-xs">{formData.languages}</p>
              </SideSection>
            )}
          </div>
        </div>

        {/* Right Main */}
        <div className="flex-1 p-6 space-y-5">
          {formData.summary && <MainBlock title="Professional Summary" color={colors.primary}>{formData.summary}</MainBlock>}
          {formData.experience && <MainBlock title="Work Experience" color={colors.primary}>{formData.experience}</MainBlock>}
          {formData.education && <MainBlock title="Education" color={colors.primary}>{formData.education}</MainBlock>}
          {projects.filter((p: any) => p.title).length > 0 && (
            <MainBlock title="Projects" color={colors.primary}>
              {projects.filter((p: any) => p.title).map((p: any, i: number) => (
                <div key={i} className="mb-2 pl-3 border-l-2" style={{ borderColor: colors.primary }}>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs text-gray-600">{p.description}</p>
                </div>
              ))}
            </MainBlock>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // TEMPLATE 2: ATS-Friendly (Minimal Black & White)
  // ============================================================
  if (id === 'ats-single') {
    return (
      <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-10" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-900">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase">{formData.fullName || 'Name'}</h1>
          <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
            {formData.email && <span>{formData.email}</span>}
            {formData.phone && <span>{formData.phone}</span>}
            {formData.address && <span>{formData.address}</span>}
          </div>
        </div>

        {formData.summary && <ATSSection title="PROFESSIONAL SUMMARY">{formData.summary}</ATSSection>}

        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="border border-gray-300 px-3 py-1 text-xs">{s}</span>)}
            </div>
          </div>
        )}

        {formData.experience && <ATSSection title="PROFESSIONAL EXPERIENCE">{formData.experience}</ATSSection>}
        {formData.education && <ATSSection title="EDUCATION">{formData.education}</ATSSection>}
        
        {projects.filter((p: any) => p.title).length > 0 && (
          <ATSSection title="PROJECTS">
            {projects.filter((p: any) => p.title).map((p: any, i: number) => (
              <p key={i} className="text-sm mb-1"><strong>{p.title}</strong> — {p.description}</p>
            ))}
          </ATSSection>
        )}
      </div>
    );
  }

  // ============================================================
  // TEMPLATE 3: Creative Modern (Cards + Icons)
  // ============================================================
  if (id === 'creative-color') {
    return (
      <div className="shadow-2xl w-full max-w-[210mm] min-h-[297mm] overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #f0f9ff, #ecfdf5)' }}>
        <div className="text-white p-8 text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-4xl font-bold border-4 border-white/40">
            {formData.fullName?.charAt(0) || '?'}
          </div>
          <h1 className="text-2xl font-bold">{formData.fullName || 'Name'}</h1>
          <p className="text-sm opacity-90">{formData.title || 'Title'}</p>
          <div className="flex justify-center gap-4 mt-3 text-xs opacity-80">
            {formData.email && <span>✉️ {formData.email}</span>}
            {formData.phone && <span>📱 {formData.phone}</span>}
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            {formData.summary && <CreativeCard title="💡 About Me" color={colors.primary}>{formData.summary}</CreativeCard>}
          </div>

          {skills.length > 0 && (
            <CreativeCard title="🛠️ Skills" color={colors.primary}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: colors.primary }}>{s}</span>
                ))}
              </div>
            </CreativeCard>
          )}

          {formData.experience && <CreativeCard title="💼 Experience" color={colors.secondary}>{formData.experience}</CreativeCard>}
          {formData.education && <CreativeCard title="🎓 Education" color={colors.secondary}>{formData.education}</CreativeCard>}
          
          {projects.filter((p: any) => p.title).length > 0 && (
            <div className="col-span-2">
              <CreativeCard title="🚀 Projects" color={colors.primary}>
                <div className="grid grid-cols-2 gap-3">
                  {projects.filter((p: any) => p.title).map((p: any, i: number) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-semibold text-sm">{p.title}</p>
                      <p className="text-xs text-gray-600">{p.description}</p>
                    </div>
                  ))}
                </div>
              </CreativeCard>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // TEMPLATE 4: Europass EU (Structured with photo place)
  // ============================================================
  if (id === 'europass') {
    return (
      <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-8" style={{ fontFamily: 'Calibri, sans-serif' }}>
        <div className="flex gap-6 mb-6 pb-6 border-b" style={{ borderColor: colors.primary }}>
          <div className="w-28 h-36 border-2 border-dashed flex items-center justify-center text-xs text-gray-400" style={{ borderColor: colors.primary }}>
            Photo
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.heading }}>{formData.fullName || 'NAME Surname'}</h1>
            <p className="text-sm" style={{ color: colors.primary }}>{formData.title || 'Occupation'}</p>
            <div className="mt-2 text-xs text-gray-600 space-y-0.5">
              {formData.email && <p>📧 {formData.email}</p>}
              {formData.phone && <p>📱 {formData.phone}</p>}
              {formData.address && <p>📍 {formData.address}</p>}
            </div>
          </div>
        </div>

        {formData.summary && <EuroBlock title="PERSONAL STATEMENT">{formData.summary}</EuroBlock>}
        {formData.experience && <EuroBlock title="WORK EXPERIENCE">{formData.experience}</EuroBlock>}
        {formData.education && <EuroBlock title="EDUCATION AND TRAINING">{formData.education}</EuroBlock>}

        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.heading }}>Digital Skills</h2>
            <div className="grid grid-cols-2 gap-1">
              {skills.map((s, i) => (
                <p key={i} className="text-xs">• {s}</p>
              ))}
            </div>
          </div>
        )}

        {projects.filter((p: any) => p.title).length > 0 && (
          <EuroBlock title="PROJECTS">
            {projects.filter((p: any) => p.title).map((p: any, i: number) => (
              <p key={i} className="text-xs mb-1"><strong>{p.title}:</strong> {p.description}</p>
            ))}
          </EuroBlock>
        )}
      </div>
    );
  }

  // ============================================================
  // TEMPLATE 5: Minimal Dark (Elegant grayscale)
  // ============================================================
  return (
    <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-light tracking-wide">{formData.fullName || 'Name'}</h1>
        <div className="w-12 h-0.5 bg-gray-400 my-3" />
        <p className="text-sm text-gray-400">{formData.title || 'Title'}</p>
        <div className="flex gap-4 mt-3 text-xs text-gray-400">
          {formData.email && <span>{formData.email}</span>}
          {formData.phone && <span>{formData.phone}</span>}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {formData.summary && <MinimalSection title="SUMMARY">{formData.summary}</MinimalSection>}
        
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Expertise</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        {formData.experience && <MinimalSection title="EXPERIENCE">{formData.experience}</MinimalSection>}
        {formData.education && <MinimalSection title="EDUCATION">{formData.education}</MinimalSection>}
        
        {projects.filter((p: any) => p.title).length > 0 && (
          <MinimalSection title="PROJECTS">
            {projects.filter((p: any) => p.title).map((p: any, i: number) => (
              <div key={i} className="mb-2 flex gap-2">
                <span className="text-gray-400">—</span>
                <div>
                  <p className="font-medium text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
              </div>
            ))}
          </MinimalSection>
        )}
      </div>
    </div>
  );
};

// Helper Components
const SideSection = ({ title, icon, children }: any) => (
  <div>
    <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">{icon} {title}</h3>
    {children}
  </div>
);

const MainBlock = ({ title, color, children }: any) => (
  <div>
    <h2 className="text-sm font-bold mb-2 pb-1.5 flex items-center gap-2" style={{ color }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} /> {title}
    </h2>
    <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);

const ATSSection = ({ title, children }: any) => (
  <div className="mb-5">
    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2 border-b border-gray-300 pb-1">{title}</h2>
    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);

const CreativeCard = ({ title, color, children }: any) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h3 className="text-sm font-bold mb-2" style={{ color }}>{title}</h3>
    <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);

const EuroBlock = ({ title, children }: any) => (
  <div className="mb-4">
    <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#1e3a8a' }}>{title}</h2>
    <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);

const MinimalSection = ({ title, children }: any) => (
  <div>
    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{title}</h2>
    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{children}</div>
  </div>
);

export default ResumePreview;