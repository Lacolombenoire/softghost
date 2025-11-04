-- Mise à jour des chemins d'images pour correspondre à votre structure de dossiers
UPDATE formation SET chemins_images = 
    CASE id_formation
        -- Formation Blender 3D
        WHEN 'formation1' THEN ARRAY[
            'Blender/blender1.png',
            'Blender/blender2.jpg', 
            'Blender/blender3.jpg',
            'Blender/blender4.png'
        ]
        
        -- Formation Krita - Dessin Digital
        WHEN 'formation2' THEN ARRAY[
            'Krita/krita1.avif',
            'Krita/krita2.webp',
            'Krita/krita3.png',
            'Krita/krita4.webp'
        ]
        
        -- Formation Kdenlive - Montage Vidéo
        WHEN 'formation3' THEN ARRAY[
            'Kdenlive/kdenlive1.webp',
            'Kdenlive/kdenlive2.png',
            'Kdenlive/kdenlive3.png',
            'Kdenlive/kdenlive4.jpg'
        ]
        
        -- Formation DaVinci Resolve - Post-production
        WHEN 'formation4' THEN ARRAY[
            'Davinci_resolve/davinci1.webp',
            'Davinci_resolve/davinci2.jpg',
            'Davinci_resolve/davinci3.jpg',
            'Davinci_resolve/davinci4.jpg'
        ]
        
        -- Formation Ollama - Intelligence Artificielle
        WHEN 'formation5' THEN ARRAY[
            'Ollama/ollama1.png',
            'Ollama/ollama2.png',
            'Ollama/ollama3.png',
            'Ollama/ollama4.png'
        ]
        
        -- Formation Obsidian - Organisation des Connaissances
        WHEN 'formation6' THEN ARRAY[
            'Obsidian/obsidian1.png',
            'Obsidian/obsidian2.jpg',
            'Obsidian/obsidian3.png',
            'Obsidian/obsidian4.png'
        ]
        
        -- Formation ONLY Office - Bureautique Collaborative
        WHEN 'formation7' THEN ARRAY[
            'Onlyoffice/onlyoffice1.png',
            'Onlyoffice/onlyoffice2.png',
            'Onlyoffice/onlyoffice3.png',
            'Onlyoffice/onlyoffice4.png'
        ]
        
        -- Formation Linux Ubuntu - Système d'Exploitation
        WHEN 'formation8' THEN ARRAY[
            'Ubuntu/ubuntu1.jpg',
            'Ubuntu/ubuntu2.webp',
            'Ubuntu/ubuntu3.jpeg',
            'Ubuntu/ubuntu4.png'
        ]
        
        -- Formation Bitwarden - Gestion des Mots de Passe
        WHEN 'formation9' THEN ARRAY[
            'Bitwarden/bitwarden1.png',
            'Bitwarden/birwarden2.png',
            'Bitwarden/bitwarden3.png',
            'Bitwarden/bitwarden4.png'
        ]
        
        -- Formation Notion - Organisation et Productivité
        WHEN 'formation10' THEN ARRAY[
            'Notion/notion1.png',
            'Notion/notion2.png',
            'Notion/notion3.jpg',
            'Notion/notion4.avif'
        ]
        
        -- Formation SlimeVR - Réalité Virtuelle Corporelle
        WHEN 'formation11' THEN ARRAY[
            'SlimeVR/slimevr1.webp',
            'SlimeVR/slimevr2.jpg',
            'SlimeVR/slimevr3.webp',
            'SlimeVR/slimevr4.jpg'
        ]
        
        -- Formation Inkscape - Dessin Vectoriel
        WHEN 'formation12' THEN ARRAY[
            'Inkscape/inkscape1.png',
            'Inkscape/inkscape2.webp',
            'Inkscape/inkscape3.png',
            'Inkscape/inkscape4.jpg'
        ]
        
        -- Formation Draw.io - Création de Diagrammes
        WHEN 'formation13' THEN ARRAY[
            'Draw.io/draw1.png',
            'Draw.io/draw2.jpg',
            'Draw.io/draw3.jpg',
            'Draw.io/draw4.png'
        ]
        
        -- Formation Freemocap - Capture de Mouvement
        WHEN 'formation14' THEN ARRAY[
            'Freemocap/freemocap1.jpg',
            'Freemocap/freemocap2.jpg',
            'Freemocap/freemocap3.jpg',
            'Freemocap/freemocap4.png'
        ]
        
        -- Formation Ibis Paint - Dessin sur Mobile
        WHEN 'formation15' THEN ARRAY[
            'Ibis_paint/ibispaint1.jpg',
            'Ibis_paint/ibispaint2.jpg',
            'Ibis_paint/ibispaint3.jpg',
            'Ibis_paint/ibispaint4.jpg'
        ]
        
        ELSE chemins_images
    END;