"use client";

import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Edit,
  Eye,
  Trash2,
  MoreVertical,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { PrimaryButton, GhostButton, DestructiveButton, OutlineButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSchedulesByVenue } from '../../hooks/use-schedules';
import type { ScheduleResponseDto } from '../../types';
import { ScheduleStatus, getScheduleStatusLabel, formatDateRange, getScheduleStatusColor } from '../../types';
import styles from './ScheduleList.module.css';

interface ScheduleListProps {
  venueId: string;
  onCreateSchedule: () => void;
  onEditSchedule: (schedule: ScheduleResponseDto) => void;
  onViewSchedule: (schedule: ScheduleResponseDto) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onPublishSchedule: (scheduleId: string) => void;
  onGenerateSchedule: (scheduleId: string) => void;
}

export function ScheduleList({
  venueId,
  onCreateSchedule,
  onEditSchedule,
  onViewSchedule,
  onDeleteSchedule,
  onPublishSchedule,
  onGenerateSchedule,
}: ScheduleListProps) {
  const { data: schedules = [], isLoading } = useSchedulesByVenue(venueId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<ScheduleResponseDto | null>(null);

  const handleDeleteClick = (schedule: ScheduleResponseDto) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      onDeleteSchedule(scheduleToDelete.id);
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <Heading level={3}>Loading schedules...</Heading>
        </div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Calendar size={48} />
          </div>
          <Heading level={2}>No Schedules Yet</Heading>
          <Body className={styles.emptyDescription}>
            Get started by creating your first schedule. You can generate shifts automatically or add them manually.
          </Body>
          <PrimaryButton onClick={onCreateSchedule} leftIcon={<Plus size={16} />}>
            Create First Schedule
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Body size="small" className={styles.headerLabel}>
            Total Schedules
          </Body>
          <Heading level={3}>{schedules.length}</Heading>
        </div>
        <PrimaryButton onClick={onCreateSchedule} leftIcon={<Plus size={16} />}>
          New Schedule
        </PrimaryButton>
      </div>

      <div className={styles.scheduleGrid}>
        {schedules.map((schedule) => (
          <Card key={schedule.id} className={styles.scheduleCard}>
            <CardContent className={styles.cardContent}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <div className={styles.scheduleName}>
                  <Calendar size={20} className={styles.scheduleIcon} />
                  <Heading level={4}>{schedule.name}</Heading>
                </div>
                <div className={styles.cardActions}>
                  <Badge variant={getScheduleStatusColor(schedule.status) as any}>
                    {getScheduleStatusLabel(schedule.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <GhostButton>
                        <MoreVertical size={16} />
                      </GhostButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewSchedule(schedule)}>
                        <Eye size={16} />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      {schedule.status === ScheduleStatus.DRAFT && (
                        <>
                          <DropdownMenuItem onClick={() => onEditSchedule(schedule)}>
                            <Edit size={16} />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onGenerateSchedule(schedule.id)}>
                            <Sparkles size={16} />
                            <span>Generate Shifts</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onPublishSchedule(schedule.id)}>
                            <Send size={16} />
                            <span>Publish</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteClick(schedule)} className={styles.deleteItem}>
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Date Range */}
              <div className={styles.scheduleInfo}>
                <div className={styles.infoItem}>
                  <Clock size={16} className={styles.infoIcon} />
                  <Body size="small">{formatDateRange(schedule.startDate, schedule.endDate)}</Body>
                </div>
              </div>

              {/* Stats */}
              {schedule.generationSummary && (
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <Body size="small" className={styles.statLabel}>
                      Shifts
                    </Body>
                    <Body className={styles.statValue}>{schedule.generationSummary.shifts}</Body>
                  </div>
                  <div className={styles.statItem}>
                    <Body size="small" className={styles.statLabel}>
                      Coverage
                    </Body>
                    <Body className={styles.statValue}>
                      {Math.round(schedule.generationSummary.phaseFillRate * 100)}%
                    </Body>
                  </div>
                  {schedule.generationSummary.totalCostEur && (
                    <div className={styles.statItem}>
                      <Body size="small" className={styles.statLabel}>
                        Cost
                      </Body>
                      <Body className={styles.statValue}>€{schedule.generationSummary.totalCostEur.toFixed(0)}</Body>
                    </div>
                  )}
                </div>
              )}

              {/* Violations Warning */}
              {schedule.generationSummary &&
                (schedule.generationSummary.hardViolations > 0 || schedule.generationSummary.softViolations > 0) && (
                  <div className={styles.violationsWarning}>
                    <AlertCircle size={14} />
                    <Body size="small">
                      {schedule.generationSummary.hardViolations > 0
                        ? `${schedule.generationSummary.hardViolations} critical issue(s)`
                        : `${schedule.generationSummary.softViolations} warning(s)`}
                    </Body>
                  </div>
                )}

              {/* Published Info */}
              {schedule.status === ScheduleStatus.PUBLISHED && schedule.publishedAt && (
                <div className={styles.publishedInfo}>
                  <CheckCircle size={14} />
                  <Body size="small">Published {new Date(schedule.publishedAt).toLocaleDateString()}</Body>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Schedule</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{scheduleToDelete?.name}&quot;? This will permanently delete all
              shifts and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <OutlineButton onClick={() => setDeleteDialogOpen(false)}>Cancel</OutlineButton>
            <DestructiveButton onClick={confirmDelete}>Delete</DestructiveButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

