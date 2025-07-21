from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_folder="../static", static_url_path="/static")    
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

    # ✅ Enable CORS for frontend (adjust the origin if needed)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # ✅ Register your routes
    from app.routes import main
    app.register_blueprint(main.bp)

    return app  # <-- This was missing!