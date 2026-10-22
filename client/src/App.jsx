import { Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { Footer } from "./components/Footer";

// The one-page portfolio, shown at "/"
function HomePage() {
  return (
    <>
      <Hero />
      <Gallery />
      <About />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login mode="login" />} />
          <Route path="/signup" element={<Login mode="signup" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
