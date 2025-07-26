import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function StudentBadges() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Student Badges</h1>
          <p className="text-gray-600 dark:text-gray-400">Achievement system and gamification</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Badge System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Student badges functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}