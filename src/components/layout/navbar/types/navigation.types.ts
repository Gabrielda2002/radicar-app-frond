// Types for navbar navigation and links

export interface UserNavigationItem {
  name: string;
  href?: string;
  action?: () => void;
}

export interface SupportLink {
  name: string;
  href: string;
}
