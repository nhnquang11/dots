import Footer from "./components/Footer"
import BlogSection from "./components/BlogSection"
const App = () => {
  return (
    <div className="bg-gray-50">
      <h1 className="font-serif text-3xl font-bold">
        Dots
      </h1>
      <p className="font-serif">A place where the mind dances.</p>
      <BlogSection />
      <Footer />
    </div>
  )
}

export default App