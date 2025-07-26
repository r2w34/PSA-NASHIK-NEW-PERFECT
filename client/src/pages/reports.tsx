import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate comprehensive reports and analytics</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Reports and analytics functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}