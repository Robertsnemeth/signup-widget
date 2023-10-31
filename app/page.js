"use client"
import Image from 'next/image';
import { useState, useRef } from 'react';
import List from '../public/images/icon-list.svg'
import Success from '../public/images/icon-success.svg';
import MobileSigunup from '../public/images/illustration-sign-up-mobile.svg';
import DesktopSignup from '../public/images/illustration-sign-up-desktop.svg';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function Home() {

  const [ email, setEmail ] = useState('');
  const [ success, setSuccess ] = useState(true);
  const [ error, setError ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!EMAIL_REGEX.test(email)) {
      setError(true);
      return;
    } 
    setSuccess(true);
    setError(false);
  }
  
  const handleEmail = (e) => {
    console.log(email);
    setEmail(e.target.value)
  }

  const handleDismiss = () => {
    setSuccess(false);
    setEmail('');
  }

  return (
    <>
    {success ? 
      <main className='bg-white min-h-screen min-w-screen flex flex-col p-8 items-start justify-between'>
        <section className="w-[375px] p-4 text-black font-bold flex flex-col gap-8 mt-36">
          <Image src={Success} alt="header" width={100} height={100} />
          <h1 className="text-4xl font-bold text-dark-slate-grey">Thanks for subscribing!</h1>
          <p className='text-[16px]'>A confirmation email has been sent to {email}. Please open it and click the button inside to confirm your subscription.</p>
        </section>
        <button onClick={() => handleDismiss()} className='bg-neutral-dark-slate-grey text-white rounded w-full h-12 hover:bg-primary-tomato self-baseline'>Dismiss notification</button>
      </main> 
      :
      <main className="flex min-h-screen min-w-screen flex-col items-start bg-white text-black">
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
                <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
                {error && <p className='text-xs text-primary-tomato'>Please enter a valid email address</p>}
                <input onChange={handleEmail} name="email" value={email} type="email" placeholder="email@company.com" className={`border border-neutral-charcaol-grey rounded w-full h-12 p-3`}/>
              </div>
              <button className='bg-neutral-dark-slate-grey text-white rounded w-full h-12 hover:bg-primary-tomato'>Subscribe to monthly newsletter</button>
            </form>
          </section>
    </main>}
        </>
  )
}
