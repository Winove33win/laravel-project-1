import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * QUALICAL – Landing Page (Airbnb‑style UX, v3)
 * -------------------------------------------------------
 * Melhorias:
 * • Imagens garantidas via SVG inline (data URI), sem depender de rede
 * • Carrossel com autoplay + drag + botões (puro React/JS)
 * • Conteúdos ampliados (serviços detalhados, diferenciais, FAQs, callouts)
 * • Treinamentos em jornada com detalhes colapsáveis
 * • Footer mais completo (sitemap, políticas, newsletter, selos)
 * Somente FRONT – sem API.
 */

export default function QualicalLanding() {
  const theme = {
    "--color-bg": "#ffffff",
    "--color-surface": "#ffffff",
    "--color-primary": "#2E5AAC",
    "--color-primary-600": "#244a8e",
    "--color-primary-50": "#eef3fc",
    "--color-accent": "#16A34A",
    "--color-accent-50": "#e6f9ee",
    "--color-accent-600": "#128C3A",
    "--color-text": "#0f172a",
    "--color-muted": "#475569",
    "--shadow": "0 14px 40px rgba(2,6,23,.10)",
    "--radius-xl": "22px",
    "--radius-lg": "16px",
    "--radius-md": "12px",
  };

  const ph = (w, h, label = "Imagem") =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
         <defs>
           <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
             <stop offset='0%' stop-color='%23e6f9ee'/>
             <stop offset='100%' stop-color='%23eef3fc'/>
           </linearGradient>
         </defs>
         <rect width='100%' height='100%' rx='16' fill='url(%23g)'/>
         <g font-family='Inter, Arial' font-size='20' fill='%23244a8e' font-weight='700'>
           <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>${label}</text>
         </g>
       </svg>`
    )}`;

  const S = useMemo(() => ({
    page: { fontFamily: "Inter, system-ui, sans-serif", background: "var(--color-bg)", color: "var(--color-text)" },
    container: { width: "min(1220px, 92vw)", margin: "0 auto" },
    headerWrap: { position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #e2e8f0" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 },
    brand: { display: "flex", alignItems: "center", gap: 10 },
    logo: { width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--color-accent), var(--color-primary))", boxShadow: "var(--shadow)" },
    brandText: { fontWeight: 900, letterSpacing: -0.3, fontSize: 18 },
    nav: { display: "flex", gap: 18, alignItems: "center" },
    navLink: { color: "var(--color-muted)", textDecoration: "none", fontWeight: 600 },
    cta: { background: "var(--color-accent)", color: "white", padding: "10px 16px", borderRadius: 999, fontWeight: 800, boxShadow: "var(--shadow)", border: "1px solid rgba(0,0,0,.04)" },

    hero: { marginTop: 24, borderRadius: "var(--radius-xl)", overflow: "hidden", position: "relative" },
    heroBg: { position: "absolute", inset: 0, background: `linear-gradient(120deg, var(--color-primary-50), var(--color-accent-50))` },
    heroInner: { position: "relative", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24, padding: 32, alignItems: "center" },
    heroKicker: { color: "var(--color-accent-600)", fontWeight: 800, fontSize: 12, textTransform: "uppercase" },
    heroTitle: { fontSize: 46, fontWeight: 900, lineHeight: 1.08, letterSpacing: -0.3 },
    heroDesc: { color: "var(--color-muted)", fontSize: 16, marginTop: 10 },
    heroCard: { background: "var(--color-surface)", border: "1px solid #e5e7eb", borderRadius: "var(--radius-lg)", padding: 16, boxShadow: "var(--shadow)" },

    section: { padding: "56px 0" },
    sectionHeader: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 },
    h2: { fontSize: 30, fontWeight: 900, letterSpacing: -0.3 },
    subtitle: { color: "var(--color-muted)", fontSize: 14 },

    gridAuto: { display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" },
    card: { background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid #e5e7eb", boxShadow: "var(--shadow)", overflow: "hidden" },
    cardBody: { padding: 16 },
    pill: { display: "inline-block", fontSize: 12, fontWeight: 900, color: "#064e3b", background: "var(--color-accent-50)", padding: "6px 10px", borderRadius: 999, letterSpacing: .4, textTransform: "uppercase" },
    list: { margin: 0, paddingLeft: 18 },

    carousel: { position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "var(--shadow)", background: "#fff" },
    track: { display: "flex", transition: "transform .5s ease" },
    slide: { minWidth: "100%", padding: 0 },
    arrow: { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.9)", border: "1px solid #e2e8f0", boxShadow: "var(--shadow)", borderRadius: 12, width: 44, height: 44, display: "grid", placeItems: "center", cursor: "pointer" },
    dotWrap: { position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 12, display: "flex", gap: 8 },
    dot: (active) => ({ width: 10, height: 10, borderRadius: 10, background: active ? "var(--color-accent)" : "#cbd5e1", border: "1px solid #94a3b8" }),

    ctaBanner: { marginTop: 16, padding: 18, background: "linear-gradient(90deg, var(--color-accent-50), var(--color-primary-50))", border: "1px solid #dbeafe", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 },
    ctaBtn: { background: "var(--color-accent)", color: "#fff", padding: "12px 18px", borderRadius: 999, fontWeight: 900, boxShadow: "var(--shadow)", border: "1px solid rgba(0,0,0,.05)", cursor: "pointer" },

    faqItem: { padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", boxShadow: "var(--shadow)" },

    footer: { borderTop: "1px solid #e2e8f0", padding: "54px 0 70px", fontSize: 14, background: "#f8fafc" },
    footCols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 },
    footTitle: { fontWeight: 900, marginBottom: 10 },
    footLink: { color: "var(--color-muted)", textDecoration: "none" },
    footBottom: { marginTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: "var(--color-muted)" },

    "@media (max-width: 980px)": { heroInner: { gridTemplateColumns: "1fr" } },
  }), []);

  const services = [
    { tag: "Massa", title: "Calibração e manutenção de balanças", bullets: ["Analíticas, semi‑analíticas e industriais", "Preventiva/corretiva", "Substituição de peças e ajustes"], label: "Balanças" },
    { tag: "Volume", title: "Calibração e verificação volumétrica", bullets: ["Pipetas, buretas, balões", "Condutivímetros", "Medidores de processo e diagnóstico"], label: "Volume" },
    { tag: "Temperatura", title: "Soluções para medição térmica", bullets: ["Termômetros de vidro/digitais", "Sensores e sistemas", "Incerteza e validação"], label: "Temperatura" },
  ];

  const extras = [
    { tag: "Auditorias", title: "Auditoria Interna – ISO/IEC 17025", desc: "Planejamento, execução, relatório e plano de ação para conformidade.", label: "Auditoria" },
    { tag: "Consultorias", title: "Implantação e adequação à ISO 17025", desc: "Diagnóstico, POPs, riscos, preparação para certificações e capacitação.", label: "Consultoria" },
    { tag: "Manutenção", title: "Manutenção de Balanças", desc: "Restaurar e manter a funcionalidade com rastreabilidade.", label: "Manutenção" },
  ];

  const steps = [
    { n: 1, title: "Fundamentos da Qualidade", meta: "8h • Todos os profissionais", details: ["Introdução à qualidade", "Normas e certificações (ISO 9001, 14001...)" ] },
    { n: 2, title: "POPs e Documentação", meta: "8h • Responsáveis técnicos", details: ["Estruturação de POPs", "Gestão de versões e controle de documentos"] },
    { n: 3, title: "ISO 17025 Interpretada", meta: "16h • Gestores e laboratoristas", details: ["Requisitos técnicos e de gestão", "Imparcialidade e confidencialidade"] },
    { n: 4, title: "Auditor Interno (ISO 19011)", meta: "12h • Auditores da qualidade", details: ["Técnicas de entrevista", "Relato de não conformidades e melhoria contínua"] },
    { n: 5, title: "Incerteza de Medição – Ensaios", meta: "16h • Técnicos/analistas", details: ["Conceitos e métodos de cálculo", "Aplicação prática e relatórios"] },
    { n: 6, title: "Relato de Resultados", meta: "4h • Gestores/qualidade", details: ["Requisitos ISO 17025", "Formatação técnica e exemplos"] },
    { n: 7, title: "Boas Práticas (RDC 512)", meta: "8h • Ensaios/calibração", details: ["Organização, rastreabilidade", "Gestão documental e responsabilidade técnica"] },
    { n: 8, title: "Análise Crítica de Certificados", meta: "4h • Metrologistas", details: ["Estrutura de certificados", "Interpretação de incerteza e conformidade"] },
    { n: 9, title: "Gestão de Riscos (ISO 31000)", meta: "8h • SGQ", details: ["Identificação/avaliação", "Ferramentas FMEA, SWOT, Matriz de Riscos"] },
  ];

  const slides = [
    { title: "Calibração rastreável", text: "Certificados com conformidade ISO 17025.", img: ph(1440, 480, "Calibração") },
    { title: "Auditorias internas", text: "Plano de ação e melhoria contínua.", img: ph(1440, 480, "Auditoria") },
    { title: "Treinamentos aplicados", text: "Capacitação prática e material didático.", img: ph(1440, 480, "Treinamentos") },
  ];

  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const dragging = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    el.style.transform = `translateX(-${idx * 100}%)`;
  }, [idx]);

  const onPointerDown = (e) => {
    const el = trackRef.current; if (!el) return;
    dragging.current = { startX: e.clientX, scrollX: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const el = trackRef.current; if (!el) return;
    const dx = e.clientX - dragging.current.startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setIdx((i) => Math.min(i + 1, slides.length - 1));
      else setIdx((i) => Math.max(i - 1, 0));
      dragging.current = null;
    }
  };
  const onPointerUp = () => { dragging.current = null; };

  const [openStep, setOpenStep] = useState(null);

  return (
    <div style={{ ...S.page, ...theme }}>
      <div style={S.headerWrap}>
        <header style={{ ...S.header, ...S.container }}>
          <div style={S.brand}>
            <div style={S.logo} />
            <span style={S.brandText}>QUALICAL</span>
          </div>
          <nav style={S.nav}>
            <a href="#servicos" style={S.navLink}>Serviços</a>
            <a href="#auditorias" style={S.navLink}>Auditorias</a>
            <a href="#treinamentos" style={S.navLink}>Treinamentos</a>
            <a href="#contato" style={S.cta}>Contato</a>
          </nav>
        </header>
      </div>

      <section style={{ ...S.container, ...S.hero }}>
        <div style={S.heroBg} aria-hidden />
        <div style={S.heroInner}>
          <div>
            <div style={S.heroKicker}>Laboratório de Metrologia</div>
            <h1 style={S.heroTitle}>Excelência em calibração, auditorias e treinamentos</h1>
            <p style={S.heroDesc}>Confiabilidade em massa, volume e temperatura com atendimento in loco ou em laboratório e conformidade à ISO/IEC 17025.</p>
            <div style={S.ctaBanner}>
              <div>
                <strong>Precisa calibrar seus equipamentos?</strong>
                <div style={{ color: "var(--color-muted)" }}>Solicite um diagnóstico sem compromisso.</div>
              </div>
              <button style={S.ctaBtn} onClick={() => window.location.assign('#contato')}>Pedir orçamento</button>
            </div>
          </div>

          <div style={S.carousel}>
            <div
              ref={trackRef}
              style={{ ...S.track }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              {slides.map((s) => (
                <figure key={s.title} style={S.slide}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: 320, objectFit: "cover" }} />
                  <figcaption style={{ padding: 12 }}>
                    <strong>{s.title}</strong>
                    <div style={{ color: "var(--color-muted)" }}>{s.text}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <button aria-label="Anterior" style={{ ...S.arrow, left: 12 }} onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}>‹</button>
            <button aria-label="Próximo" style={{ ...S.arrow, right: 12 }} onClick={() => setIdx((i) => (i + 1) % slides.length)}>›</button>
            <div style={S.dotWrap}>
              {slides.map((_, i) => (
                <div key={i} style={S.dot(i === idx)} onClick={() => setIdx(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" style={{ ...S.container, ...S.section }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Serviços de Metrologia</h2>
          <span style={S.subtitle}>Massa • Volume • Temperatura</span>
        </div>
        <div style={S.gridAuto}>
          {services.map((s) => (
            <article key={s.title} style={S.card}>
              <img src={ph(400,200, s.label)} alt={s.label} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={S.cardBody}>
                <span style={S.pill}>{s.tag}</span>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginTop: 10 }}>{s.title}</h3>
                <ul style={S.list}>
                  {s.bullets.map((b) => (<li key={b}>{b}</li>))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          {["Certificado rastreável", "Equipe especializada", "Atendimento ágil", "Relatórios claros"].map((x) => (
            <span key={x} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "8px 12px", borderRadius: 999, fontWeight: 700, color: "var(--color-muted)" }}>{x}</span>
          ))}
        </div>
      </section>

      <section id="auditorias" style={{ ...S.container, ...S.section }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Auditorias & Consultorias</h2>
          <span style={S.subtitle}>ISO/IEC 17025 • Diagnóstico • POPs • Riscos</span>
        </div>
        <div style={S.gridAuto}>
          {extras.map((e) => (
            <article key={e.title} style={S.card}>
              <img src={ph(400,200, e.label)} alt={e.label} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={S.cardBody}>
                <span style={S.pill}>{e.tag}</span>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginTop: 10 }}>{e.title}</h3>
                <p style={{ color: "var(--color-muted)", marginTop: 6 }}>{e.desc}</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                  {['Planejamento', 'Evidências', 'Relatórios', 'Plano de ação'].map((b) => (
                    <span key={b} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, color: "var(--color-muted)" }}>{b}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="treinamentos" style={{ ...S.container, ...S.section }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Treinamentos (Jornada)</h2>
          <span style={S.subtitle}>Capacitação prática baseada em normas</span>
        </div>
        <div style={S.gridAuto}>
          {steps.map((st) => (
            <div key={st.n} style={{ padding: 18, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow)", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: -12, width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 12, background: "linear-gradient(135deg, var(--color-accent), var(--color-primary))", color: "#fff", fontWeight: 900, boxShadow: "var(--shadow)" }}>{st.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, marginLeft: 32 }}>{st.title}</h3>
              <div style={{ color: "var(--color-muted)", marginTop: 6, marginLeft: 32 }}>{st.meta}</div>
              <div style={{ marginTop: 10, fontWeight: 800, color: "var(--color-primary-600)", cursor: "pointer" }} onClick={() => setOpenStep((p) => p === st.n ? null : st.n)}>
                {openStep === st.n ? "Ocultar detalhes ▲" : "Ver detalhes ▼"}
              </div>
              {openStep === st.n && (
                <ul style={{ marginTop: 10, paddingLeft: 18, color: "var(--color-muted)" }}>
                  {st.details.map((d) => (<li key={d}>{d}</li>))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div style={{ ...S.ctaBanner, marginTop: 18 }}>
          <div>
            <strong>Precisa de um trilho personalizado?</strong>
            <div style={{ color: "var(--color-muted)" }}>Montamos a jornada sob medida para sua equipe.</div>
          </div>
          <button style={S.ctaBtn} onClick={() => window.location.assign('#contato')}>Solicitar proposta</button>
        </div>
      </section>

      <section style={{ ...S.container, ...S.section }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Perguntas frequentes</h2>
          <span style={S.subtitle}>Informações úteis sobre nossos serviços</span>
        </div>
        <div style={S.gridAuto}>
          {[{
            q: 'Vocês atendem in loco?',
            a: 'Sim, realizamos calibração e auditoria in loco ou em laboratório, conforme a necessidade.'
          },{
            q: 'Emitimos certificado rastreável?',
            a: 'Sim, todos os serviços elegíveis possuem certificado de calibração rastreável, conforme ISO 17025.'
          },{
            q: 'Prazo de atendimento?',
            a: 'Definido com base no escopo e na urgência; oferecemos planos ágeis quando necessário.'
          }].map(item => (
            <div key={item.q} style={S.faqItem}>
              <strong>{item.q}</strong>
              <p style={{ color: "var(--color-muted)", marginTop: 6 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contato" style={{ ...S.container, ...S.section }}>
        <div style={S.sectionHeader}>
          <h2 style={S.h2}>Fale conosco</h2>
          <span style={S.subtitle}>Solicite orçamento ou agende uma avaliação</span>
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr" }} className="grid-2">
          <form onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada! (demo front)'); }} style={{ ...S.card, padding: 18 }}>
            <label style={{ display: "grid", gap: 8, marginBottom: 10 }}>
              <span>Nome</span>
              <input required placeholder="Seu nome" style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #e2e8f0" }} />
            </label>
            <label style={{ display: "grid", gap: 8, marginBottom: 10 }}>
              <span>Email</span>
              <input type="email" required placeholder="voce@empresa.com" style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #e2e8f0" }} />
            </label>
            <label style={{ display: "grid", gap: 8, marginBottom: 10 }}>
              <span>Mensagem</span>
              <textarea required placeholder="Conte sua necessidade" style={{ width: "100%", height: 120, borderRadius: 12, border: "1px solid #e2e8f0", padding: "12px 14px", resize: "vertical" }} />
            </label>
            <button style={S.ctaBtn}>Enviar</button>
          </form>
          <div style={{ ...S.card, padding: 18 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Atendimento</h3>
            <ul style={S.list}>
              <li>📞 (49) 98854‑0900</li>
              <li>✉️ atendimento@qualical.com.br</li>
              <li>📍 Rua Benedito Antônio, 329 – Sala 02 – Pascoal Ramos – Cuiabá/MT</li>
            </ul>
            <img src={ph(560,240, 'Mapa/Endereço')} alt="Mapa simbólico" style={{ width: "100%", borderRadius: 12, marginTop: 12 }} />
          </div>
        </div>
      </section>

      <footer style={S.footer}>
        <div style={S.container}>
          <div style={S.footCols}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ ...S.logo, width: 28, height: 28 }} />
                <h4 style={S.footTitle}>QUALICAL</h4>
              </div>
              <p style={{ color: "var(--color-muted)", marginTop: 8 }}>Excelência em metrologia aplicada a massa, volume e temperatura.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <span style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "6px 10px", borderRadius: 8 }}>ISO 17025</span>
                <span style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "6px 10px", borderRadius: 8 }}>Rastreabilidade</span>
              </div>
            </div>
            <div>
              <h4 style={S.footTitle}>Mapa do site</h4>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li><a href="#servicos" style={S.footLink}>Serviços</a></li>
                <li><a href="#auditorias" style={S.footLink}>Auditorias & Consultorias</a></li>
                <li><a href="#treinamentos" style={S.footLink}>Treinamentos</a></li>
                <li><a href="#contato" style={S.footLink}>Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 style={S.footTitle}>Políticas</h4>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li><a href="#" style={S.footLink}>Privacidade</a></li>
                <li><a href="#" style={S.footLink}>Termos de uso</a></li>
                <li><a href="#" style={S.footLink}>Qualidade & SGQ</a></li>
              </ul>
            </div>
            <div>
              <h4 style={S.footTitle}>Newsletter</h4>
              <p style={{ color: "var(--color-muted)" }}>Receba novidades sobre metrologia e qualidade.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input placeholder="seu@email.com" style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <button style={S.ctaBtn}>Inscrever</button>
              </div>
            </div>
          </div>
          <div style={S.footBottom}>
            <span>© {new Date().getFullYear()} QUALICAL – Todos os direitos reservados.</span>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" style={S.footLink}>LGPD</a>
              <span>•</span>
              <a href="#" style={S.footLink}>Mapa do site</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 980px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
