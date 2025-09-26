import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FaqSection.module.css";

const faqs = [
  {
    question: "How does it generate responses?",
    answer: "MagicAI uses the most popular AI models such as GPT, Dall-E, Ada to create text, image, code and more within seconds. The process is simple. All you have to do is provide a topic or idea, and our AI-based generator will take care of the rest."
  },
  {
    question: "Can I create templates or chat bots?",
    answer: "Yes! You can create unlimited custom templates and chat bots. Our platform allows you to build personalized AI assistants tailored to your specific needs and industry requirements."
  },
  {
    question: "Should I buy regular or extended license?",
    answer: "The regular license is perfect for personal and small business use. The extended license is recommended for larger organizations, resellers, or if you plan to use MagicAI for client projects."
  },
  {
    question: "Can I translate the script into another language?",
    answer: "Absolutely! MagicAI supports multiple languages and can generate content in over 40 different languages. You can also translate existing content from one language to another seamlessly."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide comprehensive support including live chat, email support, extensive documentation, video tutorials, and a community forum. Premium users get priority support with faster response times."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a free plan that includes 10,000 words per month, access to 50+ AI templates, and basic features. No credit card required to get started."
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
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className={styles.breadcrumb}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className={styles.breadcrumbItem}>FAQ</span>
            <span className={styles.breadcrumbSeparator}>•</span>
            <span className={styles.breadcrumbItem}>Help Center</span>
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Have a question?
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Our support team will get assistance from AI-powered suggestions, 
            making it quicker than ever to handle support requests.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.faqList}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
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
