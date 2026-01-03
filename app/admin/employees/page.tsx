'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { getToken } from '@/lib/auth';
import { ADD_EMPLOYEE_MUTATION, LIST_EMPLOYEES_QUERY, ME_QUERY } from '@/lib/graphql/operations';
import type { Employee } from '@/lib/graphql/types';

type ListEmployeesResponse = { listEmployees: Employee[] };

type AddEmployeeResponse = { addEmployee: Employee };

type AddEmployeeVars = {
  input: {
    email: string;
    password: string;
    role: 'admin' | 'employee';
    name: string;
    age?: number | null;
    class?: string | null;
    subjects: string[];
    attendance?: number | null;
  };
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'employee']).default('employee'),
  name: z.string().min(1),
  subjects: z.string().optional(),
  attendance: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function AdminEmployeesPage() {
  const router = useRouter();

  const token = getToken();
  useEffect(() => {
    if (!token) router.replace('/login');
  }, [router, token]);

  const { data: meData, loading: meLoading } = useQuery<{ me: Employee | null }>(ME_QUERY, {
    fetchPolicy: 'cache-and-network',
    skip: !token
  });

  useEffect(() => {
    if (!meLoading && meData?.me && meData.me.role !== 'admin') {
      router.replace('/shipments');
    }
  }, [meLoading, meData, router]);

  const { data, loading, error, refetch } = useQuery<ListEmployeesResponse>(LIST_EMPLOYEES_QUERY, {
    skip: !token,
    fetchPolicy: 'cache-and-network'
  });

  const [addEmployee, addState] = useMutation<AddEmployeeResponse, AddEmployeeVars>(ADD_EMPLOYEE_MUTATION);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'employee', email: '', password: '', name: '', subjects: '', attendance: '' }
  });

  if (!token) return null;

  return (
    <AppShell title="Employees">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Employees</h1>
            <p className="text-sm text-muted-foreground">Admin-only employee management (RBAC enforced in API).</p>
          </div>
          <Button variant="outline" onClick={() => refetch()} disabled={loading}>
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={form.handleSubmit(async (values) => {
                const subjects = (values.subjects || '')
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);

                const attendance = values.attendance?.trim() ? Number(values.attendance) : undefined;

                await addEmployee({
                  variables: {
                    input: {
                      email: values.email,
                      password: values.password,
                      role: values.role,
                      name: values.name,
                      subjects,
                      attendance
                    }
                  }
                });

                form.reset({ role: 'employee', email: '', password: '', name: '', subjects: '', attendance: '' });
                await refetch();
              })}
            >
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...form.register('email')} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" {...form.register('password')} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input {...form.register('role')} placeholder="employee / admin" />
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input {...form.register('name')} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Subjects (comma-separated)</Label>
                <Input {...form.register('subjects')} placeholder="Math, Science" />
              </div>
              <div className="space-y-2">
                <Label>Attendance</Label>
                <Input {...form.register('attendance')} placeholder="200" />
              </div>

              {addState.error && <p className="text-sm text-destructive sm:col-span-2">{addState.error.message}</p>}

              <div className="sm:col-span-2">
                <Button type="submit" disabled={addState.loading}>
                  {addState.loading ? 'Creating…' : 'Create Employee'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-sm text-destructive">{error.message}</p>}
            {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(data?.listEmployees ?? []).map((e) => (
                    <tr key={e.id} className="transition-colors hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{e.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{e.email}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <Badge variant={e.role === 'admin' ? 'default' : 'secondary'}>{e.role}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{e.attendance ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
