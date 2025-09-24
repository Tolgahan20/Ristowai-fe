import React from "react";
import styles from "./HowItWorksSection.module.css";

const steps = [
	{
		title: "1",
		stepTitle: "Create Your Account",
		desc: "Register in seconds and access your personalized dashboard. No payment required to get started.",
	},
	{
		title: "2",
		stepTitle: "Onboard Your Business",
		desc: "Easily add your restaurants, venues, and staff. Our guided onboarding ensures a smooth setup for your entire team.",
	},
	{
		title: "3",
		stepTitle: "Unlock Smart Shifts",
		desc: "Leverage advanced AI tools for scheduling, compliance, and operations. Experience automation and insights from day one.",
	},
];

export function HowItWorksSection() {
	return (
		<section id="how-it-works" className={styles.sectionWrap}>
			<div className={styles.container}>
				<h2 className={styles.title}>
					So, how does
					<br />
					it work?
				</h2>
				<div className={styles.stepsRow}>
					{steps.map((step, i) => (
						<div className={styles.step} key={i}>
							<div className={styles.circle}>{step.title}</div>
							<div className={styles.stepTitle}>{step.stepTitle}</div>
							<div className={styles.desc}>{step.desc}</div>
						</div>
					))}
				</div>
				<div className={styles.ctaRow}>
					<a href="#" className={styles.ctaButton}>
						Start your free 1-month trial
					</a>
				</div>
			</div>
		</section>
	);
}
