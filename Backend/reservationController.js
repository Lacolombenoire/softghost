// Backend/controllers/reservationController.js
import pool from './db.js';

// Fonction pour lister les instances disponibles d'une formation
async function listerFormationsDisponibles(formationId = null) {
  try {
    let query = `
      SELECT 
        fi.id_formation_instance,
        fi.jour as date_instance,
        f.heure_debut,
        f.heure_fin,
        fi.id_reference_formation,
        f.nom as formation_nom,
        COALESCE(tr.reservation_count, 0) as reservations_count,
        (30 - COALESCE(tr.reservation_count, 0)) as places_restantes,
        (COALESCE(tr.reservation_count, 0) >= 30) as complet
      FROM formation_instance fi
      JOIN formation f ON fi.id_reference_formation = f.id_formation
      LEFT JOIN (
        SELECT id_formation_instance, COUNT(*) as reservation_count
        FROM table_reservation 
        GROUP BY id_formation_instance
      ) tr ON fi.id_formation_instance = tr.id_formation_instance
      WHERE fi.jour >= CURRENT_DATE
        AND fi.jour <= CURRENT_DATE + INTERVAL '1 month'
    `;
    
    const params = [];
    
    if (formationId) {
      query += ' AND fi.id_reference_formation = $1';
      params.push(formationId);
    }
    
    query += ' ORDER BY fi.jour, f.heure_debut';
    
    const result = await pool.query(query, params);
    
    return result.rows.map(row => ({
      id_instance: row.id_formation_instance,  // ✅ Corrigé
      date: row.date_instance,                 // ✅ Corrigé
      heure_debut: row.heure_debut,
      heure_fin: row.heure_fin,
      formation_nom: row.formation_nom,
      places_restantes: row.places_restantes,
      complet: row.complet,
      reservations_count: row.reservations_count
    }));
    
  } catch (error) {
    console.error('Erreur lors de la récupération des instances disponibles:', error);
    throw error;
  }
}

// Fonction pour inscrire un utilisateur à une formation
async function inscrireFormation(reservationData) {
  try {
    const { prenom, nom, courriel, telephone, id_formation_instance } = reservationData;
    
    // Vérifier que l'instance a des places disponibles
    const checkQuery = `
      SELECT 
        fi.id_formation_instance,
        COALESCE(tr.reservation_count, 0) as reservations_count
      FROM formation_instance fi
      LEFT JOIN (
        SELECT id_formation_instance, COUNT(*) as reservation_count
        FROM table_reservation 
        GROUP BY id_formation_instance
      ) tr ON fi.id_formation_instance = tr.id_formation_instance
      WHERE fi.id_formation_instance = $1 
        AND (COALESCE(tr.reservation_count, 0) < 30)
    `;
    
    const checkResult = await pool.query(checkQuery, [id_formation_instance]);
    
    if (checkResult.rows.length === 0) {
      throw new Error('Cette session est complète ou n\'existe pas');
    }

    // Commencer une transaction
    await pool.query('BEGIN');

    // 1. Créer la réservation - NE PAS fournir l'ID, laisser les triggers le générer
    const insertReservationQuery = `
      INSERT INTO reservation (prenom, nom, courriel, telephone)
      VALUES ($1, $2, $3, $4)
      RETURNING id_reservation
    `;
    
    const reservationResult = await pool.query(insertReservationQuery, [
      prenom, nom, courriel, telephone || null
    ]);

    const idReservation = reservationResult.rows[0].id_reservation;
    console.log('✅ ID de réservation généré:', idReservation);

    // 2. Lier la réservation à l'instance
    const insertTableReservationQuery = `
      INSERT INTO table_reservation (id_reservation, id_formation_instance)
      VALUES ($1, $2)
    `;
    
    await pool.query(insertTableReservationQuery, [idReservation, id_formation_instance]);

    // Valider la transaction
    await pool.query('COMMIT');

    return idReservation;

  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await pool.query('ROLLBACK');
    console.error('❌ Erreur lors de l\'inscription:', error);
    throw error;
  }
}

// Exporter les fonctions
export default {
  listerFormationsDisponibles,
  inscrireFormation
};