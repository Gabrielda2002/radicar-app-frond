// src/hooks/useEventModal.ts
import { useState } from 'react';
import { IEventos } from '@/models/IEventos';

export const useEventModal = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEventos | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEventSelect = (event: IEventos | null) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleEditMode = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  return {
    selectedEvent,
    isModalOpen,
    isEditing,
    handleEventSelect,
    handleEditMode,
    handleCloseModal
  };
};