import { useState } from 'react'
import { ROUTES } from '@/constants'
import { Layers } from 'lucide-react'
import { Form } from '@/components/form/Form'
import { loginSchema } from '../schema/schema'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'
import { AuthService } from '@/modules/Auth/service/auth.service'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleLogin = async (values: any) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await AuthService.login(values)
      const token = res.token
      const user = res.data?.user

      if (user && token) {
        setAuth(user, token)
        navigate(ROUTES.HOME)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      const message = err.response?.data?.message || err.message || 'Invalid credentials'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Layers className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500">Please enter your details to sign in.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-danger-light bg-danger-light p-3 text-sm text-danger font-medium">
          {error}
        </div>
      )}

      <Form schema={loginSchema} onSubmit={handleLogin}>
        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
            Remember me
          </label>
          <Link to="#" className="font-semibold text-primary hover:text-primary-dark hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} className="mb-4">
          Sign in
        </Button>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="font-semibold text-primary hover:text-primary-dark hover:underline">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
