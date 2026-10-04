import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
    model: "gpt-5.5"
})

export default model