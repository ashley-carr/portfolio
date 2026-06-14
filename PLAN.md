# Portfolio Site Plan

## Repository structure

/portfolio  
  /assets  
    /css  
    /js  
    /images  
  /projects  
    /sweetcrust  
    /powerapps-incident  
    /powerbi-sales  
    /azure-api  
  index.html  
  about.html  
  certifications.html  
  projects.html  

Then what needs to be built: (I leave out the JSON File, I will create and populate that after the build)

---

## Global layout — header (top navigation bar)

Think of a clean, modern horizontal bar that sits at the very top of every page.

### How it looks

- The bar spans the full width of the screen.
- Background is white (or very light) in light mode.
- Background becomes dark charcoal in dark mode.
- The navigation items are centered, not left‑aligned.
- No logo, no name — just the menu items.

### Menu items

- Home
- About
- Certifications
- Projects

They sit side‑by‑side with equal spacing.

### Active page indicator

You described this well:

- The active page has a rounded rectangle highlight behind it.
- In light mode:
  - Highlight = black
  - Text = white
- In dark mode:
  - Highlight = white
  - Text = black

This gives a clean, modern “pill tab” effect.

### Hover behaviour

- When hovering over Projects, a full‑width dropdown panel appears below the header.
- This dropdown contains:
  - A “Show all projects” item at the top
  - Below that, cards for each project (small thumbnails + titles)
  - Also, the Projects has a down angle to show it can expand, the top has a button show all to go the length, but the cards are on the left is the first and is horizonal and can scroll if it goes past the page.
- The dropdown feels like a mega‑menu, not a tiny dropdown.

### Sticky behaviour

Yes — the header stays at the top while scrolling.  
It’s always visible, always accessible.  
This is modern and improves navigation.

---

## Global layout — footer

### Placement

- Always at the bottom of the page content.
- Does not stick to the bottom of the screen — only appears when you scroll down.

### Size

- Slightly smaller than the header.
- Clean, minimal, unobtrusive.

### Content layout

Left side:

- Email (click → opens mail app)

Right side:

- GitHub (opens in new tab)
- LinkedIn (opens in new tab)

You can stack GitHub and LinkedIn vertically or keep them side‑by‑side — both work.

---

## Page backgrounds — refined

You’re imagining something very modern — and it works beautifully.

### Light mode

- Header background: white
- Page background: very light grey or off‑white
- Content sections: white cards with soft shadows

This creates a layered, floating feel.

### Dark mode

- Header background: dark charcoal
- Page background: near‑black or deep grey
- Content sections: slightly lighter grey cards

The contrast stays clean and readable.

### Transition between pages

Because the header is white (light mode) or dark (dark mode), and the page background is only slightly different, the transition feels smooth and intentional.  
This is exactly how modern sites do it.

---

## How dark mode fits into this

Tailwind + Alpine makes dark mode easy:

- The header switches from white → dark
- The active tab switches from black → white
- The page background switches from light grey → deep grey
- Text colours invert automatically
- Cards shift from white → dark grey

Your design works perfectly in both modes.

---

## Home page — visual walkthrough

Below is the Home page exactly as you’re imagining it, but clarified, polished, and structured so it’s easy to build later.

### Header (already defined globally)

Centered navigation.  
White background.  
Active page has a black pill highlight with white text.  
Projects has a full‑width dropdown with project cards.  
Sticky — stays at the top when scrolling.  
This part is locked in.

### Page container (the “content area”)

Think of this as a centered column with generous left/right padding so the content doesn’t stretch too wide.

- On desktop:  
  The content sits in the middle, with whitespace on both sides.
- On mobile:  
  Everything stacks and fills the width.

This container gives the site a modern, clean feel.

### Hero section (your main introduction)

#### How it looks visually

Imagine a horizontal section with two halves:

##### Left side (text block)

- Your name  
  Large, bold, clean.  
  No title above it — it stands on its own.
  - Ashley Carr
- Your role  
  Slightly smaller, but still prominent.
  - Power Platform Technical Specialist
- Short intro  
  A refined, 2–3 sentence version of your summary.  
  Not too long — just enough to give context.
  - Ashley is a Microsoft Power Platform specialist with strong experience across Azure data services and modern application development. He delivers high‑value solutions using Power Apps, Dataverse, Power Automate, Power Pages, Copilot Studio, and Power BI, working closely with clients and teams to design scalable, impactful systems.

##### Right side (photo)

- A circular photo works best — modern, clean, friendly.
- Size: roughly the height of the text block.
- A subtle border or shadow is optional.
- Placeholder:
  - You can use a neutral silhouette, or
  - A blurred version of your real photo until you choose the final one.

##### Spacing

- The two sides are aligned vertically in the middle.
- On mobile, the photo moves above the text or below — your choice, but below usually feels cleaner.

##### Should the hero have a title?

No.  
Modern sites don’t label the hero section.  
Your name is the title.

### Dynamic stats row

#### Where it sits

Directly under the hero section, with a bit of breathing room.

#### How it looks

Two small cards, side‑by‑side:

- Years of Experience
  - Label: “Years of Experience”
  - Number: calculated from 2018
  - Bold number, smaller label
- Certifications
  - Label: “Certifications”
  - Number: dynamic count from certs page
  - Bold number, smaller label
    - Show only what is considered Active, need to review what is considered Active.

#### Should it have a section title?

No.  
These cards speak for themselves.

#### Should they be in a container?

Yes — a subtle card container helps them stand out.

#### Could they go beside the hero instead?

You could, but it becomes cramped.  
Under the hero is cleaner and more balanced.

### Skills snapshot

#### Heading

You can choose one of these:

- “Areas I work in”
- “What I work with”
- “Key areas”

Short, simple, modern.  
Probably: Areas I work in

#### Content

A row (or two rows) of pill‑style items:

- Power Platform
- Azure
- Web Development

#### Visual feel

- Rounded pills
- Light background
- Slight shadow
- Even spacing
- Centered alignment

This section is quick, clean, and gives a fast overview.

### Featured projects

#### Heading

“Featured Projects”  
Centered.  
Simple.

#### Layout

Three cards in a row on desktop.  
Stacked vertically on mobile.

Each card includes:

- Project name
- Technology (e.g., “Power Apps + Dataverse”)
- 1–2 line summary (what it is / why it exists)
- Thumbnail (small image or icon)
- A “View Project” button or link

#### Hover effect

You suggested a flip animation — that’s doable, but:

- A flip animation is flashy and can feel gimmicky
- A fade‑in overlay or slide‑up text is more modern and subtle

But we can do whichever you prefer.

#### Click behaviour

Clicking the card takes you to the individual project page.

### Footer (already defined globally)

Small, clean, minimal.  
Email left, GitHub + LinkedIn right.  
Links open in new tabs.  
Email uses mailto:.  
Copyright optional.

### How this page feels overall

Modern  
Centered layout, clean spacing, subtle shadows.

Professional  
No clutter, no unnecessary labels, no gimmicks.

Balanced  
Hero → stats → skills → projects flows naturally.

Responsive  
Stacks cleanly on mobile.

Consistent  
Matches the global header/footer and background style.

For the Projects cards: Use a slide‑up overlay instead of a flip.

---

## About page

### Header (already defined globally)

Centered navigation.  
White background.  
Active page has a black pill highlight with white text.  
Projects has a full‑width dropdown with project cards.  
Sticky — stays at the top when scrolling.  
This part is locked in.

### About me (narrative)

About Me  
Ashley is a Microsoft Power Platform specialist with deep experience designing and delivering solutions across Power Apps, Dataverse, Power Automate, Power Pages, Copilot Studio, and Power BI. With a strong background in Azure‑aligned services and modern application development, he focuses on building scalable, maintainable systems that solve real business problems.  
He has worked across mining, government, finance, education, and primary production, supporting organisations through solution design, development, governance, and application lifecycle management. Ashley is known for his collaborative approach, clear communication, and ability to guide teams through best‑practice Power Platform architecture and delivery.  
Across his career, he has delivered solutions ranging from enterprise‑grade Dynamics 365 implementations to Power Pages portals, complex automations, data‑driven reporting, and field‑ready canvas applications. He continues to expand his expertise across Azure, governance, and modern development practices to support clients with high‑value, future‑ready solutions.

### Experience

Technical Specialist — Insight  
Apr 2023 – Present

- Designing and delivering Power Platform solutions using best‑practice architecture, ALM, and governance.
- Providing guidance and support across Power Apps, Dataverse, Power Automate, Power Pages, Copilot Studio, and Power BI.
- Supporting clients with governance, solution reviews, and technical leadership.
- Working across multiple departments to uplift Power Platform capability and ensure scalable delivery.

Senior Consultant — Insight  
Oct 2021 – Apr 2023

- Led solution enhancements and support across mining, finance, education, and government clients.
- Delivered new Power Platform applications, automations, and portal enhancements.
- Provided governance, technical guidance, and solution reviews across multiple teams.
- Supported field‑based applications, document management solutions, and business process automation.

Consultant — Insight  
Mar 2021 – Oct 2021

- Delivered Power Platform solutions across mining, education, government, and finance sectors.
- Built applications for drilling data capture, student/course processing, automated marketing, and document workflows.
- Provided solution support, enhancements, and technical guidance.

Consultant — Velrada  
Jun 2018 – Mar 2021

- Developed solutions using Power Apps, Dataverse, Power Automate, Power BI, and Dynamics 365.
- Delivered portals, reporting solutions, CRM systems, and operational applications.
- Worked across mining, local government, and primary production.
- Built solutions including stockpile tracking, initiative tracking, waste management, CRM, and enrolment portals.

Intern — Satalyst  
Feb 2018 – Jun 2018

- Gained hands‑on experience with Power BI, Azure Data Factory, Power Apps, Flow, Azure ML, and Python.
- Supported internal development tasks and learned modern cloud development practices.

### Skills & capabilities

Power Platform Engineering

- Power Apps (Canvas, Model‑Driven, BPF, responsive design, offline capabilities)
- Dataverse (tables, relationships, security roles, column security, business rules, solution layering)
- Power Automate (instant, scheduled, automated flows; standard & premium connectors; DLP‑compliant design)
- Power Pages (authentication, web forms, web roles, table permissions, integrations)
- Copilot Studio (agents, orchestration, Power Platform integration, data actions, extensibility)
- Power Pipelines (solution deployment automation)
- Custom connectors (REST APIs, authentication, governance)
- Custom workflows (Dataverse server‑side logic)
- Plugin development (pipeline stages, synchronous/asynchronous execution, secure configuration)
- PCF components (field & dataset components, React‑based UI extensions)
- Command bar customisation & web resources
- Managed Environments (policies, monitoring, guardrails)
- ALM (solution strategies, source control)
- VNet‑integrated environments
- Governance (DLP, environment strategy, access control, platform standards)
- Security (security roles, column security, table permissions, privilege inheritance, admin roles)

Dynamics 365 & Integration

- Dynamics 365 (Sales, Marketing, Customer Service)
- Dataverse Web API
- Power Platform Custom APIs
- SharePoint document management integration
- Exchange integration (mailboxes, tracking, notifications)
- Power Pages authentication providers (Microsoft Entra External ID, external identity)
- API‑based integrations (custom connectors, Azure services)

Azure & Cloud Services

- Azure Entra ID (app registrations, authentication, permissions)
- Azure Key Vault (secrets management)
- Azure Storage (blobs, files)
- Azure SQL
- Azure Data Factory
- Azure Portal administration

Development Languages

- C#
- JavaScript
- React
- HTML & CSS
- SQL / T‑SQL
- Liquid
- DAX
- M Query
- Power Fx
- Python
- PowerShell
- XML
- JSON
- YAML
- Markdown

Data, Reporting & Modelling

Data

- Data modelling (relational design)
- Data migration patterns
- Data quality & cleansing
- Data governance

Power BI

- Dashboards & reports
- Data modelling (DAX, Power Query)
- Row‑Level Security (RLS)
- Composite models
- DirectQuery
- Paginated reports
- Dataflows

Dynamics 365

- Reports & dashboards

SQL

- Data design (tables, views, stored procedures, functions)

Excel

- Data cleaning, analysis, reporting

Embedding

- Power BI ↔ Power Apps ↔ SharePoint

Microsoft 365 & SharePoint Integration

SharePoint

- Site structure & architecture
- Lists & document libraries
- Permissions & inheritance
- REST API
- Power Apps & Power Automate integration
- Power BI embedding

Exchange

- Mailboxes, notifications, server‑side sync

Teams

- Approvals, apps, notifications

Other M365

- Outlook add‑ins
- Microsoft Forms integration

DevOps & ALM

- Azure DevOps
- Git branching strategies
- Solution packaging & deployment
- Power Platform ALM (managed/unmanaged, unpacked solutions, solution layering)
- Environment strategies (multi‑environment, VNet, DLP, governance)
- Power BI deployment pipelines
- Power BI workspace management
- Source control practices (Git, YAML pipelines)

Tools

Power Platform Tools

- PAC CLI
- Power Platform Tools (CLI, build tools)
- Configuration Migration Tool (CMT)
- Plugin Registration Tool (PRT)
- XrmToolBox

Development Tools

- Visual Studio
- VS Code
- PowerShell ISE
- Notepad++
- Browser DevTools
- Fiddler

Data Tools

- SQL Server Management Studio (SSMS)
- Power BI Desktop

Design & Productivity

- Figma
- Office 365 applications
- Azure Portal
- Dynamics 365 Level Up Chrome extension

### Education

- Diploma of Software Development

### Footer (already defined globally)

Small, clean, minimal.  
Email left, GitHub + LinkedIn right.  
Links open in new tabs.  
Email uses mailto:.  
Copyright optional.

---

## About page — layout details

### Hero section

Layout

- Full‑width
- White background
- Centered content
- Max‑width container (e.g., 900–1100px)
- Large heading: “About Me”
- Subheading: one‑line summary
  - Example: “Power Platform Technical Specialist based in Perth, Australia.”

Why this works

- It anchors the page
- It sets the tone
- It avoids repeating the Home page hero
- It gives the user immediate context

### About me section (main narrative)

Layout

- Two‑column layout on desktop
  - Left: narrow column (25–30%) with a portrait or avatar (optional)
  - Right: main text (70–75%)
- Single column on mobile
- Generous spacing
- Serif or neutral sans‑serif body text for readability

Content

Use the narrative you already finalised — it’s perfect.

Why this works

- Two‑column layout breaks up the text
- It feels modern and professional
- It avoids the “wall of text” problem

### Experience section (timeline)

Layout

- Vertical timeline
- Each role is a “card”
- Left side: dates
- Right side: role + company + bullet points
- Light grey vertical line connecting roles
- Cards have subtle shadow or border

Spacing

- 32–48px between roles
- 16px between bullet points

Why this works

- Timelines are the cleanest way to show career progression
- It visually separates roles without overwhelming the page
- It’s easy to scan

### Skills & capabilities (multi‑column grid)

(This is the most important section — and now it’s beautifully structured.)

Layout

- Section heading: “Skills & Capabilities”
- Subheading: optional one‑liner
  - Example: “A broad technical skillset across the Microsoft Power Platform, Dynamics 365, Azure, and modern development practices.”
- Use a two‑column grid on desktop
- Single column on mobile
- Each capability area is a card with:
  - Title
  - Divider
  - Bullet list

Visual style

- Cards have:
  - White background
  - Light border or subtle shadow
  - Rounded corners (4–8px)
  - 24–32px padding

Why this works

- Your Skills section is long — this layout makes it digestible
- Cards create natural grouping
- Two‑column grid avoids vertical overload
- It looks modern and professional

### Education section (bottom)

Layout

- Simple
- Single line or short list
- No card needed
- Appears just above the footer

Why this works

- Education is foundational, not the headline
- Keeping it at the bottom is standard for senior profiles

---

## Certifications page

### Header (already defined globally)

Centered navigation.  
White background.  
Active page has a black pill highlight with white text.  
Projects has a full‑width dropdown with project cards.  
Sticky — stays at the top when scrolling.  
This part is locked in.

### Summary stats (top row)

Layout

- Four small cards
- Equal width
- Light border or subtle shadow
- Rounded corners
- 16–24px padding
- Icons optional (we can add later)

Cards

- Total certifications
- Active certifications
- Retired certifications
- Applied skills

Why this works

- Gives instant credibility
- Shows breadth at a glance
- Sets the tone for the page
- Matches modern certification dashboards (Microsoft Learn, Credly, etc.)

### Filters (pill buttons)

Filters

- All
- Active
- Retired
- Applied Skills

UI Style

- Pill‑shaped buttons
- Active filter: black background, white text
- Inactive: light grey background
- Hover: slightly darker grey
- Responsive: wrap on mobile

Why this works

- Clean
- Familiar
- Easy to use
- Matches the Home page’s design language

### Certifications list (table‑like layout)

Layout

- Responsive table
- On desktop: 4 columns
- On mobile: collapses into stacked cards

Columns

- Type (Associate, Expert, Applied Skill, Fundamentals)
- Title
- Status (Active / Retired)
- Issued (optional but recommended)

Sorting

- Newest first
- Applied Skills can be grouped or mixed — your choice later

Why this works

- Clean
- Professional
- Easy to scan
- Matches Microsoft Learn’s structure

### Footer (already defined globally)

Small, clean, minimal.  
Email left, GitHub + LinkedIn right.  
Links open in new tabs.  
Email uses mailto:.  
Copyright optional.

### Final recommendation

Use a single JSON file named something like:

`/data/certifications.json`

Inside it, store your data in this structure:

```json
{
  "type": "Expert | Associate | Fundamentals | Applied Skill | Exam",
  "title": "...",
  "status": "Active | Retired | Passed",
  "issuedOn": "Date"
}
