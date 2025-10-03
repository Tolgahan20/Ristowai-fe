import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Heading2, Body, LinkButton } from "../ui";
import styles from "./HowItWorksSection.module.css";

const steps = [
	{
		title: "1",
		stepTitle: "Crea il tuo account",
		desc: "Registrati in meno di 1 minuto, senza carta di credito.",
	},
	{
		title: "2",
		stepTitle: "Inserisci i dati del locale",
		desc: (
			<>
				Compila il preform guidato
				<br />
				(&lt;30 min).
				<br />
				<br />
				Oppure lascia fare a noi:{" "}
				<LinkButton 
					href="mailto:info@ristowai.com?subject=Richiesta%20Onboarding%20Locale&body=Ciao%2C%20sono%20%5BNome%20Locale%5D%20e%20mi%20servirebbe%20onboarding%20locale.%20Grazie."
					variant="ghost"
					size="sm"
					className={styles.onboardingButton}
				>
					Chiedi Onboarding
				</LinkButton>
			</>
		),
	},
	{
		title: "3",
		stepTitle: "Attiva la soluzione AI",
		desc: "Scegli il modulo che ti serve e inizia subito.",
	},
];

export function HowItWorksSection() {
	return (
		<motion.section 
			id="come-funziona" 
			className={styles.sectionWrap}
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
						Allora, come funziona?
					</Heading2>
				</motion.div>
				<motion.div 
					className={styles.stepsRow}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, delay: 0.2 }}
				>
					{steps.map((step, i) => (
						<React.Fragment key={i}>
							<motion.div 
								className={styles.step}
								initial={{ y: 30, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: 0.3 + (i * 0.05) }}
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
								<h3 className={styles.stepTitle}>{step.stepTitle}</h3>
								<Body className={styles.desc}>{step.desc}</Body>
							</motion.div>
							{i < steps.length - 1 && (
								<motion.div 
									className={styles.arrowContainer}
									initial={{ scale: 0, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
								>
									<ChevronRight className={styles.arrowDesktop} />
									<ChevronDown className={styles.arrowMobile} />
								</motion.div>
							)}
						</React.Fragment>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
