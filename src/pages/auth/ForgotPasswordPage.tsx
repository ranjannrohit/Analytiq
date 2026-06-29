import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const schema = z.object({ email: z.string().email('Enter a valid email') });
type FormData = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await authService.forgotPassword(data.email);
      toast.success('OTP sent to your email');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Reset password</h2>
        <p className="text-secondary text-sm">We'll send an OTP to your registered email</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email address" type="email" placeholder="riya@institute.in" leftIcon={<Mail size={15} />} error={errors.email?.message} {...register('email')} />
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>Send OTP</Button>
      </form>
      <div className="mt-6">
        <Link to="/login" className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
