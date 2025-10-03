'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import styles from './Legal.module.css';

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const legalSections: LegalSection[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    content: (
      <div className={styles.contentSection}>
        <h2>Privacy Policy</h2>
        <p className={styles.lastUpdated}>Ultimo aggiornamento: 1 gennaio 2025</p>
        
        <h3>1. Introduzione</h3>
        <p>
          Ristowai (&quot;noi&quot;, &quot;nostro&quot; o &quot;ci&quot;) rispetta la tua privacy e si impegna a proteggere le tue informazioni personali. 
          Questa Privacy Policy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni quando 
          utilizzi il nostro servizio di intelligenza artificiale per la gestione dei ristoranti.
        </p>

        <h3>2. Informazioni che Raccogliamo</h3>
        <h4>2.1 Informazioni che Fornisci Direttamente</h4>
        <ul>
          <li>Informazioni di contatto (nome, email, numero di telefono)</li>
          <li>Informazioni aziendali (nome del ristorante, indirizzo, tipo di attività)</li>
          <li>Dati operativi del ristorante (menu, prezzi, orari, personale)</li>
          <li>Comunicazioni con il nostro servizio clienti</li>
        </ul>

        <h4>2.2 Informazioni Raccolte Automaticamente</h4>
        <ul>
          <li>Dati di utilizzo della piattaforma</li>
          <li>Informazioni sui dispositivi e browser</li>
          <li>Log di sistema e dati di performance</li>
          <li>Cookie e tecnologie simili</li>
        </ul>

        <h3>3. Come Utilizziamo le Tue Informazioni</h3>
        <p>Utilizziamo le tue informazioni per:</p>
        <ul>
          <li>Fornire e migliorare i nostri servizi AI</li>
          <li>Personalizzare l&apos;esperienza utente</li>
          <li>Comunicare con te riguardo ai nostri servizi</li>
          <li>Rispettare obblighi legali e normativi</li>
          <li>Prevenire frodi e garantire la sicurezza</li>
        </ul>

        <h3>4. Condivisione delle Informazioni</h3>
        <p>
          Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, 
          eccetto nei casi specificamente descritti in questa policy o con il tuo consenso esplicito.
        </p>

        <h3>5. Sicurezza dei Dati</h3>
        <p>
          Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
          le tue informazioni personali contro accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
        </p>

        <h3>6. I Tuoi Diritti</h3>
        <p>Hai il diritto di:</p>
        <ul>
          <li>Accedere alle tue informazioni personali</li>
          <li>Correggere informazioni inesatte</li>
          <li>Richiedere la cancellazione dei tuoi dati</li>
          <li>Limitare il trattamento dei tuoi dati</li>
          <li>Portabilità dei dati</li>
          <li>Opporti al trattamento</li>
        </ul>

        <h3>7. Contatti</h3>
        <p>
          Per domande riguardo a questa Privacy Policy, contattaci a:
          <br />
          Email: privacy@ristowai.com
          <br />
          Indirizzo: Via Roma 123, Milano, Italia
        </p>
      </div>
    )
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    content: (
      <div className={styles.contentSection}>
        <h2>Terms of Service</h2>
        <p className={styles.lastUpdated}>Ultimo aggiornamento: 1 gennaio 2025</p>
        
        <h3>1. Accettazione dei Termini</h3>
        <p>
          Accedendo e utilizzando Ristowai, accetti di essere vincolato da questi Termini di Servizio 
          e da tutte le leggi e regolamenti applicabili. Se non accetti questi termini, non utilizzare il nostro servizio.
        </p>

        <h3>2. Descrizione del Servizio</h3>
        <p>
          Ristowai è una piattaforma di intelligenza artificiale progettata per aiutare i ristoranti a:
        </p>
        <ul>
          <li>Ottimizzare la gestione del personale e dei turni</li>
          <li>Prevedere la domanda e pianificare le risorse</li>
          <li>Analizzare le performance e migliorare l&apos;efficienza</li>
          <li>Automatizzare processi operativi</li>
        </ul>

        <h3>3. Account e Registrazione</h3>
        <p>
          Per utilizzare il nostro servizio, devi creare un account fornendo informazioni accurate e aggiornate. 
          Sei responsabile di mantenere la riservatezza del tuo account e password.
        </p>

        <h3>4. Uso Accettabile</h3>
        <p>Ti impegni a utilizzare il servizio solo per scopi legittimi e in conformità con:</p>
        <ul>
          <li>Queste condizioni di servizio</li>
          <li>Le leggi e regolamenti applicabili</li>
          <li>I diritti di terze parti</li>
        </ul>

        <h3>5. Proprietà Intellettuale</h3>
        <p>
          Il servizio e il suo contenuto originale, le funzionalità e la funzionalità sono e rimarranno 
          proprietà esclusiva di Ristowai e dei suoi licenzianti.
        </p>

        <h3>6. Limitazione di Responsabilità</h3>
        <p>
          In nessun caso Ristowai sarà responsabile per danni indiretti, incidentali, speciali, 
          consequenziali o punitivi, inclusi ma non limitati a perdita di profitti, dati o uso.
        </p>

        <h3>7. Risoluzione</h3>
        <p>
          Possiamo terminare o sospendere il tuo account immediatamente, senza preavviso o responsabilità, 
          per qualsiasi motivo, incluso se violi questi Termini di Servizio.
        </p>

        <h3>8. Modifiche ai Termini</h3>
        <p>
          Ci riserviamo il diritto, a nostra sola discrezione, di modificare o sostituire questi Termini 
          in qualsiasi momento. Le modifiche sostanziali saranno comunicate con almeno 30 giorni di preavviso.
        </p>
      </div>
    )
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    content: (
      <div className={styles.contentSection}>
        <h2>Cookie Policy</h2>
        <p className={styles.lastUpdated}>Ultimo aggiornamento: 1 gennaio 2025</p>
        
        <h3>1. Cosa sono i Cookie</h3>
        <p>
          I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti 
          il nostro sito web. Ci aiutano a migliorare la tua esperienza di navigazione e a fornire servizi personalizzati.
        </p>

        <h3>2. Tipi di Cookie che Utilizziamo</h3>
        
        <h4>2.1 Cookie Essenziali</h4>
        <p>
          Questi cookie sono necessari per il funzionamento del sito web e non possono essere disattivati. 
          Includono cookie per l&apos;autenticazione, la sicurezza e le funzionalità di base.
        </p>

        <h4>2.2 Cookie di Performance</h4>
        <p>
          Raccogliamo informazioni su come utilizzi il nostro sito web per migliorare le prestazioni 
          e identificare problemi tecnici.
        </p>

        <h4>2.3 Cookie Funzionali</h4>
        <p>
          Questi cookie permettono al sito web di ricordare le tue scelte e preferenze per fornire 
          un&apos;esperienza più personalizzata.
        </p>

        <h4>2.4 Cookie di Marketing</h4>
        <p>
          Utilizziamo questi cookie per mostrarti annunci pertinenti e misurare l&apos;efficacia 
          delle nostre campagne pubblicitarie.
        </p>

        <h3>3. Gestione dei Cookie</h3>
        <p>
          Puoi controllare e gestire i cookie attraverso le impostazioni del tuo browser. 
          Tuttavia, disabilitare alcuni cookie potrebbe influire sulla funzionalità del sito web.
        </p>

        <h3>4. Cookie di Terze Parti</h3>
        <p>
          Utilizziamo servizi di terze parti che potrebbero impostare cookie sul tuo dispositivo. 
          Questi includono Google Analytics, servizi di social media e provider di pubblicità.
        </p>

        <h3>5. Aggiornamenti a questa Policy</h3>
        <p>
          Potremmo aggiornare questa Cookie Policy periodicamente. Ti incoraggiamo a rivedere 
          questa pagina regolarmente per rimanere informato su come utilizziamo i cookie.
        </p>
      </div>
    )
  },
  {
    id: 'data-processing',
    title: 'Data Processing Agreement',
    content: (
      <div className={styles.contentSection}>
        <h2>Data Processing Agreement</h2>
        <p className={styles.lastUpdated}>Ultimo aggiornamento: 1 gennaio 2025</p>
        
        <h3>1. Definizioni</h3>
        <p>
          Questo accordo definisce i termini per il trattamento dei dati personali in conformità 
          al Regolamento Generale sulla Protezione dei Dati (GDPR) dell&apos;Unione Europea.
        </p>

        <h3>2. Ruoli e Responsabilità</h3>
        <p>
          Ristowai agisce come responsabile del trattamento dei dati per fornire i servizi AI 
          ai ristoranti, che agiscono come titolari del trattamento.
        </p>

        <h3>3. Tipi di Dati Trattati</h3>
        <ul>
          <li>Dati di identificazione personale</li>
          <li>Dati operativi del ristorante</li>
          <li>Dati di performance e analytics</li>
          <li>Dati di comunicazione</li>
        </ul>

        <h3>4. Finalità del Trattamento</h3>
        <p>
          I dati vengono trattati esclusivamente per fornire e migliorare i servizi AI di Ristowai, 
          inclusa l&apos;ottimizzazione della gestione del ristorante e l&apos;analisi delle performance.
        </p>

        <h3>5. Misure di Sicurezza</h3>
        <p>
          Implementiamo misure tecniche e organizzative appropriate per garantire un livello 
          di sicurezza adeguato al rischio del trattamento dei dati.
        </p>

        <h3>6. Trasferimenti Internazionali</h3>
        <p>
          Qualsiasi trasferimento di dati personali verso paesi terzi avverrà solo in conformità 
          con le garanzie appropriate previste dal GDPR.
        </p>

        <h3>7. Durata del Trattamento</h3>
        <p>
          I dati personali vengono conservati solo per il periodo necessario alle finalità 
          per cui sono stati raccolti o come richiesto dalla legge.
        </p>

        <h3>8. Diritti degli Interessati</h3>
        <p>
          Rispettiamo tutti i diritti degli interessati previsti dal GDPR, inclusi accesso, 
          rettifica, cancellazione, limitazione del trattamento e portabilità dei dati.
        </p>
      </div>
    )
  }
];

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('privacy-policy');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleBackClick = () => {
    window.location.href = '/';

  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const currentSection = legalSections.find(section => section.id === activeSection);

  return (
    <div className={styles.container}>
      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleSidebar}
        aria-label="Toggle legal sections menu"
      >
        <Menu size={24} />
      </button>

      <div className={styles.layout}>
        {/* Sidebar */}
        <motion.aside 
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
          initial={false}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.centerGroup}>
              <button
                onClick={handleBackClick}
                className={styles.backButton}
              >
                <ArrowLeft size={16} />
                Torna indietro
              </button>
              <div className={styles.logoContainer}>
                <Image
                  src="/full_logo_white.svg"
                  alt="Ristowai Logo"
                  width={160}
                  height={48}
                  className={styles.logo}
                />
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className={styles.sidebarNav}>
            <ul>
              {legalSections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ''}`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <span>{section.title}</span>
                    <ChevronRight size={16} className={styles.chevron} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.contentContainer}>
            {currentSection && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                id={activeSection}
              >
                {currentSection.content}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
