import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { GraduationCap, LayoutDashboard, Users, User, LogOut, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { role, signOut, profile } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    ...(role === 'admin' ? [{ to: '/admin', icon: Shield, label: 'Admin Panel' }] : []),
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col gradient-hero text-primary-foreground">
        <div className="flex items-center gap-3 p-6 border-b border-primary-foreground/10">
          <GraduationCap className="h-8 w-8 text-secondary" />
          <span className="text-lg font-display font-bold">Student Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                location.pathname === item.to
                  ? 'bg-sidebar-accent text-secondary'
                  : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <div className="mb-3 px-4 text-xs text-primary-foreground/50">
            Signed in as
            <div className="text-sm text-primary-foreground/80 font-medium truncate">
              {profile?.full_name || profile?.email}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="md:hidden flex items-center justify-between gradient-hero text-primary-foreground p-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-secondary" />
            <span className="font-display font-bold">Student Portal</span>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  location.pathname === item.to ? 'bg-sidebar-accent text-secondary' : 'text-primary-foreground/70'
                )}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={signOut} className="text-primary-foreground/70">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
