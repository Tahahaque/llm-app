from flask import Blueprint, request, jsonify, make_response
from uuid import uuid4
from flask_cors import cross_origin

from app.utils.patient_workflow import (
    generate_follow_up_question,
    process_response,
    process_story
)
from app.utils.pdf_generator import generate_pdf

bp = Blueprint("main", __name__)
active_sessions = {}

@bp.route("/api/submit_story", methods=["POST"])
@cross_origin()
def submit_story():
    data = request.get_json()
    user_input = data.get("story", "")

    report = process_story(user_input)

    session_id = str(uuid4())
    session = {
        "report": report,
        "question": "",
        "past_questions": [],
    }
    active_sessions[session_id] = session

    question = generate_follow_up_question(report, session["past_questions"])

    if question:
        msg = {
            "status": "followup_question",
            "question": question,
            "report": report, # Useful for debugging
        }
        session["question"] = question
    else:
        msg = {
            "status": "complete",
            "report": report,
        }

    resp = jsonify(msg)
    resp.set_cookie("session_id", session_id)
    return resp


@bp.route("/api/submit_answer", methods=["POST", "OPTIONS"])
@cross_origin()
def submit_answer():
    if request.method == "OPTIONS":
        return '', 200  # Preflight response

    session_id = request.cookies.get("session_id") or ""
    session = active_sessions[session_id]

    data = request.get_json()
    report = session["report"]
    question = session["question"]
    answer = data.get("answer", "")

    process_response(report, question, answer)

    question = generate_follow_up_question(report, session["past_questions"])

    if question:
        msg = {
            "status": "followup_question",
            "question": question,
            "report": report, # Useful for debugging
        }
        session["past_questions"].append(session["question"])
        session["question"] = question
    else:
        msg = {
            "status": "complete",
            "report": report,
        }

    resp = jsonify(msg)
    resp.set_cookie("session_id", session_id)
    return resp


@bp.route("/api/generate_report", methods=["GET"])
@cross_origin()
def generate_report():
    session_id = request.cookies.get("session_id") or ""
    session = active_sessions[session_id]
    report = session["report"]

    print(f"🎯 Generating report for session: {session_id}")
    report_bytes = generate_pdf(report)
    del active_sessions[session_id]

    response = make_response(report_bytes)
    response.headers['Content-Type'] = 'application/pdf'
    return response
