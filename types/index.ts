export type SkillGroup = "ml" | "llm" | "backend" | "language";

export interface Skill {
  name: string;
  group: SkillGroup;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  descriptor: string;
  metric: string;
  tags: string[];
  github: string;
}
