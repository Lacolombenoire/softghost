// ConfirmationReservation.js
import React from 'react';
import './ConfirmationReservation.css';

const ConfirmationReservation = ({ 
  nomEvenement = "Formation en ligne React", 
  dateEvenement = "15 décembre 2024",
  heureEvenement = "14:00",
  email = "utilisateur@exemple.com"
}) => {
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
            <div className="detail-section">
              <h2>Détails de la formation</h2>
              <div className="detail-item">
                <span className="label">Événement :</span>
                <span className="value">{nomEvenement}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date :</span>
                <span className="value">{dateEvenement}</span>
              </div>
              <div className="detail-item">
                <span className="label">Heure :</span>
                <span className="value">{heureEvenement}</span>
              </div>
            </div>
            
            <div className="email-section">
              <div className="info-box">
                <h3>Accès à la formation</h3>
                <p>
                  Le lien vers votre formation en ligne a été envoyé à l'adresse : 
                  <strong> {email}</strong>
                </p>
                <p className="note">
                  📧 Vérifiez votre boîte de réception ainsi que vos spams si vous ne trouvez pas l'email.
                </p>
              </div>
            </div>
          </div>
          
          <div className="confirmation-footer">
            <p>Vous avez des questions ? Contactez-nous à support@formations.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationReservation;