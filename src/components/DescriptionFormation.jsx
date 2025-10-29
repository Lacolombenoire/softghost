// DescriptionFormation.jsx
import React, { useState } from 'react';
import './DescriptionFormation.css';

const DescriptionFormation = ({
  titreEvenement = "Formation React Avancé",
  descriptionEvenement = "Cette formation vous permettra de maîtriser les concepts avancés de React, incluant les hooks personnalisés, le contexte avancé, les performances et les bonnes pratiques de développement.",
  heureEvenement = "14:00 - 17:00",
  jourSemaine = 1, // 0=lundi, 6=dimanche
  images = [] // Tableau d'images importées
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

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Fonction pour générer les prochaines dates correspondant au jour de la semaine
  const genererDatesDisponibles = () => {
    const dates = [];
    const aujourdHui = new Date();
    
    // Générer les 8 prochaines occurrences du jour de la semaine
    for (let i = 0; i < 56; i++) { // 8 semaines pour être sûr d'avoir 8 dates
      const date = new Date(aujourdHui);
      date.setDate(aujourdHui.getDate() + i);
      
      // Vérifier si c'est le bon jour de la semaine
      if (date.getDay() === jourSemaine) {
        dates.push(new Date(date));
        if (dates.length >= 8) break; // On veut 8 dates maximum
      }
    }
    
    return dates;
  };

  const datesDisponibles = genererDatesDisponibles();

  const formatDatePourSelect = (date) => {
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD pour la valeur
  };

  const formatDateAffichage = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    if (!phone) return true; // Optionnel
    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
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

    if (Object.keys(newErrors).length === 0) {
      // Récupérer la date formatée pour l'affichage
      const dateSelectionnee = datesDisponibles.find(date => 
        formatDatePourSelect(date) === formData.dateSelectionnee
      );
      const dateFormatee = dateSelectionnee ? formatDateAffichage(dateSelectionnee) : formData.dateSelectionnee;
      
      // Simulation d'envoi des données
      console.log('Données soumises:', formData);
      alert(`Inscription réussie pour le ${dateFormatee} ! Un email de confirmation vous a été envoyé.`);
      setFormData({ 
        nom: '', 
        prenom: '', 
        email: '', 
        telephone: '', 
        dateSelectionnee: '' 
      });
      setShowForm(false);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    window.history.back();
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
          ← Retour à la page précédente
        </button>

        <div className="formation-grid">
          {/* Section Galerie d'images */}
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
                        <button className="nav-button prev" onClick={prevImage}>
                          ‹
                        </button>
                        <button className="nav-button next" onClick={nextImage}>
                          ›
                        </button>
                        
                        <div className="image-counter">
                          {imageIndex + 1} / {images.length}
                        </div>
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
            >
              S'inscrire à la formation
            </button>
          </div>
        </div>

        {/* Formulaire d'inscription en overlay */}
        {showForm && (
          <div className="form-fullscreen-overlay">
            <div className="form-container">
              <div className="form-header">
                <h3>Inscription à la formation</h3>
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

                {/* SÉLECTEUR DE DATE AMÉLIORÉ */}
                <div className="form-group">
                  <label htmlFor="dateSelectionnee">Date de formation *</label>
                  <select
                    id="dateSelectionnee"
                    name="dateSelectionnee"
                    value={formData.dateSelectionnee}
                    onChange={handleInputChange}
                    className={errors.dateSelectionnee ? 'error' : ''}
                  >
                    <option value="">Sélectionnez une date</option>
                    {datesDisponibles.map((date, index) => (
                      <option 
                        key={index} 
                        value={formatDatePourSelect(date)}
                      >
                        {formatDateAffichage(date)}
                      </option>
                    ))}
                  </select>
                  {/* AFFICHAGE DE LA DATE SÉLECTIONNÉE */}
                  {formData.dateSelectionnee && (
                    <div className="selected-date-display">
                      Date sélectionnée : <strong>
                        {formatDateAffichage(
                          datesDisponibles.find(date => 
                            formatDatePourSelect(date) === formData.dateSelectionnee
                          )
                        )}
                      </strong>
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
                  <button type="submit" className="submit-button">
                    Confirmer l'inscription
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