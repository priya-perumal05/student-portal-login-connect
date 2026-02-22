import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Calendar, Award } from 'lucide-react';

const Dashboard = () => {
  const { profile, role } = useAuth();

  const stats = [
    { label: 'Student ID', value: profile?.student_id || 'Not assigned', icon: GraduationCap },
    { label: 'Department', value: profile?.department || 'Not set', icon: BookOpen },
    { label: 'Year', value: profile?.year_of_study ? `Year ${profile.year_of_study}` : 'Not set', icon: Calendar },
    { label: 'Role', value: role || 'student', icon: Award },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, <span className="text-gradient">{profile?.full_name || 'Student'}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">Here's an overview of your academic profile.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-card hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-5 w-5 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold capitalize">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display">Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{profile?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{profile?.phone || 'Not provided'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Account Status</span>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
