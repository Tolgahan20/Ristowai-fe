import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FaqSection.module.css";

const faqs = [
  {
    question: "Do I need technical skills to use Ristowai?",
    answer: "No. Ristowai is built for restaurant managers and staff, not IT experts. Setup is guided and you can even share info with us via WhatsApp — we’ll configure it for you."
  },
  {
    question: "Can I try Ristowai for free?",
    answer: "Yes. Every restaurant gets a 1-month free trial with full access to all solutions."
  },
  {
    question: "Can I choose only some solutions?",
    answer: "Yes. Each solution works standalone. You only pay for what you use."
  },
  {
    question: "What results can I expect?",
    answer: "Beta testers reported 20% lower operating costs and up to +12% margin growth after just 2 months."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. All data is encrypted, stored securely in the EU, and never shared with third parties."
  },
  {
    question: "Do you provide extra services?",
    answer: "Yes. On request we also offer: Website showcase creation (€400–800 one time), Nutritionist consultation or menu design (€50–150)."
  },
  {
    question: "Can staff use it on mobile?",
    answer: "Yes. Ristowai works on desktop, tablet, and smartphones — no app installation required."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime. No long-term contracts, no hidden fees."
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
