"use client";

import { CheckCircle, Clock, ArrowRight, Users, MapPin, FileText, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './CompleteProfileBanner.module.css';

interface CompletionModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  completed: boolean;
  estimatedMinutes: number;
  href: string;
}

export function CompleteProfileBanner() {
  const router = useRouter();
  
  // Mock data - this should come from your backend/user profile
  const modules: CompletionModule[] = [
    {
      id: 'staff',
      title: 'Staff Management',
      description: 'Add your team members and define their roles',
      icon: Users,
      completed: false,
      estimatedMinutes: 10,
      href: '/dashboard/staff/setup'
    },
    {
      id: 'venues',
      title: 'Additional Venues',
      description: 'Add more locations if you have multiple restaurants',
      icon: MapPin,
      completed: false,
      estimatedMinutes: 8,
      href: '/dashboard/venues/setup'
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      description: 'Configure legal requirements and compliance settings',
      icon: FileText,
      completed: false,
      estimatedMinutes: 15,
      href: '/dashboard/legal/setup'
    },
    {
      id: 'advanced-settings',
      title: 'Advanced Settings',
      description: 'Configure advanced features and integrations',
      icon: Settings,
      completed: false,
      estimatedMinutes: 12,
      href: '/dashboard/settings/advanced'
    }
  ];

  const completedCount = modules.filter(module => module.completed).length;
  const totalCount = modules.length;
  const progressPercentage = (completedCount / totalCount) * 100;
  const totalEstimatedMinutes = modules
    .filter(module => !module.completed)
    .reduce((sum, module) => sum + module.estimatedMinutes, 0);

  const handleModuleClick = (href: string) => {
    router.push(href);
  };

  const handleSkipForNow = () => {
    // Mark banner as dismissed for now
    localStorage.setItem('profile-banner-dismissed', 'true');
    // You might want to reload or update state here
  };

  return (
    <div className={styles.banner}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Complete Your Profile</h2>
          <p className={styles.subtitle}>
            Finish setting up your restaurant management system to unlock all features
          </p>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressText}>
            <span className={styles.progressNumber}>{completedCount}/{totalCount}</span>
            <span className={styles.progressLabel}>completed</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className={styles.timeEstimate}>
            <Clock size={12} />
            <span>{totalEstimatedMinutes} min remaining</span>
          </div>
        </div>
      </div>

      <div className={styles.modules}>
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <div
              key={module.id}
              className={`${styles.moduleCard} ${module.completed ? styles.moduleCompleted : ''}`}
              onClick={() => !module.completed && handleModuleClick(module.href)}
            >
              <div className={styles.moduleIcon}>
                {module.completed ? (
                  <CheckCircle size={18} className={styles.completedIcon} />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <p className={styles.moduleDescription}>{module.description}</p>
                {!module.completed && (
                  <div className={styles.moduleTime}>
                    <Clock size={10} />
                    <span>{module.estimatedMinutes} min</span>
                  </div>
                )}
              </div>
              {!module.completed && (
                <div className={styles.moduleArrow}>
                  <ArrowRight size={14} />
                </div>
              )}
              {module.completed && (
                <div className={styles.completedBadge}>
                  <span>✓ Done</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.skipButton}
          onClick={handleSkipForNow}
        >
          Skip for now
        </button>
        <button 
          className={styles.continueButton}
          onClick={() => {
            const nextIncompleteModule = modules.find(m => !m.completed);
            if (nextIncompleteModule) {
              handleModuleClick(nextIncompleteModule.href);
            }
          }}
        >
          Continue Setup
        </button>
      </div>
    </div>
  );
}
