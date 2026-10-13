import AuthShell from '@/components/AuthShell';
import LoginForm from '@/components/LoginForm';

export const metadata = { title: 'Student Login | Career Mantra', description: 'Log in to your Career Mantra student account with your password or a mobile OTP.' };

export default function Login() {
  return <AuthShell mode="login"><LoginForm /></AuthShell>;
}