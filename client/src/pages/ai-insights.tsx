import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">Intelligent analytics and recommendations</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            AI insights functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}