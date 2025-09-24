"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Users,
  UserStar, 
  Calendar, 
  BarChart3, 
  Settings, 
  MapPin,
  Clock,
  X
} from 'lucide-react';
import { IconButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Body } from '@/components/ui/typography';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
    badge: null,
  },
  {
    name: 'Staff',
    href: '/dashboard/staff',
    icon: Users,
    badge: null,
  },
  {
    name: 'Members',
    href: '/dashboard/members',
    icon: UserStar,
    badge: null,
  },
  {
    name: 'Schedules',
    href: '/dashboard/schedules',
    icon: Calendar,
    badge: { text: 'New', variant: 'default' as const },
  },
  {
    name: 'Time Tracking',
    href: '/dashboard/time-tracking',
    icon: Clock,
    badge: null,
  },
  {
    name: 'Venues',
    href: '/dashboard/venues',
    icon: MapPin,
    badge: null,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null,
  },
];

export function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
      {/* Mobile close button */}
      <div className={styles.mobileHeader}>
        <h2 className={styles.sidebarTitle}>Menu</h2>
        <IconButton
          variant="ghost"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={20} />
        </IconButton>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={onClose} // Close sidebar on mobile when link is clicked
                  title={isCollapsed ? item.name : undefined} // Show tooltip when collapsed
                >
                  <Icon size={20} className={styles.navIcon} />
                  {!isCollapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <Badge 
                      variant={item.badge.variant}
                      className={styles.navBadge}
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer section */}
      {!isCollapsed && (
        <div className={styles.sidebarFooter}>
          <div className={styles.footerContent}>
            <Body size="small" className={styles.footerText}>
              © 2025 Smart Shifts
            </Body>
          </div>
        </div>
      )}
    </aside>
  );
}
