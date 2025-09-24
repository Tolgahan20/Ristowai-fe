"use client";

import { LogOut, Settings, User, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconButton } from '@/components/ui/button';
import { Body, Caption } from '@/components/ui/typography';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { showToast } from '@/lib/toast';
import styles from './AvatarDropdown.module.css';

export function AvatarDropdown() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      showToast.success('Logged out successfully');
      router.push('/auth/login');
    } catch {
      showToast.error('Failed to logout');
    }
  };

  const handleProfile = () => {
    router.push('/dashboard/profile');
  };

  const handleSettings = () => {
    router.push('/dashboard/settings');
  };

  const handleHelp = () => {
    router.push('/dashboard/help');
  };

  // Get user initials for avatar fallback
  const getUserInitials = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  // Show skeleton while hydrating to prevent layout shift
  if (!mounted) {
    return (
      <div className={styles.avatarSkeleton}>
        <div className={styles.skeletonAvatar}>
          <span className={styles.skeletonText}>•••</span>
        </div>
      </div>
    );
  }

  const userInitials = getUserInitials(user?.firstName, user?.lastName, user?.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton variant="ghost" className={styles.avatarButton}>
          <Avatar className={styles.avatar} key={user?.id || 'default'}>
            <AvatarImage 
              src={user?.avatarUrl} 
              alt={user?.fullName || 'User avatar'} 
            />
            <AvatarFallback className={styles.avatarFallback}>
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </IconButton>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className={styles.dropdownContent} align="end">
        <DropdownMenuLabel className={styles.dropdownLabel}>
          <div className={styles.userInfo}>
            <Body className={styles.userName}>
              {user?.fullName || `${user?.firstName} ${user?.lastName}` || 'User'}
            </Body>
            <Body size="small" className={styles.userEmail}>
              {user?.email}
            </Body>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={handleProfile}
        >
          <User size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={handleSettings}
        >
          <Settings size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={handleHelp}
        >
          <HelpCircle size={16} />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className={`${styles.dropdownItem} ${styles.logoutItem}`}
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  );
}
