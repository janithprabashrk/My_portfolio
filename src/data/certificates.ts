export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date?: string; // e.g., "2024-06" or human-readable
  credentialId?: string;
  url?: string; // link to the certificate/credential
  tags?: string[];
  imageUrl?: string; // path like /certificates/xxx.png under public
  imageAlt?: string;
};

// TODO: Replace the sample data with your real certificates.
export const certificates: Certificate[] = [
        {
    id: "Machine Learning with Python",
    title: "Machine Learning with Python",
    issuer: "Coursera,IBM",
    date: "19 Nov 2024",
    // credentialId: "CC-XTWXZWSO",
    // Save image as /public/certificates/machine-learning-with-python.jpg
    imageUrl: "/certificates/Coursera MJCGO1WQRYBM (1)_page-0001.jpg",
    imageAlt: "Machine Learning with Python Certificate",
    url: "https://coursera.org/verify/MJCGO1WQRYBM",
    tags: ["Machine Learning", "Coursera", "IBM"],
  },
    
    {
    id: "angular-intermediate",
    title: "Angular (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "23 Aug 2025",
    credentialId: "00876A5330D8",
    // Save image as /public/certificates/angular-intermediate.jpg
    imageUrl: "/certificates/angular_intermediate certificate_page.jpg",
    imageAlt: "Angular (Intermediate) Certificate",
    url: "https://www.hackerrank.com/certificates/00876a5330d8",
    tags: ["Angular", "HackerRank"],
  },

      {
    id: "Java (Basic) Certificate",
    title: "Java (Basic) Certificate",
    issuer: "HackerRank",
    date: "25 Jun, 2024",
    credentialId: "D5457216AAEB",
    // Save image as /public/certificates/angular-intermediate.jpg
    imageUrl: "/certificates/java_basic certificate_page-0001.jpg",
    imageAlt: "Java (Basic) Certificate",
    url: "https://www.hackerrank.com/certificates/d5457216aaeb",
    tags: ["Java", "HackerRank"],
  },
      {
    id: "postman-api-fundamentals",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "Aug 6, 2025 at 12:06 AM",
    credentialId: "68924f2872bbd2225ec1950f",
    // Save image as /public/certificates/postman-api-fundamentals.jpg
    imageUrl: "/certificates/Postman - Postman API Fundamentals Student Expert - 2025-08-06 (1).png",
    imageAlt: "Postman API Fundamentals Student Expert",
    url: "https://badgr.com/public/assertions/EscWhuFWQQap1VV2Dia4HQ",
    tags: ["Postman", "API", "Fundamentals"],
  },
  {
    id: "software-engineer-intern",
    title: "Software Engineer Intern Certificate",
    issuer: "HackerRank",
    date: "08 Jul 2025",
    credentialId: "5E3658230BC1",
    // Save image as /public/certificates/angular-intermediate.jpg
    imageUrl: "/certificates/software_engineer_intern certificate_page-0001.jpg",
    imageAlt: "Software Engineer Intern Certificate",
    url: "https://www.hackerrank.com/certificates/5e3658230bc1",
    tags: ["Software Engineering", "Internship"],
  },
      {
    id: "JavaScript (Intermediate) Certificate`",
    title: "JavaScript (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "10 Nov 2024",
    credentialId: "DI67DD3AE383",
    // Save image as /public/certificates/angular-intermediate.jpg
    imageUrl: "/certificates/javascript-intermediate-certificate_page-0001.jpg",
    imageAlt: "JavaScript (Intermediate) Certificate",
    url: "https://www.hackerrank.com/certificates/d167dd3ae383",
    tags: ["JavaScript", "HackerRank"],
  },
    {
    id: "AWS Educate Introduction to Cloud 101",
    title: "AWS Educate Introduction to Cloud 101",
    issuer: "Amazon Web Services Training and Certification",
    date: "August 01, 2024",
    // credentialId: "CC-XTWXZWSO",
    // Save image as /public/certificates/aws-educate-introduction-to-cloud-101.jpg
    imageUrl: "/certificates/AWS.png",
    imageAlt: "AWS Educate Introduction to Cloud 101 Certificate",
    url: "https://www.credly.com/badges/b10dcc89-450d-4b35-a916-1e2d91cac7bf/linked_in_profile",
    tags: ["AWS", "Cloud", "Introduction"],
  },

    {
    id: "Python Developer",
    title: "Python Developer Certificate",
    issuer: "Sololearn",
    date: "21 June, 2024",
    credentialId: "CC-SNYQ7POY",
    // Save image as /public/certificates/angular-intermediate.jpg
    imageUrl: "/certificates/Python.jpg",
    imageAlt: "Python Developer Certificate",
    url: "https://www.sololearn.com/en/certificates/CC-5NYQ7P0Y",
    tags: ["Python", "Developer"],
  },

  {
    id: "sololearn-intro-js",
    title: "Introduction to JavaScript",
    issuer: "SoloLearn",
    date: "2024-06-02",
    credentialId: "CC-XTWXZWSO",
    // Save image as /public/certificates/sololearn-intro-to-javascript.jpg
    imageUrl: "/certificates/sololearn-intro-to-javascript.jpg",
    imageAlt: "SoloLearn Introduction to JavaScript certificate",
    url: "https://www.sololearn.com/en/certificates/CC-XTWXZWSO",
    tags: ["JavaScript", "SoloLearn"],
  },
  {
    id: "linkedin-career-skills-software-dev",
    title: "Introduction to Career Skills in Software Development",
    issuer: "LinkedIn Learning",
    date: "2024-08-11",
    // Save image as /public/certificates/linkedin-intro-career-skills-software-dev.jpg
    imageUrl: "/certificates/linkedin-intro-career-skills-software-dev.jpg",
    imageAlt: "LinkedIn Learning - Introduction to Career Skills in Software Development",
    url: "https://www.linkedin.com/learning/certificates/a7c9c0e4fe2321ebfb939334d7baf012fb3848a67442e48dcc523a3eaa239a7a?trk=share_certificate",
    tags: ["Career", "Software Development", "LinkedIn Learning"],
  },

    {
    id: "Java Intermediate",
    title: "Java Intermediate",
    issuer: "SoloLearn",
    date: "24 Jun 2024",
    credentialId: "CC-PHNCEDLR",
    // Save image as /public/certificates/sololearn-intro-to-javascript.jpg
    imageUrl: "/certificates/java solo.jpg",
    imageAlt: "SoloLearn Java Intermediate certificate",
    url: "https://www.sololearn.com/en/certificates/CC-PHNCEOLR",
    tags: ["Java", "SoloLearn"],
  },
//     {
//     id: "javascript-intermediate",
//     title: "JavaScript (Intermediate) Certificate",
//     issuer: "",
//     // If you place the PDF in public/certificates, this link will work:
//     url: "/certificates/javascript-intermediate-certificate.pdf",
//     tags: ["JavaScript", "Intermediate"],
//   },
//   {
//     id: "software-engineer-intern",
//     title: "Software Engineer Intern Certificate",
//     issuer: "",
//     url: "/certificates/software-engineer-intern-certificate.pdf",
//     tags: ["Internship", "Software Engineering"],
//   },
];
