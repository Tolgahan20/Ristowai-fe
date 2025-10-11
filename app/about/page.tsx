"use client";

import React from "react";
import { Linkedin, Globe } from "lucide-react";
import { Navigation } from "@/components/landing";
import { FooterSection } from "@/components/landing/footer/FooterSection";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <>
      <Navigation topBarVisible={false} />
      <div className={styles.aboutPage}>
        <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>Chi siamo</h1>
        </section>

        {/* Vision Section */}
        <section className={styles.visionSection}>
          <h2 className={styles.sectionTitle}>La visione</h2>
          <div className={styles.visionContent}>
            <p className={styles.visionText}>
              Ristowai nasce per dare ai ristoratori un alleato intelligente che semplifica la gestione, riduce i costi e restituisce tempo.
              Crediamo in un&apos;innovazione che rimane umana — dove l&apos;intelligenza artificiale potenzia le persone, non le sostituisce.
            </p>
            <p className={styles.tagline}>
              AI that empowers, not replaces.
            </p>
          </div>
        </section>

        {/* Shared Vision */}
        <section className={styles.sharedVisionSection}>
          <h2 className={styles.sectionTitle}>Visione condivisa</h2>
          <div className={styles.sharedVisionContent}>
            <p>
              Lavoriamo per creare un ecosistema digitale che semplifichi la gestione ristorativa e valorizzi il lavoro umano.
              Ogni decisione nasce da una convinzione profonda: l&apos;AI deve potenziare le persone, non sostituirle.
            </p>
            <p>
              Ristowai è il punto di incontro tra intelligenza artificiale, esperienza reale e passione per il settore.
            </p>
          </div>
        </section>

        {/* Founder - Adriano */}
        <section className={styles.founderSection}>
          <div className={styles.founderContent}>
            <h3 className={styles.founderName}>Adriano Coodye</h3>
            <p className={styles.founderRole}>Founder & CEO</p>
            <div className={styles.founderBio}>
              <p>
                Ho lavorato per anni nel mondo della ristorazione, gestendo team, turni e costi in prima persona.
                Da quell&apos;esperienza è nata un&apos;idea semplice ma potente: usare l&apos;intelligenza artificiale non per complicare, ma per semplificare la vita di chi gestisce ogni giorno un locale.
              </p>
              <p>
                Con Ristowai voglio portare nelle mani dei ristoratori uno strumento concreto, pratico e intuitivo — capace di migliorare la vita delle persone e rendere la ristorazione più sostenibile, efficiente e umana.
              </p>
              <p>
                Ristowai è costruito in Italia, con una visione globale: tecnologia al servizio dell&apos;esperienza, e non il contrario.
              </p>
            </div>
          </div>
        </section>

        {/* CTO - Tolga */}
        <section className={styles.founderSection}>
          <div className={styles.founderContent}>
            <h3 className={styles.founderName}>Tolgahan Dayanikli</h3>
            <p className={styles.founderRole}>CTO & Product Lead</p>
            <div className={styles.founderBio}>
              <p>
                Ingegnere del software con una forte specializzazione in architetture scalabili e sistemi AI, mi occupo della progettazione tecnica e dello sviluppo dell&apos;infrastruttura che sostiene Ristowai.
              </p>
              <p>
                Ho costruito il backend modulare e sicuro della piattaforma, progettato per garantire stabilità, protezione dei dati e integrazione fluida tra tutti i moduli di intelligenza artificiale.
              </p>
              <p>
                Il mio approccio unisce visione prodotto e rigore ingegneristico: ogni componente è pensato per crescere nel tempo, adattarsi alle esigenze del settore e supportare un&apos;espansione internazionale senza compromessi di performance.
              </p>
              <p>
                Credo in una tecnologia discreta ma potente — progettata per restare invisibile e lasciare spazio al valore reale: semplificare il lavoro quotidiano dei ristoratori.
              </p>
            </div>
          </div>
        </section>

        {/* Team Links */}
        <section className={styles.teamLinksSection}>
          <div className={styles.teamLinks}>
            <div className={styles.teamMember}>
              <span className={styles.memberName}>Adriano Coodye</span>
              <span className={styles.memberTitle}>Founder & CEO</span>
              <div className={styles.memberLinks}>
                <a 
                  href="https://www.linkedin.com/in/adriano-coodye-660b341b9/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className={styles.teamMember}>
              <span className={styles.memberName}>Tolgahan Dayanikli</span>
              <span className={styles.memberTitle}>CTO & Product Lead</span>
              <div className={styles.memberLinks}>
                <a 
                  href="https://www.linkedin.com/in/tolgahan-dayanikli/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://tolgahandayanikli.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Globe size={18} />
                  <span>Website</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Advisors Mention */}
        <section className={styles.advisorsSection}>
          <p className={styles.advisorsText}>
            Ristowai beneficia inoltre della consulenza esterna di professionisti specializzati in compliance legale, sicurezza dei dati e regolamentazione del settore alimentare, che hanno fornito contributi chiave e supporto strategico.
          </p>
        </section>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

