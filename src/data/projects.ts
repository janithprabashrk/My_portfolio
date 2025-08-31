import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "djks-autohub",
    title: "DJK's AutoHub - Automotive Marketplace",
    shortDescription:
      "A full-stack MERN luxury automotive marketplace connecting buyers and sellers with a modern UI and smooth animations.",
    fullDescription:
      "🚗 About the Project\nDJK's AutoHub is a full-stack MERN (MongoDB, Express, React, Node.js) luxury automotive marketplace designed to connect buyers and sellers of high-end and modified vehicles. The platform features an intuitive, modern interface with smooth animations, offering a premium experience for listing, searching, and managing vehicle inventories.\n\n✨ Key Highlights\n\nAuthentication & User Management: Secure JWT-based authentication, role-based permissions (admin, seller, buyer), and password reset functionality.\n\nVehicle Listings: Create, edit, and delete listings with high-quality images, pricing details, and advanced filters for modified vehicles.\n\nAdvanced Search: Filter by make, model, price range, year, and vehicle type.\n\nReal-time Communication: Contact sellers directly, integrated EmailJS for inquiries, and an AI-powered chatbot for instant assistance.\n\nAdmin Dashboard: Comprehensive analytics, user management, and listing approval workflows.\n\n🛠️ Technologies Used\n\nFrontend: React.js, Redux, Tailwind CSS, Framer Motion, SwiperJS.\n\nBackend: Node.js, Express, MongoDB, JWT, Multer, Bcrypt.\n\nTools: EmailJS, Firebase, RESTful API, AI chatbot integration.\n\n🔗 Project Link: https://github.com/janithprabashrk/DJKs-AutoHub/tree/main\n\n👥 Contributions Welcome! If you'd like to contribute, feel free to fork the project, create a feature branch, and submit a pull request. Let’s drive innovation together!\n\n⭐️ From the DJK's AutoHub Team\nDriving Dreams to Reality 🚗✨\n\n#MERNStack #FullStackDevelopment #LuxuryCars #AutomotiveMarketplace #ReactJS #NodeJS #MongoDB #WebDevelopment #OpenSource #AI #Chatbot #DeveloperCommunity",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "SwiperJS",
      "Multer",
      "Bcrypt",
      "Firebase",
      "EmailJS",
    ],
    demoUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
    githubUrl: "https://github.com/janithprabashrk/DJKs-AutoHub",
    period: "Feb 2024 – Aug 2024",
    affiliation: "University of Colombo School of Computing",
    images: [
      { src: "/projects/autohub-login.jpg", alt: "AutoHub login page" },
      { src: "/projects/autohub-hero-chat.jpg", alt: "AutoHub landing with chatbot" },
      { src: "/projects/autohub-listings.jpg", alt: "AutoHub listings and filters" },
      { src: "/projects/autohub-hero-metrics.jpg", alt: "AutoHub hero and metrics" },
      { src: "/projects/autohub-team.jpg", alt: "AutoHub team section" , ratio: 16/9},
      { src: "/projects/autohub-contact.jpg", alt: "AutoHub contact form" },
      { src: "/projects/autohub-create-listing.jpg", alt: "AutoHub create listing" },
      { src: "/projects/autohub-profile.jpg", alt: "AutoHub user profile" },
    ],
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
      "Streamlit app for visualizing and analyzing mass spectrometry quality control (mzQC) metrics.",
    fullDescription:
      "🚀 Introducing mzQC Dashboard – A Powerful Tool for Mass Spectrometry Quality Control!\n\nThe mzQC Dashboard is a Streamlit-based web application designed to visualize mass spectrometry quality control metrics from mzQC files. This interactive tool empowers researchers and analysts to efficiently explore, analyze, and interpret key quality metrics, metadata, and run summaries—enhancing data-driven decision-making in mass spectrometry workflows.\n\n🔥 Key Features:\n✅ File Upload & Example Data – Easily upload mzQC JSON files or use a built-in example for quick exploration.\n✅ Metadata & Sample Insights – Gain detailed visibility into mzQC file metadata and sample information.\n✅ Interactive Quality Metrics – Visualize key metrics with dynamic charts, tables, and customizable themes.\n✅ Run Summary Overview – Instantly access vital stats like total peptides, proteins, and run duration.\n✅ Customizable Display – Toggle between metadata views, raw metrics tables, and color schemes for better insights.\n✅ Seamless Installation & Usage – Run locally or explore the live demo hassle-free!\n\n🔗 Live Demo: https://mzqc-dashboard-by-janith-prabash-3ddebeaawhqfz88w8qgxan.streamlit.app/\n\n👨‍💻 Developed by:\nJanith Prabash R.K. – Passionate about building innovative solutions for data visualization and scientific research.\n\n📩 Get in Touch: janithprabash944ugc@gmail.com\n\nLet's revolutionize mass spectrometry quality control with intuitive data visualization! 🚀🔬\n\n#MassSpectrometry #DataVisualization #QualityControl #Streamlit #Research #Bioinformatics #mzQC #Innovation #OpenSource",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: [
      "Programming & Scripting",
      "Python",
      "Data Visualization",
      "Streamlit",
      "Plotly",
      "Matplotlib",
      "Flask",
      "Web Development",
      "File Handling & Parsing",
      "mzQC",
      "Machine Learning & Statistics",
      "Data Analysis",
      "Statistical Modeling",
      "Deployment & Hosting",
      "Bioinformatics",
      "Mass Spectrometry",
    ],
    period: "Mar 2025",
    demoUrl:
      "https://mzqc-dashboard-by-janith-prabash-3ddebeaawhqfz88w8qgxan.streamlit.app/",
    githubUrl:
      "https://github.com/janithprabashrk/mzqc-dashboard",
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
