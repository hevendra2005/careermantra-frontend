import AuthShell from '@/components/AuthShell';
import RegisterForm from '@/components/RegisterForm';

export const metadata = { title: 'Create Student Account | Career Mantra', description: 'Create a free Career Mantra student account to predict colleges, apply with one form and take the scholarship test.' };

export default function Register() {
  return <AuthShell mode="register"><RegisterForm /></AuthShell>;
}