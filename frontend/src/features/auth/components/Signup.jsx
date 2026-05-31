import {FormHelperText, Stack, TextField, Typography, useTheme, useMediaQuery} from '@mui/material'
import { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation } from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {clearSignupError, selectLoggedInUser, selectSignupError, selectSignupStatus, signupAsync} from '../AuthSlice'
import { toast } from 'react-toastify'
import { motion} from 'framer-motion'

export const Signup = () => {
  const dispatch=useDispatch()
  const signupStatus=useSelector(selectSignupStatus)
  const signupError=useSelector(selectSignupError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  useEffect(()=>{
    if(loggedInUser){
      navigate("/")
    }
  },[loggedInUser, navigate])

  useEffect(()=>{
    if(signupStatus==='fullfilled' && loggedInUser){
      toast.success("Account created! Welcome to Mern Shop")
      navigate("/")
    }
    if(signupStatus==='rejected' && signupError){
      toast.error(signupError?.message || "Signup failed")
      dispatch(clearSignupError())
    }
  },[signupStatus, signupError, loggedInUser, navigate, dispatch])

  const handleSignup = async (data) => {
    dispatch(signupAsync(data))
  }

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>

      {
        !is900 &&

        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack>
        
        }

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                  <Stack rowGap={'.4rem'}>
                    <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Mern Shop</Typography>
                    <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop Anything</Typography>
                  </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleSignup)}>

                      <motion.div whileHover={{y:-5}}>
                        <TextField fullWidth {...register("name",{required:"Name is required"})} placeholder='Full Name'/>
                        {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                      </motion.div>

                      <motion.div whileHover={{y:-5}}>
                        <TextField fullWidth {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
                        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                      </motion.div>

                      <motion.div whileHover={{y:-5}}>
                        <TextField fullWidth type='password' {...register("password",{required:"Password is required"})} placeholder='Password'/>
                        {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                      </motion.div>

                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton sx={{height:'2.5rem'}} fullWidth loading={signupStatus==='pending'} type='submit' variant='contained'>Sign Up</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap-reverse'}>
                        <motion.div whileHover={{x:2}} whileTap={{scale:1.050}}>
                          <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/login'} component={Link}>Already a member? <span style={{color:theme.palette.primary.dark}}>Login</span></Typography>
                        </motion.div>
                    </Stack>

                </Stack>

        </Stack>
    </Stack>
  )
}