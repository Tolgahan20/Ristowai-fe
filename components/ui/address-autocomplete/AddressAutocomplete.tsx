"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './AddressAutocomplete.module.css';

interface PlaceResult {
  formatted_address?: string;
  geometry?: {
    location?: {
      lat: number | (() => number);
      lng: number | (() => number);
    };
  };
  name?: string;
  place_id?: string;
  types?: string[];
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  onSelect?: (address: string, placeDetails?: PlaceResult) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

// Define types for Google Maps API
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLElement,
            options?: {
              types?: string[];
              componentRestrictions?: { country: string };
              fields?: string[];
            }
          ) => {
            addListener: (event: string, callback: () => void) => void;
            getPlace: () => {
              formatted_address?: string;
              geometry?: {
                location?: {
                  lat: number | (() => number);
                  lng: number | (() => number);
                };
              };
              name?: string;
              place_id?: string;
              types?: string[];
            };
          };
        };
        event?: {
          clearInstanceListeners: (instance: unknown) => void;
        };
      };
    };
    initGoogleMaps: () => void;
  }
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Enter your restaurant's address in Italy",
  className = '',
  disabled = false,
  error = false
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<{
    addListener: (event: string, callback: () => void) => void;
    getPlace: () => PlaceResult;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        setIsLoading(false);
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for existing script to load
        const checkLoaded = setInterval(() => {
          if (window.google && window.google.maps) {
            setIsLoaded(true);
            setIsLoading(false);
            clearInterval(checkLoaded);
          }
        }, 100);
        return;
      }

      // Create script tag
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      // Add callback to window
      window.initGoogleMaps = () => {
        setIsLoaded(true);
        setIsLoading(false);
      };

      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setIsLoading(false);
        // Fallback to regular textarea
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize autocomplete when Google Maps is loaded
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    try {
      // Create autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current as HTMLElement, // Cast to HTMLElement for Google Places API
        {
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'it' }, // Restrict to Italy for restaurants
          fields: ['formatted_address', 'geometry', 'name', 'place_id', 'types']
        }
      );

      // Add place changed listener
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
          onSelect?.(place.formatted_address, place);
        }
      });

    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded]); // Remove onChange and onSelect from dependencies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent form submission on Enter when autocomplete dropdown is open
    if (e.key === 'Enter' && autocompleteRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className={`
          ${styles.input} 
          ${error ? styles.error : ''} 
          ${isLoading ? styles.loading : ''}
          ${className}
        `}
      />
      {isLoading && (
        <div className={styles.loadingIndicator}>
          <span className={styles.loadingText}>Loading address suggestions...</span>
        </div>
      )}
      {!isLoaded && !isLoading && (
        <div className={styles.fallbackNotice}>
          <span className={styles.fallbackText}>
            Address suggestions unavailable. Please enter address manually.
          </span>
        </div>
      )}
    </div>
  );
}
