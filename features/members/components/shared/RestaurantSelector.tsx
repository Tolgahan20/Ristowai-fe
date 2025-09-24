"use client";

import React, { useState } from 'react';
import { Building2, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import styles from './RestaurantSelector.module.css';
import { useActiveRestaurants } from '@/features/restaurants/hooks/use-restaurant';

interface RestaurantSelectorProps {
  selectedRestaurantId: string | null;
  onRestaurantSelect: (restaurantId: string) => void;
}

export function RestaurantSelector({ selectedRestaurantId, onRestaurantSelect }: RestaurantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: restaurants = [], isLoading, error } = useActiveRestaurants();

  const selectedRestaurant = restaurants.find(r => r.id === selectedRestaurantId);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Building2 className={styles.labelIcon} />
          <div className={styles.loadingContent}>
            <Loader2 className={styles.loadingSpinner} />
            <span className={styles.loadingText}>Loading restaurants...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || restaurants.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <AlertCircle className={styles.iconError} />
          <span className={styles.errorTitle}>
            {error ? 'Unable to load restaurants' : 'No restaurants found'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectorWrapper}>
        <div className={styles.labelContainer}>
          <Building2 className={styles.labelIcon} />
          <span className={styles.label}>Restaurant</span>
        </div>
        
        <div className={styles.dropdown}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonOpen : ''}`}
          >
            <div className={styles.buttonContent}>
              {selectedRestaurant ? (
                <div>
                  <div className={styles.restaurantName}>{selectedRestaurant.name}</div>
                  {selectedRestaurant.description && (
                    <div className={styles.restaurantDescription}>
                      {selectedRestaurant.description}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.placeholder}>
                  <span>Choose a restaurant...</span>
                </div>
              )}
            </div>
            <ChevronDown className={`${styles.chevronIcon} ${isOpen ? styles.chevronIconOpen : ''}`} />
          </button>
          
          {isOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownList}>
                {restaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    onClick={() => {
                      onRestaurantSelect(restaurant.id);
                      setIsOpen(false);
                    }}
                    className={`${styles.dropdownItem} ${
                      selectedRestaurantId === restaurant.id ? styles.dropdownItemSelected : ''
                    }`}
                  >
                    <div className={styles.restaurantItemContent}>
                      <Building2 className={styles.restaurantIcon} />
                      <div className={styles.restaurantInfo}>
                        <div className={styles.restaurantItemName}>{restaurant.name}</div>
                        {restaurant.description && (
                          <div className={styles.restaurantItemDescription}>
                            {restaurant.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
