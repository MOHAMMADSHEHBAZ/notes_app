import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useDispatch } from "react-redux"
import {login, logout} from './store/authSlice'
import authService from "./appWrite/auth/auth"
import React from "react"

function App() {

  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()

  React.useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading? (
    <>
      <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </>
  ) :null
}

export default App
