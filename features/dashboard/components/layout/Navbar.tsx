"use client";

import { Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton } from '@/components/ui/button';
import { AvatarDropdown } from '../user/AvatarDropdown';
import { ThemeToggle } from '../theme/ThemeToggle';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
  sidebarCollapsed: boolean;
  onSectionChange: (section: string) => void;
}

export const navigationLinks = [
  { name: 'Smart Shifts', href: '/dashboard', id: 'smart-shifts' },
  { name: 'FoodBrain', href: '/dashboard/foodbrain', id: 'foodbrain' },
  { name: 'Staff Pro', href: '/dashboard/staff-pro', id: 'staff-pro' },
  { name: 'HR Smart', href: '/dashboard/hr-smart', id: 'hr-smart' },
  { name: 'Marketing', href: '/dashboard/marketing', id: 'marketing' },
];

export function Navbar({ onMenuClick, onToggleCollapse, sidebarCollapsed, onSectionChange }: NavbarProps) {
  const pathname = usePathname();
  return (
    <nav className={styles.navbar}>
      {/* Desktop sidebar toggle button */}
      <IconButton
        variant="ghost"
        className={styles.toggleButton}
        onClick={onToggleCollapse}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </IconButton>

      {/* Mobile menu button */}
      <IconButton
        variant="ghost"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </IconButton>

      {/* Brand/Logo */}
      <div className={styles.brand}>
        <Link href="/dashboard" className={styles.logoLink}>
          <Image
            src="/full_logo_black.svg"
            alt="Ristowai"
            width={120}
            height={40}
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        {navigationLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              onClick={() => onSectionChange(link.id)}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Right side content */}
      <div className={styles.rightSection}>
        {/* Theme toggle */}
        <ThemeToggle />
        
        {/* User avatar dropdown */}
        <AvatarDropdown />
      </div>
    </nav>
  );
}
