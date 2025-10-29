// ErreurReservation.js
import React from 'react';
import './ErreurReservation.css';

const ErreurReservation = () => {
  return (
    <div className="erreur-container">
      <div className="erreur-content">
        <div className="erreur-card">
          <div className="erreur-header">
            <div className="error-icon">✗</div>
            <h1>Erreur de Réservation</h1>
            <p className="subtitle">Nous n'avons pas pu traiter votre demande</p>
          </div>
          
          <div className="erreur-details">
            <div className="error-message-section">
              <div className="error-alert">
                <h3>Une erreur technique est survenue</h3>
                <p className="error-text">
                  Votre réservation n'a pas pu être finalisée en raison d'un problème technique.
                  Veuillez réessayer ultérieurement ou contacter notre support technique.
                </p>
                <div className="error-code">
                  Référence : <span>ERR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>
            
            <div className="support-section">
              <div className="info-box">
                <h3>Assistance technique</h3>
                <p>
                  Notre équipe de support est disponible pour vous aider à résoudre ce problème.
                </p>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span className="contact-details">
                      <strong>Téléphone :</strong> +33 1 84 88 88 88
                    </span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <span className="contact-details">
                      <strong>Email :</strong> support@formations-tech.fr
                    </span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🕒</span>
                    <span className="contact-details">
                      <strong>Horaires :</strong> Lun-Ven 9h-18h
                    </span>
                  </div>
                </div>
                <p className="note">
                  ⚠️ Veuillez conserver la référence d'erreur ci-dessus lorsque vous contactez le support.
                </p>
              </div>
            </div>
          </div>
          
          <div className="erreur-footer">
            <p>Nous nous excusons pour la gêne occasionnée.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErreurReservation;