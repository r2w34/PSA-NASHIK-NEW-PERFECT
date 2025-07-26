import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function Coaches() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Coach Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage coach profiles and assignments</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Coaching Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Coach management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}