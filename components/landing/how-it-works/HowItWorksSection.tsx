import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import styles from "./HowItWorksSection.module.css";

const steps = [
	{
		title: "1",
		stepTitle: "Crea il tuo account",
		desc: "Registrati in pochi secondi e accedi alla tua dashboard personalizzata. Non è richiesto alcun pagamento per iniziare.",
	},
	{
		title: "2",
		stepTitle: "A bordo del tuo ristorante (o lascia che lo facciamo noi per te)",
		desc: (
			<>
				Aggiungi la tua sede, gli orari di apertura, i ruoli del personale e i contratti con la nostra procedura guidata di registrazione.
			</>
		),
	},
	{
		title: "3",
		stepTitle: "Sblocca le soluzioni AI",
		desc: (
			<>
				Fin dal primo giorno, sfrutta tutta la potenza dell&apos;intelligenza artificiale per gestire il tuo ristorante.
			</>
		),
	},
];

export function HowItWorksSection() {
	return (
		<motion.section 
			id="how-it-works" 
			className={styles.sectionWrap}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8 }}
		>
			<div className={styles.container}>
				<motion.h2 
					className={styles.title}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					Allora, come
					<br />
					funziona?
				</motion.h2>
				<motion.div 
					className={styles.stepsRow}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					{steps.map((step, i) => (
						<React.Fragment key={i}>
							<motion.div 
								className={styles.step}
								initial={{ y: 30, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
								whileHover={{ 
									y: -5,
									transition: { duration: 0.2 }
								}}
							>
								<motion.div 
									className={styles.circle}
									whileHover={{ 
										scale: 1.1,
										transition: { duration: 0.2 }
									}}
								>
									{step.title}
								</motion.div>
								<div className={styles.stepTitle}>{step.stepTitle}</div>
								<div className={styles.desc}>{step.desc}</div>
							</motion.div>
							{i < steps.length - 1 && (
								<motion.div 
									className={styles.arrowContainer}
									initial={{ scale: 0, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
								>
									<ChevronRight className={styles.arrowDesktop} />
									<ChevronDown className={styles.arrowMobile} />
								</motion.div>
							)}
						</React.Fragment>
					))}
				</motion.div>
				<motion.div 
					className={styles.ctaRow}
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 1.0 }}
				>
					<motion.a 
						href="#" 
						className={styles.ctaButton}
						whileHover={{ 
							y: -2,
							transition: { duration: 0.2 }
						}}
					>
						Inizia la tua prova gratuita di 1 mese
					</motion.a>
				</motion.div>
			</div>
		</motion.section>
	);
}
