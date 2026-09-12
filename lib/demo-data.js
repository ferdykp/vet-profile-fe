export const portrait =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpuHGf5DbLZCXNoMF-_rOGpA-iXA3ptSgUFLHKu3NzM1Ghqk2Gi5uS-aOEg7zQN2X0X-fdY6GsKhOZGr3vAj79SB96WUHwwhI6Vd5xxNa_j8B8LqT3j7uxtJhyRJBp72i0qFFhYLJQDLdSwjIQ30OobEFKqN_REYx7Tllmj31LyZlKiYzuAP9QyBxQfOBzw_Iv7NUT_8dmRuBf9nxmV5v7OyPJPH4OzwYmu3tfqJx_sPe9HDFY-4WXoA";
export const demoProfile = {
  id: 1,
  full_name: "drh. Tiara",
  professional_title: "DVM · Veterinary Clinician & Writer",
  headline:
    "Bridging the science of veterinary diagnostics with the human stories behind every patient.",
  short_bio:
    "Veterinarian, writer, and lifelong learner exploring diagnostic medicine, cytology, clinical communication, and the quiet details that shape good care.",
  biography:
    "My work lives at the intersection of diagnostic precision and humane communication. I write to make complex veterinary medicine clearer, more memorable, and more useful at the bedside.",
  location: "United Kingdom",
  email: "hello@example.com",
  profile_photo: { url: portrait },
  hero_photo: { url: portrait },
  clinical_interests: [
    "Cytodiagnostics & Hematology",
    "Immune-Mediated Disorders",
    "Veterinary Communication",
  ],
  social_links: { linkedin: "#", instagram: "#" },
  educations: [
    {
      id: 1,
      degree: "Doctorate of Veterinary Medicine (DVM)",
      institution: "College of Veterinary Medicine",
      start_year: 2010,
      end_year: 2014,
      description:
        "Clinical training with a focus on internal medicine and pathology.",
    },
  ],
  experiences: [
    {
      id: 1,
      position: "Senior Clinician in Internal Medicine & Independent Author",
      organization: "Veterinary Referral Practice",
      start_date: "2020-01-01",
      is_current: true,
      description:
        "Clinical practice, diagnostic consultation, teaching, and long-form veterinary writing.",
    },
    {
      id: 2,
      position: "Emergency & Critical Care Clinician",
      organization: "24-Hour Veterinary Hospital",
      start_date: "2016-01-01",
      end_date: "2019-12-31",
      description:
        "Emergency medicine, critical care, and bedside diagnostics.",
    },
  ],
  certifications: [
    {
      id: 1,
      name: "Advanced Veterinary Cytology",
      issuer: "Continuing Professional Development",
      year: 2022,
    },
  ],
  publications: [
    {
      id: 1,
      title: "Reading Cellular Clues at the Bedside",
      publisher: "Veterinary Review",
      year: 2024,
      url: "#",
    },
  ],
  speaking_events: [
    {
      id: 1,
      event_name: "Clinical Diagnostics Symposium",
      topic: "Practical Cytology for General Practice",
      event_date: "2024-06-15",
    },
  ],
  memberships: [],
};

export const demoCategories = [
  { id: 1, name: "Clinical Cases", slug: "clinical-cases", posts_count: 8 },
  {
    id: 2,
    name: "Cytology & Microscopy",
    slug: "cytology-microscopy",
    posts_count: 6,
  },
  {
    id: 3,
    name: "Clinical Education",
    slug: "clinical-education",
    posts_count: 5,
  },
  {
    id: 4,
    name: "Career & Mentorship",
    slug: "career-mentorship",
    posts_count: 3,
  },
  {
    id: 5,
    name: "Reflective Essays",
    slug: "reflective-essays",
    posts_count: 4,
  },
];

export const demoPosts = [
  {
    id: 1,
    slug: "reading-cellular-landscapes",
    type: "clinical_case",
    title:
      "Reading Cellular Landscapes: Diagnostic Cytology in the Acute Veterinary Patient",
    excerpt:
      "How bedside slide preparation, staining patterns, and a grounded systematic approach turn cellular smears into decisive clinical information.",
    published_at: "2024-10-14",
    reading_time: 9,
    is_featured: true,
    category: demoCategories[1],
    featured_media: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC178nYw1Caw7Up07YqXHzyuipuHAtAC0HvxN-fLSHtbxOAJPFUju0GM8nAdDB63aP9M-_zX7mwYKkvNTPMFpyKdXC8lP-vb4s0V8jYQtaBdMvTBN9ROe5cX4_FG_ncQpCJjkfPMQVykQe64yw5tYJw4vEGrP5XyLUFk8PDiFnEc0AcFPMDC_9NEf164pZzX0BC14dWJ_5jdIyjZxp1tmFTeF1AsJuoDC0R1_ojFHiX8XDGwVttPAssLg",
    },
    author: { profile: demoProfile },
    tags: [{ id: 1, name: "Cytology", slug: "cytology" }],
    content: [
      {
        type: "paragraph",
        data: {
          text: "In acute medicine, cytology is not simply a laboratory exercise. It is a way of looking closely enough to let the patient change your mind.",
        },
      },
      {
        type: "heading",
        data: { level: 2, text: "The Tension Between Speed and Scrutiny" },
      },
      {
        type: "paragraph",
        data: {
          text: "The emergency room rewards speed, but useful cytology still depends on deliberate preparation, context, and pattern recognition. The goal is not instant certainty; it is disciplined probability.",
        },
      },
      {
        type: "quote",
        data: {
          text: "A good smear is not an answer. It is a conversation between morphology, history, and the living patient.",
        },
      },
      {
        type: "heading",
        data: { level: 2, text: "The Five-Minute In-House Protocol" },
      },
      {
        type: "list",
        data: {
          style: "ordered",
          items: [
            "Select the most representative sample.",
            "Prepare a thin, intact smear.",
            "Allow complete air drying before staining.",
            "Scan low power before evaluating cellular detail.",
            "Return every finding to the clinical context.",
          ],
        },
      },
    ],
  },
  {
    id: 2,
    slug: "diagnostic-discordance-feline-sepsis",
    type: "article",
    title:
      "When the Numbers Don’t Match the Patient: Navigating Diagnostic Discordance in Feline Sepsis",
    excerpt:
      "Laboratory values present certainty, but the living feline body whispers anomalies.",
    published_at: "2024-10-02",
    reading_time: 12,
    category: demoCategories[0],
    featured_media: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ2zU54Y3mKUERIrslqFe8YsnUjZB4J1nJSbxwDm8bk1F8DzwdL_M6bpFAluyeXYlgdZg7JVdrriTxSuudg8GXBHidB9USE3zqUo-AO6QAg10dC43an3Fhq0AnrQ31cZ-WU8FXWhDxPDw04VSLtcWYSXoI8HDs_WM-vySthhnDVhMQ9LPs5brAx6rjuYXScc1LOoaW0Ll6npihq8802BMdwGBGXmRiNtl2eCBCzKQ8fwzpwd08Z2Eu_A",
    },
    author: { profile: demoProfile },
    tags: [],
  },
  {
    id: 3,
    slug: "weight-of-the-consult-room",
    type: "story",
    title:
      "The Weight of the Consult Room: Notes on Veterinary Compassion Fatigue",
    excerpt:
      "A reflective note on the emotional labor hidden inside ordinary clinical days.",
    published_at: "2024-09-22",
    reading_time: 7,
    category: demoCategories[4],
    featured_media: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwrgOhllpMouws8S3lUXSCVspbQsMZ-tMqbyusHi9ADvH4vNQ21M586FedNLe8_YjEOa3ppy1Y9a9zjsef51uXJRbpECtyQmeEaNbpmn2wvTFkxz02lkz4QexgC_WbsTITzOpv66-PLcwaZb9gIM515sxWx_l6IYTqHLmERUAz_SHw48haqUkVAQ9XEPvjto1rtmhp9OsFoDt1nP682V6TnZ0CDZif26yt1nI8sjq528G7jDf6FWA05A",
    },
    author: { profile: demoProfile },
    tags: [],
  },
  {
    id: 4,
    slug: "pocus-general-clinicians",
    type: "article",
    title:
      "A Primer on Point-of-Care Ultrasound (POCUS) for General Clinicians",
    excerpt:
      "A practical starting point for integrating focused ultrasound into everyday clinical reasoning.",
    published_at: "2024-09-10",
    reading_time: 10,
    category: demoCategories[2],
    featured_media: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXwMPbV7ny_-5WqozKeGETqg3mOmOtebkV7iMzhx_r_QoF26gBpK38WTX3hS19c7zzaMH6NLG3F0taLVWP1BhAcGyUU3gF40y2hxJmYWkPeqHNL3RHN9cD8DM2kUUVN4f5fCuEVnBT2p44bwCmjbEzePSSS_KehQ_aI3zn3xQ7dXK8MaynQIGG5w4cvmvjK8OcTGhpOV-pYMb5Y0F_sKlt3oBSh9qKK9DkrFGMOP53IGuIyh_75k9TvA",
    },
    author: { profile: demoProfile },
    tags: [],
  },
];

export const demoResources = [
  {
    id: 1,
    title: "Canine & Feline Cytology Quick-Reference Atlas",
    slug: "cytology-atlas",
    type: "book",
    description:
      "A compact visual reference for everyday microscopy and pattern recognition.",
    url: "#",
    is_featured: true,
  },
  {
    id: 2,
    title: "The Rural Ward Rounds Podcast",
    slug: "rural-rounds",
    type: "website",
    description:
      "Conversations about clinical judgment, uncertainty, and veterinary practice.",
    url: "#",
    is_featured: true,
  },
  {
    id: 3,
    title: "Elena’s Naturalist & Pathology Bookshelf",
    slug: "bookshelf",
    type: "book",
    description:
      "Selected books spanning medicine, natural history, pathology, and the craft of observation.",
    url: "#",
    is_featured: true,
  },
];
