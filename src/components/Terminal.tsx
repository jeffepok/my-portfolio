"use client";

import { useEffect, useRef } from "react";

type Theme = "hacker" | "matrix" | "dracula" | "solarized" | "light";

export default function Terminal() {
  const outputRef     = useRef<HTMLDivElement>(null);
  const promptLineRef = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLInputElement>(null);
  const inputRenderRef= useRef<HTMLSpanElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const termBodyRef   = useRef<HTMLElement>(null);
  const initRef       = useRef(false);

  const setTheme = (t: Theme) => {
    document.body.dataset.theme = t;
    try { localStorage.setItem("jp_theme", t); } catch {}
  };

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const output      = outputRef.current!;
    const promptLine  = promptLineRef.current!;
    const inputEl     = inputRef.current!;
    const inputRender = inputRenderRef.current!;
    const titleEl     = titleRef.current!;
    const termBody    = termBodyRef.current!;
    const body        = document.body;

    // -------- state --------
    const state: {
      history: string[];
      historyIdx: number;
      cwd: string;
      booted: boolean;
      locked: boolean;
      matrixOn: boolean;
      matrixRAF: number | null;
    } = {
      history: (() => {
        try { return JSON.parse(localStorage.getItem("jp_history") || "[]"); }
        catch { return []; }
      })(),
      historyIdx: -1,
      cwd: "~",
      booted: false,
      locked: true,
      matrixOn: false,
      matrixRAF: null,
    };

    // -------- helpers --------
    const esc = (s: unknown) =>
      String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const scrollToBottom = () => { termBody.scrollTop = termBody.scrollHeight; };

    const print = (html: string, cls = "") => {
      const div = document.createElement("div");
      div.className = "line " + cls;
      div.innerHTML = html;
      output.appendChild(div);
      scrollToBottom();
      return div;
    };

    const printGroup = (lines: string[]) => {
      const wrap = document.createElement("div");
      wrap.className = "group";
      wrap.innerHTML = lines.join("\n");
      output.appendChild(wrap);
      scrollToBottom();
    };

    const printRaw = (node: Node) => {
      output.appendChild(node);
      scrollToBottom();
    };

    const echoCommand = (cmd: string) => {
      const promptHTML =
        `<span class="prompt-user">jefferson</span>` +
        `<span class="prompt-at">@</span>` +
        `<span class="prompt-host">portfolio</span>` +
        `<span class="prompt-colon">:</span>` +
        `<span class="prompt-path">${esc(state.cwd)}</span>` +
        `<span class="prompt-symbol">$</span>`;
      print(`${promptHTML} <span class="typed">${esc(cmd)}</span>`, "command-echo");
    };

    // -------- ASCII banner --------
    const BANNER = String.raw`
     ██╗███████╗███████╗███████╗███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗
     ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║
     ██║█████╗  █████╗  █████╗  █████╗  ██████╔╝███████╗██║   ██║██╔██╗ ██║
██   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╗██║
╚█████╔╝███████╗██║     ██║     ███████╗██║  ██║███████║╚██████╔╝██║ ╚████║
 ╚════╝ ╚══════╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
        █████╗ ██████╗ ██████╗  █████╗ ██╗      ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
       ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║      ██╔══██╗██╔═══██╗██║ ██╔╝██║   ██║
       ███████║██║  ██║██║  ██║███████║██║█████╗██████╔╝██║   ██║█████╔╝ ██║   ██║
       ██╔══██║██║  ██║██║  ██║██╔══██║██║╚════╝██╔═══╝ ██║   ██║██╔═██╗ ██║   ██║
       ██║  ██║██████╔╝██████╔╝██║  ██║██║      ██║     ╚██████╔╝██║  ██╗╚██████╔╝
       ╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝
`;

    const printBanner = () => {
      const div = document.createElement("div");
      div.className = "banner";
      div.textContent = BANNER;
      output.appendChild(div);
      scrollToBottom();
    };

    // -------- data --------
    const ME = {
      name: "Jefferson Tuffour Addai-Poku",
      role: "Lead Full-Stack Engineer",
      location: "Mellieħa, Malta · GMT+2 · fully remote",
      email: "jeffepok@gmail.com",
      phone: "+356 9998 5373",
      github: "https://github.com/jeffepok",
      linkedin: "https://www.linkedin.com/in/jefferson-addai-poku/",
      summary:
        "Senior full-stack engineer with 6+ years of production ownership across Node.js, Python, MongoDB, and AWS — from system design and database architecture through deployment, observability, on-call incident response, and performance optimization.",
    };

    const SKILLS: Record<string, string[]> = {
      Languages: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL", "Dart", "VB.NET"],
      Backend:   ["Express", "Django", "DRF", "FastAPI", "Flask", "SQLAlchemy", "Celery", "pytest"],
      Frontend:  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
      Databases: ["PostgreSQL", "MySQL", "Redis", "SQLite", "MongoDB"],
      Realtime:  ["WebSockets", "Async I/O", "Message Queues", "REST", "OAuth/JWT", "GraphQL"],
      Cloud:     ["AWS (EC2, S3, RDS, Route 53)", "Docker", "Docker Compose", "Cloudflare"],
      CICD:      ["GitHub Actions", "Bitbucket Pipelines", "Codemagic", "Git/GitFlow"],
      Reliability: ["Structured Logging", "Metrics", "Audit Trails", "Idempotency", "Circuit Breakers", "SLOs"],
      Security:  ["Multi-tenant Isolation", "RBAC", "Secrets Management", "Encryption", "Least Privilege"],
    };

    const SKILL_CLASS: Record<string, string> = {
      Languages: "lang", Backend: "fw", Frontend: "fw", Databases: "db",
      Realtime: "fw", Cloud: "cloud", CICD: "cloud", Reliability: "lang", Security: "db",
    };

    const EXPERIENCE = [
      {
        role: "Software Engineer  ·  via DataArt",
        company: "Funnel Leasing",
        when: "Present  ·  Remote (funnelleasing.com)",
        bullets: [
          "Engineer on Funnel's AI-infused multifamily CRM and leasing platform — a B2B SaaS used by major US property operators including Camden, Essex, Cortland, and RKW Residential.",
          "Engaged through DataArt as part of a long-running engineering partnership embedded with Funnel's product teams.",
          "Platform surface area: AI-driven virtual leasing assistant (email / chat / SMS / voice), contact-center software, online leasing and application processing with fraud detection, the Nestio resident portal, and trigger-based marketing automation.",
          "Integration discipline: connectors and data sync with major property-management systems — Yardi, RealPage, Entrata — where idempotency, retries, audit trails, and observability are not optional.",
        ],
      },
      {
        role: "Senior Full-Stack Developer (Production Owner)",
        company: "Overloop",
        when: "2021 – Present  ·  Mellieħa, Malta",
        bullets: [
          "End-to-end ownership of multi-tenant SaaS systems on AWS — architecture, schema design, Node.js + Python APIs, React frontend, deployment, monitoring, and incident response.",
          "Built integration layers for Stripe, Paystack, DVLA, and Mailjet with retry logic, idempotency keys, structured logging, and audit trails.",
          "Designed multi-tenant data isolation, RBAC, and per-tenant DNS/SSL provisioning automation across Cloudflare.",
          "Established CI/CD discipline (GitHub Actions, Codemagic) with pytest suites, automated linting, staged rollouts, and rollback paths.",
          "Performance: query optimization, indexing strategy, endpoint profiling on PostgreSQL; Redis caching for hot paths.",
          "Containerized with Docker and Docker Compose; deployed to AWS (EC2, S3, RDS, Route 53) with Cloudflare edge routing.",
        ],
      },
      {
        role: "Software Developer (Node.js + Python)",
        company: "AmaliTech",
        when: "2020 – 2021  ·  Ghana",
        bullets: [
          "Built backend services in Node.js and Python — REST API design, OAuth/JWT, PostgreSQL/MySQL, CI on GitLab and GitHub.",
          "Standardized dev/staging environments with Docker, removing 'works on my machine' incidents from sprint retros.",
          "Production debugging across vendor integrations, full-stack triage and resolution.",
        ],
      },
      {
        role: "Junior Developer",
        company: "Maatec Systems",
        when: "2019 – 2020  ·  Ghana",
        bullets: [
          "Built and maintained internal tools and client web apps with Django + JavaScript over SQL backends.",
          "Triaged production issues and shipped incremental fixes daily.",
        ],
      },
    ];

    const PROJECTS = [
      {
        name: "Brivana",
        tagline: "Multi-Tenant SaaS Platform",
        stack: "Node.js · Django · React · PostgreSQL · AWS",
        desc: "Tenant data isolation, RBAC, Stripe + Paystack payments with idempotency, Mailjet transactional email, automated Cloudflare DNS/SSL provisioning. Full production ownership: architecture, deployment, observability, on-call.",
      },
      {
        name: "Morevans",
        tagline: "UK Logistics Marketplace",
        stack: "Django · Flutter · AWS",
        desc: "Distance/volume pricing engine, DVLA verification API integration with retry/idempotency and structured audit logging, AWS topology (EC2/S3/RDS), staged CI/CD rollout. Provider mobile app shipped to Google Play closed testing via Codemagic.",
      },
      {
        name: "PickNDrop",
        tagline: "Delivery Marketplace",
        stack: "Django · React · Flutter",
        desc: "Architected shared API contracts across web and mobile clients with real-time tracking — system-design work mapping cleanly to workflow automation and orchestration patterns.",
      },
      {
        name: "Korb Agent",
        tagline: "Production system",
        stack: "Node.js · Python · AWS",
        desc: "Architected, deployed, monitored, and debugged in production end-to-end.",
      },
    ];

    const EDUCATION = [
      { what: "BSc — Software / Computer Science", where: "KNUST, Kumasi, Ghana", when: "2014 – 2019" },
      { what: "Software Engineering Training", where: "AmaliTech Training Academy, Ghana", when: "2019 – 2020" },
      { what: "2nd Place — Code Sprint Malta", where: "National coding competition", when: "" },
    ];

    // -------- matrix rain --------
    const startMatrix = () => {
      if (state.matrixOn) return;
      state.matrixOn = true;
      const canvas = document.createElement("canvas");
      canvas.id = "matrixRain";
      document.body.appendChild(canvas);

      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.scale(dpr, dpr);
      };
      resize();
      window.addEventListener("resize", resize);

      const fontSize = 16;
      const cols = Math.floor(window.innerWidth / fontSize);
      const drops = Array(cols).fill(1);
      const chars =
        "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";

      const tick = () => {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#39ff14";
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        for (let i = 0; i < drops.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        state.matrixRAF = requestAnimationFrame(tick);
      };
      tick();
    };

    const stopMatrix = () => {
      if (!state.matrixOn) return;
      state.matrixOn = false;
      if (state.matrixRAF !== null) cancelAnimationFrame(state.matrixRAF);
      const c = document.getElementById("matrixRain");
      if (c) c.remove();
    };

    // -------- commands --------
    type CommandHandler = (args: string[]) => void | Promise<void>;
    const COMMANDS: Record<string, { desc: string; run: CommandHandler }> = {
      help: {
        desc: "show available commands",
        run: () => {
          const rows: [string, string][] = [
            ["help", "show this help"],
            ["whoami", "who is jefferson?"],
            ["about", "longer profile / mission"],
            ["experience", "work history"],
            ["skills", "technical stack"],
            ["projects", "selected production systems"],
            ["education", "education + awards"],
            ["contact", "how to reach me"],
            ["resume", "download my CV"],
            ["socials", "open github / linkedin"],
            ["theme [name]", "switch theme · hacker|matrix|dracula|solarized|light"],
            ["banner", "redraw the ASCII banner"],
            ["clear / cls", "clear the screen"],
            ["echo <text>", "echo back text"],
            ["date", "current date/time"],
            ["history", "show command history"],
            ["ls", "list 'files' in this terminal"],
            ["cat <file>", "print a file's contents"],
            ["pwd", "print working 'directory'"],
            ["matrix", "toggle the matrix rain"],
            ["sudo", "...try it"],
            ["exit", "close (kind of)"],
          ];
          const lines = rows.map(
            ([c, d]) =>
              `<span class="accent">${esc(c.padEnd(16))}</span><span class="muted">${esc(d)}</span>`
          );
          printGroup([`<span class="section-title">commands</span>`, ...lines]);
        },
      },

      whoami: {
        desc: "who is jefferson",
        run: () => {
          printGroup([
            `<span class="bold accent">${esc(ME.name)}</span>`,
            `<span class="muted">${esc(ME.role)}</span>`,
            `<span class="muted">${esc(ME.location)}</span>`,
            ``,
            esc(ME.summary),
          ]);
        },
      },

      about: {
        desc: "longer profile",
        run: () => {
          printGroup([
            `<span class="section-title">why I fit a lead role</span>`,
            `<span class="accent">›</span> <span class="bold">Production ownership end-to-end.</span> Architecture, deploy, monitor, debug — no throw-it-over-the-wall handoffs.`,
            `<span class="accent">›</span> <span class="bold">Node.js + Python across the stack.</span> Right runtime per workload, not dogma.`,
            `<span class="accent">›</span> <span class="bold">Performance & query optimization.</span> Profile first, find the bottleneck, fix it, prove the win with metrics.`,
            `<span class="accent">›</span> <span class="bold">Vendor API integration as a discipline.</span> Stripe, Paystack, Mailjet, DVLA — retry, idempotency, circuit breakers, audit trails.`,
            `<span class="accent">›</span> <span class="bold">Reliability & observability mindset.</span> Structured logs, metrics, error tracking, incident playbooks — not afterthoughts.`,
            `<span class="accent">›</span> <span class="bold">Security-conscious by default.</span> Multi-tenant isolation, RBAC, secrets, encryption, least privilege.`,
          ]);
        },
      },

      experience: {
        desc: "work history",
        run: () => {
          const wrap = document.createElement("div");
          wrap.className = "group";
          wrap.innerHTML = `<div class="line section-title">experience</div>`;
          EXPERIENCE.forEach((j) => {
            const job = document.createElement("div");
            job.className = "job";
            job.innerHTML =
              `<div class="line"><span class="role">${esc(j.role)}</span> <span class="muted">@</span> <span class="company">${esc(j.company)}</span></div>` +
              `<div class="when">${esc(j.when)}</div>` +
              `<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
            wrap.appendChild(job);
          });
          printRaw(wrap);
        },
      },

      skills: {
        desc: "technical stack",
        run: () => {
          const wrap = document.createElement("div");
          wrap.className = "group";
          wrap.innerHTML = `<div class="line section-title">technical stack</div>`;
          Object.entries(SKILLS).forEach(([cat, items]) => {
            const cls = SKILL_CLASS[cat] || "";
            const tags = items.map((s) => `<span class="tag ${cls}">${esc(s)}</span>`).join("");
            const row = document.createElement("div");
            row.className = "line";
            row.innerHTML = `<span class="muted">${esc(cat.padEnd(12))}</span> ${tags}`;
            wrap.appendChild(row);
          });
          printRaw(wrap);
        },
      },

      projects: {
        desc: "selected systems",
        run: () => {
          const wrap = document.createElement("div");
          wrap.className = "group";
          wrap.innerHTML = `<div class="line section-title">selected production systems</div>`;
          PROJECTS.forEach((p) => {
            const div = document.createElement("div");
            div.className = "project";
            div.innerHTML =
              `<div class="line"><span class="name">${esc(p.name)}</span> <span class="muted">— ${esc(p.tagline)}</span></div>` +
              `<div class="meta">${esc(p.stack)}</div>` +
              `<div class="desc">${esc(p.desc)}</div>`;
            wrap.appendChild(div);
          });
          printRaw(wrap);
        },
      },

      education: {
        desc: "education + awards",
        run: () => {
          const lines = [`<span class="section-title">education & awards</span>`];
          EDUCATION.forEach((e) => {
            lines.push(
              `<span class="accent">▸</span> <span class="bold">${esc(e.what)}</span>` +
                (e.where ? ` <span class="muted">— ${esc(e.where)}</span>` : "") +
                (e.when ? ` <span class="muted">(${esc(e.when)})</span>` : "")
            );
          });
          printGroup(lines);
        },
      },

      contact: {
        desc: "how to reach me",
        run: () => {
          const rows: [string, string][] = [
            ["email",    `<a class="link" href="mailto:${ME.email}">${ME.email}</a>`],
            ["phone",    esc(ME.phone)],
            ["location", esc(ME.location)],
            ["github",   `<a class="link" target="_blank" rel="noopener" href="${ME.github}">${ME.github}</a>`],
            ["linkedin", `<a class="link" target="_blank" rel="noopener" href="${ME.linkedin}">${ME.linkedin}</a>`],
          ];
          const wrap = document.createElement("div");
          wrap.className = "group";
          wrap.innerHTML =
            `<div class="line section-title">contact</div>` +
            `<div class="kv">${rows.map(([k, v]) => `<div class="k">${k}</div><div class="v">${v}</div>`).join("")}</div>`;
          printRaw(wrap);
        },
      },

      resume: {
        desc: "open CV",
        run: () => {
          printGroup([
            `<span class="muted">opening resume...</span>`,
            `<span class="accent">→</span> <a class="link" href="mailto:${ME.email}?subject=Hi%20Jefferson%20—%20Resume%20Request">request the latest copy via email</a>`,
          ]);
        },
      },

      socials: {
        desc: "links",
        run: () => {
          printGroup([
            `<span class="accent">→</span> <a class="link" target="_blank" rel="noopener" href="${ME.github}">github.com/jeffepok</a>`,
            `<span class="accent">→</span> <a class="link" target="_blank" rel="noopener" href="${ME.linkedin}">linkedin.com/in/jefferson-addai-poku</a>`,
          ]);
        },
      },

      theme: {
        desc: "switch theme",
        run: (args) => {
          const ALLOWED: Theme[] = ["hacker", "matrix", "dracula", "solarized", "light"];
          if (!args[0]) {
            print(
              `<span class="muted">current theme:</span> <span class="accent">${esc(body.dataset.theme)}</span>` +
                `<br/><span class="muted">available:</span> ${ALLOWED.map((t) => `<span class="tag">${t}</span>`).join("")}`
            );
            return;
          }
          const t = args[0].toLowerCase() as Theme;
          if (!ALLOWED.includes(t)) {
            print(`<span class="err">theme: unknown theme '${esc(t)}'</span>`);
            return;
          }
          setTheme(t);
          print(`<span class="muted">theme set to</span> <span class="accent">${esc(t)}</span>`);
        },
      },

      banner: { desc: "redraw banner", run: () => printBanner() },
      clear:  { desc: "clear screen", run: () => { output.innerHTML = ""; } },
      cls:    { desc: "alias for clear", run: () => { output.innerHTML = ""; } },
      echo:   { desc: "echo back text", run: (args) => print(esc(args.join(" "))) },
      date:   { desc: "current date/time", run: () => print(esc(new Date().toString())) },

      pwd: {
        desc: "print working dir",
        run: () =>
          print(
            `/home/jefferson/${state.cwd === "~" ? "" : state.cwd}`.replace(/\/$/, "") ||
              "/home/jefferson"
          ),
      },

      history: {
        desc: "command history",
        run: () => {
          if (!state.history.length) {
            print(`<span class="muted">(empty)</span>`);
            return;
          }
          const lines = state.history.map(
            (h, i) => `<span class="muted">${String(i + 1).padStart(3, " ")}  </span>${esc(h)}`
          );
          printGroup(lines);
        },
      },

      ls: {
        desc: "list files",
        run: () => {
          const files: [string, string][] = [
            ["about.md", "lang"],
            ["experience.log", "fw"],
            ["skills.json", "db"],
            ["projects/", "cloud"],
            ["contact.vcf", "lang"],
            [".secrets", "fw"],
            ["resume.pdf", "db"],
          ];
          const cells = files.map(([f, c]) => `<span class="tag ${c}">${esc(f)}</span>`).join(" ");
          print(cells);
        },
      },

      cat: {
        desc: "read a file",
        run: (args) => {
          const f = (args[0] || "").toLowerCase();
          const map: Record<string, () => void | Promise<void>> = {
            "about.md":       () => COMMANDS.about.run([]),
            "experience.log": () => COMMANDS.experience.run([]),
            "skills.json":    () => COMMANDS.skills.run([]),
            "projects/":      () => COMMANDS.projects.run([]),
            "projects":       () => COMMANDS.projects.run([]),
            "contact.vcf":    () => COMMANDS.contact.run([]),
            "resume.pdf":     () => COMMANDS.resume.run([]),
            ".secrets":       () => { print(`<span class="err">cat: .secrets: Permission denied</span>`); },
          };
          if (!f) { print(`<span class="err">cat: missing file operand</span>`); return; }
          if (map[f]) { void map[f](); return; }
          print(`<span class="err">cat: ${esc(f)}: No such file or directory</span>`);
        },
      },

      sudo: {
        desc: "elevate privileges",
        run: (args) => {
          if (!args.length) {
            print(`<span class="warn">sudo: a password is required</span>`);
            return;
          }
          if (args.join(" ").toLowerCase().includes("hire jefferson")) {
            print(
              `<span class="accent bold">[sudo] approved. ✓</span> redirecting to <a class="link" href="mailto:${ME.email}?subject=Let's%20talk">${ME.email}</a>`
            );
            return;
          }
          print(
            `<span class="muted">[sudo] password for jefferson:</span> ` +
              `<span class="muted">●●●●●●●●</span><br/>` +
              `<span class="err">Sorry, try again. Hint:</span> <span class="muted">sudo hire jefferson</span>`
          );
        },
      },

      exit: {
        desc: "close",
        run: async () => {
          print(`<span class="muted">logout</span>`);
          await sleep(300);
          print(`<span class="muted">Connection to portfolio closed by remote host.</span>`);
          await sleep(400);
          print(
            `<span class="muted">(just kidding — type</span> <span class="accent">help</span><span class="muted"> to keep going)</span>`
          );
        },
      },

      matrix: {
        desc: "toggle the matrix",
        run: () => {
          if (state.matrixOn) {
            stopMatrix();
            print(`<span class="muted">matrix mode:</span> <span class="warn">off</span>`);
          } else {
            startMatrix();
            print(
              `<span class="accent">wake up, neo...</span> <span class="muted">(type</span> <span class="accent">matrix</span><span class="muted"> again to stop)</span>`
            );
          }
        },
      },

      coffee: { desc: "make coffee", run: () => print(`<span class="warn">418</span> <span class="muted">I'm a teapot.</span>`) },
      vim:    { desc: "open vim", run: () => print(`<span class="muted">to exit vim, type</span> <span class="accent">:q!</span><span class="muted"> — or just close this tab. (we don't actually have vim here.)</span>`) },
    };

    // aliases
    COMMANDS["?"]   = COMMANDS.help;
    COMMANDS["man"] = COMMANDS.help;
    COMMANDS["bye"] = COMMANDS.exit;

    // -------- "did you mean?" --------
    const closestCommand = (input: string): string | null => {
      const cmds = Object.keys(COMMANDS);
      const lev = (a: string, b: string) => {
        const m: number[][] = Array.from({ length: a.length + 1 }, () =>
          new Array(b.length + 1).fill(0)
        );
        for (let i = 0; i <= a.length; i++) m[i][0] = i;
        for (let j = 0; j <= b.length; j++) m[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            m[i][j] = a[i - 1] === b[j - 1]
              ? m[i - 1][j - 1]
              : 1 + Math.min(m[i - 1][j], m[i][j - 1], m[i - 1][j - 1]);
          }
        }
        return m[a.length][b.length];
      };
      let best: string | null = null;
      let bestD = Infinity;
      cmds.forEach((c) => {
        const d = lev(input.toLowerCase(), c);
        if (d < bestD) { bestD = d; best = c; }
      });
      return bestD <= 2 ? best : null;
    };

    // -------- dispatch --------
    const renderInput = () => { inputRender.textContent = inputEl.value; };

    const runCommand = async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      state.history.push(cmd);
      if (state.history.length > 200) state.history.shift();
      try { localStorage.setItem("jp_history", JSON.stringify(state.history)); } catch {}
      state.historyIdx = -1;

      echoCommand(cmd);

      const [name, ...args] = cmd.split(/\s+/);
      const handler = COMMANDS[name.toLowerCase()];
      if (!handler) {
        const suggestion = closestCommand(name);
        print(
          `<span class="err">command not found:</span> ${esc(name)}` +
            (suggestion
              ? ` <span class="muted">— did you mean</span> <span class="accent">${esc(suggestion)}</span><span class="muted">?</span>`
              : "")
        );
        print(
          `<span class="muted">type</span> <span class="accent">help</span> <span class="muted">for the list of commands.</span>`
        );
        return;
      }
      try {
        await handler.run(args);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        print(`<span class="err">error:</span> ${esc(msg)}`);
      }
    };

    const handleTab = () => {
      const v = inputEl.value;
      if (!v) return;
      const cmds = Object.keys(COMMANDS).filter((c) => c.startsWith(v));
      if (cmds.length === 1) {
        inputEl.value = cmds[0] + " ";
        renderInput();
      } else if (cmds.length > 1) {
        print(`<span class="muted">${cmds.join("   ")}</span>`);
      }
    };

    // -------- input handlers --------
    const focusInput = () => inputEl.focus();

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .control")) return;
      focusInput();
    };
    document.addEventListener("click", onDocClick);

    const onInput = () => renderInput();
    inputEl.addEventListener("input", onInput);

    const onKeyDown = (e: KeyboardEvent) => {
      if (state.locked) { e.preventDefault(); return; }

      if (e.key === "Enter") {
        e.preventDefault();
        const value = inputEl.value;
        inputEl.value = "";
        renderInput();
        void runCommand(value);
        return;
      }
      if (e.key === "Tab") { e.preventDefault(); handleTab(); return; }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!state.history.length) return;
        if (state.historyIdx === -1) state.historyIdx = state.history.length - 1;
        else state.historyIdx = Math.max(0, state.historyIdx - 1);
        inputEl.value = state.history[state.historyIdx] || "";
        renderInput();
        requestAnimationFrame(() =>
          inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length)
        );
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state.historyIdx === -1) return;
        state.historyIdx++;
        if (state.historyIdx >= state.history.length) {
          state.historyIdx = -1;
          inputEl.value = "";
        } else {
          inputEl.value = state.history[state.historyIdx];
        }
        renderInput();
        return;
      }
      if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        output.innerHTML = "";
        return;
      }
      if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        echoCommand(inputEl.value + "^C");
        inputEl.value = "";
        renderInput();
        return;
      }
    };
    inputEl.addEventListener("keydown", onKeyDown);

    // -------- title bar typer --------
    const phrases = [
      "jefferson@portfolio: ~ — zsh",
      "jefferson@portfolio: ~/about — zsh",
      "jefferson@portfolio: ~/projects — zsh",
      "jefferson@portfolio: ~/contact — zsh",
    ];
    let idx = 0;
    const titleInterval = window.setInterval(() => {
      idx = (idx + 1) % phrases.length;
      titleEl.textContent = phrases[idx];
    }, 4500);

    // -------- restore theme --------
    try {
      const savedTheme = localStorage.getItem("jp_theme") as Theme | null;
      if (savedTheme) setTheme(savedTheme);
    } catch {}

    renderInput();

    // -------- boot sequence --------
    const boot = async () => {
      state.locked = true;
      promptLine.style.visibility = "hidden";

      const lines = [
        { t: "[  OK  ] Booting portfolio.os v4.7", c: "boot-ok",   d: 80 },
        { t: "[  OK  ] Mounting /home/jefferson...", c: "boot-line", d: 80 },
        { t: "[  OK  ] Loading kernel modules: node, python, postgres, redis, docker", c: "boot-line", d: 80 },
        { t: "[  OK  ] Starting service: aws-ec2.service", c: "boot-ok", d: 60 },
        { t: "[  OK  ] Starting service: cloudflare-edge.service", c: "boot-ok", d: 60 },
        { t: "[  OK  ] Starting service: structured-logging.service", c: "boot-ok", d: 60 },
        { t: "[ WARN ] coffee.service: still hot — handle with care", c: "boot-warn", d: 60 },
        { t: "[  OK  ] Reached target multi-user.target", c: "boot-ok", d: 60 },
        { t: "[  OK  ] Authenticating session...", c: "boot-line", d: 80 },
      ];

      for (const l of lines) {
        print(`<span class="${l.c}">${esc(l.t)}</span>`);
        await sleep(l.d);
      }

      const prog = document.createElement("div");
      prog.className = "line progress";
      output.appendChild(prog);
      const total = 26;
      for (let i = 0; i <= total; i++) {
        const filled = "█".repeat(i);
        const empty  = "░".repeat(total - i);
        const pct    = Math.floor((i / total) * 100);
        prog.innerHTML =
          `<span class="muted">loading profile </span>` +
          `<span class="filled">${filled}</span><span class="empty">${empty}</span> ` +
          `<span class="accent">${String(pct).padStart(3, " ")}%</span>`;
        scrollToBottom();
        await sleep(40);
      }
      await sleep(180);

      printBanner();
      await sleep(120);

      print(
        `<span class="muted">Welcome.</span> <span class="accent bold">${esc(ME.name)}</span> <span class="muted">·</span> <span class="accent">${esc(ME.role)}</span>`
      );
      print(
        `<span class="muted">${esc(ME.location)} · </span><a class="link" href="mailto:${ME.email}">${ME.email}</a>`
      );
      print(`<span class="dim">────────────────────────────────────────────────────────────</span>`);
      await sleep(80);
      print(
        `<span class="muted">Type</span> <span class="accent">help</span> <span class="muted">for a list of commands. Try</span> <span class="accent">whoami</span><span class="muted">,</span> <span class="accent">projects</span><span class="muted">, or</span> <span class="accent">skills</span><span class="muted">.</span>`
      );
      print(
        `<span class="muted">Pro tip: press</span> <kbd style="opacity:.8">tab</kbd> <span class="muted">to autocomplete and</span> <kbd style="opacity:.8">↑</kbd> <span class="muted">for history.</span>`
      );
      await sleep(120);

      promptLine.style.visibility = "visible";
      state.locked = false;
      state.booted = true;
      focusInput();
    };

    void boot();

    // -------- cleanup --------
    return () => {
      document.removeEventListener("click", onDocClick);
      inputEl.removeEventListener("input", onInput);
      inputEl.removeEventListener("keydown", onKeyDown);
      window.clearInterval(titleInterval);
      stopMatrix();
    };
  }, []);

  return (
    <>
      <main className="terminal" id="terminal">
        <header className="terminal-header">
          <div className="window-controls">
            <span className="control control-close" title="close" />
            <span className="control control-min" title="minimize" />
            <span className="control control-max" title="maximize" />
          </div>
          <div className="terminal-title" ref={titleRef}>
            jefferson@portfolio: ~ — zsh — 120x40
          </div>
          <div className="terminal-actions">
            <button className="theme-pill" title="hacker theme" onClick={() => setTheme("hacker")} />
            <button className="theme-pill matrix" title="matrix theme" onClick={() => setTheme("matrix")} />
            <button className="theme-pill dracula" title="dracula theme" onClick={() => setTheme("dracula")} />
            <button className="theme-pill solarized" title="solarized theme" onClick={() => setTheme("solarized")} />
            <button className="theme-pill light" title="light theme" onClick={() => setTheme("light")} />
          </div>
        </header>

        <section className="terminal-body" ref={termBodyRef}>
          <div className="output" ref={outputRef} />
          <div className="prompt-line" ref={promptLineRef}>
            <span className="prompt">
              <span className="prompt-user">jefferson</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-colon">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-symbol">$</span>
            </span>
            <span className="input-wrapper">
              <span className="input-render" ref={inputRenderRef} />
              <span className="cursor">▋</span>
            </span>
            <input
              type="text"
              className="cmd-input"
              ref={inputRef}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </section>
      </main>

      <div className="hint">
        <kbd>tab</kbd> autocomplete · <kbd>↑</kbd><kbd>↓</kbd> history · type <code>help</code>
      </div>
    </>
  );
}
