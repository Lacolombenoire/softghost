// DescriptionFormation.jsx
import React, { useState, useEffect } from 'react';
import './DescriptionFormation.css';

const DescriptionFormation = ({
  titreEvenement = "Formation React Avancé",
  descriptionEvenement = "Cette formation vous permettra de maîtriser les concepts avancés de React...",
  heureEvenement = "14:00 - 17:00",
  jourSemaine = 1,
  images = [],
  formationId, // ✅ AJOUT: ID de la formation pour récupérer les instances
  onRetour = () => {
    window.history.back();
  }
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateSelectionnee: ''
  });
  const [errors, setErrors] = useState({});
  const [instancesDisponibles, setInstancesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // ✅ NOUVEAU: Récupérer les instances disponibles depuis l'API
  useEffect(() => {
    const fetchInstancesDisponibles = async () => {
      if (!formationId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/formations-disponibles?formation=${formationId}`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📅 Instances disponibles:', data);
        setInstancesDisponibles(data);
      } catch (error) {
        console.error('❌ Erreur chargement des instances:', error);
        // En cas d'erreur, on génère des dates par défaut
        setInstancesDisponibles(genererDatesParDefaut());
      } finally {
        setLoading(false);
      }
    };

    fetchInstancesDisponibles();
  }, [formationId]);

  // ✅ NOUVEAU: Générer des dates par défaut si l'API échoue
  const genererDatesParDefaut = () => {
    const dates = [];
    const aujourdHui = new Date();
    const dansUnMois = new Date();
    dansUnMois.setMonth(aujourdHui.getMonth() + 1);
    
    for (let i = 0; i < 56; i++) {
      const date = new Date(aujourdHui);
      date.setDate(aujourdHui.getDate() + i);
      
      if (date.getDay() === jourSemaine && date <= dansUnMois) {
        dates.push({
          id_instance: `instance-${i}`,
          date: date.toISOString().split('T')[0],
          places_restantes: 30, // Par défaut
          complet: false
        });
        if (dates.length >= 8) break;
      }
    }
    
    return dates;
  };

 // ✅ CORRIGÉ: Formater la date pour l'affichage
const formatDateAffichage = (dateString) => {
  try {
    // Gérer les dates ISO avec timezone
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Erreur formatage date:', dateString, error);
    return 'Date invalide';
  }
};

// ✅ CORRIGÉ: Formater la date pour la valeur du select
const formatDatePourSelect = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  } catch (error) {
    console.error('Erreur formatage date select:', dateString, error);
    return dateString;
  }
};

  const nextImage = () => {
    if (images.length > 0) {
      setImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const validateName = (name) => {
    return /^[A-Za-zÀ-ÿ\- ]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true;
    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ✅ MODIFIÉ: Soumission avec envoi à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (!validateName(formData.nom)) {
      newErrors.nom = 'Le nom ne doit contenir que des lettres et des traits d\'union';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (!validateName(formData.prenom)) {
      newErrors.prenom = 'Le prénom ne doit contenir que des lettres et des traits d\'union';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.dateSelectionnee) {
      newErrors.dateSelectionnee = 'Veuillez sélectionner une date';
    }

    if (formData.telephone && !validatePhone(formData.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Trouver l'instance sélectionnée
      const instanceSelectionnee = instancesDisponibles.find(
        instance => instance.date === formData.dateSelectionnee
      );

      if (!instanceSelectionnee) {
        alert('Erreur: instance non trouvée');
        return;
      }

      // Envoyer la réservation à l'API
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          courriel: formData.email,
          telephone: formData.telephone,
          id_formation_instance: instanceSelectionnee.id_instance
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la réservation');
      }

      const result = await response.json();
      
      // Succès
      const dateFormatee = formatDateAffichage(formData.dateSelectionnee);
      alert(`Inscription réussie pour le ${dateFormatee} ! Un email de confirmation vous a été envoyé.`);
      
      // Réinitialiser le formulaire
      setFormData({ 
        nom: '', 
        prenom: '', 
        email: '', 
        telephone: '', 
        dateSelectionnee: '' 
      });
      setShowForm(false);
      setErrors({});

      // Recharger les instances pour mettre à jour les places
      const refreshResponse = await fetch(`http://localhost:3000/api/formations-disponibles?formation=${formationId}`);
      if (refreshResponse.ok) {
        const newInstances = await refreshResponse.json();
        setInstancesDisponibles(newInstances);
      }

    } catch (error) {
      console.error('Erreur réservation:', error);
      alert(`Erreur lors de l'inscription: ${error.message}`);
    }
  };

  const handleBack = () => {
    if (onRetour) {
      onRetour();
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setErrors({});
    setFormData({ 
      nom: '', 
      prenom: '', 
      email: '', 
      telephone: '', 
      dateSelectionnee: '' 
    });
  };

  return (
    <div className="formation-container">
      <div className="formation-content">
        <button className="back-button" onClick={handleBack}>
          ← Retour aux formations
        </button>

        <div className="formation-grid">
          {/* Section Galerie d'images (inchangée) */}
          <div className="gallery-section">
            <div className="gallery-container">
              {images.length > 0 ? (
                <>
                  <div className="image-main-container">
                    <img 
                      src={images[imageIndex]} 
                      alt={`${titreEvenement} - Image ${imageIndex + 1}`}
                      className="gallery-image"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button className="nav-button prev" onClick={prevImage}>‹</button>
                        <button className="nav-button next" onClick={nextImage}>›</button>
                        <div className="image-counter">{imageIndex + 1} / {images.length}</div>
                      </>
                    )}
                  </div>
                  
                  {images.length > 1 && (
                    <div className="thumbnail-container">
                      {images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Miniature ${index + 1}`}
                          className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
                          onClick={() => setImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="no-images">
                  <p>Aucune image disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Section Informations */}
          <div className="info-section">
            <div className="formation-header">
              <h1 className="formation-title">{titreEvenement}</h1>
              <div className="formation-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Tous les {jours[jourSemaine]}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏰</span>
                  <span>{heureEvenement}</span>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h2>Description</h2>
              <p className="description-text">{descriptionEvenement}</p>
            </div>

            <button 
              className="inscription-button"
              onClick={() => setShowForm(true)}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'S\'inscrire à la formation'}
            </button>

            {/* ✅ AJOUT: Affichage du nombre d'instances disponibles */}
            {instancesDisponibles.length > 0 && (
              <div className="disponibilite-info">
                <p>
                  <strong>{instancesDisponibles.filter(i => !i.complet).length}</strong> 
                  session(s) disponible(s) dans le prochain mois
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Formulaire d'inscription */}
        {showForm && (
          <div className="form-fullscreen-overlay">
            <div className="form-container">
              <div className="form-header">
                <h3>Inscription à la formation</h3>
                {loading && <p>Chargement des dates disponibles...</p>}
              </div>
              
              <form className="inscription-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className={errors.prenom ? 'error' : ''}
                    placeholder="Entrez votre prénom"
                  />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={errors.nom ? 'error' : ''}
                    placeholder="Entrez votre nom"
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="entrez@votre.email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* ✅ MODIFIÉ: Sélecteur de dates avec places restantes */}
                <div className="form-group">
                  <label htmlFor="dateSelectionnee">Date de formation *</label>
  <select
    id="dateSelectionnee"
    name="dateSelectionnee"
    value={formData.dateSelectionnee}
    onChange={handleInputChange}
    className={errors.dateSelectionnee ? 'error' : ''}
    disabled={loading || instancesDisponibles.length === 0}
  >
    <option value="">
      {loading ? 'Chargement...' : 'Sélectionnez une date'}
    </option>
    {instancesDisponibles
      .filter(instance => !instance.complet)
      .map((instance, index) => (
        <option 
          key={index} 
          value={formatDatePourSelect(instance.date)} // ✅ Utiliser formatDatePourSelect
        >
          {formatDateAffichage(instance.date)} 
          {instance.places_restantes !== undefined && 
            ` (${instance.places_restantes} place(s) restante(s))`}
        </option>
      ))
    }
  </select>
  
  {/* ✅ AJOUT: Affichage de la date sélectionnée */}
  {formData.dateSelectionnee && (
    <div className="selected-date-display">
      📅 Date sélectionnée : <strong>{formatDateAffichage(formData.dateSelectionnee + 'T00:00:00')}</strong>
    </div>
  )}
  
  {/* Affichage si aucune date disponible */}
  {!loading && instancesDisponibles.filter(i => !i.complet).length === 0 && (
    <div className="warning-message">
      Aucune session disponible dans le prochain mois
    </div>
  )}
  
  {errors.dateSelectionnee && <span className="error-message">{errors.dateSelectionnee}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Téléphone (optionnel)</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className={errors.telephone ? 'error' : ''}
                    placeholder="+33 1 23 45 67 89"
                  />
                  {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                </div>

                <div className="form-buttons">
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading || instancesDisponibles.filter(i => !i.complet).length === 0}
                  >
                    {loading ? 'Traitement...' : 'Confirmer l\'inscription'}
                  </button>
                  <button type="button" className="cancel-button" onClick={closeForm}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionFormation;