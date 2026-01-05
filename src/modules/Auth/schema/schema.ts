import { type IForm } from '@/types/form.types'

export const loginSchema: IForm[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: true,
  },
]

export const signupSchema: IForm[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
    validation: (val) => (val.length < 2 ? 'Name must be at least 2 characters' : ''),
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    validation: (val) => (val.length < 6 ? 'Password must be at least 6 characters' : ''),
  },
]

export const otpSchema: IForm[] = [
  {
    name: 'otp',
    label: 'One Time Password',
    type: 'text',
    placeholder: 'Enter 6-digit OTP',
    required: true,
    validation: (val) => (val.length !== 6 ? 'OTP must be exactly 6 digits' : ''),
  },
]
