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
}
