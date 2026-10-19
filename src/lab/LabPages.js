import React from "react";
import { Link, useParams } from "react-router-dom";
import { Shell, SectionHead, Status, Figure, VideoEmbed, Scope } from "./LabUI";
import {
  lab,
  channels,
  videos,
  sortedProjects,
  sortedNotes,
  projectCode,
  noteCode,
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
      <Figure src={p.cover} code={code} label={p.title} seed={p.slug} />
      <div className="pcard__meta mono">
        <span>{code}</span>
        <span>{p.date.slice(0, 4)}</span>
      </div>
      <h3 className="pcard__title">{p.title}</h3>
      <Status items={p.status} />
      <p className="pcard__sum">{p.summary}</p>
      <p className="pcard__tags mono">{p.tags.join(" / ")}</p>
    </Link>
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
  const [a, b, ...rest] = projects;

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
        <div className="hero__grid">
          <p className="hero__statement">{lab.statement}</p>
          <ul className="hero__disc mono">
            {lab.disciplines.map((d, i) => (
              <li key={d}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {d}
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

      <section className="wrap sec">
        <SectionHead no="02" title="Lab notes" to="/notes" linkLabel="All notes" />
        <p className="sec-lede">
          What I tried, how it works, what broke and what fixed it.
        </p>
        <div className="nlist">
          {notes.slice(0, 6).map((n) => (
            <NoteRow key={n.slug} n={n} />
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead no="03" title="Media" to="/media" linkLabel="Media" />
        <p className="sec-lede">
          Full demos on YouTube, short clips on Instagram. Every project ends up
          archived here.
        </p>
        <Channels />
        <VideoGrid list={videos.slice(0, 2)} />
      </section>

      <section className="wrap sec contact">
        <p className="label">Signal in</p>
        <p className="contact__line">
          Building a strange instrument, controller or device?{" "}
          <a href={`mailto:${lab.email}`}>Write to the lab →</a>
        </p>
      </section>
    </Shell>
  );
}

export function LabProjects() {
  const projects = sortedProjects();
  return (
    <Shell title="Projects">
      <section className="wrap page-head">
        <p className="mono label">01 / Index</p>
        <h1 className="page-title">Projects</h1>
        <p className="sec-lede">
          Controllers, instruments, firmware and odd machines. Built, tested,
          documented.
        </p>
      </section>
      <section className="wrap sec sec--tight">
        <div className="pgrid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
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
          <Status items={p.status} />
          <span className="mono">{p.date}</span>
          <span className="mono">{p.tags.join(" / ")}</span>
        </div>

        <div className="proj__cover">
          <Figure src={p.cover} code={code} label={p.title} seed={p.slug} />
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
        <p className="sec-lede">
          Short technical write-ups: experiments, schematics, code and
          observations from the bench.
        </p>
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

export function LabMedia() {
  return (
    <Shell title="Media">
      <section className="wrap page-head">
        <p className="mono label">03 / Channels</p>
        <h1 className="page-title">Media</h1>
        <p className="sec-lede">
          YouTube carries the full demonstrations. Instagram carries the short
          clips straight from the bench. This site keeps the archive.
        </p>
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
          Nothing on this channel. <Link to="/">Back to the lab →</Link>
        </p>
      </section>
    </Shell>
  );
}
