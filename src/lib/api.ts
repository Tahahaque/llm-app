// src/lib/api.ts

interface ApiResult {
  status: "followup_question" | "complete";
  report?: any;
  question?: string;
}

/** Submit initial story (reason for visit) */
export const submitStory = async (story: string): Promise<ApiResult> => {
  const response = await fetch("/api/submit_story", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ story }),
  });

  if (!response.ok) throw new Error("Failed to submit story");
  return await response.json();
};

/** Submit a follow-up answer (clarification flow) */
export const submitAnswer = async (answer: string): Promise<ApiResult> => {
  const response = await fetch("/api/submit_answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: answer,
    }),
  });

  if (!response.ok) throw new Error("Failed to submit answer");
  return await response.json();
};

export const generateReport = async (): Promise<{ pdf_path: string }> => {
  const response = await fetch("/api/generate_report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) throw new Error("Failed to generate report");
  return await response.json();
};
