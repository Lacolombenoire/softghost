// formationController.js
const pool = require('./db');

// Obtenir toutes les formations
async function obtenirToutesFormations() {
  try {
    const result = await pool.query('SELECT * FROM formation ORDER BY nom');
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error);
    throw error;
  }
}

// Obtenir une formation par ID
async function obtenirFormationParId(idFormation) {
  try {
    const result = await pool.query('SELECT * FROM formation WHERE id_formation = $1', [idFormation]);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération de la formation:', error);
    throw error;
  }
}

// Créer une nouvelle formation
async function creerFormation(formationData) {
  const { nom, jour_semaine, heure_debut, heure_fin, chemins_images, description } = formationData;
  
  try {
    const result = await pool.query(
      `INSERT INTO formation (nom, jour_semaine, heure_debut, heure_fin, chemins_images, description) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [nom, jour_semaine, heure_debut, heure_fin, chemins_images, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la création de la formation:', error);
    throw error;
  }
}

// Mettre à jour une formation
async function mettreAJourFormation(idFormation, formationData) {
  const { nom, jour_semaine, heure_debut, heure_fin, chemins_images, description } = formationData;
  
  try {
    const result = await pool.query(
      `UPDATE formation 
       SET nom = $1, jour_semaine = $2, heure_debut = $3, heure_fin = $4, chemins_images = $5, description = $6 
       WHERE id_formation = $7 
       RETURNING *`,
      [nom, jour_semaine, heure_debut, heure_fin, chemins_images, description, idFormation]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la formation:', error);
    throw error;
  }
}

// Ajouter une image à une formation
async function ajouterImageFormation(idFormation, cheminImage) {
  try {
    const result = await pool.query(
      'SELECT ajouter_image_formation($1, $2)',
      [idFormation, cheminImage]
    );
    return { success: true, message: 'Image ajoutée avec succès' };
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'image:', error);
    throw error;
  }
}

// Supprimer une image d'une formation
async function supprimerImageFormation(idFormation, cheminImage) {
  try {
    const result = await pool.query(
      'SELECT supprimer_image_formation($1, $2)',
      [idFormation, cheminImage]
    );
    return { success: true, message: 'Image supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    throw error;
  }
}

// Obtenir la première image d'une formation
async function obtenirPremiereImageFormation(idFormation) {
  try {
    const result = await pool.query(
      'SELECT obtenir_premiere_image_formation($1) as premiere_image',
      [idFormation]
    );
    return result.rows[0].premiere_image;
  } catch (error) {
    console.error('Erreur lors de la récupération de la première image:', error);
    throw error;
  }
}