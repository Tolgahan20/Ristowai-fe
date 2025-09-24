"use client";

import { Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import { IconButton } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { AvatarDropdown } from '../user/AvatarDropdown';
import { ThemeToggle } from '../theme/ThemeToggle';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
  sidebarCollapsed: boolean;
}

export function Navbar({ onMenuClick, onToggleCollapse, sidebarCollapsed }: NavbarProps) {
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
        <Heading level={2} className={styles.brandText}>Smart Shifts</Heading>
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
