import type { AuthSession, User } from '@/types';
import { delay } from '@/lib/utils';
import { MOCK_DELAY_MS } from '@/constants';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Riya Sharma',
  email: 'riya@analytiq.in',
  role: 'owner',
  avatar: undefined,
  instituteName: 'Analytiq Institute',
  instituteId: 'inst1',
  permissions: ['students:read','students:write','students:delete','fees:read','fees:write','fees:collect','attendance:read','attendance:write','reports:read','reports:generate','analytics:read','notifications:read','notifications:send','automation:read','automation:write','settings:read','settings:write','ai:access'],
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString(),
};

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    await delay(MOCK_DELAY_MS);
    if (email && password.length >= 6) {
      return { user: MOCK_USER, token: 'mock-jwt-token', refreshToken: 'mock-refresh', expiresAt: new Date(Date.now() + 86400000).toISOString() };
    }
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('analytiq_token');
    localStorage.removeItem('analytiq_user');
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    await delay(MOCK_DELAY_MS);
    if (email) return { message: 'OTP sent to your email' };
    throw new Error('Invalid email');
  },

  async verifyOtp(email: string, otp: string): Promise<{ token: string }> {
    await delay(MOCK_DELAY_MS);
    if (otp === '123456') return { token: 'reset-token-mock' };
    throw new Error('Invalid OTP');
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    await delay(MOCK_DELAY_MS);
    if (token && password.length >= 8) return { message: 'Password reset successful' };
    throw new Error('Invalid token or password');
  },

  async getMe(): Promise<User> {
    await delay(300);
    return MOCK_USER;
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    await delay(200);
    if (refreshToken) return { token: 'new-mock-jwt-token' };
    throw new Error('Invalid refresh token');
  },
};
