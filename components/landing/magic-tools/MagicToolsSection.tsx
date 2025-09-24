import React from "react";
import styles from "./MagicToolsSection.module.css";

const magicTools = [
	{
		title: "Advanced Dashboard",
		desc: "Track a wide range of data points, including user traffic and sales.",
		icon: "/magic-tools/dashboard.svg",
		extra: "Track and analyze data",
	},
	{
		title: "Payment Gateways",
		desc: "Securely process credit card or other electronic payment methods.",
		icon: "/magic-tools/payments.svg",
		extra: "2Checkout, Stripe, PayPal, Paystack",
	},
	{
		title: "Multilingual",
		desc: "Ability to understand and generate content in different languages.",
		icon: "/magic-tools/multilingual.svg",
		extra: "hello, hola, こんにちは",
	},
	{
		title: "Referrals",
		desc: "Grow your platform with referral rewards and analytics.",
		icon: "/magic-tools/referrals.svg",
		extra: "Total Referrals: $3980",
	},
	{
		title: "Templates",
		desc: "Create and manage custom templates for your users.",
		icon: "/magic-tools/templates.svg",
		extra: "Unlimited templates",
	},
	{
		title: "Support Platform",
		desc: "Integrated support ticketing and helpdesk.",
		icon: "/magic-tools/support.svg",
		extra: "Integrated Support Platform",
	},
];

export function MagicToolsSection() {
	return (
		<section id="models" className={styles.magicToolsSection}>
			<div className={styles.magicToolsContainer}>
				<h2 className={styles.magicToolsTitle}>Magic Tools.</h2>
				<div className={styles.magicToolsDesc}>
					MagicAI has all the tools you need to create and manage your SaaS
					platform.
				</div>
				<div className={styles.magicToolsGrid}>
					{magicTools.map((tool) => (
						<div key={tool.title} className={styles.magicToolCard}>
							{tool.icon && (
								<img
									src={tool.icon}
									alt={tool.title}
									className={styles.magicToolIcon}
								/>
							)}
							<div className={styles.magicToolTitle}>{tool.title}</div>
							<div className={styles.magicToolDesc}>{tool.desc}</div>
							{tool.extra && (
								<div className={styles.magicToolExtra}>{tool.extra}</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
				