import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FaqSection.module.css";

const faqs = [
  {
    question: "Devo avere competenze tecniche per usare Ristowai?",
    answer: "No. Ristowai è progettato per manager e personale del ristorante, non per esperti IT. La configurazione è guidata e puoi anche condividere le informazioni con noi via WhatsApp — noi configureremo tutto per te."
  },
  {
    question: "Posso provare Ristowai gratis?",
    answer: "Sì. Ogni ristorante riceve una prova gratuita di 1 mese con accesso completo a tutte le soluzioni."
  },
  {
    question: "Posso scegliere solo alcune soluzioni?",
    answer: "Sì. Ogni soluzione funziona in modo indipendente. Paghi solo per quello che usi."
  },
  {
    question: "Quali risultati posso aspettarmi?",
    answer: "Beta testers hanno segnalato costi operativi del 20% più bassi e un aumento del margine del 12% in soli 2 mesi."
  },
  {
    question: "I miei dati sono sicuri?",
    answer: "Assolutamente. Tutti i dati sono crittografati, memorizzati in modo sicuro in Europa e mai condivisi con terze parti."
  },
  {
    question: "Offrite servizi extra?",
    answer: "Sì. Su richiesta offriamo anche: Creazione showcase del sito web (€400–800 una volta sola), Consulenza nutrizionista o design del menu (€50–150)."
  },
  {
    question: "Il personale può usarlo su mobile?",
    answer: "Sì. Ristowai funziona su desktop, tablet e smartphone — non è necessario installare alcuna app."
  },
  {
    question: "Come posso annullare la mia iscrizione?",
    answer: "Puoi annullare in qualsiasi momento. Nessun contratto a lungo termine, nessun costo nascosto."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      id="faq" 
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className={styles.breadcrumb}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className={styles.breadcrumbItem}>Domande frequenti</span>
            <span className={styles.breadcrumbSeparator}>•</span>
            <span className={styles.breadcrumbItem}>Centro assistenza</span>
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Hai una domanda?
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Il nostro team di assistenza ti fornirà assistenza da suggerimenti AI, 
            per rispondere alle tue domande in modo più veloce che mai.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.faqList}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <motion.svg 
                  className={`${styles.faqIcon} ${openIndex === index ? styles.faqIconOpen : ""}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <motion.div 
                className={`${styles.faqAnswer} ${openIndex === index ? styles.faqAnswerOpen : ""}`}
                initial={false}
                animate={{ 
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={styles.faqAnswerContent}>
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
