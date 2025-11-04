// Backend/routes/formations.js
import express from 'express';
import formationController from '../formationController.js';

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

// Route pour les inscriptions
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

// Route pour les formations disponibles
router.get('/formations-disponibles', async (req, res) => {
  try {
    const formations = await reservationController.listerFormationsDisponibles();
    res.json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;