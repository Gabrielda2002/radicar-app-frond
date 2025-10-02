import { useCallback } from 'react';

export interface SidebarActions {
  openReportsModal: () => void;
}

export const useSidebarActions = (actions: SidebarActions) => {
  const handleAction = useCallback((actionKey: string) => {
    switch (actionKey) {
      case 'openReportsModal':
        actions.openReportsModal();
        break;
      default:
        console.warn(`Unknown action: ${actionKey}`);
    }
  }, [actions]);

  return { handleAction };
};