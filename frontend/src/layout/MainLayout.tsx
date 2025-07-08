import Navbar from "@/components/Navbar"
import { Login } from "@/pages/Login"
import HeroSection from "@/pages/student/HeroSection"
import {Outlet} from 'react-router-dom'
const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
