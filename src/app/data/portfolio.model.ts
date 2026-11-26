export interface Profile {
  name: string;
  headline: string;
  summary: string;
  photoUrl: string;
  photoAlt: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export type TimelineKind = 'formacion' | 'experiencia';

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  title: string;
  place: string;
  period: string;
  description: string;
}

export interface ContactLink {
  id: string;
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  demoUrl: string;
  repoUrl: string;
}

export interface Portfolio {
  profile: Profile;
  skills: SkillGroup[];
  timeline: TimelineEntry[];
  contact: ContactLink[];
  projects: Project[];
}
