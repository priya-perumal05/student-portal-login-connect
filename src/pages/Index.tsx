import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, Shield, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-secondary" />
              <span className="text-xl font-display font-bold">Student Portal</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Register
                </Button>
              </Link>
            </div>
          </nav>

          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Your Academic
              <br />
              <span className="text-gradient">Journey Starts Here</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 mb-8 max-w-xl">
              Access your student dashboard, manage your profile, and stay connected with your university — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: BookOpen, title: 'Student Dashboard', desc: 'View your academic info, student ID, and department details at a glance.' },
              { icon: Shield, title: 'Secure Authentication', desc: 'Email-verified login keeps your account safe with industry-standard security.' },
              { icon: Users, title: 'Admin Management', desc: 'Administrators can manage student records, assign IDs, and oversee profiles.' },
            ].map((f) => (
              <div key={f.title} className="glass-card rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <f.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-xl font-display font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm">Student Portal © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
