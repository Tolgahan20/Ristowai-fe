"use client";

import { useState, useEffect } from 'react';

export interface WhatsAppConfigurationData extends Record<string, unknown> {
  whatsappConfig: {
    staffGroupLink: string;
    managersGroupLink: string;
    emergencyGroupLink: string;
    enableIntegration: boolean;
  };
}

export interface UseWhatsAppConfigurationProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

// Helper function to validate WhatsApp group links
const isValidWhatsAppGroupLink = (link: string): boolean => {
  const whatsappGroupRegex = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+(\?.*)?$/;
  return whatsappGroupRegex.test(link);
};

export function useWhatsAppConfiguration({ initialData = {}, onDataChange }: UseWhatsAppConfigurationProps) {
  const [formData, setFormData] = useState<WhatsAppConfigurationData>({
    whatsappConfig: (initialData.whatsappConfig as WhatsAppConfigurationData['whatsappConfig']) || {
      staffGroupLink: '',
      managersGroupLink: '',
      emergencyGroupLink: '',
      enableIntegration: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync form data to parent
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleConfigChange = (field: keyof WhatsAppConfigurationData['whatsappConfig'], value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      whatsappConfig: {
        ...prev.whatsappConfig,
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.whatsappConfig.enableIntegration) {
      if (!formData.whatsappConfig.staffGroupLink.trim()) {
        newErrors.staffGroupLink = 'Staff group link is required when integration is enabled';
      } else if (!isValidWhatsAppGroupLink(formData.whatsappConfig.staffGroupLink)) {
        newErrors.staffGroupLink = 'Please enter a valid WhatsApp group invite link';
      }

      if (!formData.whatsappConfig.managersGroupLink.trim()) {
        newErrors.managersGroupLink = 'Managers group link is required when integration is enabled';
      } else if (!isValidWhatsAppGroupLink(formData.whatsappConfig.managersGroupLink)) {
        newErrors.managersGroupLink = 'Please enter a valid WhatsApp group invite link';
      }

      if (formData.whatsappConfig.emergencyGroupLink.trim() && !isValidWhatsAppGroupLink(formData.whatsappConfig.emergencyGroupLink)) {
        newErrors.emergencyGroupLink = 'Please enter a valid WhatsApp group invite link';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleConfigChange,
    validateForm,
  };
}