export async function askQuestion(question: string) {
  const aiMessage = await fetch("http://localhost:8000/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });
  const answer = await aiMessage.json();
  return answer;
}

export async function uploadData(formData: FormData) {
  const data = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
  });

  return data
}
