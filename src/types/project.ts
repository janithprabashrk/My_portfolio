export interface Project {
  id: number;
  slug: string; // for routing
  title: string;
  shortDescription: string;
  fullDescription?: string;
  image: string;
  backdropImage?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  images?: Array<{
    src: string;
    alt?: string;
    caption?: string;
  ratio?: number; // e.g., 16/9 (default), 9/16 for portrait
  }>;
  videos?: Array<{
    src: string; // YouTube/Vimeo URL or local /public path
    title?: string;
    poster?: string; // poster image for file videos
    type?: "youtube" | "vimeo" | "file"; // optional hint
  }>;
  period?: string; // e.g., "Feb 2024 – Aug 2024"
  affiliation?: string; // e.g., "University of Colombo School of Computing"
}
