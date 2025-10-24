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
  activeSection: string;
}

// Navigation items for Smart Shifts section
const smartShiftsItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
    badge: null,
  },
  {
    name: 'Schedules',
    href: '/dashboard/schedules',
    icon: Calendar,
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
];

// Navigation items for other sections (placeholder for now)
const foodbrainItems = [
  {
    name: 'Menu Management',
    href: '/dashboard/foodbrain',
    icon: Home,
    badge: null,
  },
  {
    name: 'Recipes',
    href: '/dashboard/foodbrain/recipes',
    icon: BarChart3,
    badge: null,
  },
];

const staffProItems = [
  {
    name: 'Team Overview',
    href: '/dashboard/staff-pro',
    icon: Home,
    badge: null,
  },
  {
    name: 'Performance',
    href: '/dashboard/staff-pro/performance',
    icon: BarChart3,
    badge: null,
  },
];

const hrSmartItems = [
  {
    name: 'HR Dashboard',
    href: '/dashboard/hr-smart',
    icon: Home,
    badge: null,
  },
  {
    name: 'Documents',
    href: '/dashboard/hr-smart/documents',
    icon: Settings,
    badge: null,
  },
];

const marketingItems = [
  {
    name: 'Campaigns',
    href: '/dashboard/marketing',
    icon: Home,
    badge: null,
  },
  {
    name: 'Reviews',
    href: '/dashboard/marketing/reviews',
    icon: BarChart3,
    badge: null,
  },
];

// Map sections to their navigation items
const sectionNavigationMap: Record<string, typeof smartShiftsItems> = {
  'smart-shifts': smartShiftsItems,
  'foodbrain': foodbrainItems,
  'staff-pro': staffProItems,
  'hr-smart': hrSmartItems,
  'marketing': marketingItems,
};

export function Sidebar({ isOpen, isCollapsed, onClose, activeSection }: SidebarProps) {
  const pathname = usePathname();
  
  // Get navigation items based on active section
  const navigationItems = sectionNavigationMap[activeSection] || smartShiftsItems;

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
                      variant="default"
                      className={styles.navBadge}
                    >
                      New
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
