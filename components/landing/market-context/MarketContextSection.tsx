import React from "react";
import { motion } from "framer-motion";
import { US, GB, ES, DE, IT } from "country-flag-icons/react/3x2";
import { TrendingUp, TrendingDown, Zap, Rocket } from "lucide-react";
import styles from "./MarketContextSection.module.css";

const GlobalTrendIcon = () => (
  <svg viewBox="0 0 24 24" className={styles.globalIcon}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const marketData = [
  {
    flag: <US className={styles.flag} />,
    country: "USA",
    stat: "62%",
    description: "dei ristoranti usa già AI per turni e forecasting",
    impact: "–18% costi staff",
    color: "#10b981",
    trend: "up"
  },
  {
    flag: <GB className={styles.flag} />,
    country: "UK", 
    stat: "40%",
    description: "ottimizza menu e prezzi con AI",
    impact: "+14% margini in 6 mesi",
    color: "#3b82f6",
    trend: "up"
  },
  {
    flag: <ES className={styles.flag} />,
    country: "Spagna",
    stat: "1 su 3",
    description: "ristoranti usa AI per prenotazioni/marketing",
    impact: "+9% coperti al giorno",
    color: "#8b5cf6",
    trend: "up"
  },
  {
    flag: <DE className={styles.flag} />,
    country: "Germania",
    stat: "25%",
    description: "usa AI per food cost e sprechi",
    impact: "–12% food waste",
    color: "#f59e0b",
    trend: "up"
  },
  {
    flag: <IT className={styles.flag} />,
    country: "Italia",
    stat: "70%",
    description: "ancora su Excel/carta",
    impact: "90% dice 'non ho tempo' per nuovi software",
    color: "#ef4444",
    trend: "down"
  },
  {
    flag: <GlobalTrendIcon />,
    country: "Trend Globale",
    stat: "+25%",
    description: "CAGR mercato AI foodtech fino al 2030",
    impact: "Crescita esponenziale dell'adozione",
    color: "#06b6d4",
    trend: "up"
  }
];

export function MarketContextSection() {
  return (
    <motion.section 
      id="market-context" 
      className={styles.marketContextSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >

      <motion.div 
        className={styles.header}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className={styles.titleContainer}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={styles.title}>
            Il futuro della ristorazione è già iniziato
          </h2>
        </motion.div>
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Mentre all&apos;estero l&apos;adozione di AI nel foodservice cresce a doppia cifra, in Italia la maggioranza dei locali è ancora ferma a fogli Excel e carta.
        </motion.p>
      </motion.div>

      {/* Hero Comparison */}
      <motion.div 
        className={styles.heroComparison}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className={styles.comparisonCard}>
          <div className={styles.comparisonSide}>
            <div className={styles.countryHeader}>
              <div className={styles.flagContainer}>
                {marketData[0].flag}
              </div>
              <div className={styles.countryName}>USA</div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.statNumber}>62%</div>
              <div className={styles.statLabel}>AI Adoption</div>
            </div>
            <div className={styles.statDescription}>
              dei ristoranti usa già AI per turni e forecasting
            </div>
            <div className={styles.impactBadge} style={{ backgroundColor: '#10b981', color: 'white' }}>
              –18% costi staff
            </div>
          </div>
          
          <div className={styles.vsDivider}>
            <div className={styles.vsLine}></div>
            <div className={styles.vsText}>VS</div>
            <div className={styles.vsLine}></div>
          </div>
          
          <div className={styles.comparisonSide}>
            <div className={styles.countryHeader}>
              <div className={styles.flagContainer}>
                {marketData[4].flag}
              </div>
              <div className={styles.countryName}>Italia</div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.statNumber}>70%</div>
              <div className={styles.statLabel}>Excel/Carta</div>
            </div>
            <div className={styles.statDescription}>
              ancora su sistemi tradizionali
            </div>
            <div className={styles.impactBadge} style={{ backgroundColor: '#ef4444', color: 'white' }}>
              90% dice &apos;non ho tempo&apos;
            </div>
          </div>
        </div>
      </motion.div>

      {/* Global Leaders */}
      <motion.div 
        className={styles.leadersSection}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>I leader mondiali dell&apos;AI nel foodservice</h3>
          <div className={styles.sectionSubtitle}>Paesi che stanno già raccogliendo i frutti dell&apos;innovazione</div>
        </div>
        
        <div className={styles.leadersGrid}>
          {marketData.slice(0, 4).map((item, index) => (
            <motion.div 
              key={index}
              className={styles.leaderCard}
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className={styles.cardGlow} style={{ backgroundColor: `${item.color}20` }}></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.flagContainer}>
                    {item.flag}
                  </div>
                  <div className={styles.countryInfo}>
                    <div className={styles.countryName}>{item.country}</div>
                    <div className={styles.trendIndicator} data-trend={item.trend}>
                      {item.trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                  </div>
                </div>
                
                <div className={styles.statSection}>
                  <div className={styles.statHighlight} style={{ color: item.color }}>
                    {item.stat}
                  </div>
                  <div className={styles.statDescription}>{item.description}</div>
                </div>
                
                <div className={styles.impactSection}>
                  <div className={styles.impactBadge} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    {item.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Italy vs Global Trend */}
      <motion.div 
        className={styles.trendComparison}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className={styles.trendCard}>
          <div className={styles.trendHeader}>
            <h3 className={styles.trendTitle}>Il gap che Ristowai colma</h3>
            <p className={styles.trendSubtitle}>Italia vs Trend Globale</p>
          </div>
          
          <div className={styles.trendContent}>
            <div className={styles.trendSide}>
              <div className={styles.trendFlag}>
                {marketData[4].flag}
              </div>
              <div className={styles.trendInfo}>
                <div className={styles.trendCountry}>{marketData[4].country}</div>
                <div className={styles.trendStat} style={{ color: marketData[4].color }}>
                  {marketData[4].stat}
                </div>
                <div className={styles.trendDescription}>{marketData[4].description}</div>
              </div>
            </div>
            
            <div className={styles.trendVs}>
              <div className={styles.trendVsIcon}>
                <Zap size={24} />
              </div>
              <div className={styles.trendVsText}>GAP</div>
            </div>
            
            <div className={styles.trendSide}>
              <div className={styles.trendFlag}>
                {marketData[5].flag}
              </div>
              <div className={styles.trendInfo}>
                <div className={styles.trendCountry}>{marketData[5].country}</div>
                <div className={styles.trendStat} style={{ color: marketData[5].color }}>
                  {marketData[5].stat}
                </div>
                <div className={styles.trendDescription}>{marketData[5].description}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.conclusion}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className={styles.conclusionCard}>
          <div className={styles.conclusionIcon}>
            <Rocket size={32} />
          </div>
          <p className={styles.conclusionText}>
            Ristowai porta questi risultati in Italia, integrandosi con i sistemi già esistenti.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
