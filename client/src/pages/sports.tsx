import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export default function Sports() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sports Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage sports categories and programs</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sports Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Sports management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}