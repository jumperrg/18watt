import React, { useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { lab, copy, channels, support } from "./content";
import "./lab.css";

const NAV = [
  { to: "/", no: "00", label: "Home", exact: true },
  { to: "/projects", no: "01", label: "Projects" },
  { to: "/notes", no: "02", label: "Lab notes" },
  { to: "/media", no: "03", label: "Media" },
  { to: "/shop", no: "04", label: "Shop" },
];

export function Shell({ title, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="lab">
      <Helmet>
        <title>{title ? `${title} — 18WATT` : "18WATT — Hardware, AI & sound lab"}</title>
      </Helmet>

      <header className="lab-bar">
        <Link to="/" className="lab-bar__mark">
          <span className="lab-dot" aria-hidden="true" />
          18WATT<span className="lab-bar__slash">/</span>LAB
        </Link>
        <nav className="lab-bar__nav" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} exact={n.exact} activeClassName="is-active">
              <span className="lab-bar__no">{n.no}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="lab-foot">
        <div className="lab-foot__big" aria-hidden="true">
          18W
        </div>
        <div className="lab-foot__cols">
          <div>
            <p className="label">Follow the bench</p>
            {channels.map((c) => (
              <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer">
                {c.name} <span className="mono">{c.handle}</span> ↗
              </a>
            ))}
          </div>
          <div>
            <p className="label">Contact</p>
            <a href={`mailto:${lab.email}`}>{lab.email}</a>
            <Link to="/shop">Shop →</Link>
            {support.url && (
              <a href={support.url} target="_blank" rel="noopener noreferrer">
                {support.name} ↗
              </a>
            )}
          </div>
          <div>
            <p className="label">Legal</p>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/agb">AGB</a>
          </div>
        </div>
        <p className="lab-foot__line mono">
          © {new Date().getFullYear()} {lab.author} · 18WATT · {copy.footer}
        </p>
      </footer>
    </div>
  );
}

export function SectionHead({ no, title, to, linkLabel }) {
  return (
    <div className="sec-head">
      <span className="sec-head__no mono">{no}</span>
      <h2 className="sec-head__title">{title}</h2>
      {to && (
        <Link className="sec-head__link mono" to={to}>
          {linkLabel || "Index"} →
        </Link>
      )}
    </div>
  );
}

export function Status({ items }) {
  return (
    <span className="status">
      {items.map((s) => (
        <span key={s} className={`status__chip status__chip--${s.toLowerCase().replace(/\s+/g, "-")}`}>
          {s}
        </span>
      ))}
    </span>
  );
}

// Small deterministic PRNG so each placeholder trace is unique but stable.
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/* Cover image, or a generated "scope capture" placeholder when none exists. */
export function Figure({ src, code, label, seed }) {
  if (src) {
    return (
      <figure className="fig">
        <img src={src} alt={label} loading="lazy" />
        <figcaption className="fig__cap mono">{code}</figcaption>
      </figure>
    );
  }
  const rnd = seeded(seed || code);
  const kind = Math.floor(rnd() * 3);
  const pts = [];
  for (let x = 0; x <= 400; x += 4) {
    let y;
    if (kind === 0) y = 150 + Math.sin(x / (14 + rnd() * 0.2)) * 60 * Math.sin(x / 130);
    else if (kind === 1) y = 150 + (Math.floor(x / 36) % 2 ? -55 : 55) + (rnd() - 0.5) * 6;
    else y = 150 + (((x % 80) / 80) * 2 - 1) * 70 + (rnd() - 0.5) * 4;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <figure className="fig fig--empty">
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id={`g-${code}`} width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V30" fill="none" className="fig__grid" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#g-${code})`} />
        <line x1="0" y1="150" x2="400" y2="150" className="fig__axis" />
        <line x1="200" y1="0" x2="200" y2="300" className="fig__axis" />
        <polyline points={pts.join(" ")} className="fig__trace" />
      </svg>
      <span className="fig__code">{code}</span>
      <figcaption className="fig__cap mono">FIG. — photo pending</figcaption>
    </figure>
  );
}

export function VideoEmbed({ id, title }) {
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/* Live oscilloscope strip for the hero. Pointer X detunes the second
   oscillator; respects prefers-reduced-motion by drawing one frame. */
export function Scope() {
  const ref = useRef(null);
  const target = useRef(0.5);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const css = getComputedStyle(canvas);
    const accent = css.getPropertyValue("--accent").trim() || "#ff4a1c";
    const grid = css.getPropertyValue("--hair").trim() || "rgba(0,0,0,.12)";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let t = 0;
    let mix = 0.5;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const cols = 20;
      for (let i = 1; i < cols; i++) {
        const x = Math.round((w / cols) * i) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let j = 1; j < 8; j++) {
        const y = Math.round((h / 8) * j) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      mix += (target.current - mix) * 0.05;
      const f2 = 2 + mix * 5;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const p = (x / w) * Math.PI * 2;
        const y =
          Math.sin(p * 3 + t) * 0.55 +
          Math.sin(p * 3 * f2 - t * 1.7) * 0.25 * mix +
          Math.sign(Math.sin(p * 1.5 + t * 0.4)) * 0.12;
        const yy = h / 2 - y * h * 0.36;
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();

      t += 0.03;
      if (!still) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      target.current = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="scope">
      <canvas ref={ref} aria-hidden="true" />
      <span className="scope__lbl scope__lbl--tl mono">CH1 · 2V/div</span>
      <span className="scope__lbl scope__lbl--tr mono">5ms/div · TRIG ↑</span>
      <span className="scope__lbl scope__lbl--bl mono">move the pointer → detune</span>
    </div>
  );
}
