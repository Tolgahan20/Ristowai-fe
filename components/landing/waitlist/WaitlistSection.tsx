import React from "react";
import { motion } from "framer-motion";
import { Heading2, Body, Button } from "../ui";
import styles from "./WaitlistSection.module.css";

export function WaitlistSection() {
  const handleJoinWaitlist = () => {
    const subject = encodeURIComponent("Richiesta Lista d'Attesa");
    const body = encodeURIComponent("Ciao, sono [Nome Locale] e vorrei unirmi alla lista d'attesa per diventare uno dei primi utenti.");
    window.open(`mailto:beta@ristowai.com?subject=${subject}&body=${body}`);
  };

  return (
    <motion.section 
      id="waitlist" 
      className={styles.waitlistSection}
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
          <Heading2 className={styles.title}>
            Lista d&apos;attesa
          </Heading2>
          <Body className={styles.subtitle}>
            Unisciti ai primi locali che trasformeranno la loro gestione con l&apos;AI
          </Body>
        </motion.div>

        <motion.div 
          className={styles.counterCard}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.counterNumber}>321</div>
          <div className={styles.counterLabel}>locali già in lista</div>
        </motion.div>

        <motion.div 
          className={styles.content}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className={styles.urgencyText}>
            <Body className={styles.urgencyMessage}>
              Posti limitati: entra ora per non perdere l&apos;accesso anticipato.
            </Body>
          </div>

          <motion.div 
            className={styles.ctaSection}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button 
              variant="primary"
              size="lg"
              className={styles.joinButton}
              onClick={handleJoinWaitlist}
            >
              Unisciti alla lista
            </Button>
          </motion.div>

          <motion.div 
            className={styles.microcopy}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Body className={styles.microcopyText}>
              Il tuo posto in lista è riservato. Nessun pagamento richiesto. Verrai ricontattato dal nostro team.
            </Body>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
