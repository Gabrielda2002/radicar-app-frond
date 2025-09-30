import { useState, useCallback } from 'react';
import { AccordionState } from '../types/sidebar.types';

export const useAccordion = (initialState: AccordionState = {}) => {
  const [openAccordions, setOpenAccordions] = useState<AccordionState>(initialState);

  const toggleAccordion = useCallback((key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const closeAllAccordions = useCallback(() => {
    setOpenAccordions({});
  }, []);

  const openAccordion = useCallback((key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  const closeAccordion = useCallback((key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: false
    }));
  }, []);

  const isOpen = useCallback((key: string) => {
    return Boolean(openAccordions[key]);
  }, [openAccordions]);

  return {
    openAccordions,
    toggleAccordion,
    closeAllAccordions,
    openAccordion,
    closeAccordion,
    isOpen
  };
};