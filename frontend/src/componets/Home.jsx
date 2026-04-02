'use client'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from "./Header";
import HomeSection from './HomeSection';

const Home = () => {
  return (
  <>
  <Header/>
  <HomeSection/>
  
  </>
  )
}

export default Home
