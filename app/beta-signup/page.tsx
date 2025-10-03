'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import styles from './BetaRegistration.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  message: string;
}

const businessTypes = [
  { value: 'restaurant', label: 'Ristorante' },
  { value: 'cafe', label: 'Caffè' },
  { value: 'bar', label: 'Bar' },
  { value: 'pizzeria', label: 'Pizzeria' },
  { value: 'trattoria', label: 'Trattoria' },
  { value: 'osteria', label: 'Osteria' },
  { value: 'bistro', label: 'Bistro' },
  { value: 'fast-food', label: 'Fast Food' },
  { value: 'food-truck', label: 'Food Truck' },
  { value: 'other', label: 'Altro' },
];

export default function BetaRegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    message: 'Ciao, sono [Nome Locale] e mi servirebbe onboarding locale. Grazie.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Update message placeholder dynamically with all relevant fields
      const firstName = updated.firstName || '[Nome]';
      const lastName = updated.lastName || '[Cognome]';
      const businessName = updated.businessName || '[Nome Locale]';
      const businessType = updated.businessType ? 
        businessTypes.find(bt => bt.value === updated.businessType)?.label || '' : '';
      const email = updated.email || '[email]';
      const phone = updated.phone || '[telefono]';
      
      updated.message = `Ciao, sono ${firstName} ${lastName} del locale "${businessName}"${businessType ? ` (${businessType})` : ''}. La mia email è ${email} e il mio telefono è ${phone}. Mi servirebbe onboarding locale per iniziare a utilizzare Ristowai. Grazie.`;
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: 'Richiesta Registrazione Beta Test',
          from_name: `${formData.firstName} ${formData.lastName}`,
          reply_to: formData.email,
          business_name: formData.businessName,
          business_type: formData.businessType,
          phone: formData.phone,
          message: formData.message,
          to: 'beta@ristowai.com',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Errore nell\'invio del modulo. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <motion.div 
          className={styles.successMessage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.successTitle}>Registrazione Completata!</h1>
          <p className={styles.successText}>
            Grazie per la tua registrazione al programma beta. Ti contatteremo presto per iniziare l&apos;onboarding.
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/'}
            className={styles.backButton}
          >
            Torna alla Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.formContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.header}>
          <div className={styles.backButtonContainer}>
            <button
              onClick={() => window.history.back()}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--color-text-white)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                lineHeight: '1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeft size={16} style={{ verticalAlign: 'middle', margin: 0 }} />
              Torna indietro
            </button>
          </div>
          <div className={styles.logoContainer}>
            <Image
              src="/full_logo_white.svg"
              alt="Ristowai Logo"
              width={200}
              height={60}
              className={styles.logo}
            />
          </div>
          <h1 className={styles.title}>Registrazione Beta Test</h1>
          <p className={styles.subtitle}>
            Unisciti al programma di beta testing e ottieni accesso anticipato a Ristowai
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                Nome *
              </label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                required
                className={styles.input}
                placeholder="Il tuo nome"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Cognome *
              </label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
                className={styles.input}
                placeholder="Il tuo cognome"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                className={styles.input}
                placeholder="la-tua-email@esempio.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Numero di Telefono *
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                required
                className={styles.input}
                placeholder="+39 123 456 7890"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="businessName" className={styles.label}>
                Nome del Locale *
              </label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                required
                className={styles.input}
                placeholder="Nome del tuo ristorante/locale"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="businessType" className={styles.label}>
                Tipo di Attività *
              </label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => updateFormData('businessType', value)}
                required
              >
                <SelectTrigger 
                  className={styles.select}
                  style={{
                    height: '2.75rem',
                    minHeight: '2.75rem',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-white)',
                    fontSize: 'var(--text-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <SelectValue placeholder="Seleziona tipo di attività" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Messaggio
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateFormData('message', e.target.value)}
              className={styles.textarea}
              rows={4}
              placeholder="Il messaggio verrà aggiornato automaticamente con i tuoi dati"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Invio in corso...' : 'Registrati al Beta Test'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
