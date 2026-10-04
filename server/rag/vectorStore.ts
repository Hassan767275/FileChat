import { OpenAIEmbeddings } from "@langchain/openai"
import { PGVectorStore } from "@langchain/pgvector"
import { pool } from "../db/db.js";

const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

export const vectorStore = await PGVectorStore.initialize(embeddings, {
    pool,
    tableName: "rag_documents",
    columns: {
      idColumnName: "id",
      vectorColumnName: "vector",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
    distanceStrategy: "cosine",
  });