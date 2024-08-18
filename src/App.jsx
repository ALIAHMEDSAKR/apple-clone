import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
//import Model from "./components/Model"
import Features from "./components/Features";
import Howitworks from "./components/Howitworks";
import Footer from "./components/Footer";
function App() {
  
  return (
    <main className="bg-black">
      <Navbar />
          <Hero />
          <Highlights /> 
          <Features />
        <Howitworks />

    </main>
  )
}

export default App;
