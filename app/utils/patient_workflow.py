import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.pregel.write import Optional
from pydantic.v1.types import SecretStr

# Load environment variables
load_dotenv()
openai_api_key = SecretStr(os.getenv("OPENAI_API_KEY") or "")

model = ChatOpenAI(api_key=openai_api_key, temperature=0, model="gpt-3.5-turbo")

def process_story(story: str) -> dict:
    patient_info = {
        "reason": None,
        "symptoms": None,
        "additional": "",
    }

    prompt = f"""
You are a medical intake assistant.

Extract the following from this patient response:
- Reason for visit
- Symptoms
- Additional notes

Example format:
Reason for visit: ...
Symptoms: ...
Additional notes: ...

Patient response: {story}
"""

    response = model.invoke([HumanMessage(content=prompt)])
    text = response.content.strip()

    print("Prompt:")
    print(prompt)
    print("Response:")
    print(text)

    try:
        if "Reason for visit:" in text:
            patient_info["reason"] = text.split("Reason for visit:")[1].split("\n")[0].strip()
        if "Symptoms:" in text:
            patient_info["symptoms"] = text.split("Symptoms:")[1].split("\n")[0].strip()
        if "Additional notes:" in text:
            patient_info["additional"] = text.split("Additional notes:")[1].strip()
    except Exception:
        patient_info["additional"] += f" Raw response: {text}"

    return patient_info

def process_response(report: dict, question: str, answer: str):
    prompt = f"""
You are a medical intake assistant.

Based on the following patient report:

Reason for visit: {report.get("reason", "N/A")}
Symptoms: {report.get("symptoms", "N/A")}
Additional notes: {report.get("additional", "N/A")}

Summarize the patient's response and add it to the patient report.

Example format:
Reason for visit: ...
Symptoms: ...
Additional notes: ...

Question: {question}
Patient response: {answer}
"""

    response = model.invoke([HumanMessage(content=prompt)])
    text = response.content.strip()

    print("Prompt:")
    print(prompt)
    print("Response:")
    print(text)

    try:
        if "Reason for visit:" in text:
            report["reason"] = text.split("Reason for visit:")[1].split("\n")[0].strip()
        if "Symptoms:" in text:
            report["symptoms"] = text.split("Symptoms:")[1].split("\n")[0].strip()
        if "Additional notes:" in text:
            report["additional"] = text.split("Additional notes:")[1].strip()
    except Exception:
        report["additional"] += f" Raw response: {text}"

def generate_follow_up_question(report: dict, past_questions: list) -> Optional[str]:
    prompt = f"""
You are a medical intake assistant.

Based on the following patient report:

Reason for visit: {report.get("reason", "N/A")}
Symptoms: {report.get("symptoms", "N/A")}
Additional notes: {report.get("additional", "N/A")}

You may ask the patient one question to expand on any of the above topics.
If no follow-up question is needed, simply say nothing.
Do not ask questions about information that is already present in the report.
"""

    response = model.invoke([HumanMessage(content=prompt)])
    text = response.content.strip()

    print("Prompt:")
    print(prompt)
    print("Response:")
    print(text)

    if text == "none":
        return None
    return text
