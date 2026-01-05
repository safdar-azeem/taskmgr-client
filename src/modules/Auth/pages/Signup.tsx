import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthService } from '@/modules/Auth/service/auth.service'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/form/Form'
import { signupSchema } from '../schema/schema'
import { ROUTES } from '@/constants'
import { Layers } from 'lucide-react'

export const Signup = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (values: any) => {
    setIsLoading(true)
    setError('')
    try {
      await AuthService.register(values)
      navigate(ROUTES.VERIFY_OTP, { state: { email: values.email } })
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Registration failed')
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
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Create an account</h3>
        <p className="text-sm text-gray-500">Enter your details to get started.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-danger-light bg-danger-light p-3 text-sm text-danger">
          {error}
        </div>
      )}

      <Form schema={signupSchema} onSubmit={handleSignup}>
        <Button type="submit" fullWidth isLoading={isLoading} className="mt-4 mb-4">
          Create Account
        </Button>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-primary hover:text-primary-dark hover:underline">
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default Signup
