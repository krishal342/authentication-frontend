'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'



const ResetPassword = () => {

    const [otpRes, setOptRes] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState('');

    const router = useRouter();

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        setError: setErrorEmail,
        clearErrors: clearErrorsEmail,
        formState: { errors: errorsEmail, isSubmitting:isSubmittingEmail },
    } = useForm();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();

    const getOTP = async (data) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sendOTP`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const resData = await response.json();

        if (response.ok) {
            setEmail(data.email);
            setOptRes(true);
        }
        else {
            setErrorEmail('invalidCredentials', { message: resData.message });
        }
    }

    const sendOTP = async (data) =>{

        const newData = {...data, email};

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData),
            credentials: 'include'
        })
        const resData = await response.json();

        if(response.ok) {
            router.push('/auth/login');
        }
        else {
            setError('invalidCredentials', { message: resData.message });
        }
    }

    return (
        <div className='w-full flex flex-col  gap-8 '>
            <form action="" className='flex flex-col gap-3' onSubmit={handleSubmitEmail(getOTP)}>
                {/* for email to send otp */}
                <label>

                    <input
                        {...registerEmail(
                            'email',
                            {
                                required: { value: true, message: 'Required!' },
                                pattern: { value: /^[A-Z0-9_]+@[A-Z0-9._]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                            }
                        )}
                        type="text"
                        placeholder='Email'
                        className='input-field'
                        spellCheck="false"
                        disabled={otpRes}
                    />
                    {errorsEmail.email && <span className='error'>{errorsEmail.email.message}</span>}
                </label>
                <button className={`btn w-full ${isSubmittingEmail && 'opacity-50'}`} type='submit' disabled={isSubmittingEmail} onClick={() => clearErrorsEmail("invalidCredentials")} >Send OTP</button>
                {errorsEmail.invalidCredentials && <span className='error'>{errorsEmail.invalidCredentials.message}</span>}
            </form>

            <hr className='opacity-50' />

            {
                otpRes &&
                <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit(sendOTP)}>

                    {/* for password */}
                    <label>
                        <div className='input-field flex items-center'>
                            <input
                                {...register(
                                    'password',
                                    {
                                        required: { value: true, message: 'Required!' },
                                        minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, message: 'Password must contain at least one letter, one number and one special character' }
                                    }
                                )}
                                type={`${showPassword ? 'text' : 'password'}`}
                                placeholder='New Password'
                                className='outline-none w-full'
                                spellCheck="false"
                                autoComplete='off'
                            />

                            {
                                showPassword
                                    ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="eye" viewBox="0 0 16 16" onClick={() => { setShowPassword(false) }}>
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="eye-slash" viewBox="0 0 16 16" onClick={() => { setShowPassword(true) }}>
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                            }



                        </div>
                        {errors.password && <span className='error'>{errors.password.message}</span>}
                    </label>

                    {/* for OTP */}
                    <label>

                        <input
                            {...register(
                                'otp',
                                {
                                    required: { value: true, message: 'Required!' },
                                    pattern: { value: /[0-9]{5}$/, message: 'OTP must be 5 digits' }
                                }
                            )}
                            type="text"
                            inputMode='numeric'
                            maxLength={5}
                            placeholder='OTP'
                            className='input-field'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // remove non-numeric
                            }}

                        />
                        {errors.otp && <span className='error'>{errors.otp.message}</span>}
                    </label>

                    <button className={`btn w-full ${isSubmitting && 'opacity-50'}`} type='submit' disabled={isSubmitting} onClick={() => clearErrors("invalidCredentials")} >Submit</button>
                    {errors.invalidCredentials && <span className='error'>{errors.invalidCredentials.message}</span>}
                </form>
            }

        </div>
    )
}

export default ResetPassword