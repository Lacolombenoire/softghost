-- Ajout des nouvelles colonnes à la table formation
ALTER TABLE formation 
ADD COLUMN chemins_images TEXT[],
ADD COLUMN description TEXT;

-- Mise à jour de la contrainte CHECK pour inclure les nouvelles colonnes si nécessaire
-- (Pas de contrainte spécifique nécessaire pour ces types de données)