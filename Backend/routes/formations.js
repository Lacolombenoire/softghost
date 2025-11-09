// Backend/routes/formations.js
import express from 'express';
import formationController from '../formationController.js';
import formationInstanceController from '../formationInstanceController.js';
import reservationController from '../reservationController.js';
import pool from '../db.js'; // ✅ AJOUT: Import du pool

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

// ✅ CORRIGÉ: Une seule route pour les réservations
router.post('/reservations', async (req, res) => {
  try {
    const idReservation = await reservationController.inscrireFormation(req.body);
    res.json({ 
      success: true, 
      message: 'Inscription réussie', 
      id_reservation: idReservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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