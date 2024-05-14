import React from 'react'
import { Icons } from '@/components/icons'


const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Icons.loader  className="w-[48px] h-[48px] object-contain animate-spin text-white"/>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">Transaction is in progress <br /> Please wait...</p>
    </div>
  )
}

export default Loader