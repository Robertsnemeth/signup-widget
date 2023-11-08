"use client"
import Image from 'next/image';
import Success from '../../public/images/icon-success.svg';


const SuccessPage = ({
    email,
    handleDismiss
}) => {
  return (
    <main className='bg-white min-h-screen w-full flex flex-col p-8 items-start justify-between'>
        <section className="w-[375px] p-4 text-black font-bold flex flex-col gap-8 mt-36">
        <Image src={Success} alt="header" width={100} height={100} />
            <h1 className="text-4xl font-bold text-dark-slate-grey">Thanks for subscribing!</h1>
            <p className='text-[16px]'>A confirmation email has been sent to {email}. Please open it and click the button inside to confirm your subscription.</p>
        </section>
        <button onClick={() => handleDismiss()} className='bg-neutral-dark-slate-grey text-white rounded w-full h-12 hover:bg-primary-tomato self-baseline'>Dismiss notification</button>
    </main>   )
}

export default SuccessPage