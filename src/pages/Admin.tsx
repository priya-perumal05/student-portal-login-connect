import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Users, Pencil, Trash2, Loader2 } from 'lucide-react';

interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  student_id: string | null;
  department: string | null;
  year_of_study: number | null;
  phone: string | null;
  created_at: string;
}

const Admin = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState<StudentProfile | null>(null);
  const [editForm, setEditForm] = useState({ student_id: '', department: '', year_of_study: '' });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setStudents(data as StudentProfile[]);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const filtered = students.filter((s) =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.student_id && s.student_id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEdit = (student: StudentProfile) => {
    setEditStudent(student);
    setEditForm({
      student_id: student.student_id || '',
      department: student.department || '',
      year_of_study: student.year_of_study?.toString() || '',
    });
  };

  const handleSave = async () => {
    if (!editStudent) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        student_id: editForm.student_id || null,
        department: editForm.department || null,
        year_of_study: editForm.year_of_study ? parseInt(editForm.year_of_study) : null,
      })
      .eq('id', editStudent.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Updated', description: 'Student profile updated successfully.' });
      setEditStudent(null);
      fetchStudents();
    }
    setSaving(false);
  };

  const handleDelete = async (student: StudentProfile) => {
    if (!confirm(`Delete ${student.full_name || student.email}? This cannot be undone.`)) return;
    // Note: deleting from profiles; the cascade from auth.users would need admin API
    const { error } = await supabase.from('profiles').delete().eq('id', student.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Student profile removed.' });
      fetchStudents();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage all registered students</p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{students.length} students</span>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card className="glass-card">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.full_name || '—'}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          {student.student_id ? (
                            <Badge variant="secondary">{student.student_id}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell>{student.department || '—'}</TableCell>
                        <TableCell>{student.year_of_study || '—'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Student</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                  <Label>Student ID</Label>
                                  <Input value={editForm.student_id} onChange={(e) => setEditForm({ ...editForm, student_id: e.target.value })} placeholder="STU-001" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Department</Label>
                                  <Input value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Year of Study</Label>
                                  <Input type="number" min="1" max="6" value={editForm.year_of_study} onChange={(e) => setEditForm({ ...editForm, year_of_study: e.target.value })} />
                                </div>
                                <Button onClick={handleSave} disabled={saving} className="w-full">
                                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                  Save Changes
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(student)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
