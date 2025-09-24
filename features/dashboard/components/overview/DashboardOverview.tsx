"use client";

import { X, Play } from 'lucide-react';
import { useDashboardSetup } from '@/features/dashboard/hooks/use-dashboard-setup';
import { Heading, Title, Subtitle, Body } from '@/components/ui/typography';
import { PrimaryButton, Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { SetupCard } from '../cards';
import styles from './DashboardOverview.module.css';

export function DashboardOverview() {
  const {
    setupCards,
    completedFlows,
    activeSession,
    showSessionModal,
    mounted,
    handleStartFlow,
    handleResumeActiveSession,
    handleCancelActiveSession,
    setShowSessionModal,
    isStarting,
    isCancelling,
  } = useDashboardSetup();


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title weight="bold" className={styles.title}>Dashboard Overview</Title>
        <Subtitle className={styles.subtitle}>
          Welcome back! Here&apos;s what&apos;s happening with your restaurant today.
        </Subtitle>
      </div>


      {/* Setup Cards */}
      <div className={styles.setupSection}>
        <Heading level={2} weight="bold" className={styles.setupTitle}>Complete Your Setup</Heading>
        <Body className={styles.setupSubtitle}>
          Configure additional features to get the most out of Smart Shifts
        </Body>
        
        <div className={styles.setupGrid}>
          {mounted ? setupCards.map((card) => (
            <SetupCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color as 'blue' | 'green' | 'purple'}
              estimatedTime={card.estimatedTime}
              isCompleted={completedFlows.has(card.type)}
              isStarting={isStarting}
              onStartFlow={() => handleStartFlow(card.type)}
            />
          )) : (
            // Loading skeleton
            setupCards.map((card) => (
              <SetupCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                color={card.color as 'blue' | 'green' | 'purple'}
                estimatedTime={card.estimatedTime}
                isCompleted={false}
                isStarting={false}
                onStartFlow={() => handleStartFlow(card.type)}
              />
            ))
          )}
        </div>
      </div>

      {/* Active Session Modal */}
      <Dialog open={showSessionModal} onOpenChange={setShowSessionModal}>
        <DialogContent size="md" variant="modal">
          <DialogHeader>
            <DialogTitle>Active Onboarding Session</DialogTitle>
          </DialogHeader>
          
          <div className={styles.modalContent}>
            <Body className={styles.modalText}>
              You have an active onboarding session in progress. Would you like to:
            </Body>
            
            {activeSession && (
              <div className={styles.sessionInfo}>
                <div className={styles.sessionDetail}>
                  <strong>Session Type</strong>
                  <span>{activeSession.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
                <div className={styles.sessionDetail}>
                  <strong>Current Step</strong>
                  <span>{activeSession.currentStep.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
                <div className={styles.sessionDetail}>
                  <strong>Progress</strong>
                  <span>{activeSession.completedSteps} of {Math.max(activeSession.totalSteps, activeSession.steps.length)} steps</span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className={styles.modalActions}>
            <Button 
              onClick={handleCancelActiveSession}
              disabled={isCancelling}
              leftIcon={<X className="w-4 h-4" />}
              variant="destructive"
              className={styles.cancelButton}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Session'}
            </Button>
            
            <PrimaryButton 
              onClick={handleResumeActiveSession}
              disabled={!activeSession}
              leftIcon={<Play className="w-4 h-4" />}
              className={styles.resumeButton}
            >
              Resume Session
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
