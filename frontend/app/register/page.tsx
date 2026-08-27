'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout, EmailInput, PasswordInput, PasswordStrengthMeter, SocialLoginButton } from '@/components/auth';
import { apiFetch } from '@/lib/api';

export default function RegisterPage() {
  const { register, switchTenant } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validatePassword = (pwd: string): string[] => {
    const issues: string[] = [];
    if (pwd.length < 8) issues.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(pwd)) issues.push('Una mayúscula');
    if (!/[a-z]/.test(pwd)) issues.push('Una minúscula');
    if (!/\d/.test(pwd)) issues.push('Un número');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) issues.push('Un carácter especial');
    return issues;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const passwordIssues = validatePassword(password);
    if (passwordIssues.length > 0) {
      setError(`Contraseña débil: ${passwordIssues.join(', ')}`);
      return;
    }

    setIsLoading(true);

    try {
      await register({ email, password });
      
      // After registration, check if user has only one tenant and auto-switch
      // This prevents sessions without tenant context
      try {
        const tenants = await apiFetch<any[]>('/tenants/my-tenants', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (tenants && tenants.length === 1) {
          // User has only one tenant, force switch to it
          await switchTenant(tenants[0].id);
        }
      } catch (tenantError) {
        // If fetching tenants fails, continue to dashboard anyway
        console.warn('Could not fetch tenants for auto-switch:', tenantError);
      }
      
      router.push('/dashboard');
    } catch (err) {
      setError('Error al registrar. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: string) => {
    console.log(`Register with ${provider}`);
    // TODO: Implement social registration
  };

  return (
    <AuthLayout
      title="Crea tu cuenta gratis"
      subtitle="Comienza a gestionar tu negocio hoy mismo"
    >
      {/* Logo Mobile */}
      <div className="text-center mb-8 lg:hidden">
        <Link href="/" className="inline-flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            PymeN
          </span>
        </Link>
      </div>

      {/* Register Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Crear Cuenta</h1>
        <p className="text-slate-600 text-center mb-6">Completa el formulario para comenzar</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <EmailInput
            id="email"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@empresa.com"
            required
          />

          <PasswordInput
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <PasswordStrengthMeter password={password} />

          <PasswordInput
            id="confirmPassword"
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={confirmPassword && password !== confirmPassword ? 'Las contraseñas no coinciden' : undefined}
          />

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
            />
            <span className="text-sm text-slate-600">
              Acepto los{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                Términos y Condiciones
              </Link>{' '}
              y la{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                Política de Privacidad
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !acceptTerms}
            className="w-full py-3.5 px-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creando cuenta...
              </>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">o regístrate con</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <SocialLoginButton
            provider="google"
            onClick={() => handleSocialRegister('google')}
            disabled={isLoading}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-slate-600 hover:text-slate-800 transition-colors inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </AuthLayout>
  );
}
