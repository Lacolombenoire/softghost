// formationInstanceController.js
const pool = require('./db');

// Obtenir toutes les instances détaillées
async function obtenirInstancesDetaillees() {
  try {
    const result = await pool.query('SELECT * FROM obtenir_instances_detaillees()');
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des instances:', error);
    throw error;
  }
}

// Obtenir une instance par ID
async function obtenirInstanceParId(idFormationInstance) {
  try {
    const result = await pool.query('SELECT * FROM obtenir_instance_par_id($1)', [idFormationInstance]);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'instance:', error);
    throw error;
  }
}

// Créer une instance de formation
async function creerInstanceFormation(idFormation, jour) {
  try {
    const result = await pool.query(
      'SELECT creer_instance_formation($1, $2) as id_instance',
      [idFormation, jour]
    );
    return result.rows[0].id_instance;
  } catch (error) {
    console.error('Erreur lors de la création de l\'instance:', error);
    throw error;
  }
}

// Obtenir instances avec réservations
async function obtenirInstancesAvecReservations() {
  try {
    const result = await pool.query('SELECT * FROM obtenir_instances_avec_reservations()');
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des instances avec réservations:', error);
    throw error;
  }
}

// Obtenir instances filtrées
async function obtenirInstancesFiltrees(idFormation = null, dateDebut = null, dateFin = null) {
  try {
    const result = await pool.query(
      'SELECT * FROM obtenir_instances_filtrees($1, $2, $3)',
      [idFormation, dateDebut, dateFin]
    );
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des instances filtrées:', error);
    throw error;
  }
}