import Navbar from "./components/Navbar"
import { Login } from "./pages/Login"

function App() {

  return (
    <div >
      <Navbar/>
      <div className="min-h-screen min-w-screen flex justify-center items-center"> 
     <Login></Login>
     </div>
    </div>
  )
}

export default App
