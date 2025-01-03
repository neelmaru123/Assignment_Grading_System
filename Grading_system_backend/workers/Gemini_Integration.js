const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI({
  apiKey: "AIzaSyCcsJ3Qx09cNojf5Y-z_t7PR0pfIZhH-P8", // API Key
  region: "us-west4", // Specify region
});

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Specify model
});

async function gradeAssignment(assignmentText) {
  console.log("Grading assignment...");

  const prompt = `
    You are a college professor grading an assignment. Evaluate the student's submission based on the following criteria:

    1. Content Accuracy and Relevance (50%): Is the content factually correct, addressing the assignment topic effectively? Does it include relevant examples, if applicable?
    2. Clarity of Explanation (30%): Is the explanation clear, easy to understand, and logically presented?
    3. Grammar and Language (10%): Is the grammar correct, and is the language appropriate for an academic setting?
    4. Creativity and Original Thought (10%): Does the student demonstrate original ideas or creative thinking in their response?

    Note: Content quality and accuracy are more important than length. The assignment should cover the basic aspects of the topic effectively.

    Please grade the assignment from A to F and just give OverallGrade and OverallFeedback. Do not give the breakdown of the grade.

    Assignment Text: ${assignmentText}
  `;

  try {
    const result = await model.generateContent({
      prompt, // Pass the prompt
    });

    console.log("Raw Response:", result.response.text()); 

    const fields = extractFields(result.response.text());

    return fields;
  } catch (error) {
    console.error("Error during API call:", error.message);
    throw error; // Re-throw the error for further handling
  }
}

function extractFields(response) {
  console.log("Response:", response);

  // Extract Overall Grade
  const gradeMatch = response.match(/Overall\s*Grade:\s*([A-F]+)/i);
  const overallGrade = gradeMatch ? gradeMatch[1].trim() : null;

  // Extract Overall Feedback
  const feedbackMatch = response.match(/Overall\s*Feedback:\s*([\s\S]*)/i);
  const overallFeedback = feedbackMatch ? feedbackMatch[1].trim() : null;

  return {
    overallGrade,
    overallFeedback,
  };
}

module.exports = gradeAssignment;
