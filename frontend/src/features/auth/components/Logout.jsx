import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { logoutAsync, selectAuthStatus } from '../AuthSlice'
import { resetCart } from '../../cart/CartSlice'
import { resetWishlist } from '../../wishlist/WishlistSlice'
import { resetUserInfo } from '../../user/UserSlice'
import { resetAddress } from '../../address/AddressSlice'

export const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const status = useSelector(selectAuthStatus)
    const isLoggingOut = status === 'pending'

    const logout = useCallback(async () => {
        try {
            await dispatch(logoutAsync()).unwrap()
            dispatch(resetCart())
            dispatch(resetWishlist())
            dispatch(resetUserInfo())
            dispatch(resetAddress())
            toast.success('Logged out successfully')
            navigate('/login', { replace: true })
        } catch (error) {
            dispatch(resetCart())
            dispatch(resetWishlist())
            dispatch(resetUserInfo())
            dispatch(resetAddress())
            toast.error(error?.message || 'Logout failed')
            navigate('/login', { replace: true })
        }
    }, [dispatch, navigate])

    return { logout, isLoggingOut }
}

export const Logout = () => {
    const { logout } = useLogout()
    logout()
    return null
}
