import { useNavigate } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ShieldOff size={28} className="text-danger" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">Access Denied</h2>
      <p className="text-secondary mb-6">You don't have permission to access this page.</p>
      <Button onClick={() => navigate(-1)} variant="outline" size="lg">Go Back</Button>
    </div>
  );
}
