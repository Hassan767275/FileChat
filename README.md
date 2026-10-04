# FileChat

Upload a PDF and ask questions about it. FileChat reads your document, finds the parts that are relevant to your question, and answers using what's actually in the file instead of making things up.

## How it works

FileChat uses RAG (retrieval-augmented generation):

1. **Upload**: you upload a PDF, and the server parses the text out of it
2. **Chunk**: the text is split into smaller overlapping chunks
3. **Embed and store**: each chunk is turned into an embedding with OpenAI and stored in PostgreSQL with pgvector
4. **Ask**: when you ask a question, the most similar chunks are pulled from the database and sent to the model with your question, so the answer is grounded in your document

```
React client → Express API → PDF parsing + chunking (LangChain) → OpenAI embeddings → PostgreSQL + pgvector → OpenAI chat → answer
```

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **AI:** LangChain, OpenAI API (embeddings + chat)
- **Database:** PostgreSQL with pgvector, run in Docker
- **File handling:** Multer, pdf-parse

## Running it locally

You'll need Node.js 18+, Docker, and an OpenAI API key.

Start Postgres with pgvector:

```bash
docker run -d --name filechat-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 pgvector/pgvector:pg16
```

Create a `.env` file in `server/`:

```
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

Then run the server and client:

```bash
cd server && npm install && npm run dev
cd client && npm install && npm run dev
```
