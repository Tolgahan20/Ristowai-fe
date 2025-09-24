/**
 * WhatsApp Integration Utilities
 * For sharing schedules, updates, and announcements to WhatsApp groups via button clicks
 */

export interface WhatsAppGroupConfig {
  staffGroupLink?: string;
  managersGroupLink?: string;
  emergencyGroupLink?: string;
  enableIntegration?: boolean;
}

/**
 * Extract group ID from WhatsApp invite link
 * @param inviteLink - WhatsApp group invite link (e.g., https://chat.whatsapp.com/ABC123...)
 * @returns Group ID or null if invalid
 */
export const extractGroupIdFromLink = (inviteLink: string): string | null => {
  try {
    const url = new URL(inviteLink);
    if (url.hostname === 'chat.whatsapp.com') {
      const groupId = url.pathname.substring(1); // Remove leading slash
      return groupId.split('?')[0]; // Remove any query parameters
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Create WhatsApp message URL for sharing content
 * @param message - The message to share
 * @param groupLink - WhatsApp group invite link
 * @returns WhatsApp URL for opening with pre-filled message
 */
export const createWhatsAppMessageUrl = (message: string, groupLink: string): string => {
  const groupId = extractGroupIdFromLink(groupLink);
  if (!groupId) {
    throw new Error('Invalid WhatsApp group link');
  }

  const encodedMessage = encodeURIComponent(message);
  // Use WhatsApp Web for better compatibility
  return `https://web.whatsapp.com/send?text=${encodedMessage}`;
};

export interface ScheduleData {
  date: string;
  venue?: string;
  shifts?: Array<{
    employee: string;
    startTime: string;
    endTime: string;
  }>;
}

export interface ShiftUpdateData {
  type: 'change' | 'cancelled' | 'added';
  employee: string;
  date: string;
  oldTime?: string;
  newTime?: string;
}

/**
 * Share schedule update to WhatsApp group
 * @param schedule - Schedule data to share
 * @param groupLink - WhatsApp group invite link
 */
export const shareScheduleToWhatsApp = (schedule: ScheduleData, groupLink: string): void => {
  const message = formatScheduleMessage(schedule);
  const whatsappUrl = createWhatsAppMessageUrl(message, groupLink);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Share shift update to WhatsApp group
 * @param shiftUpdate - Shift update data
 * @param groupLink - WhatsApp group invite link
 */
export const shareShiftUpdateToWhatsApp = (shiftUpdate: ShiftUpdateData, groupLink: string): void => {
  const message = formatShiftUpdateMessage(shiftUpdate);
  const whatsappUrl = createWhatsAppMessageUrl(message, groupLink);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Share general announcement to WhatsApp group
 * @param announcement - Announcement text
 * @param groupLink - WhatsApp group invite link
 */
export const shareAnnouncementToWhatsApp = (announcement: string, groupLink: string): void => {
  const message = `📢 *Announcement*\n\n${announcement}`;
  const whatsappUrl = createWhatsAppMessageUrl(message, groupLink);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Format schedule data into WhatsApp message
 */
const formatScheduleMessage = (schedule: ScheduleData): string => {
  const { date, shifts, venue } = schedule;
  
  let message = `📅 *Schedule Update - ${venue || 'Venue'}*\n`;
  message += `📍 Date: ${date}\n\n`;
  
  if (shifts && shifts.length > 0) {
    message += '*Shifts:*\n';
    shifts.forEach((shift, index: number) => {
      message += `${index + 1}. ${shift.employee} - ${shift.startTime} to ${shift.endTime}\n`;
    });
  }
  
  return message;
};

/**
 * Format shift update into WhatsApp message
 */
const formatShiftUpdateMessage = (shiftUpdate: ShiftUpdateData): string => {
  const { type, employee, oldTime, newTime, date } = shiftUpdate;
  
  let message = `🔄 *Shift ${type}*\n\n`;
  message += `👤 Employee: ${employee}\n`;
  message += `📅 Date: ${date}\n`;
  
  if (type === 'change' && oldTime && newTime) {
    message += `⏰ Old Time: ${oldTime}\n`;
    message += `⏰ New Time: ${newTime}\n`;
  } else if (type === 'cancelled') {
    message += `❌ Shift Cancelled\n`;
  } else if (type === 'added') {
    message += `✅ New Shift: ${newTime}\n`;
  }
  
  return message;
};

/**
 * Validate WhatsApp group link format
 * @param link - WhatsApp group invite link to validate
 * @returns true if valid WhatsApp group link
 */
export const isValidWhatsAppGroupLink = (link: string): boolean => {
  try {
    const url = new URL(link);
    return url.hostname === 'chat.whatsapp.com' && url.pathname.length > 1;
  } catch {
    return false;
  }
};

/**
 * Get group type from context (staff, managers, emergency)
 * @param config - WhatsApp configuration
 * @param groupType - Type of group to get link for
 * @returns Group link or null if not configured
 */
export const getGroupLinkByType = (
  config: WhatsAppGroupConfig, 
  groupType: 'staff' | 'managers' | 'emergency'
): string | null => {
  if (!config.enableIntegration) return null;
  
  switch (groupType) {
    case 'staff':
      return config.staffGroupLink || null;
    case 'managers':
      return config.managersGroupLink || null;
    case 'emergency':
      return config.emergencyGroupLink || null;
    default:
      return null;
  }
};
