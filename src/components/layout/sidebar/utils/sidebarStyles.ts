export const SIDEBAR_CLASSES = {
  // Base sidebar classes
  sidebar: {
    base: `
      z-10 flex flex-col transition-[width] duration-300 ease-in-out
      overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l
      bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg
      h-full scrollbar-thin scrollbar-thumb-gray-300
      dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
    `,
    expanded: 'w-72 px-4 py-3',
    collapsed: 'w-16 px-2 py-3'
  },

  // Navigation item classes
  navItem: {
    base: 'flex items-center transition-all duration-300 transform rounded-md group relative border-l-4',
    expanded: 'px-3 py-2.5',
    collapsed: 'justify-center px-2 py-2.5',
    active:
      'bg-color2/10 text-color2 border-color2 font-semibold dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]',
    inactive:
      'text-gray-600 border-transparent hover:bg-color2/5 hover:text-color2 dark:text-gray-300 dark:hover:bg-color2/10 dark:hover:text-[#4F9BDC]'
  },

  // Category classes
  category: {
    base: 'flex items-center transition-all duration-300 transform rounded-md group',
    expanded: 'px-3 py-2.5',
    collapsed: 'justify-center px-2 py-2.5',
    activePage:
      'bg-color2/10 text-color2 border-color2 font-semibold dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]',
    activeChild: 'bg-color/5 text-color dark:bg-color/10 dark:text-color',
    open: 'bg-color/5 text-color dark:bg-color/10 dark:text-color',
    closed:
      'text-gray-600 hover:bg-color/5 hover:text-color dark:text-gray-300 dark:hover:bg-color/10 dark:hover:text-color'
  },

  // Icon classes
  icon: {
    active: 'text-current transition-colors duration-300',
    inactive:
      'text-gray-500 group-hover:text-current dark:text-gray-400 transition-colors duration-300'
  },

  // Image classes
  image: {
    active: 'invert brightness-0',
    inactive:
      'opacity-80 group-hover:invert group-hover:brightness-0 dark:invert dark:opacity-70 transition-all duration-300'
  },

  // Text classes
  text: {
    base: 'text-sm font-medium whitespace-nowrap transition-colors duration-300',
    active: 'text-current',
    inactive: 'group-hover:text-current',
    collapsed: 'hidden'
  },

  // Tooltip classes
  tooltip:
    'absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 dark:bg-gray-700',

  // Popover classes
  popover:
    'absolute left-full top-0 z-50 ml-2 w-60 rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800',

  // Section title classes
  sectionTitle:
    'px-2 text-sm font-bold text-color2 uppercase tracking-wide dark:text-[#4F9BDC]',

  // Spacing and layout
  spacing: {
    section: 'space-y-6',
    items: 'space-y-2',
    categories: 'space-y-3',
    subcategories: 'ml-4 space-y-2',
    indentation: 'pl-2 border-l-2 border-gray-200 dark:border-gray-600 space-y-1'
  },

  // Arrow animation
  arrow: {
    base: 'w-5 h-5 ml-auto transition-all duration-300 dark:invert',
    open: 'rotate-180 scale-110',
    closed: 'hover:scale-110'
  }
} as const;

export const getPositionClass = (level: number) => {
  if (level > 0) return `ml-${4 + level * 2}`;
  return 'ml-3';
};