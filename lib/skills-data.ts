import type { SkillGroup } from "@/types";

export const SKILLS: { name: string; group: SkillGroup; description: string }[] = [
  { name: "LightGBM", group: "ml", description: "Gradient boosting for tabular ML pipelines" },
  { name: "XGBoost", group: "ml", description: "Ensemble models for structured data" },
  { name: "SHAP", group: "ml", description: "Model explainability and feature attribution" },
  { name: "Optuna", group: "ml", description: "Automated hyperparameter optimization" },
  { name: "TF/Keras", group: "ml", description: "Deep learning model development" },
  { name: "Scikit-learn", group: "ml", description: "Classical ML pipelines and evaluation" },
  { name: "RAG", group: "llm", description: "Retrieval-augmented generation systems" },
  { name: "Groq", group: "llm", description: "Fast LLM inference for production APIs" },
  { name: "FAISS", group: "llm", description: "Vector similarity search at scale" },
  { name: "Sentence Transformers", group: "llm", description: "Semantic embeddings for retrieval" },
  { name: "Prompt Engineering", group: "llm", description: "Structured prompts for reliable LLM outputs" },
  { name: "FastAPI", group: "backend", description: "Async Python APIs for ML services" },
  { name: "PostgreSQL", group: "backend", description: "Relational data storage and queries" },
  { name: "PostGIS", group: "backend", description: "Geospatial SQL for location-aware apps" },
  { name: "Docker", group: "backend", description: "Containerized deployment workflows" },
  { name: "Git", group: "backend", description: "Version control and collaborative development" },
  { name: "REST APIs", group: "backend", description: "HTTP service design and integration" },
  { name: "Python", group: "language", description: "Primary language for ML and backend" },
  { name: "C++", group: "language", description: "Systems programming and performance work" },
  { name: "SQL", group: "language", description: "Data querying and analytics" },
  { name: "Java", group: "language", description: "Object-oriented application development" },
];

export const SKILL_COLORS: Record<SkillGroup, string> = {
  ml: "#a78bfa",
  llm: "#22d3ee",
  backend: "#f59e0b",
  language: "#a1a1aa",
};

export const SKILL_GROUP_LABELS: Record<SkillGroup, string> = {
  ml: "ML / AI Core",
  llm: "LLM / GenAI",
  backend: "Backend / Infra",
  language: "Languages",
};

export const SKILL_GROUPS: SkillGroup[] = ["ml", "llm", "backend", "language"];
