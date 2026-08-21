export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "no-color";

export interface IProject {
  title: string;
  year: number;
  slug: string;
  techStack: string[];
  thumbnail: string;
  liveUrl?: string;
  sourceCode?: string;
  team?: boolean;
}
