import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Gallery />
      </main>
    </div>
  );
}

export default App;
