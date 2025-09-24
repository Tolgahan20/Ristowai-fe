import React, { useState } from "react";
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
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItem}>FAQ</span>
            <span className={styles.breadcrumbSeparator}>•</span>
            <span className={styles.breadcrumbItem}>Help Center</span>
          </div>
          <h2 className={styles.title}>Have a question?</h2>
          <p className={styles.subtitle}>
            Our support team will get assistance from AI-powered suggestions, 
            making it quicker than ever to handle support requests.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`${styles.faqIcon} ${openIndex === index ? styles.faqIconOpen : ""}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.faqAnswerOpen : ""}`}>
                <div className={styles.faqAnswerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
