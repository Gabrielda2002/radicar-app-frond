/**
 * Configuración de tema y colores del sidebar
 * 
 * Este archivo permite personalizar fácilmente los colores
 * y estilos del sidebar sin tocar los componentes
 */

export const SIDEBAR_THEME = {
  // Colores principales (basados en Tailwind config)
  colors: {
    primary: '#049AE7',      // color2 
    secondary: '#00776f',    // color
    accent: '#4F9BDC',       // color2 oscuro para modo dark
  },

  // Estados de los elementos
  states: {
    active: {
      light: 'bg-[#049AE7] text-white shadow-md',
      dark: 'dark:bg-gray-700 dark:text-gray-200'
    },
    inactive: {
      light: 'text-gray-600 hover:bg-[#049AE7] hover:text-white',
      dark: 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
    },
    category: {
      open: {
        light: 'bg-[#00776f] text-white shadow-md',
        dark: 'dark:bg-gray-700 dark:text-gray-200'
      },
      closed: {
        light: 'text-gray-600 hover:bg-[#00776f] hover:text-white',
        dark: 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
      }
    }
  },

  // Espaciado y dimensiones
  spacing: {
    sidebar: {
      width: {
        expanded: 'w-72',
        collapsed: 'w-16'
      },
      padding: 'px-4 py-3',
      itemPadding: 'px-3 py-2'
    },
    indentation: {
      level1: 'ml-4',
      level2: 'ml-8',
      level3: 'ml-12'
    }
  },

  // Animaciones
  animations: {
    transition: 'transition-all duration-300',
    sidebarTransition: 'transition-all duration-500 ease-in-out',
    hover: 'hover:scale-[1.02]',
    arrow: 'transition-all duration-300'
  },

  // Bordes y sombras
  effects: {
    shadow: 'shadow-lg',
    border: 'border-r border-gray-200 dark:border-gray-700',
    rounded: 'rounded-lg',
    scrollbar: 'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'
  },

  // Tipografía
  typography: {
    sectionTitle: 'text-sm font-bold uppercase tracking-wide',
    itemText: 'text-sm font-medium whitespace-nowrap',
    sizes: {
      icon: 'w-5 h-5',
      arrow: 'w-5 h-5'
    }
  }
} as const;

/**
 * Función helper para generar clases CSS dinámicamente
 */
export const buildSidebarClass = (
  base: string,
  states: { [key: string]: string },
  condition: string
) => {
  return `${base} ${states[condition] || states.default || ''}`;
};

/**
 * Configuración de breakpoints responsive
 */
export const SIDEBAR_BREAKPOINTS = {
  mobile: 'max-w-sm',
  tablet: 'max-w-md',
  desktop: 'max-w-lg'
} as const;