"use client";

import { useEffect, useState } from "react";

const WHATSAPP = "https://wa.me/5561992087470?text=Ol%C3%A1%20Filipe!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade.";
const LINKEDIN = "https://www.linkedin.com/in/filipe-fran%C3%A7a-de-oliveira";
const EMAIL = "mailto:filipi95527646@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio";

const stack = ["JavaScript", "TypeScript", "React", "Next.js", "Python", "SQL", "Cloud", "Power BI", "Git", "Infraestrutura"];

const experiences = [
  {
    period: "2023 — agora",
    role: "Assistente Administrativo",
    company: "Centro Corporativo Sicoob · Brasília",
    text: "Gestão de contratos, despesas e rateios, fornecedores, fluxos financeiros e demandas internas. Transformo rotinas operacionais em processos organizados, indicadores e decisões mais claras.",
    tags: ["Processos", "Power BI", "Gestão", "Análise de dados"],
  },
  {
    period: "2019 — 2023",
    role: "Técnico em TI · Suporte N1/N2",
    company: "Sicoob Confederação",
    text: "Suporte técnico presencial e remoto, infraestrutura, manutenção e resolução de incidentes. Atuação próxima aos usuários e times técnicos para traduzir problemas em soluções eficientes.",
    tags: ["Infraestrutura", "Redes", "Troubleshooting", "Experiência do usuário"],
  },
  {
    period: "2019",
    role: "Assistente de Suporte Técnico",
    company: "Hospital Daher",
    text: "Manutenção de equipamentos, redes e sistemas em ambiente crítico, com foco em disponibilidade, atendimento ágil e continuidade da operação.",
    tags: ["Hardware", "Redes", "Suporte", "Operações"],
  },
];

const education = [
  ["MBA", "Governança Corporativa, Digital e de Dados", "Gran Faculdade · em andamento"],
  ["Pós", "Arquitetura e Projetos de Cloud Computing", "Gran Faculdade · 2025"],
  ["Pós", "Desenvolvimento Full Stack e Cloud Computing", "Gran Faculdade · 2025"],
  ["Graduação", "Análise e Desenvolvimento de Sistemas", "Universidade Cruzeiro do Sul · 2024"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    const onMove = (event: MouseEvent) => setMouse({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <main style={{ "--mouse-x": `${mouse.x}%`, "--mouse-y": `${mouse.y}%` } as React.CSSProperties}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="ambient" aria-hidden="true" />

      <header className="nav-wrap">
        <a className="brand" href="#inicio" aria-label="Ir para o início"><span>F</span>Filipe França</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir navegação">{menuOpen ? "Fechar" : "Menu"}</button>
        <nav className={menuOpen ? "open" : ""}>
          {[["Sobre", "sobre"], ["Experiência", "experiencia"], ["Formação", "formacao"], ["Contato", "contato"]].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">Vamos conversar <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Brasília, DF · disponível para novos desafios</p>
          <h1>Entre sistemas<br />e pessoas, eu<br /><em>faço acontecer.</em></h1>
          <p className="hero-intro">Sou <strong>Filipe França</strong>, profissional de tecnologia com visão de negócio. Uno desenvolvimento Full Stack, cloud, infraestrutura e dados para construir soluções que funcionam no mundo real.</p>
          <div className="hero-actions">
            <a className="button primary" href="#experiencia">Explorar trajetória <span>↓</span></a>
            <a className="button ghost" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Retrato profissional de Filipe França">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="portrait-frame"><img src="/filipe-franca.jpg" alt="Filipe França de Oliveira" /></div>
          <div className="floating-card card-code"><span>ATUAÇÃO</span><strong>Tech × Business</strong></div>
          <div className="floating-card card-years"><strong>7+</strong><span>anos resolvendo<br />problemas reais</span></div>
          <div className="visual-label">DESENVOLVIMENTO · CLOUD · DADOS</div>
        </div>
        <div className="hero-index"><span>PORTFÓLIO</span><b>01</b><span>2026</span></div>
      </section>

      <div className="marquee" aria-label="Competências"><div>{[...stack, ...stack].map((item, i) => <span key={`${item}-${i}`}>{item}<i>✦</i></span>)}</div></div>

      <section className="about section" id="sobre">
        <div className="section-number">02 / SOBRE</div>
        <div className="about-heading"><p className="kicker">Perfil híbrido</p><h2>Não fico preso<br />em uma <em>caixinha.</em></h2></div>
        <div className="about-body">
          <p className="lead">Minha base nasceu no suporte e na infraestrutura. Foi ali que aprendi que tecnologia boa não é a mais complicada — é a que resolve.</p>
          <p>Hoje combino essa experiência com formação em desenvolvimento Full Stack, arquitetura cloud, governança e análise de dados. Entendo o usuário, a operação e o código: três pontos de vista que me ajudam a criar soluções completas.</p>
          <p>Como profissional PCD, valorizo ambientes em que diversidade, colaboração e capacidade falem mais alto. Busco desafios onde eu possa transformar processos, dados e ideias em resultado.</p>
          <div className="principles">
            <div><b>01</b><span>Resolver antes<br />de complicar</span></div>
            <div><b>02</b><span>Aprender sempre,<br />entregar melhor</span></div>
            <div><b>03</b><span>Tecnologia com<br />propósito humano</span></div>
          </div>
        </div>
      </section>

      <section className="expertise section">
        <div className="section-number">03 / EXPERTISE</div>
        <div className="expertise-grid">
          {[
            ["DEV", "Full Stack", "Interfaces responsivas, integrações e aplicações orientadas à experiência real do usuário.", "JavaScript · React · Python · SQL"],
            ["CLOUD", "Arquitetura", "Visão de infraestrutura e cloud para soluções escaláveis, disponíveis e bem estruturadas.", "Cloud Computing · Redes · Infra"],
            ["DATA", "Dados & BI", "Transformo bases e rotinas em dashboards, indicadores e narrativas para tomada de decisão.", "Power BI · Excel · Python · SQL"],
            ["OPS", "Gestão", "Organização de processos, fornecedores, contratos e fluxos com olhar analítico e operacional.", "Governança · Processos · Negócio"],
          ].map(([code, title, text, tools], i) => (
            <article className="expertise-card" key={code}><span className="card-index">0{i + 1}</span><span className="card-code-label">{code}</span><h3>{title}</h3><p>{text}</p><small>{tools}</small><i className="card-arrow">↗</i></article>
          ))}
        </div>
      </section>

      <section className="experience section" id="experiencia">
        <div className="experience-head"><div><div className="section-number">04 / TRAJETÓRIA</div><h2>Experiência que<br /><em>conecta pontos.</em></h2></div><p>Uma carreira construída entre tecnologia, atendimento e operação — sempre com a mesma missão: entender o problema e entregar a solução.</p></div>
        <div className="timeline">
          {experiences.map((item, i) => <article key={item.role} className="timeline-item"><div className="timeline-marker">{String(i + 1).padStart(2, "0")}</div><div className="timeline-date">{item.period}</div><div className="timeline-content"><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}
        </div>
      </section>

      <section className="education section" id="formacao">
        <div className="section-number">05 / FORMAÇÃO</div>
        <div className="education-layout"><div className="education-title"><p className="kicker">Conhecimento em movimento</p><h2>Estudo para<br /><em>ir além.</em></h2><p>Formação contínua para conectar execução técnica, arquitetura e estratégia.</p></div><div className="education-list">{education.map(([type, course, institution], i) => <article key={course}><span>{String(i + 1).padStart(2, "0")}</span><div><small>{type}</small><h3>{course}</h3><p>{institution}</p></div><i>↗</i></article>)}</div></div>
      </section>

      <section className="contact section" id="contato">
        <div className="contact-orb" aria-hidden="true" />
        <p className="kicker">Tem um desafio interessante?</p>
        <h2>Vamos criar algo<br /><em>que marque.</em></h2>
        <p className="contact-copy">Estou aberto a oportunidades em tecnologia, desenvolvimento, dados e projetos que valorizem iniciativa e visão de negócio.</p>
        <div className="contact-links">
          <a href={WHATSAPP} target="_blank" rel="noreferrer"><span>WhatsApp</span><small>Resposta direta</small><i>↗</i></a>
          <a href={EMAIL}><span>E-mail</span><small>filipi95527646@gmail.com</small><i>↗</i></a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer"><span>LinkedIn</span><small>Vamos conectar</small><i>↗</i></a>
        </div>
      </section>

      <footer><a className="brand" href="#inicio"><span>F</span>Filipe França</a><p>Filipe França de Oliveira · Brasília, DF</p><p>Desenvolvido com intenção, não com template.</p></footer>
    </main>
  );
}
