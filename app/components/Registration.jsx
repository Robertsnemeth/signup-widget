"use client"
import { Router } from 'next/router';
import {  useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Registration = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setSuccess
}) => {

    const [ passError, setPassError ] = useState(false);
    const [ error, setError ] = useState(false);

    const router = useRouter();
    
    useEffect(() => {
        validatePassword(password, confirmPassword);
        }, [password, confirmPassword]);
        
        function validatePassword(pass, confirmPass) {
            let isValid = confirmPass === pass;
            if (!isValid) {
            setPassError(true);
            } else {
            setPassError(false);
            }
        }
        
        async function handleSubmit(e) {
            e.preventDefault();
            if(!EMAIL_REGEX.test(email)) {
            setError(true);
            return;
            } 
            const userData = {
            name,
            email,
            password,
            };
            console.log(userData, "userData")
            // Make call to backend to create user
            const res = await fetch("http://localhost:3000/api/user/create", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }, 
            })
            if (res.ok) {
            const data = await res.json();
            router.push("/success");
            console.log(data, "data")
            // registration success
            } else {
            console.log("registration failed")
            //registration faled
            }
        }
        
        const handleName = (e) => {
            console.log(name);
            setName(e.target.value)
        }
        
        const handleEmail = (e) => {
            console.log(email);
            setEmail(e.target.value)
        }
        
        const handlePassword = (e) => {
            console.log(password);
            setPassword(e.target.value)
        }
        
        const handleConfirmPassword = (e) => {
            console.log(confirmPassword);
            setConfirmPassword(e.target.value)
        }
    

    return (
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='name' className='text-sm font-bold'>Name</label>
            <input onChange={handleName} name="name" value={name} type="text" placeholder="Name" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`} required/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
            {error && <p className='text-xs text-primary-tomato'>Please enter a valid email address</p>}
            <input onChange={handleEmail} name="email" value={email} type="email" placeholder="email@company.com" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`}/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='password' className='text-sm font-bold'>Password</label>
            <input onChange={handlePassword} name="password" value={password} type="password" placeholder="Password" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`} required/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='confirmPassword' className='text-sm font-bold'>Confirm Password</label>
            {passError && <p className='text-xs text-primary-tomato'>Passwords do not match</p>}
            <input onChange={handleConfirmPassword} name="confirmPassword" value={confirmPassword} type="password" placeholder="Confirm Password" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`} required/>
        </div>
        <button className='bg-neutral-dark-slate-grey text-white rounded w-full h-12 hover:bg-primary-tomato'>Sign Up</button>
        </form>  )
}

export default Registration