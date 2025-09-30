import React from 'react';
import { SidebarSection } from '../types/sidebar.types';
import SidebarCategory from './SidebarCategory';
import SidebarItem from './SidebarItem';

interface SidebarSectionProps {
  section: SidebarSection;
  openAccordions: { [key: string]: boolean };
  onToggleAccordion: (key: string) => void;
  onAction?: (actionKey: string) => void;
}

const SidebarSectionComponent: React.FC<SidebarSectionProps> = ({
  section,
  openAccordions,
  onToggleAccordion,
  onAction
}) => {
  const handleItemAction = (item: any) => {
    if (typeof item.action === 'string' && onAction) {
      onAction(item.action);
    }
  };

  return (
    <div className="space-y-3">
      {section.title && (
        <label className="px-2 text-sm font-bold text-color2 uppercase tracking-wide dark:text-[#4F9BDC]">
          {section.title}
        </label>
      )}
      
      <div className="space-y-2">
        {section.items.map((item) => {
          const isOpen = openAccordions[item.id] || false;

          if (item.type === 'category') {
            return (
              <SidebarCategory
                key={item.id}
                item={item}
                isOpen={isOpen}
                onToggle={() => onToggleAccordion(item.id)}
              />
            );
          }

          return (
            <div key={item.id} onClick={() => handleItemAction(item)}>
              <SidebarItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarSectionComponent;