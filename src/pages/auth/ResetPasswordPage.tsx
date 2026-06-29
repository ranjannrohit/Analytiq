import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const schema = z.object({
  password: z.string().min(8, 'At least 8 characters'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

type FormData = z.infer<typeof schema>;
export function ResetPasswordPage() {
  const navigate = useNavigate();
  const token = (useLocation().state as any)?.token || '';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await authService.resetPassword(token, data.password);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Create new password</h2>
        <p className="text-secondary text-sm">Choose a strong password for your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="New password" type="password" placeholder="••••••••" leftIcon={<Lock size={15} />} error={errors.password?.message} {...register('password')} />
        <Input label="Confirm password" type="password" placeholder="••••••••" leftIcon={<Lock size={15} />} error={errors.confirm?.message} {...register('confirm')} />
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>Reset Password</Button>
      </form>
    </div>
  );
}
