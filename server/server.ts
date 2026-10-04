import express from "express";
import cors from "cors";
import multer from "multer";
import { pdfToDocment, documentToChunks } from "./rag/ragService.js";
import { embeddAndStoreChunks } from "./rag/ragService.js";
import { pool } from "./db/db.js";
import { vectorStore } from "./rag/vectorStore.js";
import model from "./model.js";

const app = express();

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "You need to upload a file" });
    }
    await pool.query("DELETE FROM rag_documents");
    const pdfFile = req.file.path;
    const document = await pdfToDocment(pdfFile);

    const documentChunks = await documentToChunks(document);

    await embeddAndStoreChunks(documentChunks);
  } catch (error) {
    return res.status(422).json({ error: "error processing file" });
  }

  res.status(200).json({ message: "File upload succesfll" });
});

app.post("/question", async (req, res) => {
  const { question } = req.body;
  const retriever = vectorStore.asRetriever({ k: 4 });
  const chunks = await retriever.invoke(question);

  const context = chunks.map((chunks) => chunks.pageContent).join("\n\n");

  const prompt = `
        Answer using only the provided context. If the context doesn't contain enough information to answer the question, say that the document doesn't provide that information.

        Context:
        ${context}

        Question:
        ${question}
    `;
  const response = await model.invoke(prompt);
  return res.json({ answer: response.content });
});

app.listen(8000, () => {
  console.log("server is running");
});
