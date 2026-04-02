'use client'

import React from 'react'
import LandingImg from '../assets/landing-page.avif'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";

const HomeSection = () => {

  // ✅ Hook must be here (inside component, top-level)
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#D2DCB6] to-[#A1BC98] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between">

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Your Appointment System
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Easily manage appointments, track projects, and stay on top of your schedule with our intuitive platform.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/get-started")}
              className="bg-white text-[#778873] font-semibold px-6 py-3 rounded-lg shadow-lg
                         hover:bg-gray-100 hover:scale-105 transition duration-300
                         flex items-center gap-2"
            >
              Get Started <ArrowRightIcon className="w-5 h-5" />
            </button>

            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#778873] duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src={LandingImg}
            alt="Appointment Illustration"
            className="w-full max-w-2xl"
          />
        </div>

      </div>
    </section>
  )
}

export default HomeSection
