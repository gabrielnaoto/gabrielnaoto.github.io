export interface ProjectEntry {
  name: string;
  description: { en: string; pt: string };
  skillIcons: string;
  liveUrl?: string;
  codeUrl?: string;
  image?: string;
}

export const projects: ProjectEntry[] = [
  // User will fill in project details later
];
