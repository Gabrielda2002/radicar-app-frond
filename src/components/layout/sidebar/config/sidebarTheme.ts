/**
 * Configuración de tema y colores del sidebar
 *
 * Este archivo permite personalizar fácilmente los colores
 * y estilos del sidebar sin tocar los componentes
 */

export const SIDEBAR_THEME = {
  // Colores principales (basados en Tailwind config)
  colors: {
    primary: '#049AE7', // color2
    secondary: '#00776f', // color
    accent: '#4F9BDC' // color2 oscuro para modo dark
  },

  // Estados de los elementos
  states: {
    active: {
      light:
        'bg-color2/10 text-color2 border-l-4 border-color2 font-semibold',
      dark: 'dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]'
    },
    inactive: {
      light:
        'text-gray-600 border-l-4 border-transparent hover:bg-color2/5 hover:text-color2',
      dark: 'dark:text-gray-300 dark:hover:bg-color2/10 dark:hover:text-[#4F9BDC]'
    },
    category: {
      activePage: {
        light:
          'bg-color2/10 text-color2 border-l-4 border-color2 font-semibold',
        dark: 'dark:bg-color2/20 dark:text-[#4F9BDC] dark:border-[#4F9BDC]'
      },
      open: {
        light: 'bg-color/5 text-color',
        dark: 'dark:bg-color/10 dark:text-color'
      },
      activeChild: {
        light: 'bg-color/5 text-color',
        dark: 'dark:bg-color/10 dark:text-color'
      },
      closed: {
        light: 'text-gray-600 hover:bg-color/5 hover:text-color',
        dark: 'dark:text-gray-300 dark:hover:bg-color/10 dark:hover:text-color'
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
      padding: {
        expanded: 'px-4 py-3',
        collapsed: 'px-2 py-3'
      },
      itemPadding: 'px-3 py-2.5'
    },
    indentation: {
      level1: 'ml-4',
      level2: 'ml-8',
      level3: 'ml-12'
    }
  },

  // Modo colapsado
  collapsed: {
    item: 'justify-center px-2',
    tooltip:
      'absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100 dark:bg-gray-700',
    popover:
      'absolute left-full top-0 z-50 ml-2 w-60 rounded-lg border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800'
  },

  // Animaciones
  animations: {
    transition: 'transition-all duration-300',
    sidebarTransition: 'transition-[width] duration-300 ease-in-out',
    hover: 'hover:scale-[1.02]',
    arrow: 'transition-all duration-300'
  },

  // Bordes y sombras
  effects: {
    shadow: 'shadow-lg',
    border: 'border-r border-gray-200 dark:border-gray-700',
    rounded: 'rounded-md',
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