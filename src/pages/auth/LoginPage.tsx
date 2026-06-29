import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (e: any) {
      toast.error(e.message || 'Login failed');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Welcome back</h2>
        <p className="text-secondary text-sm">Sign in to your Analytiq dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email address" type="email" placeholder="riya@institute.in" leftIcon={<Mail size={15} />} error={errors.email?.message} {...register('email')} />
        <Input label="Password" type={showPass ? 'text' : 'password'} placeholder="••••••••" leftIcon={<Lock size={15} />} error={errors.password?.message}
          rightIcon={<button type="button" onClick={() => setShowPass(p => !p)} className="hover:text-primary">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
          {...register('password')} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-secondary cursor-pointer">
            <input type="checkbox" className="rounded border-default" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-brand-500 hover:text-brand-600 font-medium">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>Sign in</Button>
      </form>

      <div className="mt-6 p-4 bg-secondary border border-default rounded-xl">
        <p className="text-xs text-muted mb-2 font-medium">Demo credentials</p>
        <p className="text-xs text-secondary font-mono">riya@analytiq.in / password</p>
      </div>
    </div>
  );
}
