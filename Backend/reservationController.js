// reservationController.js
const pool = require('./db');

// Inscrire à une formation
async function inscrireFormation(reservationData) {
  const { prenom, nom, courriel, telephone, id_formation_instance } = reservationData;
  
  try {
    const result = await pool.query(
      'SELECT inscrire_formation($1, $2, $3, $4, $5) as id_reservation',
      [prenom, nom, courriel, telephone, id_formation_instance]
    );
    return result.rows[0].id_reservation;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
}

// Obtenir les statistiques d'une formation
async function obtenirStatistiquesFormation(idFormation) {
  try {
    const result = await pool.query(
      'SELECT * FROM obtenir_statistiques_formation($1)',
      [idFormation]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}

// Lister les formations disponibles
async function listerFormationsDisponibles() {
  try {
    const result = await pool.query('SELECT * FROM lister_formations_disponibles()');
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des formations disponibles:', error);
    throw error;
  }
}

// Obtenir les réservations d'une instance
async function obtenirReservationsParInstance(idFormationInstance) {
  try {
    const result = await pool.query(
      `SELECT r.* 
       FROM reservation r
       JOIN table_reservation tr ON r.id_reservation = tr.id_reservation
       WHERE tr.id_formation_instance = $1
       ORDER BY r.nom, r.prenom`,
      [idFormationInstance]
    );
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
}