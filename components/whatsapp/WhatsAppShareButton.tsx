"use client";

import { MessageSquare } from 'lucide-react';
import { 
  shareScheduleToWhatsApp, 
  shareShiftUpdateToWhatsApp, 
  shareAnnouncementToWhatsApp,
  getGroupLinkByType,
  type ScheduleData,
  type ShiftUpdateData,
  type WhatsAppGroupConfig
} from '@/utils/whatsapp';
import styles from './WhatsAppShareButton.module.css';

interface WhatsAppShareButtonProps {
  type: 'schedule' | 'shift' | 'announcement';
  data: ScheduleData | ShiftUpdateData | string;
  groupType: 'staff' | 'managers' | 'emergency';
  whatsappConfig: WhatsAppGroupConfig;
  className?: string;
  disabled?: boolean;
}

export function WhatsAppShareButton({ 
  type, 
  data, 
  groupType, 
  whatsappConfig, 
  className = '',
  disabled = false 
}: WhatsAppShareButtonProps) {
  const handleShare = () => {
    if (!whatsappConfig.enableIntegration) {
      alert('WhatsApp integration is not enabled. Please configure it in settings.');
      return;
    }

    const groupLink = getGroupLinkByType(whatsappConfig, groupType);
    if (!groupLink) {
      alert(`No ${groupType} WhatsApp group configured. Please add the group link in settings.`);
      return;
    }

    try {
      switch (type) {
        case 'schedule':
          shareScheduleToWhatsApp(data as ScheduleData, groupLink);
          break;
        case 'shift':
          shareShiftUpdateToWhatsApp(data as ShiftUpdateData, groupLink);
          break;
        case 'announcement':
          shareAnnouncementToWhatsApp(data as string, groupLink);
          break;
        default:
          throw new Error('Invalid share type');
      }
    } catch (error) {
      console.error('Failed to share to WhatsApp:', error);
      alert('Failed to open WhatsApp. Please check your group link configuration.');
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'schedule':
        return `Share Schedule to ${groupType}`;
      case 'shift':
        return `Share Shift Update to ${groupType}`;
      case 'announcement':
        return `Share Announcement to ${groupType}`;
      default:
        return 'Share to WhatsApp';
    }
  };

  const isDisabled = disabled || !whatsappConfig.enableIntegration;

  return (
    <button
      onClick={handleShare}
      disabled={isDisabled}
      className={`${styles.shareButton} ${className} ${isDisabled ? styles.disabled : ''}`}
      title={isDisabled ? 'WhatsApp integration not configured' : getButtonText()}
    >
      <MessageSquare size={16} className={styles.icon} />
      {getButtonText()}
    </button>
  );
}

// Example usage components for different scenarios

export function ShareScheduleButton({ 
  schedule, 
  groupType = 'staff',
  whatsappConfig 
}: {
  schedule: ScheduleData;
  groupType?: 'staff' | 'managers' | 'emergency';
  whatsappConfig: WhatsAppGroupConfig;
}) {
  return (
    <WhatsAppShareButton
      type="schedule"
      data={schedule}
      groupType={groupType}
      whatsappConfig={whatsappConfig}
      className={styles.scheduleButton}
    />
  );
}

export function ShareShiftUpdateButton({ 
  shiftUpdate, 
  groupType = 'staff',
  whatsappConfig 
}: {
  shiftUpdate: ShiftUpdateData;
  groupType?: 'staff' | 'managers' | 'emergency';
  whatsappConfig: WhatsAppGroupConfig;
}) {
  return (
    <WhatsAppShareButton
      type="shift"
      data={shiftUpdate}
      groupType={groupType}
      whatsappConfig={whatsappConfig}
      className={styles.shiftButton}
    />
  );
}

export function ShareAnnouncementButton({ 
  announcement, 
  groupType = 'staff',
  whatsappConfig 
}: {
  announcement: string;
  groupType?: 'staff' | 'managers' | 'emergency';
  whatsappConfig: WhatsAppGroupConfig;
}) {
  return (
    <WhatsAppShareButton
      type="announcement"
      data={announcement}
      groupType={groupType}
      whatsappConfig={whatsappConfig}
      className={styles.announcementButton}
    />
  );
}
