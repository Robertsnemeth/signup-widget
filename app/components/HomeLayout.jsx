"use client"
import Image from 'next/image';
import { useState } from 'react';
import List from '../../public/images/icon-list.svg'
import MobileSigunup from '../../public/images/illustration-sign-up-mobile.svg';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
import Registration from './Registration';
import Login from './Login';

const HomeLayout = () => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ login, setLogin ] = useState(false);

  return (
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
            </section>{login ? 
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                /> 
              :
              <Registration 
              name={name} 
              setName={setName} 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              confirmPassword={confirmPassword} 
              setConfirmPassword={setConfirmPassword}
              />
            }
          {login ? 
            <button onClick={() => setLogin(false)} className="border border-gray-400 p-2 rounded">Register</button>
            :
            <button onClick={() => setLogin(true)} className="border border-gray-400 p-2 rounded">Sign In</button>}
          </section>
    </main> 
    )
}

export default HomeLayout;