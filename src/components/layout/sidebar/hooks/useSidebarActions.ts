import { useCallback } from 'react';

export interface SidebarActions {
  openReportsModal: () => void;
}

export const useSidebarActions = (actions: SidebarActions) => {
  const handleAction = useCallback((actionKey: string) => {
    console.log('🚀 Action triggered:', actionKey);
    switch (actionKey) {
      case 'openReportsModal':
        console.log('📱 Opening reports modal...');
        actions.openReportsModal();
        break;
      default:
        console.warn(`Unknown action: ${actionKey}`);
    }
  }, [actions]);

  return { handleAction };
};