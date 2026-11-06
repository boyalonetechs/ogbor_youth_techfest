export type Objective = {
  n: string;
  title: string;
  body: string;
  icon: string;
};

export const objectives: Objective[] = [
  {
    n: "01",
    title: "Digital empowerment",
    body: "Expose young people to relevant digital skills and emerging technologies.",
    icon: "⌘",
  },
  {
    n: "02",
    title: "Innovation & creativity",
    body: "Encourage young minds to develop solutions to real-world challenges.",
    icon: "✳",
  },
  {
    n: "03",
    title: "Entrepreneurship",
    body: "Connect digital knowledge with business creation and economic opportunities.",
    icon: "↗",
  },
  {
    n: "04",
    title: "Networking & opportunities",
    body: "Connect participants with mentors, organisations, employers and industry professionals.",
    icon: "◎",
  },
];

export type Panel = {
  n: string;
  title: string;
  sub: string;
  tags: string[];
  image: string;
};

export const panels: Panel[] = [
  {
    n: "PANEL 01",
    title: "Digital marketing as a growth engine for SMEs",
    sub: "Leveraging digital platforms to build brands, reach customers and drive business growth.",
    tags: [
      "Digital marketing strategies",
      "Social media & content",
      "Customer acquisition & online sales",
      "AI tools for business",
    ],
    image: "/panels/panel-01.jpg",
  },
  {
    n: "PANEL 02",
    title: "Unlocking opportunities in the digital economy",
    sub: "From digital skills to income, careers and global opportunities.",
    tags: [
      "Emerging opportunities",
      "Remote work & freelancing",
      "Future-ready skills",
      "Local & global access",
    ],
    image: "/panels/panel-02.jpg",
  },
  {
    n: "PANEL 03",
    title: "Building the nexus between youth and innovation",
    sub: "Harnessing youthful energy, creativity and technology to solve real-world problems.",
    tags: [
      "Youth participation in innovation",
      "Ideas into practical solutions",
      "AI & emerging technologies",
      "Sustainable, scalable innovation",
    ],
    image: "/panels/panel-03.jpg",
  },
];

export const experienceItems = [
  "Inspiring keynote presentations",
  "Panel discussions with industry professionals",
  "Artificial intelligence demonstrations",
  "Practical digital skills exposure",
  "Technology and innovation exhibitions",
  "Business and entrepreneurship conversations",
  "Networking with industry experts and organisations",
  "Training, mentorship and internship pathways",
  "Innovation challenges and talent discovery",
];

export const attendeeRoles = [
  "Secondary school students & graduates",
  "NYSC corps members",
  "Young entrepreneurs & business owners",
  "Technology enthusiasts & aspiring innovators",
  "Freelancers & digital professionals",
  "Students interested in technology",
  "SMEs seeking digital growth",
];

export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "Is registration free?",
    a: "The registration policy will be confirmed when participant registration opens. Any fee or free-access details will be communicated clearly here.",
  },
  {
    q: "Who can attend?",
    a: "Students, graduates, corps members, young entrepreneurs, professionals and anyone interested in technology and innovation.",
  },
  {
    q: "Where will the event take place?",
    a: "Ogbor Hill, Aba, Abia State. The specific venue will be announced.",
  },
  {
    q: "Can I participate as an exhibitor?",
    a: "Yes. Businesses, startups, technology organisations and innovators can apply through the exhibition application form on this page.",
  },
  {
    q: "Can I volunteer?",
    a: "Yes. Interested individuals can apply through the volunteer application form on this page.",
  },
  {
    q: "Will there be networking opportunities?",
    a: "Yes. Participants will have opportunities to connect with other young people, professionals, organisations and industry stakeholders.",
  },
  {
    q: "Will there be opportunities after the event?",
    a: "The event aims to create pathways to further training, mentorship, internships and business development opportunities. Specific programmes and eligibility requirements will be communicated as they are confirmed.",
  },
];
