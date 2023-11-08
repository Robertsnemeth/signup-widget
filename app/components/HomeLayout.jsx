"use client"
import { useEffect } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import List from '../../public/images/icon-list.svg'
import MobileSigunup from '../../public/images/illustration-sign-up-mobile.svg';
import DesktopSignup from '../../public/images/illustration-sign-up-desktop.svg';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
import prisma from '../../lib/prisma';
import SuccessPage from './SuccessPage';
import axios from 'axios'

const HomeLayout = () => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ passError, setPassError ] = useState(false);
  const [ error, setError ] = useState(false);

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
      setSuccess(true);
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

  const handleDismiss = () => {
    setSuccess(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <>
    {success ? 
      <SuccessPage email={email} handleDismiss={handleDismiss} />
      :
      <main className="flex min-h-screen w-full flex-col items-start bg-white text-black">
          <Image src={MobileSigunup} alt="header" className="w-full h-1/3" />
          <section className='flex flex-col p-8 gap-10 items-start w-[375px]'>
            <h1 className="text-4xl font-bold text-dark-slate-grey">Stay Updated!</h1>
            <p className='text-[16px]'>Join 60,000+ products managers receiving monthly updates on.</p>
            <section className='flex flex-col gap-2'>
              <div className='flex gap-4 items-start'>
                <Image src={List} alt="list" className="" />
                <p className='text-[16px]'>Product discovery and building what matters</p>
              </div> 
              <div className='flex gap-4 items-start'>
                <Image src={List} alt="list" className="" />
                <p className='text-[16px]'>Measuring to ensure updates are a success</p>
              </div> 
              <div className='flex gap-4 items-start'>
                <Image src={List} alt="list" className="" />
                <p className='text-[16px]'>And much more!</p>
              </div>  
            </section>
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
            </form>
          </section>
    </main>}
        </>  )
}

export default HomeLayout;