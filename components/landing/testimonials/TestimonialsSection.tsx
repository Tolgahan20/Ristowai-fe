import React, { useState, useEffect } from "react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
	{
		name: "Eric Sanchez",
		role: "UX Designer",
		avatar: "/testimonials/avatar1.png",
		text: "The customer support team has been incredibly helpful whenever I’ve had any questions. I can’t imagine going back to my old content-creation methods!",
	},
	{
		name: "Anna Lee",
		role: "Content Strategist",
		avatar: "/testimonials/avatar2.png",
		text: "MagicAI has transformed our workflow. The AI-generated content is top-notch and saves us hours every week.",
	},
	{
		name: "Michael Chen",
		role: "Product Manager",
		avatar: "/testimonials/avatar3.png",
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
	const [fade, setFade] = useState(true);

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
		}, 200);
	};

	const handleNext = () => {
		setFade(false);
		setTimeout(() => {
			setIndex((prev) => (prev + 1) % testimonials.length);
			setFade(true);
		}, 200);
	};

	const t = testimonials[index];
	const avatarIndexes = getCenteredIndexes(index, testimonials.length);

	return (
		<section className={styles.section}>
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
				<div className={styles.badgeRow}>
					<span className={styles.badge}>Testimonials</span>
					<span className={styles.badgeSecondary}>Trustpilot</span>
				</div>
				<h2 className={styles.title}>Trusted by millions.</h2>
				<div className={styles.avatarsRow}>
					{avatarIndexes.map((i, idx) => (
						<div
							key={testimonials[i].name}
							className={`${styles.avatarWrap} ${
								i === index ? styles.avatarActive : ""
							} ${idx === 1 ? styles.avatarCenter : ""}`}
							style={{
								zIndex: i === index ? 2 : 1,
								order: idx,
							}}
						>
							<img
								src={testimonials[i].avatar}
								alt={testimonials[i].name}
								className={styles.avatar}
								style={{
									filter:
										i === index ? "none" : "grayscale(70%) blur(1px)",
									opacity: i === index ? 1 : 0.7,
								}}
							/>
						</div>
					))}
				</div>
				<div className={styles.name}>{t.name}</div>
				<div className={styles.role}>{t.role}</div>
				<div className={styles.carouselRow}>
					<button
						className={styles.arrow}
						onClick={handlePrev}
						aria-label="Previous testimonial"
					>
						&#8592;
					</button>
					<div
						className={`${styles.testimonialText} ${
							fade ? styles.fadeIn : styles.fadeOut
						}`}
					>
						<span className={styles.quoteMark}>&ldquo;</span>
						{t.text}
						<span className={styles.quoteMark}>&rdquo;</span>
					</div>
					<button
						className={styles.arrow}
						onClick={handleNext}
						aria-label="Next testimonial"
					>
						&#8594;
					</button>
				</div>
			</div>
		</section>
	);
}
