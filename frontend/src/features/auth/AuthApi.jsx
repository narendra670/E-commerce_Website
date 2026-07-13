import {axiosi} from '../../config/axios'

export const signup=async(cred)=>{
    try {
        const res=await axiosi.post("auth/signup",cred)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Signup failed")
    }
}
export const login=async(cred)=>{
    try {
        const res=await axiosi.post("auth/login",cred)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Login failed")
    }
}
export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/forgot-password",cred)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Failed to send reset link")
    }
}
export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Failed to reset password")
    }
}
export const checkAuth=async()=>{
    try {
        const res=await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Not authenticated")
    }
}
export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message||"Logout failed")
    }
}
