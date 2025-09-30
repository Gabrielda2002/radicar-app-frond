export const SIDEBAR_CLASSES = {
  // Base sidebar classes
  sidebar: {
    base: `
      z-10 flex flex-col transition-all duration-500 ease-in-out 
      overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l 
      bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg
      px-4 py-3 h-full scrollbar-thin scrollbar-thumb-gray-300 
      dark:scrollbar-thumb-gray-600 scrollbar-track-transparent
    `,
    expanded: 'w-72 absolute',
    collapsed: '-translate-x-full w-16 absolute'
  },

  // Navigation item classes
  navItem: {
    base: `
      flex items-center px-3 py-2 transition-all duration-300 
      transform rounded-lg group relative
    `,
    active: `
      bg-color2 text-white dark:bg-gray-700 dark:text-gray-200 
      shadow-md scale-[1.02]
    `,
    inactive: `
      text-gray-600 dark:text-gray-300 
      hover:bg-color2 hover:text-white 
      dark:hover:bg-gray-700 dark:hover:text-white 
      hover:shadow-sm hover:scale-[1.02]
    `
  },

  // Category classes
  category: {
    base: `
      flex items-center px-3 py-2 transition-all duration-300 
      transform rounded-lg group w-full
    `,
    open: `
      bg-color text-white dark:bg-gray-700 dark:text-gray-200 
      shadow-md
    `,
    closed: `
      text-gray-600 dark:text-gray-300 
      hover:bg-color hover:text-white 
      dark:hover:bg-gray-700 dark:hover:text-white 
      hover:shadow-sm hover:scale-[1.02]
    `
  },

  // Icon classes
  icon: {
    active: 'text-white dark:text-gray-200',
    inactive: 'group-hover:text-white dark:text-white transition-colors duration-300'
  },

  // Image classes
  image: {
    active: 'invert',
    inactive: 'group-hover:invert dark:invert transition-all duration-300'
  },

  // Text classes
  text: {
    base: 'text-sm font-medium whitespace-nowrap transition-colors duration-300',
    active: 'text-white dark:text-gray-200',
    inactive: 'group-hover:text-white dark:group-hover:text-gray-200'
  },

  // Section title classes
  sectionTitle: `
    px-2 text-sm font-bold text-color2 uppercase tracking-wide 
    dark:text-[#4F9BDC]
  `,

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
  return 'absolute left-8 mx-2';
};