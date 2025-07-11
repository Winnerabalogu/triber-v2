"use client"

import { Settings, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggleButton from '../ThemeToggleButton';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './header/ProfileDropdown';

interface HeaderProps {
  onDesktopMenuClick: () => void; 
  onMobileMenuClick: () => void;  
}

export default function Header({ onDesktopMenuClick, onMobileMenuClick }: HeaderProps) {
  const pathname = usePathname();
 const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbPage = pathParts[pathParts.length - 1] || 'Dashboard';
  const breadcrumb = `Pages / ${breadcrumbPage}`;

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b border-foreground flex-shrink-0">
      <div className="flex items-center gap-4">
                
        <button onClick={onDesktopMenuClick} className="hidden lg:block p-2 rounded-full hover:bg-muted">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
                
        <button onClick={onMobileMenuClick} className="lg:hidden p-2 rounded-full hover:bg-muted">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        <div>
          <p className="text-xs text-muted-foreground capitalize">{breadcrumb}</p>
          <h1 className="text-sm font-semibold capitalize text-primary">
            {breadcrumbPage}
          </h1>
        </div>
      </div>
            
      <div className="flex items-center gap-2">
           <ThemeToggleButton variant="icon" />
       <ProfileDropdown />
        <NotificationDropdown />
      </div>
    </header>
  );
}