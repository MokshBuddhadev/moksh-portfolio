export interface Project {
  index: string;
  name: string;
  descriptor: string;
  overview: string;
  metric: string;
  tags: string[];
  github: string;
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Credit Risk Assessment",
    descriptor: "17 classifiers. 30K records. One leakage-free pipeline.",
    overview:
      "End-to-end credit default prediction on 30K loan records. Benchmarked 17 classifiers with strict temporal splits to prevent leakage, SMOTE for imbalance, Optuna hyperparameter tuning, and SHAP for model explainability. LightGBM achieved the best hold-out AUC.",
    metric: "AUC 0.7730",
    tags: ["scikit-learn", "LightGBM", "SHAP", "Optuna", "SMOTE"],
    github: "github.com/MokshBuddhadev/credit-risk-assessment",
  },
  {
    index: "02",
    name: "ReguLens-AI",
    descriptor: "RAG pipeline for RBI & KYC compliance documents.",
    overview:
      "Production RAG system for querying RBI and KYC regulatory documents. PDF ingestion via PyMuPDF, chunking + embedding pipeline, FAISS vector store, and Groq Llama 3 for sub-second grounded answers through a FastAPI backend.",
    metric: "Sub-second retrieval",
    tags: ["RAG", "Groq Llama 3", "FAISS", "FastAPI", "PyMuPDF"],
    github: "github.com/MokshBuddhadev/regulens-ai",
  },
  {
    index: "03",
    name: "FloatChat AI",
    descriptor: "Natural language → SQL → PostGIS. Ocean data, plain English.",
    overview:
      "Conversational interface over oceanographic datasets stored in PostGIS. Llama 3.1 70B with tool-calling generates validated SQL from plain English queries, returning geospatial results through a FastAPI service layer.",
    metric: "95% query success",
    tags: ["Llama 3.1 70B", "PostGIS", "Tool-calling", "FastAPI"],
    github: "github.com/MokshBuddhadev",
  },
];
