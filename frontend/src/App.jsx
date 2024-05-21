import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewStory from "./pages/NewStory";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Story from "./components/Story";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate replace to='/sign-in' />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to='/sign-in' />} />
        <Route path="/new-story" element={user ? <NewStory /> : <Navigate replace to='/sign-in' />} />
        <Route path="/sign-up" element={user ? <Navigate replace to='/' /> : <SignUp />} />
        <Route path="/sign-in" element={user ? <Navigate replace to='/' /> : <SignIn />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App