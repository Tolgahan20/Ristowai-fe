"use client";

import { MessageSquare, Users, Shield, Bell, Info } from 'lucide-react';
import { useWhatsAppConfiguration } from '@/features/onboarding/hooks/use-whatsapp-configuration';
import styles from './WhatsAppConfigurationStep.module.css';

interface WhatsAppConfigurationStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function WhatsAppConfigurationStep({ stepData, onDataChange }: WhatsAppConfigurationStepProps) {
  const {
    formData,
    errors,
    handleConfigChange,
  } = useWhatsAppConfiguration({
    initialData: stepData,
    onDataChange,
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        
        {/* Header */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MessageSquare size={18} className={styles.sectionIcon} />
            WhatsApp API Integration
          </h3>
          <p className={styles.sectionDescription}>
            Configure WhatsApp groups for staff communication. You can skip this step and set it up later.
          </p>
        </div>

        {/* Enable Toggle */}
        <div className={styles.section}>
          <label className={styles.enableItem}>
            <input
              type="checkbox"
              checked={formData.whatsappConfig.enableIntegration}
              onChange={(e) => handleConfigChange('enableIntegration', e.target.checked)}
              className={styles.enableCheckbox}
            />
            <div className={styles.enableContent}>
              <span className={styles.enableLabel}>Enable WhatsApp Integration</span>
              <p className={styles.enableDescription}>
                Connect WhatsApp groups to share schedules, shift updates, and announcements with your team through button clicks.
              </p>
            </div>
          </label>
        </div>

        {formData.whatsappConfig.enableIntegration && (
          <>
            {/* WhatsApp Groups Configuration */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Users size={18} className={styles.sectionIcon} />
                WhatsApp Group Links
              </h3>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Users size={16} className={styles.labelIcon} />
                  Staff Group Link *
                </label>
                <input
                  type="url"
                  value={formData.whatsappConfig.staffGroupLink}
                  onChange={(e) => handleConfigChange('staffGroupLink', e.target.value)}
                  className={`${styles.input} ${errors.staffGroupLink ? styles.inputError : ''}`}
                  placeholder="https://chat.whatsapp.com/FN8pDUfwawx5gtizFEQ4HK"
                />
                <p className={styles.helpText}>
                  WhatsApp group invite link for all staff members at this venue
                </p>
                {errors.staffGroupLink && (
                  <span className={styles.errorText}>{errors.staffGroupLink}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Shield size={16} className={styles.labelIcon} />
                  Managers Group Link *
                </label>
                <input
                  type="url"
                  value={formData.whatsappConfig.managersGroupLink}
                  onChange={(e) => handleConfigChange('managersGroupLink', e.target.value)}
                  className={`${styles.input} ${errors.managersGroupLink ? styles.inputError : ''}`}
                  placeholder="https://chat.whatsapp.com/ABC123xyz789managers"
                />
                <p className={styles.helpText}>
                  WhatsApp group invite link for managers and supervisors only
                </p>
                {errors.managersGroupLink && (
                  <span className={styles.errorText}>{errors.managersGroupLink}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Bell size={16} className={styles.labelIcon} />
                  Emergency Group Link
                </label>
                <input
                  type="url"
                  value={formData.whatsappConfig.emergencyGroupLink}
                  onChange={(e) => handleConfigChange('emergencyGroupLink', e.target.value)}
                  className={`${styles.input} ${errors.emergencyGroupLink ? styles.inputError : ''}`}
                  placeholder="https://chat.whatsapp.com/XYZ789emergency123"
                />
                <p className={styles.helpText}>
                  Optional: WhatsApp group for urgent and emergency notifications
                </p>
                {errors.emergencyGroupLink && (
                  <span className={styles.errorText}>{errors.emergencyGroupLink}</span>
                )}
              </div>
            </div>

            {/* Setup Instructions */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Info size={18} className={styles.sectionIcon} />
                How to get WhatsApp Group Links
              </h3>
              
              <div className={styles.instructionsCard}>
                <div className={styles.instructionsList}>
                  <div className={styles.instructionStep}>
                    <span className={styles.stepNumber}>1</span>
                    <span className={styles.stepText}>Create WhatsApp groups for your staff, managers, and emergency contacts</span>
                  </div>
                  <div className={styles.instructionStep}>
                    <span className={styles.stepNumber}>2</span>
                    <span className={styles.stepText}>In each group, tap the group name → <strong>Invite to Group via Link</strong></span>
                  </div>
                  <div className={styles.instructionStep}>
                    <span className={styles.stepNumber}>3</span>
                    <span className={styles.stepText}>Copy the invite link: <code>https://chat.whatsapp.com/ABC123...</code></span>
                  </div>
                  <div className={styles.instructionStep}>
                    <span className={styles.stepNumber}>4</span>
                    <span className={styles.stepText}>Paste the links above to enable sharing schedules and updates with button clicks</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
