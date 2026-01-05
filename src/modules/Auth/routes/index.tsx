import { ROUTES } from '@/constants'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { VerifyOtp } from '../pages/VerifyOtp'

export const authRoutes = [
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <Signup /> },
    { path: ROUTES.VERIFY_OTP, element: <VerifyOtp /> },
]
