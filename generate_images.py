#!/usr/bin/env python3
"""
Script pour générer automatiquement toutes les images de placeholder
pour les partenaires et certifications manquantes.
"""

import os
import glob

def create_svg_placeholder(name, is_certification=False):
    """Crée un SVG placeholder pour un partenaire ou une certification"""
    if is_certification:
        # Certifications - fond bleu avec texte blanc
        width, height = 100, 80
        bg_color = "#4169e1"
        border_color = "#2740d1"
        text_color = "white"
        font_size = 9 if len(name) > 8 else 10
    else:
        # Partenaires - fond gris avec texte foncé
        width, height = 120, 60
        bg_color = "#f8f9fa"
        border_color = "#e9ecef"
        text_color = "#495057"
        font_size = 10 if len(name) > 10 else 12
    
    # Limiter la longueur du texte
    display_name = name[:12] + "..." if len(name) > 12 else name
    
    svg_content = f'''<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="{width}" height="{height}" fill="{bg_color}" stroke="{border_color}" stroke-width="2" rx="8"/>
  <text x="{width//2}" y="{height//2 + 5}" font-family="Arial, sans-serif" font-size="{font_size}" font-weight="bold" text-anchor="middle" fill="{text_color}">{display_name.upper()}</text>
</svg>'''
    
    return svg_content

def generate_missing_images():
    """Génère toutes les images manquantes"""
    
    # Listes basées sur les templates
    partenaires = [
        'aibd', 'air liquide', 'anglogold', 'ansd', 'apm terminals', 'boa', 'bollore', 
        'cat', 'cbi', 'cde', 'ciments du sahel', 'coris bank', 'diamond bank', 
        'ecobank', 'enda', 'giz', 'iam', 'ics', 'ird', 'kirene', 'lonase', 
        'orange', 'pcci', 'petrosen', 'sde', 'sen eau', 'sgbs', 'sonatel', 
        'total', 'ucad', 'uemoa', 'unesco', 'usaid'
    ]
    
    certifications = [
        'apics', 'british', 'cambridge', 'cgeit', 'cisaf', 'cobit', 'comptia', 
        'ec council', 'google', 'iiba', 'isaca', 'iso', 'itil', 'microsoft', 
        'pmi', 'prince2', 'safe', 'scrum', 'toefl', 'toeic'
    ]
    
    # Créer les dossiers s'ils n'existent pas
    os.makedirs('static/partenaires', exist_ok=True)
    os.makedirs('static/certifications', exist_ok=True)
    
    # Générer les images de partenaires
    print("Génération des images de partenaires...")
    for partner in partenaires:
        filepath = f'static/partenaires/{partner}.svg'
        if not os.path.exists(filepath):
            svg_content = create_svg_placeholder(partner, is_certification=False)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(svg_content)
            print(f"✓ Créé: {filepath}")
        else:
            print(f"- Existe déjà: {filepath}")
    
    # Générer les images de certifications
    print("\nGénération des images de certifications...")
    for cert in certifications:
        filepath = f'static/certifications/{cert}.svg'
        if not os.path.exists(filepath):
            svg_content = create_svg_placeholder(cert, is_certification=True)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(svg_content)
            print(f"✓ Créé: {filepath}")
        else:
            print(f"- Existe déjà: {filepath}")
    
    print(f"\n🎉 Génération terminée!")
    print(f"📁 Partenaires: {len(partenaires)} images")
    print(f"📁 Certifications: {len(certifications)} images")

if __name__ == "__main__":
    generate_missing_images()
