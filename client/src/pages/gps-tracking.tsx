import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function GPSTracking() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">GPS Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time location monitoring and safety</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Location Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            GPS tracking functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}