import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./MagicToolsSection.module.css";

const magicTools = [
	{
		title: "AI Shift Builder",
		desc: "Auto-generate full staff rosters in seconds, adapting to roles, skills, and legal constraints.",
		icon: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
		extra: "Track and analyze data",
	},
	{
		title: "FoodBrain Analyzer",
		desc: "Detect low-margin dishes, track ingredient price changes, and suggest menu adjustments in real time.",
		icon: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop",
		extra: "2Checkout, Stripe, PayPal, Paystack",
	},
	{
		title: "Smart Checklist & Maintenance",
		desc: "Digitalize daily tasks, hygiene logs, and maintenance tickets — with photos and exportable reports.",
		icon: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
		extra: "hello, hola, こんにちは",
	},
	{
		title: "Review Sense AI",
		desc: "Instant, tone-perfect replies to Google/TripAdvisor reviews, with alerts for red-flag comments.",
		icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
		extra: "Total Referrals: $3980",
	},
	{
		title: "Brand Pulse Calendar",
		desc: "Plan and auto-generate multi-channel posts and promotions with AI-optimized CTAs and UTM tracking.",
		icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
		extra: "Unlimited templates",
	},
	{
		title: "Compliance Nudge",
		desc: "Automated reminders for contract deadlines, certifications, and HR compliance tasks.",
		icon: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
		extra: "Integrated Support Platform",
	},
];

export function MagicToolsSection() {
	return (
		<motion.section 
			id="models" 
			className={styles.magicToolsSection}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8 }}
		>
			<div className={styles.magicToolsContainer}>
				<motion.h2 
					className={styles.magicToolsTitle}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					Magic Tools.
				</motion.h2>
				<motion.div 
					className={styles.magicToolsDesc}
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					MagicAI has all the tools you need to create and manage your SaaS
					platform.
				</motion.div>
				<motion.div 
					className={styles.magicToolsGrid}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					{magicTools.map((tool, index) => (
						<motion.div 
							key={tool.title} 
							className={styles.magicToolCard}
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
							whileHover={{ 
								y: -5,
								transition: { duration: 0.2 }
							}}
						>
							{tool.icon && (
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									whileInView={{ scale: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
									whileHover={{ 
										scale: 1.1,
										transition: { duration: 0.2 }
									}}
								>
									<Image
										src={tool.icon}
										alt={tool.title}
										width={48}
										height={48}
										className={styles.magicToolIcon}
									/>
								</motion.div>
							)}
							<motion.div 
								className={styles.magicToolTitle}
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 1.2 + (index * 0.1) }}
							>
								{tool.title}
							</motion.div>
							<motion.div 
								className={styles.magicToolDesc}
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 1.3 + (index * 0.1) }}
							>
								{tool.desc}
							</motion.div>
							{tool.extra && (
								<motion.div 
									className={styles.magicToolExtra}
									initial={{ y: 20, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 1.4 + (index * 0.1) }}
								>
									{tool.extra}
								</motion.div>
							)}
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
				