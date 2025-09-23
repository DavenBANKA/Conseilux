import os
import sys

# Ajouter le répertoire courant au PYTHONPATH
sys.path.insert(0, os.path.dirname(__file__))

try:
    from main import app
except ImportError as e:
    print(f"Erreur d'importation: {e}")
    # Créer une application Flask minimale en cas d'erreur
    from flask import Flask
    app = Flask(__name__)
    
    @app.route('/')
    def error():
        return f"Erreur d'importation: {e}", 500

# Point d'entrée pour Vercel
if __name__ == "__main__":
    app.run()
