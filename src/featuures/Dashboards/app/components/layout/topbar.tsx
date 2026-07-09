import { Bell, UserCircle2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@dash/lib/theme';
import { Badge } from '@dash/components/ui/badge';

interface TopbarProps {
  title: string;
  badge?: string;
  badgeVariant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
}

export function Topbar({ title, badge, badgeVariant = 'neutral' }: TopbarProps) {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant bg-background/80 px-gutter backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-title-lg text-corporate-navy">{title}</span>
        {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      </div>
      <div className="flex items-center gap-2 text-on-surface-variant">
        <button
          onClick={toggle}
          className="rounded-full p-2 transition-colors hover:bg-surface-container-low"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <button
          className="rounded-full p-2 transition-colors hover:bg-surface-container-low"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          className="rounded-full p-2 transition-colors hover:bg-surface-container-low"
          aria-label="Cuenta"
        >
          <UserCircle2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
