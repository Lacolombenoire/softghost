// Backend/routes/formations.js
import express from 'express';
import formationController from '../formationController.js';
import formationInstanceController from '../formationInstanceController.js';
import reservationController from '../reservationController.js';
import pool from '../db.js'; // ✅ AJOUT: Import du pool
// Dans Backend/routes/formations.js - modifier la route POST /reservations
import { sendEmail } from '../emailer.js'; // ✅ AJOUT: Import de l'emailer

const router = express.Router();

// Routes pour les formations
router.get('/formations', async (req, res) => {
  try {
    const formations = await formationController.obtenirToutesFormations();
    res.json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/formations/:id', async (req, res) => {
  try {
    const formation = await formationController.obtenirFormationParId(req.params.id);
    if (!formation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }
    res.json(formation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes pour les instances
router.get('/instances', async (req, res) => {
  try {
    const instances = await formationInstanceController.obtenirInstancesDetaillees();
    res.json(instances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/instances/:id', async (req, res) => {
  try {
    const instance = await formationInstanceController.obtenirInstanceParId(req.params.id);
    if (!instance) {
      return res.status(404).json({ error: 'Instance non trouvée' });
    }
    res.json(instance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ CORRIGÉ: Une seule route pour les formations disponibles
router.get('/formations-disponibles', async (req, res) => {
  try {
    const { formation } = req.query;
    console.log('🔍 Recherche instances pour formation:', formation);
    
    const instances = await reservationController.listerFormationsDisponibles(formation);
    res.json(instances);
  } catch (error) {
    console.error('❌ Erreur récupération instances:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route pour créer une réservation
router.post('/reservations', async (req, res) => {
  try {
    const { prenom, nom, courriel, telephone, id_formation_instance } = req.body;
    
    // Validation des données requises
    if (!prenom || !nom || !courriel || !id_formation_instance) {
      return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }

    // Vérifier que l'instance existe et a des places disponibles
    const checkInstanceQuery = `
      SELECT 
        fi.id_formation_instance,
        fi.jour,
        f.nom as formation_nom,
        f.heure_debut,
        f.heure_fin
      FROM formation_instance fi
      JOIN formation f ON fi.id_reference_formation = f.id_formation
      LEFT JOIN (
        SELECT id_formation_instance, COUNT(*) as reservation_count
        FROM table_reservation 
        GROUP BY id_formation_instance
      ) tr ON fi.id_formation_instance = tr.id_formation_instance
      WHERE fi.id_formation_instance = $1 
        AND (COALESCE(tr.reservation_count, 0) < 30)
    `;
    
    const instanceResult = await pool.query(checkInstanceQuery, [id_formation_instance]);
    
    if (instanceResult.rows.length === 0) {
      return res.status(400).json({ error: 'Cette session est complète ou n\'existe pas' });
    }

    const instance = instanceResult.rows[0];

    // Commencer une transaction
    await pool.query('BEGIN');

    // 1. Créer la réservation
    const insertReservationQuery = `
      INSERT INTO reservation (prenom, nom, courriel, telephone)
      VALUES ($1, $2, $3, $4)
      RETURNING id_reservation
    `;
    
    const reservationResult = await pool.query(insertReservationQuery, [
      prenom, nom, courriel, telephone || null
    ]);

    const idReservation = reservationResult.rows[0].id_reservation;

    // 2. Lier la réservation à l'instance
    const insertTableReservationQuery = `
      INSERT INTO table_reservation (id_reservation, id_formation_instance)
      VALUES ($1, $2)
    `;
    
    await pool.query(insertTableReservationQuery, [idReservation, id_formation_instance]);

    // Valider la transaction
    await pool.query('COMMIT');

    // ✅ AJOUT: Envoyer l'email de confirmation
    try {
      const dateFormatee = new Date(instance.jour).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; text-align: center;">Confirmation de votre inscription</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Détails de votre réservation</h3>
            <p><strong>Formation :</strong> ${instance.formation_nom}</p>
            <p><strong>Date :</strong> ${dateFormatee}</p>
            <p><strong>Heure :</strong> ${instance.heure_debut?.substring(0, 5)} - ${instance.heure_fin?.substring(0, 5)}</p>
            <p><strong>Participant :</strong> ${prenom} ${nom}</p>
            <p><strong>Numéro de réservation :</strong> ${idReservation}</p>
          </div>

          <div style="background: #e8f6f3; padding: 15px; border-radius: 8px; border-left: 4px solid #27ae60;">
            <h4 style="color: #27ae60; margin-top: 0;">📋 Informations importantes</h4>
            <ul style="margin-bottom: 0;">
              <li>Présentez-vous 15 minutes avant le début de la formation</li>
              <li>Apportez votre ordinateur portable si nécessaire</li>
              <li>Un rappel vous sera envoyé 24h avant la formation</li>
            </ul>
          </div>

          <p style="text-align: center; color: #7f8c8d; margin-top: 30px;">
            Pour toute question, contactez-nous à <a href="mailto:support@formations.fr">support@formations.fr</a>
          </p>
        </div>
      `;

      const emailText = `
        Confirmation de votre inscription

        Formation: ${instance.formation_nom}
        Date: ${dateFormatee}
        Heure: ${instance.heure_debut?.substring(0, 5)} - ${instance.heure_fin?.substring(0, 5)}
        Participant: ${prenom} ${nom}
        Numéro de réservation: ${idReservation}

        Informations importantes:
        - Présentez-vous 15 minutes avant le début
        - Apportez votre ordinateur portable si nécessaire
        - Un rappel vous sera envoyé 24h avant

        Pour toute question: support@formations.fr
      `;

      await sendEmail({
        from: process.env.EMAIL_USER,
        to: courriel,
        subject: `Confirmation d'inscription - ${instance.formation_nom}`,
        text: emailText,
        html: emailHtml
      });

      console.log('✅ Email de confirmation envoyé à:', courriel);

    } catch (emailError) {
      console.error('❌ Erreur envoi email:', emailError);
      // Ne pas bloquer la réservation si l'email échoue
    }

    res.json({ 
      success: true, 
      message: 'Inscription réussie', 
      id_reservation: idReservation,
      email_envoye: true // ✅ AJOUT: Indiquer que l'email a été envoyé
    });

  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await pool.query('ROLLBACK');
    console.error('Erreur création réservation:', error);
    res.status(500).json({ error: error.message });
  }
});

// ❌ SUPPRIMER: Les routes dupliquées en bas du fichier



// Route pour récupérer les statistiques admin
router.get('/admin/statistiques', async (req, res) => {
  try {
    const query = `
      SELECT 
        f.id_formation,
        f.nom,
        fi.id_formation_instance,
        fi.jour as date_instance,
        f.heure_debut,
        f.heure_fin,
        COALESCE(tr.reservation_count, 0) as inscrits,
        (30 - COALESCE(tr.reservation_count, 0)) as places_restantes,
        (COALESCE(tr.reservation_count, 0) >= 30) as complet
      FROM formation f
      JOIN formation_instance fi ON f.id_formation = fi.id_reference_formation
      LEFT JOIN (
        SELECT id_formation_instance, COUNT(*) as reservation_count
        FROM table_reservation 
        GROUP BY id_formation_instance
      ) tr ON fi.id_formation_instance = tr.id_formation_instance
      WHERE fi.jour >= CURRENT_DATE
        AND fi.jour <= CURRENT_DATE + INTERVAL '1 month'
      ORDER BY fi.jour, f.heure_debut
    `;
    
    console.log('📊 Exécution de la requête admin...');
    const result = await pool.query(query);
    console.log('✅ Données récupérées:', result.rows.length, 'sessions');
    
    const formations = result.rows.map(row => ({
      id: row.id_formation_instance,
      id_formation: row.id_formation,  // Inclure l'ID de la formation
      nom: row.nom,
      date: row.date_instance,
      heureDebut: row.heure_debut?.substring(0, 5),
      heureFin: row.heure_fin?.substring(0, 5),
      inscrits: parseInt(row.inscrits),
      places_restantes: parseInt(row.places_restantes),
      complet: row.complet
    }));
    
    console.log('📋 Première formation:', formations[0]);
    res.json(formations);
  } catch (error) {
    console.error('❌ Erreur récupération statistiques admin:', error);
    res.status(500).json({ error: error.message });
  }
});


export default router;