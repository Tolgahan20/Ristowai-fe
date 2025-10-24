"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, navigationLinks } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('smart-shifts');
  const pathname = usePathname();

  // Update active section based on pathname
  useEffect(() => {
    const currentLink = navigationLinks.find(link => link.href === pathname);
    if (currentLink) {
      setActiveSection(currentLink.id);
    }
  }, [pathname]);

  return (
    <div className={styles.layout}>
      {/* Navbar - Full width at top */}
      <Navbar 
        onMenuClick={() => setSidebarOpen(true)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
        onSectionChange={setActiveSection}
      />
      
      {/* Content area below navbar */}
      <div className={styles.contentArea}>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className={styles.sidebarOverlay}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
        />
        
        {/* Main content */}
        <main className={`${styles.content} ${sidebarCollapsed ? styles.contentExpanded : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
