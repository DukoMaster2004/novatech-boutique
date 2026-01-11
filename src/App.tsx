import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import Ofertas from "@/pages/Ofertas";
import Carrito from "@/pages/Carrito";
import Productos from "@/pages/Productos";
import Favoritos from "@/pages/Favoritos";
import MisCompras from "@/pages/MisCompras";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    
    // Aplicar clase al documento
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header /> {/* Header aquí - aparece en TODAS las páginas */}
        
        <main className="flex-1 bg-background">
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:categoria" element={<Productos />} />
            
            {/* Blog y Contacto */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            
            {/* Otras rutas */}
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/mis-compras" element={<MisCompras />} />
            <Route path="/rastrear" element={<div className="p-8 text-foreground">Rastrear Pedido</div>} />
            <Route path="/cuenta" element={<div className="p-8 text-foreground">Mi Cuenta</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;