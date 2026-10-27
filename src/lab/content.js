/*
 * 18WATT LAB — content index.
 * Everything the site shows lives here. To publish something new, add an
 * entry to `projects` or `notes`; the home page, index pages and detail
 * pages pick it up automatically (newest first by `date`).
 *
 * Images: drop files into /public/lab/<slug>/ and reference them as
 *   cover: "/lab/<slug>/cover.jpg"
 * Leave `cover` empty and a generated technical placeholder is drawn.
 *
 * Video: `youtube` takes a YouTube video id (the part after watch?v=).
 * With no cover, the video's thumbnail is used.
 *
 * Home page hook: add `featured: true` to one project to pin it to the big
 * "Now on the bench" block; otherwise the newest project is shown.
 */

export const lab = {
  name: "18WATT",
  tagline: "Independent lab — hardware / AI / sound",
  statement:
    "A lab for instruments that don't exist yet. Hardware, machine intelligence and sound, soldered into objects you can hold. Small doors to somewhere else.",
  author: "Sergey Tarasov",
  email: "sergey.nodejs@gmail.com",
};

// Support link (Buy Me a Coffee, Ko-fi, ...). Leave url empty to show
// "coming soon" instead of a button.
export const support = {
  name: "Buy Me a Coffee",
  url: "", // e.g. "https://buymeacoffee.com/<your-handle>"
};

/*
 * Site copy. The legend is never stated outright: 18 watts is what a small
 * valve amp needs to sing, and roughly what a human brain burns while it
 * dreams. Music + the dreaming mind, hidden in the name.
 */
export const copy = {
  projects: "Instruments, controllers, machines. Each one works. Each one opens onto something.",
  notes: "Field notes from the bench: what was tried, what burned, what finally hummed.",
  media:
    "The bench, recorded. Full transmissions on YouTube, short signals on Instagram. The archive lives here.",
  contact: "Building something that shouldn't exist yet?",
  contactCta: "Open a channel →",
  footer: "Powered by eighteen watts",
  emptyArea: "Nothing on this channel yet. First signal incoming.",
  notFound: "This room hasn't been built yet.",
  shop: "Take a piece of the lab home. Assembled units and kits, bare boards made on demand, and every file open.",
  shopEmpty: "First batch is still on the bench.",
  diy: "Open hardware. Fork it, fab it, bend it into something else.",
  supportTitle: "Feed the bench",
  support:
    "Eighteen watts isn't much. Every coffee buys a little more solder, a few more boards, one more night of the lab running.",
};

export const legend = {
  title: "Eighteen watts",
  fragments: [
    "Eighteen watts will push a small valve amplifier until it sings. It is also, give or take, what a human brain burns while it dreams.",
    "Everything here is built on that budget. Hand-wired, hand-coded, a little unstable on purpose. Instruments that listen back. Controllers that turn a gesture into weather. Models fed on noise until they start to hum.",
    "Each project is a small door. Some open onto sound, some onto light, some onto rooms that only exist while the power is on.",
  ],
  signoff: "The world outside is loud and finished. On the bench it is still being drawn.",
};

// Areas of work. Each project lists the area slugs it belongs to in `areas`;
// the home page links each area to /projects?area=<slug>.
export const disciplines = [
  { slug: "electronics", name: "Electronics" },
  { slug: "firmware", name: "Firmware" },
  { slug: "ai", name: "Machine intelligence" },
  { slug: "music-tech", name: "Music tech" },
  { slug: "interfaces", name: "Interfaces" },
];

export const channels = [
  {
    id: "youtube",
    name: "YouTube",
    handle: "@GoodVibeSolutions",
    url: "https://www.youtube.com/@GoodVibeSolutions",
    role: "Full transmissions: demos, builds, walkthroughs",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@18watt",
    url: "https://www.instagram.com/18watt",
    role: "Short signals from the bench",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "jsonslim",
    url: "https://github.com/jsonslim",
    role: "Open schematics, firmware, source",
  },
];

// Status vocabulary — keep to these so the labels stay consistent.
export const STATUS = {
  PROTOTYPE: "Prototype",
  EXPERIMENT: "Experiment",
  OPEN_SOURCE: "Open source",
  SHIPPED: "Shipped",
  IN_PROGRESS: "In progress",
};

export const projects = [
  {
    slug: "whammy-maximizer",
    areas: ["music-tech", "interfaces"],
    title: "Whammy Maximizer",
    date: "2021-01",
    status: [STATUS.OPEN_SOURCE],
    tags: ["MIDI", "Max for Live", "Guitar FX"],
    summary:
      "Max for Live device that sequences pitch-shift automation on a Digitech Whammy pedal over MIDI.",
    body: [
      "The Whammy is played with a foot. This device lets Ableton play it instead: pitch sweeps and mode changes are written as clips and sent to the pedal as MIDI, locked to the session tempo.",
    ],
    specs: { Host: "Ableton Live / Max for Live", Protocol: "MIDI", Target: "Digitech Whammy" },
    links: { repo: "https://github.com/jsonslim/Whammy-Maximizer" },
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "push-light-studio",
    areas: ["music-tech", "interfaces"],
    title: "Push Light Studio",
    date: "2022-02",
    status: [STATUS.OPEN_SOURCE, STATUS.SHIPPED],
    tags: ["MIDI", "Web", "Ableton Push"],
    summary:
      "Browser editor for building MIDI sequences that drive light shows on the Ableton Push pad grid.",
    body: [
      "Draw frames on a virtual pad grid, chain them into a sequence, export MIDI. Play the clip in Live and the Push becomes a light instrument.",
    ],
    specs: { Stack: "React", Output: "MIDI", Target: "Ableton Push" },
    links: {
      live: "/push-light-studio",
      repo: "https://github.com/jsonslim/Push-light-studio",
    },
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "vr-ambilight",
    areas: ["electronics", "firmware"],
    title: "VR Ambilight",
    date: "2021-11",
    status: [STATUS.EXPERIMENT, STATUS.OPEN_SOURCE],
    tags: ["LED", "VR", "Firmware"],
    summary:
      "Peripheral LED system for the Pico 4 headset: extends the image into your peripheral vision to boost presence and ease eye strain.",
    body: [],
    specs: { Target: "Pico 4 HMD", Output: "Addressable LEDs" },
    links: { repo: "https://github.com/jsonslim/VR-ambilight" },
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "neurodrive",
    areas: ["electronics", "interfaces"],
    title: "NeuroDrive",
    date: "2023-07",
    status: [STATUS.OPEN_SOURCE, STATUS.PROTOTYPE],
    tags: ["EMS", "VR", "Haptics"],
    summary: "Open-source muscle stimulator for VR haptic feedback.",
    body: [],
    specs: { Domain: "Electrical muscle stimulation" },
    links: { writeup: "https://hackaday.io/project/175991-neurodrive" },
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "smart-doorbell",
    areas: ["electronics", "firmware"],
    title: "Smart Doorbell",
    date: "2023-04",
    status: [STATUS.SHIPPED],
    tags: ["ESP32", "Camera", "Telegram"],
    summary:
      "Wi-Fi + Ethernet camera doorbell. Live RTSP stream, motion-triggered notifications through Telegram.",
    body: [],
    specs: { MCU: "ESP32-CAM", Network: "Wi-Fi / Ethernet", Stream: "RTSP" },
    links: {},
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "bitcoin-terminal",
    areas: ["electronics", "firmware"],
    title: "Bitcoin Payment Terminal",
    date: "2022-03",
    status: [STATUS.SHIPPED],
    tags: ["ESP32", "Lightning", "POS"],
    summary:
      "ESP32 point-of-sale device that lets small businesses take Bitcoin payments over the Lightning Network.",
    body: [],
    specs: { MCU: "ESP32", Network: "Lightning" },
    links: {},
    get: [],
    cover: "",
    youtube: "",
  },
  {
    slug: "spray-paint-printer",
    areas: ["electronics", "interfaces"],
    title: "Spray Paint Printer",
    date: "2020-03",
    status: [STATUS.EXPERIMENT],
    tags: ["CNC", "Graffiti", "React"],
    summary:
      "Machine that paints graffiti from digital images: CNC-driven spray can plus a browser image editor.",
    body: [],
    specs: { Motion: "CNC", Editor: "React" },
    links: {},
    get: [],
    cover: "",
    youtube: "",
  },
];

/*
 * Lab notes: short write-ups. Either internal (`body` blocks) or pointers
 * to a write-up hosted elsewhere (`external`).
 * Body blocks: "plain paragraph", { h: "Heading" }, { code: "..." },
 *              { img: "/lab/..", caption: ".." }
 */
export const notes = [
  {
    slug: "unihiker-enclosure",
    title: "Shaping an enclosure for the Unihiker",
    date: "2023-09-19",
    tags: ["Enclosure", "3D print", "DFRobot"],
    summary: "Designing a case for the Unihiker single-board computer for a DFRobot maker challenge.",
    external: "https://community.dfrobot.com/makelog-315063.html",
  },
  {
    slug: "neurodrive-log",
    title: "NeuroDrive build log",
    date: "2023-07-02",
    tags: ["EMS", "Haptics"],
    summary: "Build log for an open-source muscle stimulator for VR.",
    external: "https://hackaday.io/project/175991-neurodrive",
  },
];

// The home page hook: the project marked `featured: true`, else the newest.
export const featuredProject = () => {
  const list = sortedProjects();
  return list.find((p) => p.featured) || list[0];
};

// Cover image, falling back to the YouTube thumbnail when there is a video.
export const coverOf = (p) =>
  p.cover || (p.youtube ? `https://i.ytimg.com/vi/${p.youtube}/maxresdefault.jpg` : "");

// Recent videos for the Media section. Add YouTube ids here to embed them.
export const videos = [
  // { id: "dQw4w9WgXcQ", title: "Whammy Maximizer demo", project: "whammy-maximizer" },
];

/*
 * Where to get a project. Add entries to a project's `get` list:
 *   { kind: "kit",   where: "Tindie",  url: "https://www.tindie.com/products/...", price: "€49" }
 *   { kind: "pcb",   where: "OSHWLab", url: "https://oshwlab.com/..." }
 *   { kind: "pcb",   where: "PCBWay",  url: "https://www.pcbway.com/project/shareproject/..." }
 *   { kind: "build", where: "Gumroad", url: "...", price: "€9" }
 * A project with a `repo` link is also listed as free source files.
 */
export const GET_KINDS = {
  kit: "Assembled / kit",
  pcb: "Bare PCB",
  build: "Build guide",
  files: "Source files",
};

export const isAvailable = (p) => (p.get || []).length > 0;
export const isOpen = (p) => Boolean(p.links && p.links.repo);

/* ---- helpers ---- */

const byDateDesc = (a, b) => (a.date < b.date ? 1 : -1);

export const sortedProjects = () => [...projects].sort(byDateDesc);
export const sortedNotes = () => [...notes].sort(byDateDesc);

// Stable catalogue numbers: oldest project is P-001.
export const projectCode = (slug) => {
  const ordered = [...projects].sort((a, b) => (a.date > b.date ? 1 : -1));
  const i = ordered.findIndex((p) => p.slug === slug);
  return `P-${String(i + 1).padStart(3, "0")}`;
};

export const noteCode = (slug) => {
  const ordered = [...notes].sort((a, b) => (a.date > b.date ? 1 : -1));
  const i = ordered.findIndex((n) => n.slug === slug);
  return `N-${String(i + 1).padStart(3, "0")}`;
};
