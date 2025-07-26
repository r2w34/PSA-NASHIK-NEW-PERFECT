import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

export default function Batches() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Batch Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize and manage training batches</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Batch management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}