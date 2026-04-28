import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Additional platform settings and configurations will be available here.
            </p>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Platform
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}