import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function Communications() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Communications</h1>
          <p className="text-gray-600 dark:text-gray-400">Multi-channel messaging and notifications</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Communications functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}