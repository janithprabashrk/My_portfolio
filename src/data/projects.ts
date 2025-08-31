import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "djks-autohub",
    title: "DJK's AutoHub - Automotive Marketplace",
    shortDescription:
      "A full-stack MERN luxury automotive marketplace connecting buyers and sellers with a modern UI and smooth animations.",
    fullDescription:
      "A full-stack MERN luxury automotive marketplace connecting buyers and sellers of high-end vehicles. Features authentication with JWT, listing management, rich filtering, and a sleek UI powered by Tailwind and Framer Motion.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
    ],
    demoUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
    githubUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
  },
  {
    id: 2,
    slug: "techhub-by-djk",
    title: "TechHub by DJK",
    shortDescription:
      "A robust backend system for an online tech store, built using Spring Boot.",
    fullDescription:
      "Robust backend for an online tech store, built with Spring Boot 3 and MySQL. Includes role-based access, product management, secure authentication with Spring Security and JWT, and payment integration.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    technologies: ["Spring Boot 3", "MySQL", "JWT", "Spring Security", "Stripe Payment"],
    demoUrl: "https://github.com/janithprabashrk/TechHub-By-DJK",
    githubUrl: "https://github.com/janithprabashrk/TechHub-By-DJK",
  },
  {
    id: 3,
    slug: "smart-parking-alert",
    title: "Smart Parking Alert System",
    shortDescription:
      "An intelligent IoT parking alert system using ESP32 and sensors to adapt to ambient light.",
    fullDescription:
      "An intelligent IoT parking alert system that enhances safety while minimizing energy waste. Uses ESP32, ultrasonic sensor, LDR, and buzzer to adapt to ambient light conditions for optimized efficiency and automation.",
    image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?w=800&q=80",
    technologies: ["IoT", "ESP32", "Embedded Systems", "Automation", "Energy Efficiency"],
    demoUrl:
      "https://www.linkedin.com/posts/janithrk_iot-smartparking-embeddedsystems-activity-7297566226862485504-tFxJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUqTvYBn-_zf-crSnOigEX9waZpU75xJ7c",
    githubUrl:
      "https://www.linkedin.com/posts/janithrk_iot-smartparking-embeddedsystems-activity-7297566226862485504-tFxJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUqTvYBn-_zf-crSnOigEX9waZpU75xJ7c",
  },
  {
    id: 4,
    slug: "mzqc-dashboard",
    title: "mzQC Dashboard",
    shortDescription:
      "A Streamlit app to visualize and analyze mass spectrometry QC metrics.",
    fullDescription:
      "A Streamlit-based web application designed to visualize and analyze mass spectrometry quality control metrics from mzQC files. Provides an interactive interface to explore quality metrics, metadata, and run summaries.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["Python", "Streamlit", "Data Visualization", "Bioinformatics", "Mass Spectrometry"],
    demoUrl:
      "https://mzqc-dashboard-by-janith-prabash-3ddebeaawhqfz88w8qgxan.streamlit.app/",
    githubUrl:
      "https://mzqc-dashboard-by-janith-prabash-3ddebeaawhqfz88w8qgxan.streamlit.app/",
  },
  {
    id: 5,
    slug: "primecare-property-management",
    title: "PrimeCare – Property Management System (PHP MVC)",
    shortDescription:
      "Web-based property renting & management with PHP MVC, PayHere, notifications, and role-based dashboards.",
    fullDescription:
      "🚀 We’re excited to announce the successful completion of our group project \"PrimeCare the Property Management System\"! 🎉 This web-based solution was developed using the PHP MVC framework and is designed to simplify and streamline the property renting and management process for users, property owners, agents, and managers.\n\n🙏 First and foremost, we extend our sincere gratitude to our supervisor Dr. Asanka P. Sayakkara and co-supervisor Mr. Thulasigaran Srimurugathas for their unwavering support, guidance, and encouragement throughout our project journey.\n\nOur system includes features such as property registration, booking, agent assignment, inspection reports, PayHere payment integration, in-app notifications. It also features role-based dashboards, detailed listings, document generation, and a responsive, user-friendly interface.\n\nThis project was a collaborative effort by our amazing team:\n👨‍💻 Wendt Edmund\n👩‍💻 Janith Prabash R.K.\n👨‍💻 Bimsara Imash\n👩‍💻 Nimna Pathum\n\nSpecial thanks to our mentors:\n🎓 Janitha Ratnayake\n🎓 Senal Punsara\n🎓 Sethni Disanayaka\n\nThis journey was a rewarding experience in teamwork, technical design, and real-world problem solving.",
    image: "/projects/primecare-cover.jpg",
    backdropImage: "/projects/primecare-cover.jpg",
    images: [
      { src: "/projects/primecare-cover.jpg", alt: "PrimeCare cover" },
  { src: "/projects/primecare-landing.jpg", alt: "PrimeCare landing page", caption: "Welcome and featured properties" },
  { src: "/projects/primecare-presentation.jpg", alt: "Project presentation slide", caption: "Project overview" },
  { src: "/projects/primecare-finance-report.jpg", alt: "Finance report dashboard", caption: "Earnings, spending, profit dashboards" },
  { src: "/projects/primecare-team.jpg", alt: "Team photo", caption: "Team behind PrimeCare", ratio: 3/4 },
    ],
    videos: [
  { src: "/projects/Recording 2025-04-15 151231.mp4", type: "file", title: "PrimeCare Demo – 2025-04-15", poster: "/projects/primecare-landing.jpg" },
  { src: "/projects/Recording 2025-04-16 104001.mp4", type: "file", title: "PrimeCare Demo – 2025-04-16", poster: "/projects/primecare-presentation.jpg" },
  { src: "/projects/Recording 2025-04-17 090359.mp4", type: "file", title: "PrimeCare Demo – 2025-04-17", poster: "/projects/primecare-property-detail.jpg" },
    ],
    technologies: ["PHP", "MVC", "MySQL", "PayHere", "Notifications", "Responsive UI"],
    demoUrl: "https://github.com/PrimeCare-groupProject/PrimeCare_php_mvc",
    githubUrl: "https://github.com/PrimeCare-groupProject/PrimeCare_php_mvc",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
