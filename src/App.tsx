// ============= App.tsx =============
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import Ofertas from "@/pages/Ofertas";
import Carrito from "@/pages/Carrito";
import Productos from "@/pages/Productos";
import Favoritos from "@/pages/Favoritos";
import MisCompras from "@/pages/MisCompras";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Header /> {/* Header aquí - aparece en TODAS las páginas */}
        
        <main className="flex-1">
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
            <Route path="/rastrear" element={<div className="p-8">Rastrear Pedido</div>} />
            <Route path="/cuenta" element={<div className="p-8">Mi Cuenta</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

