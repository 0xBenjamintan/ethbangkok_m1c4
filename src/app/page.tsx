'use client'

import LandingPage from "@/components/landingpage"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MainPage from "@/components/mainpage"


export default function Home() {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <MainPage/>
      <Footer/>
    </div>
  )
}