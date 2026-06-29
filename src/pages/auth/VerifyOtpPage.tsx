import { useState, useRef, KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const submit = async () => {
    const code = otp.join('');
    if (code.length < 6) return toast.error('Enter 6-digit OTP');
    setLoading(true);
    try {
      const { token } = await authService.verifyOtp(email, code);
      navigate('/reset-password', { state: { token } });
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Verify OTP</h2>
        <p className="text-secondary text-sm">Enter the 6-digit code sent to <span className="text-primary font-medium">{email || 'your email'}</span></p>
      </div>
      <div className="flex gap-3 mb-6">
        {refs.map((ref, i) => (
          <input key={i} ref={ref} value={otp[i]} maxLength={1} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)}
            className="w-full h-14 text-center text-xl font-bold bg-elevated border-2 border-default rounded-xl text-primary focus:border-brand-500 focus:outline-none transition-colors" />
        ))}
      </div>
      <Button onClick={submit} className="w-full" size="lg" loading={loading}>Verify OTP</Button>
      <p className="text-center text-sm text-secondary mt-4">
        Hint: use <span className="font-mono text-primary">123456</span>
      </p>
    </div>
  );
}
