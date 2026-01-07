'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();

    const router = useRouter();

    const onSignup = async (data) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const resData = await response.json();

        if (response.ok) {
            router.push('/auth/login');
        }
        else{
            setError('userExist', { message: resData.message });
        }

    }

    const handleGoogleLogin = async () =>{
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    }

    const handleGithubLogin = async () =>{
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    }

    return (
        <div className='w-full flex flex-col gap-8' >

            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit(onSignup)}>

                <label htmlFor="firstName">
                    First Name:
                    <input
                        {...register("firstName", {required: { value: true, message: "Required!" },minLength: { value: 3, message: "First name must be at least 3 characters long" } } )}
                        id='firstName'
                        type="text"
                        placeholder='First Name'
                        className='input-field'
                        spellCheck="false"
                        autoCorrect='off'
                    />
                    {errors.firstName && <span className='error'>{errors.firstName.message}</span>}

                </label>

                <label htmlFor="lastName">
                    Last Name:
                    <input
                        {...register("lastName", { required: { value: true, message: "Required!" }, minLength: { value: 3, message: "Last name must be at least 3 characters long" } })}
                        id='lastName'
                        type="text"
                        placeholder='Last Name'
                        className='input-field'
                        spellCheck="false"
                        autoCorrect='off'
                    />
                    {errors.lastName && <span className='error'>{errors.lastName.message}</span>}

                </label>

                <label htmlFor="email">
                    Email:
                    <input
                        {...register(
                            "email",
                            {
                                required: { value: true, message: "Required!" },
                                pattern: { value: /^[A-Z0-9_]+@[A-Z0-9._]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                            }
                        )}
                        id='email'
                        type="email"
                        placeholder='Email'
                        className='input-field'
                        spellCheck="false"
                        autoCorrect='off'
                    />
                    {errors.email && <span className='error'>{errors.email.message}</span>}

                </label>

                <label htmlFor="password">
                    Password:
                    <div className='input-field flex items-center'>
                        <input
                            {...register(
                                "password",
                                {
                                    required: { value: true, message: "Required!" },
                                    minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, message: "Password must contain at least one Uppercase, one lowercase, one number and one special character." }
                                }
                            )}
                            id='password'
                            type={`${showPassword ? 'text' : 'password'}`}
                            placeholder='Password'
                            className='outline-none w-full'
                            spellCheck="false"
                            autoComplete='off'
                            autoCorrect='off'
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

                <div className='mt-2'>

                    <button className={`btn w-full ${isSubmitting && "opacity-50"}`} type='submit' value="submit" disabled={isSubmitting} onClick={() =>clearErrors("userExist")}>Sign Up</button>
                    {
                        isSubmitting && <span className='text-xs'>Sending...</span>
                    }
                    {errors.userExist && <span className='error'>{errors.userExist.message}</span>}
                </div>

            </form>

            <div className='divider'>
                 <span className='mx-4'>OR</span> 
            </div>

            <div className='flex gap-5 justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={handleGoogleLogin}>
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer" viewBox="0 0 16 16" onClick={handleGithubLogin}>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
            </div>

            <hr className='opacity-50' />

            <div className='flex gap-1 text-sm'>
                <p>Already have an account?</p>
                <Link href="/auth/login" className='switch-btn'>Login</Link>
            </div>

        </div>
    )
}

export default SignUpPage