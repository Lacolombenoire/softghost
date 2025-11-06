// ConfirmationReservation.jsx
import React from 'react';
import './ConfirmationReservation.css';

const ConfirmationReservation = ({ 
  reservationData = {},
  onRetourAccueil = () => {}
}) => {
  const {
    id_reservation = 'RES-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    date = 'Date non spécifiée',
    formation = 'Formation non spécifiée',
    prenom = 'Prénom',
    nom = 'Nom',
    email = 'email@exemple.com'
  } = reservationData;

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="success-icon">✓</div>
            <h1>Réservation Confirmée !</h1>
            <p className="subtitle">Votre inscription a été enregistrée avec succès</p>
          </div>
          
          <div className="confirmation-details">
            <div className="reservation-info">
              <h3>Détails de votre réservation</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Numéro de réservation :</span>
                  <span className="info-value reservation-id">{id_reservation}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Formation :</span>
                  <span className="info-value">{formation}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date :</span>
                  <span className="info-value">{date}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Participant :</span>
                  <span className="info-value">{prenom} {nom}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email :</span>
                  <span className="info-value">{email}</span>
                </div>
              </div>
            </div>
            
            <div className="next-steps">
              <div className="steps-card">
                <h3>Prochaines étapes</h3>
                <div className="steps-list">
                  <div className="step">
                    <span className="step-number">1</span>
                    <span className="step-text">
                      <strong>Email de confirmation</strong> - Vous recevrez un email de confirmation dans les prochaines minutes
                    </span>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <span className="step-text">
                      <strong>Préparation</strong> - Aucun matériel spécifique n'est requis pour cette formation
                    </span>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <span className="step-text">
                      <strong>Rappel</strong> - Un rappel vous sera envoyé 24h avant la formation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="confirmation-footer">
            <button className="return-button" onClick={onRetourAccueil}>
              ← Retour à l'accueil
            </button>
            <p className="support-note">
              Besoin d'aide ? Contactez-nous à <strong>support@formations.fr</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationReservation;