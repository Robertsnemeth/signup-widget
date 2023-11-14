"use client"
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Login = ({
    email,
    setEmail,
    password,
    setPassword,
}) => {

    const [ error, setError ] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/success";

     async function handleSubmit(e) {
        e.preventDefault();
        if(!EMAIL_REGEX.test(email)) {
            setError(true);
            return;
            } 
            try {        
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl,
            });
            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError(true);
            }
            } catch (error) {
            console.log(error);
            setError(true);
            }
        };

    const handleEmail = (e) => {
        console.log(email);
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        console.log(password);
        setPassword(e.target.value)
    }

  return (
    <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
    <div className='flex flex-col gap-2 w-full'>
        <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
        {error && <p className='text-xs text-primary-tomato'>Invalid Email or Password</p>}
        <input onChange={handleEmail} name="email" value={email} type="email" placeholder="email@company.com" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`}/>
    </div>
    <div className='flex flex-col gap-2 w-full'>
        <label htmlFor='password' className='text-sm font-bold'>Password</label>
        <input onChange={handlePassword} name="password" value={password} type="password" placeholder="Password" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`} required/>
    </div>
    <button className='bg-neutral-dark-slate-grey text-white rounded w-full h-12 hover:bg-primary-tomato'>Sign In</button>
    </form>    )
}

export default Login