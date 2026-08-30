/**
 * Every word on the site.
 *
 * Sources, all in the client folder one level up:
 *   catchphrase.pdf ........... the wordmark line
 *   CV-Nadia A4.pdf ........... about, education, experience, competitions, skills
 *   Socials Links.pdf ......... instagram / behance / linkedin
 *   Project 0N Text.docx ...... per-project writing
 *
 * Her source documents carry a handful of spelling slips ("Bacholar in
 * Architactural Engineering", "hollow steal columns", "conventual"). Those are
 * corrected here — this page is read by clients and scholarship panels — while
 * the phrasing, emphasis and structure stay hers.
 */

export const profile = {
  name: "Nadia Abdel Sater",
  role: "Architectural Engineer",
  credential: "RIBA Part I Certified",
  tagline: { lead: "Let's make", accent: "Dialogue" },
  email: "nadiaabedalsaterjr@gmail.com",
  location: "Bchamoun, Mount Lebanon",
  cv: "/media/Nadia-Abdel-Sater-CV.pdf",
  statement:
    "My journey has taught me to see beyond conventional interventions, think outside the box, and prioritize sensory emotional connections to functional spaces. Driven by determination, I strive for sustainable and innovative design strategies that tackle overlooked problems.",
  socials: [
    {
      label: "Instagram",
      handle: "@dialogue.arch",
      url: "https://www.instagram.com/dialogue.arch/?hl=en",
    },
    {
      label: "Behance",
      handle: "nadiasater1",
      url: "https://www.behance.net/nadiasater1",
    },
    {
      label: "LinkedIn",
      handle: "Nadia Abdel Sater",
      url: "https://www.linkedin.com/in/nadia-abdel-sater-82b761285/",
    },
  ],
} as const;

export const navigation = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

/* --------------------------------------------------------------------------
   About
-------------------------------------------------------------------------- */

export const education = [
  {
    school: "Beirut Arab University",
    period: "2022 — 2027",
    lines: ["Bachelor in Architectural Engineering", "GPA 3.29 / 4.0"],
  },
  {
    school: "Eastwood Schools",
    period: "2007 — 2022",
    lines: ["Honours Baccalaureate in General Sciences", "Rank 15.9 / 20"],
  },
] as const;

export const experience = [
  {
    period: "Aug 2025",
    org: "BAU ARCHTEENS Summer Camp",
    role: "Assistant",
    note: "Valuable contribution and volunteer efforts in assisting the summer camp students.",
  },
  {
    period: "Jun — Aug 2025",
    org: "LDRS A. Chehab Architects & Engineers",
    role: "Intern",
    note: "Contribution in an urban planning project, villa concept design and mood board, and execution drawings.",
  },
  {
    period: "2024 — 2025",
    org: "RIBA Collaborative Design Thinking Workshop",
    role: "Representative",
    note: "Discussions between representatives and staff regarding students' outcomes and design brief formation according to the assigned academic levels.",
  },
  {
    period: "Jan — Mar 2024",
    org: "Bab El Saray Renovation",
    role: "Volunteer",
    note: "Model making of the existing site.",
  },
] as const;

export const competitions = [
  {
    name: "VELUX Daylight Competition",
    year: "2024",
    note: "Innovative and symbolic adaptation of daylighting within design.",
  },
  {
    name: "120 Hours Competition",
    year: "2025",
    note: "Permanence and impermanence — transformation of a vacant site. Designing under pressure in a short duration of time.",
  },
  {
    name: "Insperli Awards Competition",
    year: "2025 & 2026",
    note: "10th and 11th editions. International students competition showcasing previous academic and extracurricular projects.",
  },
  {
    name: "BAU Design Narratives Competition",
    year: "2026",
    note: "2nd edition. Reinventing the memories of the forgotten by designing spaces that bring them back into presence. Team leader responsible for team correlation, 3D modelling and visualization, idea brainstorming, and design.",
  },
  {
    name: "Rifat Chadirji Prize",
    year: "2026",
    note: "The right to landscape — reclaiming land and sustaining lives in Sahl Al Khiam, Lebanon.",
  },
] as const;

export const software = [
  { group: "CAD / BIM", items: ["AutoCAD", "Revit"] },
  { group: "3D Modelling", items: ["Revit", "Rhino", "SketchUp", "Blender", "3ds Max"] },
  { group: "Rendering", items: ["Twinmotion", "D5 Render", "Blender"] },
  { group: "Graphic Design", items: ["Photoshop", "Illustrator", "InDesign", "Affinity"] },
  { group: "Video", items: ["DaVinci Resolve", "CapCut"] },
  { group: "iPad", items: ["Procreate", "Morpholio Trace", "Concepts"] },
  { group: "Analytical", items: ["DesignBuilder"] },
] as const;

export const languages = [
  { name: "Arabic", level: 5 },
  { name: "English", level: 5 },
  { name: "German", level: 2 },
] as const;

/* --------------------------------------------------------------------------
   Selected work
-------------------------------------------------------------------------- */

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  programme: string;
  place: string;
  year: string;
  /** One line, set under the arch in the gallery. */
  blurb: string;
  /** The pull quote that opens the project page. */
  lead: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "the-haven",
    number: "01",
    title: "The Haven",
    programme: "Affordable Housing",
    place: "El Laylake, Lebanon",
    year: "2025 — 2026",
    blurb: "Modular housing that gives low-income families ground to stand on.",
    lead: "The project transcends the traditional concept of affordable housing by creating a secure, dignified, and opportunity-rich environment for low-income families.",
    sections: [
      {
        heading: "Tackled Theme",
        body: [
          "The chosen theme of the faculty for the academic year 2025—2026 is 'Architecture in a context of Change — The Pursuit for a New Role'. The American academic member Branko Kovacevic points out that we must explore the architecture of Change. According to him, the quest for change reflects the context in which we live and work.",
          "An ever-increasing pace of change is what defines contemporary life: socio-economic, political, cultural, and technological contexts are constantly shifting, altering norms, customs, and expectations and affecting how we use and relate to space. A rapidly changing environment demands buildings that can adapt quickly. How buildings adapt, and how they respond to change, depends on the factor of change.",
        ],
      },
      {
        heading: "The Housing Crisis in Lebanon",
        body: [
          "Affordable housing refers to housing units that are affordable to buy or rent by the low-income section of a society, paying no more than 30 percent of gross income for housing costs, including utilities. Affordable housing compact plans are an integrated, multi-scalar urban and architectural response to this crisis, going beyond single-building solutions.",
          "Lebanon is facing a severe housing crisis driven by a combination of economic, political, and social factors — economic collapse and currency devaluation, conflict-induced displacement, and a rental market in crisis. The situation is characterised by widespread unaffordability, displacement, and a weak regulatory environment.",
          "A 2024 Housing Monitor report documented 443 cases of housing violations. It also indicated that 29% of displaced persons struggled with unaffordable rental costs and that over 10,000 individuals were left homeless, underscoring the severity of the crisis.",
        ],
      },
      {
        heading: "Site & Social Context",
        body: [
          "Urban slums in Lebanon represent one of the most significant challenges the country faces. These informal settlements have developed due to rapid uncensored urbanisation, economic instability and displacement caused by repeated conflicts. Mainly concentrated around Beirut, they lack basic infrastructure like clean water, proper housing or sanitation.",
          "Architecture in Lebanese slums is shaped by immediate means rather than professional design. Although people have shown creativity in using cheap and recycled materials — metal sheets, concrete blocks, plastic coverings — the resulting architecture is dense and unplanned, buildings tightly stacked with no room for open space or public facilities. Substance abuse has become one of the most concerning issues within these settlements, its effects devastating for both community and individual.",
          "The project's site sits near the slum, so the architecture of the affordable housing complex must answer the social issues and the context of the site in order to make change — the aim of the academic theme.",
        ],
      },
      {
        heading: "Site Literacy & Analysis",
        body: [
          "Al Ghadir River is a vital geographical feature in the region, but it creates a high risk of flooding in winter, and within the overcrowded region and industrial zones along its banks it suffers high levels of water pollution.",
          "A few traces of traditional Lebanese architecture survive around the site, though these buildings have lost their heritage value to poor adaptive reuse. Over the past three decades the urban sprawl of Al Laylake has all but erased the site's identity; most buildings are informally constructed, lacking a sense of place, driven by the demand for affordable housing close to Beirut. In the last two decades the region's agricultural fields have gradually disappeared, replaced by residential blocks as the population grew.",
          "Al Laylake, in Hadath on the southern edge of Beirut, is a transitional urban area bridging the dense metropolitan fabric of the capital with the more open suburban landscapes beyond. Sitting between Kfarshima, Amrousiyeh, Al Hadath and Chwayfet, and along the Old Saida road, it connects Mount Lebanon to Beirut and gives easy access to the capital and the Lebanese University.",
        ],
      },
      {
        heading: "Modular Architecture",
        body: [
          "Modular architecture divides a building into smaller, standardised, prefabricated units. These modules are grouped first into a single housing unit, then clustered to form the block. The system is standardised and repeatable, flexible enough that modules can be added, removed or rearranged as needs change, and efficient — site preparation and module fabrication happen at the same time, with less material waste.",
          "The first module measures 9.6 m long, 3.9 m wide and 3 m high. The second measures 7.8 m long, 3.9 m wide and 3 m high.",
        ],
      },
      {
        heading: "Housing Unit Variations",
        body: [
          "Each 60 m² unit includes an open-plan living space between the living room and kitchen, one bathroom, one bedroom and a balcony, housing one or two people. Two variations exist for orientation purposes.",
          "The 80 m² unit adds a second bedroom and a second balcony to the same open-plan arrangement, housing two to four people.",
        ],
      },
      {
        heading: "Agricultural Significance",
        body: [
          "The significance of agriculture, beyond its role as a shared community activity, lies in its function as a tool for agro-healing and a behavioural foundation for stability. The tangible, predictable cycle of planting, nurturing and harvesting imposes a natural rhythm that serves as an external structure for emotional regulation; the need for consistent care and patience grounds individuals in present reality and fosters discipline.",
          "Successfully overcoming environmental challenges — weather, pests — to yield a harvest cultivates resilience and self-efficacy, offering tangible proof that sustained effort leads to positive outcomes. The connection to natural life cycles translates the physical act of growth into a metaphor for personal development.",
        ],
      },
      {
        heading: "Structure",
        body: [
          "A hybrid structural system combines distinct materials or structural forms into one integrated building system, leveraging the strengths of each while minimising their weaknesses — more efficient, cost-effective and sustainable than a mono-material approach.",
          "Since all the housing units are elevated, a steel frame acts as the platform carrying the prefabricated units. The main grid axes follow the steel frame; the remaining floors sit independently. Each prefabricated unit is essentially a volumetric modular box whose frame gives it the stiffness to act as a single durable block, joined with others to quickly form a complete building.",
        ],
      },
      {
        heading: "Low Carbon Design",
        body: [
          "Low Carbon Design is a holistic approach that minimises the carbon footprint of buildings by reducing emissions during construction and operation, and by accounting for the embodied carbon of materials and transportation.",
          "On-grid solar powers the housing units; excess generation is sent back to the utility grid, and the units draw from the grid when solar production is insufficient, giving a reliable supply without battery backup.",
          "Sliding louvre sheets made from scrap wood run along the outer edge of every balcony in four identical sliding panels. Louvre colour distinguishes the unit types — green for the 80 m² unit, orange and yellow for the 60 m² units.",
          "Perforated mesh partitions in recyclable aluminium enhance natural ventilation and optimise daylight while controlling solar heat gain, integrating natural patterns and built-in planters. Shared party walls minimise embodied carbon through material selection while optimising thermal performance, and off-site construction cuts build times, waste and on-site risk.",
        ],
      },
    ],
  },
  {
    slug: "narrative-of-jbeil",
    number: "02",
    title: "The Narrative of Jbeil",
    subtitle: "A Tale of Steel & Stone",
    programme: "Design District",
    place: "Byblos, Jbeil, Lebanon",
    year: "2025",
    blurb: "A design district that reads Byblos's timeline in its elevations.",
    lead: "Architecture is meant to cultivate and sustain certain cultures, representing and nourishing them. It does not necessarily mimic — it inspires these features in a new grammar.",
    sections: [
      {
        heading: "Tackled Theme",
        body: [
          "In the heart of one of Lebanon's most rewarded cultural sites, this project is a dynamic design district that answers the need for innovation and creativity. It acts as a cultural and artistic hotspot fostering collaboration and experimentation. While the building promotes technologies beyond Byblos's time, its architecture integrates within the historical city's narrative, context and heritage.",
        ],
      },
      {
        heading: "Project Vision",
        body: [
          "The concept behind this project is storytelling Byblos's timeline. Situated among various historical landmarks, its architectural character — with its own philosophy — blends into the city's context.",
        ],
      },
      {
        heading: "Architectural Dialogue",
        body: [
          "The elevations of the building showcase the different periods Jbeil has undergone: the Bronze Age, known for the invention of copper utilities; the Roman period; and the Ottoman period, in which it wears its mashrabiya-like shaders onto the vertical geometries.",
          "The variation in elevation style is a wayfinding technique — it lets you visually read spaces according to their function.",
        ],
      },
      {
        heading: "Spatial Relations",
        body: [
          "The Design District's three studios — Studio A, Studio B and Studio C — form an integrated creative loop. Studio A is the hub for innovation and early-stage design, with open spaces for collaboration. Next to it, Studio B houses fabrication labs and materials testing, enabling quick transitions from concept to prototype. Studio C, slightly set apart for focus, is a virtual reality lab where designs are digitally simulated and evaluated.",
          "Their close spatial relationship supports a seamless flow from ideation to making to immersive visualization, fostering continuous feedback and creative synergy.",
        ],
      },
    ],
  },
  {
    slug: "journey-to-utopia",
    number: "03",
    title: "The Journey to Utopia",
    programme: "Art Trails",
    place: "Gemmayzeh, Lebanon",
    year: "2025",
    blurb: "Funicular arches turning climate data into something you can walk through.",
    lead: "Art and architecture translate abstract climate statistics into visceral, human experiences. Where scientific reports communicate through data, creative disciplines trigger emotional urgency and offer tangible solutions.",
    sections: [
      {
        heading: "The Trail",
        body: [
          "This temporary art trail journey is situated in the heart of Gemmayzeh, on Gouraud Street. It is formed of three sites: part of the street, which becomes the trail; a large site holding the main structure; and an adjacent smaller one holding the secondary structure.",
        ],
      },
      {
        heading: "Structure",
        body: [
          "To achieve the peculiar form, funicular arches were used. These arches are not continuous — they radially intersect at a shared inclined ring beam.",
          "Steel beams are placed horizontally across parts of each funicular arch, taking the latent loads.",
        ],
      },
    ],
  },
  {
    slug: "ephemeral-luminance",
    number: "04",
    title: "Ephemeral Luminance",
    subtitle: "The Art of Light-Time Stories",
    programme: "VELUX Daylight Competition",
    place: "2024 Edition",
    year: "2024",
    blurb: "Modular partitions of recycled plastic that build stories out of light.",
    lead: "Light is more than a physical phenomenon; it is an expressive language for storytelling.",
    sections: [
      {
        heading: "Overview",
        body: [
          "In this exhibition project, modular partitions are designed to be used in various ways — building blocks of illumination. This approach transcends static displays and allows for dynamism, where the partitions' arrangement shapes the message conveyed and awaits stories to be told.",
        ],
      },
      {
        heading: "Grid Structure",
        body: [
          "This fixed form functions as a framework in which the three narratives unfold. It consists of hollow steel columns and beams arranged onto a 3D grid, forming units measuring 3 × 3 × 3 metres across the three axes. Interchangeable partitions, flat or tapered, are fixed onto these modular frames by a tongue-and-groove mechanism.",
        ],
      },
      {
        heading: "Materials & Light",
        body: [
          "Light is a core principle for material choice, and so is sustainability: millions of tons of single-use plastic waste litter the ecosystem, harming biodiversity and human health. Recyclable plastic is used for its light-transmitting properties — translucent plastic lets light diffuse softly through the panels, creating an immersive experience, while opaque plastic blocks light, permitting its passage only through carved openings.",
          "The narrative variations are amplified by the light source itself, whether daylight or artificial. In two scenarios the power of direct sunlight is harnessed, the recycled plastic panels diffusing natural light into the desired storytelling effect. Another scenario requires illumination beyond daylight hours; artificial sources are integrated within parts of the structural frame with covers that diffuse light on a larger scale. For this to function, portable PV films are stored inside the columns of the structure when not in use, and unfolded in daytime to absorb solar energy using a heliotropism system.",
        ],
      },
      {
        heading: "Narrative One — The Maze",
        body: [
          "The wayfinding experience. This narrative presents a novel approach to the concept of wayfinding in the act of play. Artificial light sources, powered by the PV films, are distributed onto paths needing light. Arranged in a maze-like layout, different partitions trick the user into choosing paths of dead ends: solid partitions block artificial light, while floating partitions allow soft, dim light to contour the visitor's path.",
          "Partitions with central circular openings, inspired by Louis Kahn's openings in some of his Brutalist works, function as far-fetched focal points revealing faint light. This creates a subconscious pull towards brighter areas — a primal instinct seeking safety from darkness. Defying these illusions, a reward unveils: a brilliant illuminated central space, the garden of light, awaits.",
        ],
      },
      {
        heading: "Narrative Two — The Legend of Inanna",
        body: [
          "Storytelling with light. The narrative plunges visitors into Inanna's descent — the Mesopotamian goddess of love, who defied the gods and ventured into the underworld. Each step mirrors the ruthless stripping of her divine power, translated into a blurring of sight as daylight gradually dims for the visitor. Just as Inanna found herself trapped and powerless, visitors may find themselves disoriented, losing spatial awareness.",
          "A spark of hope emerges, emphasising the arrival of the divine messenger who aided her. As visitors navigate the structure with each step back towards the light, they reclaim a sense of control, just as Inanna reclaimed her stolen power. This journey is shaped by partition designs inspired by Richard Meier's deconstructed cubes; the play on the cube's form lets the narrative unfold with each path crossed, while the varying scales of the openings reflect the depth of Inanna's challenges.",
        ],
      },
      {
        heading: "Narrative Three — Stability & Instability",
        body: [
          "The emotional spectrum of light. This narrative depicts the interplay of stability and instability through a dynamic exploration of daylight. Visitors embark on a visually immersive journey, bathed in the steady, calming glow of a controlled light source representing emotional stability. As they progress, the light deepens, before reaching a pivotal point — the breakpoint. Here the immersive experience fractures, dispersing visitors and forcing a choice of path. Light disintegrates towards a state of uncertainty.",
          "Adapting to the fragmented environment, they navigate an architectural labyrinth inspired by Le Corbusier's Ronchamp Chapel. Thick, hollow partitions, reminiscent of the chapel's walls, allow light diffusion and a mesmerising subsurface light effect. Cone-shaped openings channel slivers of light, amplifying the sense of exploration. Finally, emerging from the fragmented space, visitors arrive at a spiritual oasis bathed in serene ceiling light — a place of reflection after crossing this journey.",
        ],
      },
    ],
  },
];

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
