import React from 'react';

import { motion } from 'motion/react';

const ZonasTratamiento: React.FC = () => {
  return (
    <section className="zonas-section" id="zonas-wonder">
      <style>
        {`
          .zonas-section {
            background-color: #0a0a0a;
            padding: 80px 0;
            font-family: inherit;
          }
          .zonas-title {
            text-align: center;
            color: #ffffff;
            font-weight: 900;
            text-transform: uppercase;
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: 60px;
            letter-spacing: -0.05em;
          }
          .zonas-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
          }
          @media (max-width: 1024px) {
            .zonas-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .zonas-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          .zona-card {
            background-color: #111111;
            border: 1px solid #2a2a2a;
            border-radius: 16px;
            padding: 40px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: border-color 0.3s ease, transform 0.3s ease;
            cursor: default;
          }
          .zona-card:hover {
            border-color: #D4A853;
            transform: scale(1.02);
          }
          .zona-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 24px;
            transition: opacity 0.3s ease, filter 0.3s ease;
          }
          .zona-card:hover .zona-icon {
            filter: drop-shadow(0 0 8px rgba(212, 168, 83, 0.4));
            opacity: 1;
          }
          .zona-name {
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 4px;
            font-weight: 900;
            font-size: 13px;
            margin: 0;
          }
        `}
      </style>
      <motion.h2 
        className="zonas-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        ¿Qué zonas trata Wonder® en Oviedo?
      </motion.h2>
      <div className="zonas-grid">
        
        {/* ABDOMEN */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 20 C30 20, 35 40, 30 80 M70 20 C70 20, 65 40, 70 80" />
            <path d="M50 25 L50 75" />
            <path d="M35 40 L65 40 M35 55 L65 55 M35 70 L65 70" />
            <circle cx="50" cy="80" r="2" fill="#D4A853" />
          </svg>
          <h3 className="zona-name">Abdomen</h3>
        </div>

        {/* GLÚTEOS */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 30 C20 10, 50 20, 50 50 C50 80, 20 90, 20 30 Z" />
            <path d="M80 30 C80 10, 50 20, 50 50 C50 80, 80 90, 80 30 Z" />
            <path d="M50 20 L50 80" />
          </svg>
          <h3 className="zona-name">Glúteos</h3>
        </div>

        {/* PIERNAS */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 10 L30 40 C30 50, 20 60, 30 90" />
            <path d="M45 10 L45 35 C45 45, 40 55, 45 90" />
            <path d="M70 10 L70 40 C70 50, 80 60, 70 90" />
            <path d="M55 10 L55 35 C55 45, 60 55, 55 90" />
            <circle cx="37.5" cy="50" r="3" />
            <circle cx="62.5" cy="50" r="3" />
          </svg>
          <h3 className="zona-name">Piernas</h3>
        </div>

        {/* BRAZOS */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 80 C20 50, 40 40, 50 40 C60 20, 80 30, 80 50 C80 70, 60 60, 50 60 L20 80" />
            <path d="M85 20 L95 10 M90 40 L100 35 M70 15 L75 5" />
            <path d="M50 40 C55 30, 65 30, 70 35" />
          </svg>
          <h3 className="zona-name">Brazos</h3>
        </div>

        {/* ADUCTORES */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10 C30 30, 45 50, 45 90" />
            <path d="M80 10 C70 30, 55 50, 55 90" />
            <path d="M40 30 L45 40 M35 50 L45 60 M30 70 L45 80" />
            <path d="M60 30 L55 40 M65 50 L55 60 M70 70 L55 80" />
          </svg>
          <h3 className="zona-name">Aductores</h3>
        </div>

        {/* OBLICUOS */}
        <div className="zona-card">
          <svg className="zona-icon" viewBox="0 0 100 100" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M35 10 L35 90 M65 10 L65 90" />
            <path d="M20 30 L35 40 M15 50 L35 60 M20 70 L35 80" />
            <path d="M80 30 L65 40 M85 50 L65 60 M80 70 L65 80" />
          </svg>
          <h3 className="zona-name">Oblicuos</h3>
        </div>

      </div>
    </section>
  );
};

export default ZonasTratamiento;
