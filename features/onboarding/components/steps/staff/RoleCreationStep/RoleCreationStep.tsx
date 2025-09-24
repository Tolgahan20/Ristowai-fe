"use client";

import { useEffect, useRef } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { useRoleCreation } from '@/features/onboarding/hooks/use-role-creation';
import styles from './RoleCreationStep.module.css';

interface RoleCreationStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function RoleCreationStep({ stepData, onDataChange }: RoleCreationStepProps) {
  const {
    formData,
    errors,
    commonRoles,
    addRole,
    removeRole,
    updateRole,
    addCommonRole,
    getValidRolesCount,
    getTotalHourlyCost,
    isCommonRoleAdded,
    getValidRoles,
  } = useRoleCreation({
    initialData: stepData,
  });

  // Get venueId from stepData
  const venueId = (stepData.venueId as string) || '';

  // Note: Role creation will be handled by the backend onboarding step handler
  // when the user clicks "Next" to complete this step

  // Role data will be loaded when available

  // Use ref to store the latest values to avoid infinite loops
  const onDataChangeRef = useRef(onDataChange);
  const getValidRolesRef = useRef(getValidRoles);
  
  // Update refs on every render
  onDataChangeRef.current = onDataChange;
  getValidRolesRef.current = getValidRoles;

  // Update data whenever formData changes, but prevent infinite loops
  useEffect(() => {
    const validRoles = getValidRolesRef.current();
    onDataChangeRef.current({
      venueId: venueId,
      roles: validRoles,
      readyToCreateRoles: validRoles.length > 0,
    });
  }, [formData.roles, venueId]); // Only depend on the actual data that changes


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Header */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Users size={18} className={styles.sectionIcon} />
            Create Job Roles
          </h3>
          <p className={styles.sectionDescription}>
            Set up the job roles for your venue. These will be used to assign staff members and calculate costs.
          </p>
        </div>

        {/* Common Roles Quick Add */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Quick Add Common Roles</h3>
          <div className={styles.commonRolesList}>
            {commonRoles.map((role, index) => (
              <button
                key={index}
                onClick={() => addCommonRole(role)}
                className={styles.commonRoleButton}
                disabled={isCommonRoleAdded(role.name)}
                type="button"
              >
                <span className={styles.commonRoleName}>{role.name}</span>
                <span className={styles.commonRoleRate}>€{role.hourlyRate}/hr</span>
              </button>
            ))}
          </div>
        </div>

        {/* Role Forms */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Your Roles</h3>
            <button onClick={addRole} className={styles.addButton} type="button">
              <Plus size={16} />
              Add Custom Role
            </button>
          </div>

          <div className={styles.rolesList}>
            {formData.roles.map((role, index) => (
              <div key={index} className={`${styles.roleCard} ${errors[index] ? styles.roleCardError : ''}`}>
                <div className={styles.roleCardHeader}>
                  <span className={styles.roleNumber}>Role {index + 1}</span>
                  {formData.roles.length > 1 && (
                    <button
                      onClick={() => removeRole(index)}
                      className={styles.removeButton}
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className={styles.roleForm}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Role Name *
                      <input
                        type="text"
                        value={role.name}
                        onChange={(e) => updateRole(index, 'name', e.target.value)}
                        className={`${styles.input} ${errors[index] ? styles.inputError : ''}`}
                        placeholder="e.g., Barista, Server, Chef"
                      />
                    </label>
                    {errors[index] && (
                      <span className={styles.errorText}>{errors[index]}</span>
                    )}
                  </div>


                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Hourly Rate (€)
                      <input
                        type="number"
                        value={role.hourlyRate !== undefined ? role.hourlyRate : ''}
                        onChange={(e) => updateRole(index, 'hourlyRate', parseFloat(e.target.value) || 0)}
                        className={styles.input}
                        placeholder="15.00"
                        min="0"
                        step="0.50"
                      />
                    </label>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Description
                      <textarea
                        value={role.description || ''}
                        onChange={(e) => updateRole(index, 'description', e.target.value)}
                        className={styles.textarea}
                        placeholder="Brief description of role responsibilities..."
                        rows={2}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Summary</h3>
          <div className={styles.summaryStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{getValidRolesCount()}</span>
              <span className={styles.statLabel}>Roles Created</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>€{getTotalHourlyCost().toFixed(0)}</span>
              <span className={styles.statLabel}>Total Hourly Cost</span>
            </div>
          </div>
          
          {venueId && getValidRolesCount() > 0 && (
            <p className={styles.readyMessage}>
              ✅ Ready to create {getValidRolesCount()} role(s) for this venue
            </p>
          )}
          
          {!venueId && (
            <p className={styles.warningMessage}>
              ⚠️ Venue ID not found - roles will be created after venue setup
            </p>
          )}
        </div>

      </form>
    </div>
  );
}
