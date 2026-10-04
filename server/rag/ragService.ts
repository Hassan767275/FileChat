import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";
import { Document } from "langchain";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config"
import { vectorStore } from "./vectorStore.js";
export async function pdfToDocment(pdfFile: string) {
  const file = await readFile(pdfFile);
  const parser = new PDFParse({ data: file });
  const result = await parser.getText();

  const document = new Document({
    pageContent: result.text,
    metadata: {
      source: file,
    },
  });

  return [document];
}

export async function documentToChunks(document: Document[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 128,
  });
  const chunks = await splitter.splitDocuments(document);
  return chunks;
}

export async function embeddAndStoreChunks(documentChunks: Document[]) {
  await vectorStore.addDocuments(documentChunks);
}
