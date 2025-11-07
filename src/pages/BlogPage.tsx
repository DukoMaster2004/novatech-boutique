// ============= BLOG PAGE =============
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Tecnología", "Tutorial", "Noticias", "Reseñas"];

  const blogPosts = [
    {
      id: 1,
      title: "Guía Completa: iPhone 15 Pro Max",
      excerpt: "Descubre todas las características y mejoras del nuevo iPhone 15 Pro Max. Una guía detallada para aprovechar al máximo tu dispositivo.",
      category: "Reseñas",
      author: "Juan Pérez",
      date: "2024-01-15",
      image: "https://www.preciosadictos.com/blog/wp-content/uploads/2025/05/Los-colores-del-iPhone-15-Pro_-guia-para-elegir-con-acierto.webp",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Los Mejores Accesorios para MacBook",
      excerpt: "Conoce los accesorios más útiles y productivos para tu MacBook. Desde soportes hasta docks de carga rápida.",
      category: "Tutorial",
      author: "María García",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=400&fit=crop",
      readTime: "6 min"
    },
    {
      id: 3,
      title: "Apple Watch Series 9: Todo lo que necesitas saber",
      excerpt: "Análisis profundo del Apple Watch Series 9. Salud, fitness, diseño y precio. ¿Vale la pena actualizar?",
      category: "Reseñas",
      author: "Carlos López",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      readTime: "7 min"
    },
    {
      id: 4,
      title: "Noticias: Nuevos iPad Arrives en Perú",
      excerpt: "Los últimos iPad de Apple ya están disponibles en Perú. Conoce los precios, especificaciones y cómo pre-ordenar.",
      category: "Noticias",
      author: "Ana Martínez",
      date: "2024-01-08",
      image: "https://gestion.pe/resizer/1NAFenwLhP2u22bf-9J0twgKRFE=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BX3RDPWKDZD7NMJ4WB2WIL56KA.jpg",
      readTime: "5 min"
    },
    {
      id: 5,
      title: "Tutorial: Configuración Inicial de AirPods Pro",
      excerpt: "Guía paso a paso para configurar correctamente tus AirPods Pro. Sincronización, ruido activo y más.",
      category: "Tutorial",
      author: "Roberto Díaz",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=400&fit=crop",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Tecnología 5G: ¿Cómo aprovecha iPhone?",
      excerpt: "Explora cómo el iPhone utiliza la tecnología 5G. Velocidades, consumo de batería y aplicaciones que lo usan.",
      category: "Tecnología",
      author: "Laura Fernández",
      date: "2024-01-02",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
      readTime: "9 min"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog NovaTech</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Descubre artículos, tutoriales y noticias sobre tecnología Apple
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-secondary/30 py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-background border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="group rounded-2xl overflow-hidden border border-border hover:border-primary bg-background hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <span className="ml-auto">{post.readTime}</span>
                      </div>

                      {/* Read More Button */}
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                      >
                        Leer más <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron artículos</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
