import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { MessagesContainer } from '../../components/MessagesContainer'
import { NotFound } from '../../pages/NotFound'
import { AboutPomodoro } from '../../pages/AboutPomodoro'
import { Home } from '../../pages/Home'
import { useEffect } from 'react'
import { History } from '../../pages/History'
import { Settings } from '../../pages/Settings'

const ScrollTop = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo({top: 0})

  }, [pathname])
  return null
}

export const MainRouter = () => {
  return (
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about-pomodoro" element={<AboutPomodoro/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/settings" element={<Settings/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <MessagesContainer/>
       <ScrollTop/>
      </BrowserRouter>
  )
}
