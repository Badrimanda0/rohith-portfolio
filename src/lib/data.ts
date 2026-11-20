export const profile = {
  name: "Rohith Badri Manda",
  firstName: "Rohith",
  lastName: "Badri Manda",
  role: "Full-Stack Developer",
  location: "Hyderabad, India",
  email: "rohithbadri000@gmail.com",
  github: "https://github.com/Badrimanda0",
  githubUser: "Badrimanda0",
  // TODO: replace with your real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/rohith-badri-manda",
  resume: "/Rohith-Badri-Manda-Resume.pdf",
  summary:
    "Full-stack developer with 380+ merged pull requests across production SaaS and insurance platforms. I build React and Next.js frontends, GraphQL and REST APIs on Node.js and AWS Lambda, and data models on MongoDB, DynamoDB and PostgreSQL — plus payments, analytics and reporting.",
};

export const stats = [
  { value: 2.5, suffix: "+", decimals: 1, label: "Years experience" },
  { value: 380, suffix: "+", decimals: 0, label: "PRs merged" },
  { value: 5, suffix: "+", decimals: 0, label: "Products shipped" },
  { value: 8.48, suffix: "", decimals: 2, label: "CGPA" },
];

export const services = [
  { icon: "layout", title: "Frontend Development", text: "Fast, responsive dashboards and product UIs with React, Next.js, TypeScript and Tailwind CSS." },
  { icon: "server", title: "Backend & APIs", text: "GraphQL and REST APIs, Node.js services and AWS Lambda functions — validated, tested and secure." },
  { icon: "database", title: "Databases & Cloud", text: "MongoDB, DynamoDB and PostgreSQL data models, deployed on AWS with S3, SES, SQS and CDK." },
  { icon: "pen", title: "Payments & Integrations", text: "Stripe and Razorpay checkouts, coupons, GA4 analytics, PDF and Excel generation." },
];

export type Project = {
  slug: string;
  title: string;
  tag: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  layer: string;
  live?: string;
  // Only public repos — private company code is not linked.
  repo?: string;
  prs?: number;
  details: ProjectDetails;
};

export type ProjectDetails = {
  role: string;
  period?: string;
  type: string;
  overview: string[];
  problem: string;
  features: { title: string; points: string[] }[];
  architecture: { layer: string; items: string[] }[];
  challenges: { title: string; text: string }[];
  outcome: string[];
};

export const projects: Project[] = [
  {
    slug: "seo-stack",
    title: "SEO-Stack",
    tag: "SaaS · Current role",
    layer: "SEO & Analytics Platform",
    prs: 328,
    blurb:
      "SEO and analytics SaaS built on a microservices architecture. I ship features across the React admin app and the Node.js GraphQL API.",
    highlights: [
      "Built GA4 analytics dashboards — campaign performance by UTM, landing pages, traffic acquisition and e-commerce",
      "Reports module: manual report builder, white-label branding, dynamic columns, PDF export and i18n",
      "Plan Usage & billing: usage-tracking service and GraphQL queries, billing cycles, coupons and first-purchase pricing",
      "Redesigned the AI chat experience and the workspace dashboard",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Apollo", "Node.js", "MongoDB", "Stripe", "Chart.js", "Docker"],
    details: {
      role: "Full-Stack Developer",
      period: "2025 — Present",
      type: "Company product · SaaS",
      overview: [
        "SEO-Stack is an SEO and analytics platform that helps businesses and agencies track rankings, audit their websites, understand their Google Analytics 4 and Search Console data, and send polished reports to clients.",
        "The product runs as a set of microservices — a React admin app, a Node.js GraphQL API, an AI service, a customer chatbot and a Next.js web app — shipped through dev, UAT and production environments.",
        "I work across the React admin app and the GraphQL API, owning features end to end: data queries and services on the backend, and the dashboards, flows and PDF exports on the frontend.",
      ],
      problem:
        "SEO data is spread across many tools and is hard to read. Customers needed clear analytics dashboards, client-ready reports and transparent usage and billing — all inside one product.",
      features: [
        {
          title: "GA4 analytics dashboards",
          points: [
            "Campaign performance by UTM, with an individual campaign page and a quick-view drawer",
            "Landing-page performance dashboard, traffic acquisition and e-commerce views",
            "Trend charts with conversion-rate toggles, responsive layouts and campaign insights in Recommendations",
          ],
        },
        {
          title: "Reports module",
          points: [
            "Reports overview page and a multi-step manual report builder with templates",
            "White-label logo preview and dynamic metric columns across views, preview and PDF export",
            "Translations for every supported language and Reports pages added to global search",
          ],
        },
        {
          title: "Plan usage & billing",
          points: [
            "Plan Usage service and new GraphQL queries on the API, with a keyword-history chart",
            "Next billing date aligned with the plan-usage cycle, first-purchase pricing page and no-plan access guard",
            "Coupons on first purchase and automatic site-audit usage counts",
          ],
        },
        {
          title: "AI chat & product UX",
          points: [
            "Redesigned the AI chat page and its tasks panel",
            "Workspace dashboard redesign and onboarding flow with a skip option",
            "Search Console drill-downs synced with URL history and content-status filtering in URL discovery",
          ],
        },
      ],
      architecture: [
        { layer: "Frontend", items: ["React", "TypeScript", "Apollo Client", "Ant Design", "Chart.js", "i18n"] },
        { layer: "API", items: ["Node.js", "GraphQL", "Apollo Server", "Express", "Jest"] },
        { layer: "Data", items: ["MongoDB", "Redis", "Elasticsearch", "ClickHouse"] },
        { layer: "Infra & services", items: ["Docker", "Kubernetes", "Sentry", "AWS S3 / SES", "Stripe"] },
      ],
      challenges: [
        {
          title: "Shipping safely across environments",
          text: "Features move from dev to UAT to production, so I kept changes small and cherry-picked them cleanly between release branches.",
        },
        {
          title: "Keeping exports in sync",
          text: "Report columns are dynamic, so the table view, the preview and the PDF export all had to render the same data from one source of truth.",
        },
        {
          title: "Data-heavy screens on every device",
          text: "Analytics pages hold dense charts and tables; I made them readable and responsive from wide desktops down to phones.",
        },
      ],
      outcome: [
        "328 merged pull requests",
        "GA4 dashboards, Reports and Plan Usage shipped to production",
        "Work across both the frontend app and the GraphQL API",
      ],
    },
    live: "https://www.seo-stack.io",
  },
  {
    slug: "bharatcover",
    title: "BharatCover",
    tag: "Insurance · Full-stack",
    layer: "Health Insurance Platform",
    prs: 61,
    blurb:
      "Health insurance and wellness platform with admin, agent, organisation and customer dashboards on a serverless AWS backend.",
    highlights: [
      "Serverless APIs on AWS Lambda + DynamoDB, deployed with AWS CDK; S3, SES and SQS integrations",
      "Razorpay payments, admin coupon management, and Excel exports of payments and leads",
      "Policy certificates, receipts and health cards generated as PDFs, including batch issuance for companies",
      "Lead management with bulk import, deduplication, phone validation and call-disposition tracking",
    ],
    stack: ["Next.js", "TypeScript", "AWS Lambda", "DynamoDB", "AWS CDK", "Razorpay", "Zod", "Radix UI", "Zustand"],
    details: {
      role: "Full-Stack Developer",
      period: "Feb 2025 — Sept 2025",
      type: "Company product · Insurance",
      overview: [
        "Bharat Cover is a health insurance and wellness platform. Individuals, organisations and housing societies buy membership plans, receive policy certificates and health cards, and find network hospitals and health check-ups.",
        "It has separate dashboards for admins, agents, organisations and customers, built with Next.js on the frontend and a serverless AWS backend of Lambda functions and DynamoDB, deployed with AWS CDK.",
        "I worked on both sides — Lambda APIs and data logic on the backend, and dashboards, forms and document flows on the frontend.",
      ],
      problem:
        "Selling and servicing insurance involves payments, discounts, legal documents and large lists of leads and members. The team needed all of it automated and manageable from one platform.",
      features: [
        {
          title: "Payments & coupons",
          points: [
            "Razorpay checkout, with zero-premium plans that activate automatically",
            "Admin-only plan and tier coupons, inline discount editing and policy-issuance coupons, with protection against double use",
            "Payments admin page with sum assured, and Excel exports with customisable columns",
          ],
        },
        {
          title: "Policies, documents & health cards",
          points: [
            "Multi-page policy certificate PDFs with tier-based key benefits, disclaimers and watermarks",
            "Receipts, health-card generation and optimised batch issuance for companies",
            "QR codes for societies and direct health-card downloads",
          ],
        },
        {
          title: "Leads & CRM",
          points: [
            "Bulk lead import with deduplication, templates and a notes column",
            "Phone validation, call-disposition statuses and status filtering",
            "Corporate lead creation and a detailed quotes dashboard",
          ],
        },
        {
          title: "Dashboards & onboarding",
          points: [
            "Admin, agent, organisation and customer dashboards with search and pagination",
            "Aadhaar upload and replacement, nominee and dependent validation, OTP login for organisations",
            "Network hospital catalogue and multi-category health check-up provider search",
          ],
        },
      ],
      architecture: [
        { layer: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Zustand", "Recharts", "Leaflet"] },
        { layer: "Backend", items: ["AWS Lambda", "Node.js", "TypeScript", "Zod", "JWT"] },
        { layer: "Data & cloud", items: ["DynamoDB", "S3", "SES", "SNS", "SQS", "Cognito", "AWS CDK"] },
        { layer: "Integrations", items: ["Razorpay", "PDFKit", "Excel (xlsx)", "QR codes"] },
      ],
      challenges: [
        {
          title: "Reliable PDF generation",
          text: "Certificates and receipts are legal documents, so I added fallbacks for missing data and fixed layout issues like page-border overlaps and long names.",
        },
        {
          title: "Batch issuance at scale",
          text: "Companies enrol many employees at once, so I optimised batch health-card issuance to stay fast and dependable.",
        },
        {
          title: "Clean data from messy imports",
          text: "Lead files come from many sources; the import deduplicates records, validates phone numbers and reports errors instead of failing.",
        },
      ],
      outcome: [
        "61 merged pull requests",
        "Payments, coupons, documents and lead management running in production",
        "Full-stack ownership across Next.js and serverless AWS",
      ],
    },
    live: "https://bharatcover.net",
  },
  {
    slug: "coinpulse",
    title: "CoinPulse",
    tag: "Personal · Full-stack",
    layer: "Live Crypto Market Tracker",
    blurb:
      "Real-time cryptocurrency dashboard with live prices, interactive charts, a watchlist and a converter — powered by the CoinGecko API through a cached Next.js backend.",
    highlights: [
      "Markets table for 100+ coins with sorting, filters, pagination and hand-built SVG sparklines",
      "Coin pages with an interactive 24H–1Y price chart, stats, all-time highs and a two-way converter",
      "Own API routes proxy CoinGecko with caching and request de-duplication, so the API key never reaches the browser",
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Route Handlers", "CoinGecko API", "Tailwind CSS v4"],
    details: {
      role: "Solo developer — design, frontend and backend",
      type: "Personal project · Fintech / Crypto",
      overview: [
        "CoinPulse is a live cryptocurrency market tracker, similar in purpose to CoinMarketCap. It shows current prices and trends, price history on interactive charts, trending coins, top movers, exchanges and categories.",
        "All market data comes live from the CoinGecko API. Server Components fetch and cache data on the server, while interactive parts — the chart, search and watchlist — call the app's own API routes.",
        "It is built with no extra UI or chart libraries: the price chart, sparklines and icons are all hand-built with SVG.",
      ],
      problem:
        "Crypto prices change every minute, but free market APIs are heavily rate-limited. The app needed to feel live and fast while making as few API calls as possible — and without exposing the API key.",
      features: [
        {
          title: "Markets overview",
          points: [
            "Global market cap, 24h volume, BTC/ETH dominance and active coins",
            "Trending coins, top gainers and top losers",
            "Markets table with 100 coins per page, sortable columns, quick filter and 7-day sparklines",
          ],
        },
        {
          title: "Coin detail pages",
          points: [
            "Interactive price chart (24H / 7D / 30D / 90D / 1Y) with hover and touch tooltips",
            "24h range bar, performance tiles, supply stats, all-time high and low, community sentiment",
            "Two-way currency converter on every coin page",
          ],
        },
        {
          title: "Search, watchlist & currencies",
          points: [
            "Global search palette (Ctrl K or /) with debouncing and keyboard navigation",
            "Watchlist saved in the browser with a live summary",
            "Seven display currencies (USD, EUR, GBP, INR, JPY, AUD, CAD), remembered in a cookie",
          ],
        },
        {
          title: "Exchanges, categories & polish",
          points: [
            "Exchanges ranked by trust score; categories open as filtered market lists",
            "Loading skeletons, error boundary with retry, custom 404 and SEO metadata",
            "Clean, minimal design that works down to mobile",
          ],
        },
      ],
      architecture: [
        { layer: "Frontend", items: ["Next.js App Router", "React 19", "TypeScript", "Tailwind CSS v4", "SVG charts"] },
        { layer: "Backend", items: ["Route Handlers (/api/markets, /chart, /search)", "Server Components", "Typed API client"] },
        { layer: "Data", items: ["CoinGecko API", "Server-side caching", "Request de-duplication"] },
        { layer: "Browser", items: ["localStorage watchlist", "Cookie currency preference"] },
      ],
      challenges: [
        {
          title: "Working within API rate limits",
          text: "The typed API client caches responses and shares in-flight requests, so many visitors asking for the same data trigger only one call to CoinGecko.",
        },
        {
          title: "Keeping the API key secret",
          text: "Client components never call CoinGecko directly; they go through the app's own API routes, which add the key on the server.",
        },
        {
          title: "Charts without a chart library",
          text: "I built the price chart and sparklines from scratch with SVG, including hover and touch tooltips, to keep the bundle small.",
        },
      ],
      outcome: [
        "A complete crypto dashboard on live market data",
        "Zero extra UI or chart libraries",
        "Fast pages with server-side caching",
      ],
    },
  },
  {
    slug: "mandi-ledger",
    title: "Mandi Ledger",
    tag: "Personal · Full-stack",
    layer: "ERP · Finance",
    blurb:
      "Full-stack ERP that runs a wholesale vegetable trade: customers, sales, payments, expenses, orders and day-by-day financial reports.",
    highlights: [
      "Relational PostgreSQL schema — Customers, Sales, Payments, Expenses, Orders, Funds — via Prisma ORM",
      "Server Actions for every mutation with targeted cache revalidation",
      "Daily report engine aggregating sales, payments and expenses with drill-down",
    ],
    stack: ["Next.js", "Server Actions", "Prisma", "PostgreSQL", "TypeScript"],
    details: {
      role: "Solo developer — design, frontend, backend and database",
      type: "Personal project · Business app",
      overview: [
        "Mandi Ledger is a full-stack business app for a wholesale vegetable trader. It replaces a paper ledger with a digital one: customers, sales, payments, expenses, orders and daily reports in one place.",
        "I built everything myself — the database schema, the server logic and the interface — and deployed it on Vercel with a PostgreSQL database.",
      ],
      problem:
        "Wholesale traders sell on credit to many shops and track commissions, payments and expenses on paper. Balances drift, and it's hard to know who owes what on any given day.",
      features: [
        {
          title: "Customers & ledger",
          points: [
            "Customer profiles with shop names and a full ledger of sales and payments",
            "Running balance per customer and quick payment capture",
            "Edit and delete flows for every record",
          ],
        },
        {
          title: "Sales & payments",
          points: [
            "Record sales by vegetable, quantity and rate, with automatic totals and commission",
            "Payments with sender name and receipt images",
            "Company funds, expenses and orders tracked alongside sales",
          ],
        },
        {
          title: "Daily reports",
          points: [
            "Day-by-day summaries of sales, payments and expenses",
            "Drill-down into every activity for a selected date",
            "Dashboard stats that update instantly after each change",
          ],
        },
      ],
      architecture: [
        { layer: "Frontend", items: ["Next.js App Router", "React 19", "TypeScript"] },
        { layer: "Backend", items: ["Next.js Server Actions", "Cache revalidation"] },
        { layer: "Database", items: ["PostgreSQL", "Prisma ORM", "Relational schema"] },
        { layer: "Hosting", items: ["Vercel"] },
      ],
      challenges: [
        {
          title: "Keeping numbers consistent",
          text: "One sale changes the dashboard, the customer ledger and the daily report, so each server action revalidates exactly the pages it affects.",
        },
        {
          title: "Modelling money correctly",
          text: "Sales, payments, commissions, expenses and funds are separate models with clear relations, so balances can always be recalculated from the records.",
        },
      ],
      outcome: [
        "A working ERP built to replace a paper ledger",
        "Seven related database models designed with Prisma",
        "Live on Vercel",
      ],
    },
    live: "https://vegtable-market-rho.vercel.app",
    repo: "https://github.com/Badrimanda0/vegtable_market",
  },
  {
    slug: "fx-master",
    title: "FX Master",
    tag: "Internship project",
    layer: "Fintech · Payments",
    blurb:
      "Cross-border payments and currency-exchange platform — real-time FX conversion, multi-country send/receive flows and a subscription checkout.",
    highlights: [
      "Live exchange-rate engine consuming an external rates API, recalculating payouts as the user types",
      "Plan selection + payment-method checkout with validated state",
      "SEO-optimised App Router build with OpenGraph metadata and optimised images",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "REST APIs", "Tailwind v4"],
    details: {
      role: "Front-end developer (internship)",
      type: "Internship project · Fintech",
      overview: [
        "FX Master is a landing site and checkout for a cross-border payments product. Visitors can see exactly how much their recipient will get in another currency, in real time, before signing up.",
        "I built it as an internship project with Next.js, React and Tailwind CSS, connecting it to a live exchange-rate API.",
      ],
      problem:
        "People sending money abroad don't trust hidden fees. They want to see the exact amount the recipient receives, instantly, on any device.",
      features: [
        {
          title: "Live currency converter",
          points: [
            "Fetches exchange rates from an external API",
            "Recalculates the recipient amount as the user types",
            "Searchable sending and receiving country pickers with currencies",
          ],
        },
        {
          title: "Marketing site",
          points: [
            "How it works, security, mobile app and partner-brand sections",
            "FAQ accordion and contact call-to-action",
            "Fully responsive, mobile-first layouts",
          ],
        },
        {
          title: "Checkout",
          points: [
            "Plan selection (monthly, yearly and more)",
            "Payment-method selection with clear selected states",
          ],
        },
      ],
      architecture: [
        { layer: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Headless UI"] },
        { layer: "Data", items: ["Exchange-rate REST API", "Country & currency dataset"] },
        { layer: "SEO & hosting", items: ["OpenGraph metadata", "Next.js Image", "Vercel"] },
      ],
      challenges: [
        {
          title: "Instant, accurate conversion",
          text: "Rates load once and the converter recalculates locally as the user types, so it feels instant without hammering the API.",
        },
      ],
      outcome: ["Live on Vercel", "A fast, responsive converter and checkout flow"],
    },
    live: "https://fx-master-payroll.vercel.app",
    repo: "https://github.com/Badrimanda0/Fx-master",
  },
];

export const experience = [
  {
    company: "SEO-Stack.io",
    role: "Full-Stack Developer",
    period: "2025 — Present",
    points: [
      "328 merged pull requests across the React admin app and the Node.js / GraphQL API.",
      "Built GA4 analytics dashboards, the Reports module with PDF export, and Plan Usage & billing.",
      "Redesigned the AI chat and workspace dashboard; shipped through UAT and production release flows.",
    ],
  },
  {
    company: "BharatCover",
    role: "Full-Stack Developer",
    period: "Feb 2025 — Sept 2025",
    points: [
      "61 merged pull requests across the Next.js client and the serverless AWS backend.",
      "Built Lambda APIs on DynamoDB for payments (Razorpay), coupons, leads and policy issuance.",
      "Generated policy certificates and health cards as PDFs, plus Excel exports for admins.",
    ],
  },
  {
    company: "WT Softech",
    role: "Software Developer Intern",
    period: "Aug 2024 — Jan 2025",
    points: [
      "Built FX Master, a real-time currency-exchange & payments platform.",
      "Delivered responsive company web interfaces from Figma designs.",
      "Created reusable React components that cut duplicated UI code.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "HTML", "CSS"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Apollo Client", "Ant Design", "Radix UI", "Zustand", "React Hook Form", "Chart.js", "Recharts"] },
  { group: "Backend", items: ["Node.js", "Express.js", "GraphQL", "Apollo Server", "REST APIs", "AWS Lambda", "Zod", "JWT"] },
  { group: "Database & Cloud", items: ["MongoDB", "DynamoDB", "PostgreSQL", "MySQL", "Prisma ORM", "Supabase", "AWS S3 · SES · SQS", "AWS CDK"] },
  { group: "Payments & Integrations", items: ["Stripe", "Razorpay", "Google Analytics 4", "PDFKit · jsPDF", "Excel (xlsx)", "Sanity CMS"] },
  { group: "Tools", items: ["Git", "GitHub", "Docker", "Sentry", "Jest", "Storybook", "Vercel", "Jira", "Figma"] },
];

export const education = {
  school: "Gayatri Vidya Parishad College of Engineering (Autonomous)",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2019 — 2023",
  place: "Visakhapatnam, Andhra Pradesh",
  cgpa: "8.48",
};
