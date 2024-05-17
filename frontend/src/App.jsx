import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewStory from "./pages/NewStory";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-story" element={<NewStory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App