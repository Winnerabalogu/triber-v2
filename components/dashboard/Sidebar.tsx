"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart, User, HelpCircle, LogOut, Briefcase ,Banknote, Microscope} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/fundability', label: 'Fundability Test', icon: Briefcase },
  { href: '/dashboard/valuation', label: 'Valuation', icon: BarChart },
  { href: '/dashboard/deal-room', label: 'Deal Room', icon: Banknote },
  { href: '/dashboard/analysis', label: 'Business Analysis', icon: Microscope },
];

const accountItems = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

interface SidebarProps {
  isOpen: boolean;
}
export default function Sidebar({ isOpen }: SidebarProps) {
  const { logout } = useAuth();
  
const NavLink = ({ href, label, icon: Icon, isOpen }: { href: string, label: string, icon: React.ElementType, isOpen: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Link href={href} title={label}> 
        <GlassCard 
          className={cn(
            "p-3 hover:bg-primary/20 mb-2", 
            isActive && "bg-primary/20 border-primary/50 " 
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 flex-shrink-0",
                isActive ? "bg-primary/20" : "bg-primary/10"
            )}>
              <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary" : "text-foreground/80"
              )} />
            </div>
          
            <span className={cn(
                "font-semibold text-sm whitespace-nowrap",
                isActive ? "text-primary" : "text-foreground",
                !isOpen && "hidden" 
            )}>
              {label}
            </span>
          </div>
        </GlassCard>
      </Link>
    );
};


  return (
    <aside
      className={cn(
        'h-full bg-background border-r border-foreground flex flex-col transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-25'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 h-16 px-6 border-b border-foreground flex-shrink-0">
          <div className="h-8 w-8 bg-primary rounded-full"></div>
          <span className={cn('font-bold text-xl', !isOpen && 'hidden')}>Triber</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
         {navItems.map(item => <NavLink key={item.href} {...item} isOpen={isOpen} />)}
        
        <div className="pt-4">
            <h3 className={cn('px-3 text-xs font-semibold uppercase text-muted-foreground/60', !isOpen && 'text-center')}>
                {isOpen ? 'Account Pages' : '·'}
            </h3>
            <div className="mt-2 space-y-1">
                 {accountItems.map(item => <NavLink key={item.href} {...item} isOpen={isOpen} />)}
            </div>
        </div>
      </nav>      

      <div className="px-4 py-4 border-t border-foreground mt-auto flex-shrink-0">
        {/* Upgrade Card */}
       <GlassCard 
          className={cn(
            'p-4 text-center', 
            !isOpen && 'p-2 pb-0'
          )}
        >
          <div className={cn('mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2', !isOpen && 'bg-transparent')}>
              <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div className={cn(!isOpen && 'hidden')}>
              <h4 className="font-semibold text-foreground text-sm">Need more features?</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-3">Please upgrade to pro.</p>
              <button className="w-full text-xs bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90">
                  Upgrade to Pro
              </button>
          </div>
        </GlassCard>                
        
        <div className="mt-2">
          <GlassCard
            as="button"
            onClick={logout}
              className={cn(
                'p-3 w-full rounded-2xl flex items-center gap-3',
                'hover:bg-destructive/20 text-muted-foreground hover:text-foreground',
                !isOpen && "justify-center"
              )}
          >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={cn('font-medium text-sm whitespace-nowrap', !isOpen && 'hidden')}>
                Sign Out
              </span>
          </GlassCard>
        </div>
      </div>
    </aside>
  );
}
