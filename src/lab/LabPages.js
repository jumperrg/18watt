import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Shell, SectionHead, Status, Figure, VideoEmbed, Scope } from "./LabUI";
import {
  lab,
  copy,
  legend,
  disciplines,
  channels,
  videos,
  sortedProjects,
  sortedNotes,
  projectCode,
  noteCode,
  featuredProject,
  coverOf,
  support,
  GET_KINDS,
  isAvailable,
  isOpen,
} from "./content";

const LINK_LABELS = {
  live: "Launch tool",
  repo: "Source",
  writeup: "Write-up",
  shop: "Get one",
};

const isExternal = (url) => /^https?:/.test(url);

/* ---------- shared blocks ---------- */

function ProjectCard({ p, big }) {
  const code = projectCode(p.slug);
  return (
    <Link to={`/projects/${p.slug}`} className={`pcard${big ? " pcard--big" : ""}`}>
      <Figure src={coverOf(p)} code={code} label={p.title} seed={p.slug} />
      <div className="pcard__meta mono">
        <span>{code}</span>
        <span>{p.date.slice(0, 4)}</span>
      </div>
      <h3 className="pcard__title">{p.title}</h3>
      <Status items={isAvailable(p) ? [...p.status, "Available"] : p.status} />
      <p className="pcard__sum">{p.summary}</p>
      <p className="pcard__tags mono">{p.tags.join(" / ")}</p>
    </Link>
  );
}

function Feature({ p }) {
  const code = projectCode(p.slug);
  const specs = Object.entries(p.specs || {}).slice(0, 3);
  return (
    <section className="wrap feat">
      <div className="feat__bar mono">
        <span className="feat__live">
          <span className="lab-dot" aria-hidden="true" />
          Now on the bench
        </span>
        <span>
          {code} · {p.date}
        </span>
      </div>
      <div className="feat__grid">
        <Link to={`/projects/${p.slug}`} className="feat__media" aria-label={p.title}>
          <Figure src={coverOf(p)} code={code} label={p.title} seed={p.slug} />
          <span className="feat__marks" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </Link>
        <div className="feat__info">
          <p className="label">Latest project</p>
          <h2 className="feat__title">
            <Link to={`/projects/${p.slug}`}>{p.title}</Link>
          </h2>
          <Status items={isAvailable(p) ? [...p.status, "Available"] : p.status} />
          <p className="feat__sum">{p.summary}</p>
          {specs.length > 0 && (
            <dl className="specs mono">
              {specs.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          )}
          <div className="btns">
            <Link className="btn btn--accent" to={`/projects/${p.slug}`}>
              Open project →
            </Link>
            {p.youtube && (
              <a
                className="btn"
                href={`https://www.youtube.com/watch?v=${p.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GetList({ p }) {
  const rows = [...(p.get || [])];
  if (isOpen(p)) rows.push({ kind: "files", where: "GitHub", url: p.links.repo, price: "Free" });
  if (!rows.length) return null;
  return (
    <div className="getlist">
      {rows.map((g, i) => (
        <a key={i} className="getlist__row" href={g.url} target="_blank" rel="noopener noreferrer">
          <span className="mono getlist__kind">{GET_KINDS[g.kind] || g.kind}</span>
          <span className="getlist__where">{g.where}</span>
          <span className="mono getlist__price">{g.price || ""}</span>
          <span className="getlist__go" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function SupportBlock() {
  return (
    <div className="support">
      <p className="mono legend__label">Support</p>
      <h2 className="support__title">{copy.supportTitle}</h2>
      <p className="support__text">{copy.support}</p>
      {support.url ? (
        <a className="btn btn--accent" href={support.url} target="_blank" rel="noopener noreferrer">
          {support.name} ↗
        </a>
      ) : (
        <span className="btn btn--ghost">{support.name} · coming soon</span>
      )}
    </div>
  );
}

function Legend() {
  return (
    <section className="legend">
      <div className="wrap legend__inner">
        <p className="mono legend__label">00 / Legend</p>
        <h2 className="legend__title">{legend.title}</h2>
        <div className="legend__frags">
          {legend.fragments.map((f, i) => (
            <div key={i} className="legend__frag">
              <span className="mono">Frag. {String(i + 1).padStart(2, "0")}</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
        <p className="legend__signoff">{legend.signoff}</p>
      </div>
    </section>
  );
}

function NoteRow({ n }) {
  const inner = (
    <>
      <span className="mono nrow__date">{n.date}</span>
      <span className="mono nrow__code">{noteCode(n.slug)}</span>
      <span className="nrow__title">{n.title}</span>
      <span className="mono nrow__tags">{n.tags.join(" / ")}</span>
      <span className="nrow__go" aria-hidden="true">
        {n.external ? "↗" : "→"}
      </span>
    </>
  );
  return n.external ? (
    <a className="nrow" href={n.external} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link className="nrow" to={`/notes/${n.slug}`}>
      {inner}
    </Link>
  );
}

function Channels() {
  return (
    <div className="chan">
      {channels.map((c, i) => (
        <a
          key={c.id}
          className={`chan__item chan__item--${c.id}`}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mono chan__no">CH{i + 1}</span>
          <span className="chan__name">{c.name}</span>
          <span className="mono chan__handle">{c.handle}</span>
          <span className="chan__role">{c.role}</span>
          <span className="chan__go" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function VideoGrid({ list }) {
  if (!list.length) return null;
  return (
    <div className="vgrid">
      {list.map((v) => (
        <div key={v.id}>
          <VideoEmbed id={v.id} title={v.title} />
          <p className="mono vgrid__cap">{v.title}</p>
        </div>
      ))}
    </div>
  );
}

function Blocks({ body }) {
  return body.map((b, i) => {
    if (typeof b === "string") return <p key={i}>{b}</p>;
    if (b.h) return <h3 key={i}>{b.h}</h3>;
    if (b.code)
      return (
        <pre key={i} className="mono">
          <code>{b.code}</code>
        </pre>
      );
    if (b.img)
      return (
        <figure key={i} className="prose__img">
          <img src={b.img} alt={b.caption || ""} loading="lazy" />
          {b.caption && <figcaption className="mono">{b.caption}</figcaption>}
        </figure>
      );
    return null;
  });
}

/* ---------- pages ---------- */

export function LabHome() {
  const projects = sortedProjects();
  const notes = sortedNotes();
  const featured = featuredProject();
  const [a, b, ...rest] = projects.filter((p) => p !== featured);

  return (
    <Shell>
      <section className="hero wrap">
        <div className="hero__meta mono">
          <span>{lab.tagline}</span>
          <span>
            Index: {String(projects.length).padStart(2, "0")} projects ·{" "}
            {String(notes.length).padStart(2, "0")} notes
          </span>
        </div>
        <h1 className="wordmark" aria-label="18WATT">
          18WATT
        </h1>
        <Scope />
      </section>

      {featured && <Feature p={featured} />}

      <section className="wrap intro">
        <div className="hero__grid">
          <p className="hero__statement">{lab.statement}</p>
          <ul className="hero__disc mono">
            {disciplines.map((d, i) => (
              <li key={d.slug}>
                <Link to={`/projects?area=${d.slug}`}>
                  <span className="hero__disc-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hero__disc-name">{d.name}</span>
                  <span className="hero__disc-count">
                    {String(projects.filter((p) => p.areas.includes(d.slug)).length).padStart(2, "0")}
                  </span>
                  <span className="hero__disc-go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead no="01" title="Projects" to="/projects" linkLabel="All projects" />
        <div className="pgrid pgrid--feature">
          {a && <ProjectCard p={a} big />}
          {b && <ProjectCard p={b} big />}
        </div>
        <div className="pgrid">
          {rest.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <Legend />

      <section className="wrap sec">
        <SectionHead no="02" title="Lab notes" to="/notes" linkLabel="All notes" />
        <p className="sec-lede">{copy.notes}</p>
        <div className="nlist">
          {notes.slice(0, 6).map((n) => (
            <NoteRow key={n.slug} n={n} />
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead no="03" title="Media" to="/media" linkLabel="Media" />
        <p className="sec-lede">{copy.media}</p>
        <Channels />
        <VideoGrid list={videos.slice(0, 2)} />
      </section>

      <section className="wrap sec contact">
        <div>
          <p className="label">Signal in</p>
          <p className="contact__line">
            {copy.contact}{" "}
            <a href={`mailto:${lab.email}`}>{copy.contactCta}</a>
          </p>
        </div>
        <div className="contact__side">
          <p className="label">Take one home</p>
          <p className="contact__small">{copy.shop}</p>
          <div className="btns">
            <Link className="btn" to="/shop">
              Shop →
            </Link>
            {support.url && (
              <a className="btn" href={support.url} target="_blank" rel="noopener noreferrer">
                {support.name} ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}

export function LabProjects() {
  const { search } = useLocation();
  const area = new URLSearchParams(search).get("area");
  const all = sortedProjects();
  const projects = area ? all.filter((p) => p.areas.includes(area)) : all;
  return (
    <Shell title="Projects">
      <section className="wrap page-head">
        <p className="mono label">01 / Index</p>
        <h1 className="page-title">Projects</h1>
        <p className="sec-lede">{copy.projects}</p>
      </section>
      <section className="wrap sec sec--tight">
        <nav className="filter mono" aria-label="Filter by area">
          <Link to="/projects" className={!area ? "is-active" : ""}>
            All <span>{String(all.length).padStart(2, "0")}</span>
          </Link>
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              to={`/projects?area=${d.slug}`}
              className={area === d.slug ? "is-active" : ""}
            >
              {d.name}{" "}
              <span>
                {String(all.filter((p) => p.areas.includes(d.slug)).length).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>
        {projects.length > 0 ? (
          <div className="pgrid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <p className="empty mono">
            <span className="lab-dot" aria-hidden="true" />
            {copy.emptyArea}
          </p>
        )}
      </section>
    </Shell>
  );
}

export function LabProject() {
  const { slug } = useParams();
  const list = sortedProjects();
  const i = list.findIndex((p) => p.slug === slug);
  const p = list[i];
  if (!p) return <LabNotFound />;

  const code = projectCode(p.slug);
  const prev = list[i + 1];
  const next = list[i - 1];
  const links = Object.entries(p.links || {});
  const projectVideos = videos.filter((v) => v.project === p.slug);

  return (
    <Shell title={p.title}>
      <article className="wrap proj">
        <p className="mono label">
          <Link to="/projects">01 / Projects</Link> / {code}
        </p>
        <h1 className="page-title">{p.title}</h1>
        <div className="proj__row">
          <Status items={isAvailable(p) ? [...p.status, "Available"] : p.status} />
          <span className="mono">{p.date}</span>
          <span className="mono">{p.tags.join(" / ")}</span>
        </div>

        <div className="proj__cover">
          <Figure src={coverOf(p)} code={code} label={p.title} seed={p.slug} />
        </div>

        <div className="proj__grid">
          <div className="prose">
            <p className="proj__sum">{p.summary}</p>
            <Blocks body={p.body || []} />
            {p.youtube && <VideoEmbed id={p.youtube} title={p.title} />}
            <VideoGrid list={projectVideos} />
          </div>

          <aside className="proj__side">
            <p className="label">Spec sheet</p>
            <dl className="specs mono">
              <dt>ID</dt>
              <dd>{code}</dd>
              {Object.entries(p.specs || {}).map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            {links.length > 0 && (
              <div className="btns">
                {links.map(([k, url]) =>
                  isExternal(url) ? (
                    <a key={k} className="btn" href={url} target="_blank" rel="noopener noreferrer">
                      {LINK_LABELS[k] || k} ↗
                    </a>
                  ) : (
                    <a key={k} className="btn btn--accent" href={url}>
                      {LINK_LABELS[k] || k} →
                    </a>
                  )
                )}
              </div>
            )}
            {(isAvailable(p) || isOpen(p)) && (
              <div className="proj__get">
                <p className="label">Get one</p>
                <GetList p={p} />
              </div>
            )}
          </aside>
        </div>

        <nav className="pager mono">
          {prev ? <Link to={`/projects/${prev.slug}`}>← {prev.title}</Link> : <span />}
          {next ? <Link to={`/projects/${next.slug}`}>{next.title} →</Link> : <span />}
        </nav>
      </article>
    </Shell>
  );
}

export function LabNotes() {
  return (
    <Shell title="Lab notes">
      <section className="wrap page-head">
        <p className="mono label">02 / Log</p>
        <h1 className="page-title">Lab notes</h1>
        <p className="sec-lede">{copy.notes}</p>
      </section>
      <section className="wrap sec sec--tight">
        <div className="nlist">
          {sortedNotes().map((n) => (
            <NoteRow key={n.slug} n={n} />
          ))}
        </div>
      </section>
    </Shell>
  );
}

export function LabNote() {
  const { slug } = useParams();
  const n = sortedNotes().find((x) => x.slug === slug);
  if (!n) return <LabNotFound />;
  return (
    <Shell title={n.title}>
      <article className="wrap proj">
        <p className="mono label">
          <Link to="/notes">02 / Lab notes</Link> / {noteCode(n.slug)}
        </p>
        <h1 className="page-title page-title--note">{n.title}</h1>
        <div className="proj__row">
          <span className="mono">{n.date}</span>
          <span className="mono">{n.tags.join(" / ")}</span>
        </div>
        <div className="prose prose--note">
          <p className="proj__sum">{n.summary}</p>
          <Blocks body={n.body || []} />
          {n.external && (
            <a className="btn" href={n.external} target="_blank" rel="noopener noreferrer">
              Read the full write-up ↗
            </a>
          )}
        </div>
      </article>
    </Shell>
  );
}

export function LabShop() {
  const all = sortedProjects();
  const available = all.filter(isAvailable);
  const open = all.filter(isOpen);
  return (
    <Shell title="Shop">
      <section className="wrap page-head">
        <p className="mono label">04 / Supply</p>
        <h1 className="page-title">Shop</h1>
        <p className="sec-lede">{copy.shop}</p>
      </section>

      <section className="wrap sec sec--tight">
        <p className="label shop__label">Available now</p>
        {available.length > 0 ? (
          <div className="shopgrid">
            {available.map((p) => (
              <div key={p.slug} className="shopitem">
                <Link to={`/projects/${p.slug}`}>
                  <Figure src={coverOf(p)} code={projectCode(p.slug)} label={p.title} seed={p.slug} />
                </Link>
                <div className="pcard__meta mono">
                  <span>{projectCode(p.slug)}</span>
                  <span>{p.tags.join(" / ")}</span>
                </div>
                <h3 className="pcard__title">
                  <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="pcard__sum">{p.summary}</p>
                <GetList p={p} />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty mono">
            <span className="lab-dot" aria-hidden="true" />
            {copy.shopEmpty}
          </p>
        )}
      </section>

      {open.length > 0 && (
        <section className="wrap sec">
          <SectionHead no="OS" title="Build it yourself" />
          <p className="sec-lede">{copy.diy}</p>
          <div className="nlist">
            {open.map((p) => (
              <a
                key={p.slug}
                className="nrow"
                href={p.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono nrow__date">{p.date}</span>
                <span className="mono nrow__code">{projectCode(p.slug)}</span>
                <span className="nrow__title">{p.title}</span>
                <span className="mono nrow__tags">Source files · free</span>
                <span className="nrow__go" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="legend legend--support">
        <div className="wrap">
          <SupportBlock />
        </div>
      </section>
    </Shell>
  );
}

export function LabMedia() {
  return (
    <Shell title="Media">
      <section className="wrap page-head">
        <p className="mono label">03 / Channels</p>
        <h1 className="page-title">Media</h1>
        <p className="sec-lede">{copy.media}</p>
      </section>
      <section className="wrap sec sec--tight">
        <Channels />
        <VideoGrid list={videos} />
      </section>
    </Shell>
  );
}

export function LabNotFound() {
  return (
    <Shell title="Not found">
      <section className="wrap page-head nf">
        <p className="mono label">ERR / 404</p>
        <h1 className="wordmark wordmark--small">NO SIGNAL</h1>
        <p className="sec-lede">
          {copy.notFound} <Link to="/">Back to the lab →</Link>
        </p>
      </section>
    </Shell>
  );
}
