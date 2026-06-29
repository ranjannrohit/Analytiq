import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function SessionExpiredPage() {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Clock size={28} className="text-warning" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">Session Expired</h2>
      <p className="text-secondary mb-6">Your session has timed out. Please sign in again to continue.</p>
      <Link to="/login"><Button className="w-full" size="lg">Sign in again</Button></Link>
    </div>
  );
}
