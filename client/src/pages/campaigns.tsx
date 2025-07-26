import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';

export default function Campaigns() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Megaphone className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Marketing Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage marketing campaigns and outreach</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Campaign management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}