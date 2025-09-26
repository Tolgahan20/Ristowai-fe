import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
	{
		name: "Eric Sanchez",
		role: "UX Designer",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		text: "The customer support team has been incredibly helpful whenever I've had any questions. I can't imagine going back to my old content-creation methods!",
	},
	{
		name: "Anna Lee",
		role: "Content Strategist",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		text: "MagicAI has transformed our workflow. The AI-generated content is top-notch and saves us hours every week.",
	},
	{
		name: "Michael Chen",
		role: "Product Manager",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		text: "The analytics and dashboard features are a game changer. Highly recommended for any SaaS business.",
	},
];

function getCenteredIndexes(current: number, total: number) {
	// Always show 3 avatars, active in the middle
	if (total < 3) return [0, 1, 2].map((i) => i % total);
	const prev = (current - 1 + total) % total;
	const next = (current + 1) % total;
	return [prev, current, next];
}

export function TestimonialsSection() {
	const [index, setIndex] = useState(1);
	const [, setFade] = useState(true);

	useEffect(() => {
		const fadeOut = setTimeout(() => setFade(false), 4400);
		const fadeIn = setTimeout(() => {
			setIndex((prev) => (prev + 1) % testimonials.length);
			setFade(true);
		}, 4800);
		return () => {
			clearTimeout(fadeOut);
			clearTimeout(fadeIn);
		};
	}, [index]);

	const handlePrev = () => {
		setFade(false);
		setTimeout(() => {
			setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
			setFade(true);
		}, 100);
	};

	const handleNext = () => {
		setFade(false);
		setTimeout(() => {
			setIndex((prev) => (prev + 1) % testimonials.length);
			setFade(true);
		}, 100);
	};

	const t = testimonials[index];
	const avatarIndexes = getCenteredIndexes(index, testimonials.length);

	return (
		<motion.section 
			className={styles.section}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8 }}
		>
			<div className={styles.bgMap}>
				{/* SVG world map background */}
				<svg
					viewBox="0 0 1400 400"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={styles.mapSvg}
				>
					<ellipse cx="700" cy="200" rx="650" ry="140" fill="#f3f4f6" />
				</svg>
			</div>
			<div className={styles.container}>
				<motion.div 
					className={styles.badgeRow}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<span className={styles.badge}>Testimonials</span>
					<span className={styles.badgeSecondary}>Trustpilot</span>
				</motion.div>
				<motion.h2 
					className={styles.title}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					Trusted by millions.
				</motion.h2>
				<motion.div 
					className={styles.avatarsRow}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					{avatarIndexes.map((i, idx) => (
						<motion.div
							key={`${testimonials[i].name}-${index}`} // Add index to key for proper re-rendering
							className={`${styles.avatarWrap} ${
								i === index ? styles.avatarActive : ""
							} ${i === index ? styles.avatarCenter : ""}`}
							style={{
								zIndex: i === index ? 2 : 1,
								order: idx,
							}}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ 
								scale: 1, 
								opacity: 1,
								filter: i === index ? "none" : "grayscale(70%) blur(1px)"
							}}
							transition={{ 
								duration: 0.3, // Reduced from 0.5
								delay: 0.1 + (idx * 0.05), // Reduced delays
								ease: "easeOut"
							}}
							whileHover={{ 
								scale: 1.05,
								transition: { duration: 0.1 }
							}}
						>
							<Image
								src={testimonials[i].avatar}
								alt={testimonials[i].name}
								width={72}
								height={72}
								className={styles.avatar}
								style={{
									opacity: i === index ? 1 : 0.7,
								}}
							/>
						</motion.div>
					))}
				</motion.div>
				<motion.div 
					className={styles.name}
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 1.0 }}
				>
					{t.name}
				</motion.div>
				<motion.div 
					className={styles.role}
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 1.1 }}
				>
					{t.role}
				</motion.div>
				<motion.div 
					className={styles.carouselRow}
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 1.2 }}
				>
					<motion.div
						className={styles.testimonialText}
						key={index} // Key for proper re-rendering
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<span className={styles.quoteMark}>&ldquo;</span>
						{t.text}
						<span className={styles.quoteMark}>&rdquo;</span>
					</motion.div>
					<motion.div 
						className={styles.arrowButtons}
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 1.4 }}
					>
						<motion.button
							className={styles.arrow}
							onClick={handlePrev}
							aria-label="Previous testimonial"
							whileHover={{ 
								scale: 1.1,
								transition: { duration: 0.2 }
							}}
						>
							&#8592;
						</motion.button>
						<motion.button
							className={styles.arrow}
							onClick={handleNext}
							aria-label="Next testimonial"
							whileHover={{ 
								scale: 1.1,
								transition: { duration: 0.2 }
							}}
						>
							&#8594;
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
