import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { AuthService } from '@/modules/Auth/service/auth.service'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/form/Form'
import { otpSchema } from '../schema/schema'
import { ROUTES } from '@/constants'
import { Mail } from 'lucide-react'

export const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    } else {
      navigate(ROUTES.LOGIN)
    }
  }, [location, navigate])

  const handleVerify = async (values: any) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await AuthService.verifyOTP({ email, otp: values.otp })
      const token = res.token
      const user = res.data?.user || (await AuthService.getMe())

      setAuth(user, token)
      navigate(ROUTES.HOME)
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Verify your email</h3>
        <p className="text-sm text-gray-500 mt-1">
          We sent a code to <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-danger-light bg-danger-light p-3 text-sm text-danger">
          {error}
        </div>
      )}

      <Form schema={otpSchema} onSubmit={handleVerify}>
        <Button type="submit" fullWidth isLoading={isLoading} className="mb-2">
          Verify Code
        </Button>

        <Button
          type="button"
          variant="ghost"
          fullWidth
          className="text-gray-500 hover:text-gray-900"
          onClick={() => navigate(ROUTES.LOGIN)}>
          Back to Login
        </Button>
      </Form>
    </div>
  )
}
