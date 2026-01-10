import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Tecnología", "Tutorial", "Noticias", "Reseñas"];

  const blogPosts = [
    {
      id: 1,
      title: "Guía Completa: iPhone 15 Pro Max",
      excerpt: "Descubre todas las características y mejoras del nuevo iPhone 15 Pro Max.",
      category: "Reseñas",
      author: "Juan Pérez",
      date: "2024-01-15",
      image: "https://www.preciosadictos.com/blog/wp-content/uploads/2025/05/Los-colores-del-iPhone-15-Pro_-guia-para-elegir-con-acierto.webp",
      readTime: "8 min",
      content: "El iPhone 15 Pro Max es el smartphone más avanzado de Apple. Incluye el chip A17 Pro, cámara mejorada de 48MP, pantalla Super Retina XDR y más. Perfecta para profesionales que necesitan lo mejor."
    },
    {
      id: 2,
      title: "Los Mejores Accesorios para MacBook",
      excerpt: "Conoce los accesorios más útiles y productivos para tu MacBook.",
      category: "Tutorial",
      author: "María García",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "Los accesorios pueden mejorar significativamente tu experiencia con MacBook. Recomendamos un soporte de aluminio, dock Thunderbolt, Magic Trackpad y cables USB-C."
    },
    {
      id: 3,
      title: "Apple Watch Series 9: Todo lo que necesitas saber",
      excerpt: "Análisis profundo del Apple Watch Series 9. Salud, fitness, diseño y precio.",
      category: "Reseñas",
      author: "Carlos López",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "El Apple Watch Series 9 ofrece nuevas características de salud, pantalla siempre encendida mejorada y mejor autonomía."
    },
    {
      id: 4,
      title: "Noticias: Nuevos iPad Arrivals en Perú",
      excerpt: "Los últimos iPad de Apple ya están disponibles en Perú.",
      category: "Noticias",
      author: "Ana Martínez",
      date: "2024-01-08",
      image: "https://gestion.pe/resizer/1NAFenwLhP2u22bf-9J0twgKRFE=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BX3RDPWKDZD7NMJ4WB2WIL56KA.jpg",
      readTime: "5 min",
      content: "Apple ha anunciado la disponibilidad de los nuevos iPad Pro y iPad Air en Perú. Los precios comienzan desde S/ 1,299."
    },
    {
      id: 5,
      title: "Tutorial: Configuración Inicial de AirPods Pro",
      excerpt: "Guía paso a paso para configurar correctamente tus AirPods Pro.",
      category: "Tutorial",
      author: "Roberto Díaz",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=400&fit=crop",
      readTime: "4 min",
      content: "Configurar AirPods Pro es simple. Abre el estuche de carga y acerca los AirPods a tu iPhone."
    },
    {
      id: 6,
      title: "Tecnología 5G: ¿Cómo aprovecha iPhone?",
      excerpt: "Explora cómo el iPhone utiliza la tecnología 5G.",
      category: "Tecnología",
      author: "Laura Fernández",
      date: "2024-01-02",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
      readTime: "9 min",
      content: "El 5G permite velocidades de descarga hasta 20 veces más rápidas que 4G. Los iPhone soportan 5G desde el iPhone 12."
    },
    {
      id: 7,
      title: "MacBook Air vs Pro: ¿Cuál elegir?",
      excerpt: "Comparativa detallada entre MacBook Air y MacBook Pro.",
      category: "Reseñas",
      author: "Juan Pérez",
      date: "2023-12-30",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop",
      readTime: "10 min",
      content: "MacBook Air es ideal para estudiantes. MacBook Pro es mejor para profesionales. Ambos tienen chip M3."
    },
    {
      id: 8,
      title: "Los Secretos de la Fotografía con iPhone",
      excerpt: "Tips y trucos para mejorar tus fotos con iPhone.",
      category: "Tutorial",
      author: "María García",
      date: "2023-12-28",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "La cámara del iPhone es poderosa. Usa regla de tercios, aprovecha luz natural y experimenta con modos."
    },
    {
      id: 9,
      title: "Noticias: Apple anuncia nuevas características de IA",
      excerpt: "Apple integra inteligencia artificial avanzada en sus dispositivos.",
      category: "Noticias",
      author: "Carlos López",
      date: "2023-12-25",
      image: "https://images.unsplash.com/photo-1677442d019cecf8b13f1d3ee46e763c985b2d0b?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "Apple ha anunciado nuevas características de IA en iOS, macOS y watchOS."
    },
    {
      id: 10,
      title: "Tutorial: Backup y Sincronización en iCloud",
      excerpt: "Aprende a hacer backup automático de tus datos en iCloud.",
      category: "Tutorial",
      author: "Ana Martínez",
      date: "2023-12-22",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=400&fit=crop",
      readTime: "5 min",
      content: "iCloud sincroniza automáticamente tus datos en todos los dispositivos Apple."
    },
    {
      id: 11,
      title: "HomePod Mini: Tu asistente inteligente",
      excerpt: "Descubre todo lo que HomePod Mini puede hacer.",
      category: "Reseñas",
      author: "Roberto Díaz",
      date: "2023-12-20",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "HomePod Mini es un altavoz inteligente compacto que controla tu hogar."
    },
    {
      id: 12,
      title: "Comparativa: Apple Watch vs Otros Smartwatches",
      excerpt: "¿Es Apple Watch el mejor smartwatch del mercado?",
      category: "Reseñas",
      author: "Laura Fernández",
      date: "2023-12-18",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      readTime: "8 min",
      content: "Apple Watch destaca por su integración con iPhone y características de salud."
    },
    {
      id: 13,
      title: "Tecnología ProMotion: Pantallas fluidas",
      excerpt: "Entende la tecnología ProMotion de 120Hz en iPad y Mac.",
      category: "Tecnología",
      author: "Juan Pérez",
      date: "2023-12-15",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "ProMotion ajusta dinámicamente la tasa de refresco hasta 120Hz según el contenido."
    },
    {
      id: 14,
      title: "Tutorial: Uso avanzado de Siri en iPhone",
      excerpt: "Descubre comandos de Siri avanzados para automatizar tareas.",
      category: "Tutorial",
      author: "María García",
      date: "2023-12-12",
      image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "Usa la app Atajos para crear automatizaciones personalizadas con Siri."
    },
    {
      id: 15,
      title: "Noticias: iOS 18 llegará este año",
      excerpt: "Apple anuncia iOS 18 con nuevas características y mejoras.",
      category: "Noticias",
      author: "Carlos López",
      date: "2023-12-10",
      image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?w=800&h=400&fit=crop",
      readTime: "4 min",
      content: "iOS 18 incluirá mejoras en IA y personalización de pantalla."
    },
    {
      id: 16,
      title: "AirTags: Rastrear tus objetos",
      excerpt: "Aprende a usar AirTags para encontrar objetos perdidos.",
      category: "Tutorial",
      author: "Ana Martínez",
      date: "2023-12-08",
      image: "https://images.unsplash.com/photo-1599009690095-40196cf0bbb4?w=800&h=400&fit=crop",
      readTime: "5 min",
      content: "AirTags pequeños se adhieren a tus objetos valiosos. Usa Find My para localizarlos."
    },
    {
      id: 17,
      title: "MagSafe: La revolución de la carga inalámbrica",
      excerpt: "Todo lo que necesitas saber sobre MagSafe.",
      category: "Tecnología",
      author: "Roberto Díaz",
      date: "2023-12-05",
      image: "https://images.unsplash.com/photo-1609042369518-5f1e1faa4e91?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "MagSafe utiliza imanes para alineación perfecta y carga rápida."
    },
    {
      id: 18,
      title: "Reseña: iPad Pro 12.9 M2 - Productividad total",
      excerpt: "iPad Pro 12.9 con chip M2 es un computador portátil completo.",
      category: "Reseñas",
      author: "Laura Fernández",
      date: "2023-12-02",
      image: "https://images.unsplash.com/photo-1544244015-0df4abda50e0?w=800&h=400&fit=crop",
      readTime: "8 min",
      content: "iPad Pro 12.9 M2 con pantalla 120Hz es ideal para creadores."
    },
    {
      id: 19,
      title: "Noticias: Apple Store abre nueva tienda en Lima",
      excerpt: "La nueva tienda Apple Store en Lima cuenta con servicio premium.",
      category: "Noticias",
      author: "Juan Pérez",
      date: "2023-11-30",
      image: "https://images.unsplash.com/photo-1614008375577-239a585aba0f?w=800&h=400&fit=crop",
      readTime: "3 min",
      content: "Apple abre una nueva tienda en el centro comercial líder de Lima."
    },
    {
      id: 20,
      title: "Tutorial: Edición de video profesional en iPad",
      excerpt: "Aprende a editar videos profesionales en iPad con Final Cut Pro.",
      category: "Tutorial",
      author: "María García",
      date: "2023-11-28",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop",
      readTime: "9 min",
      content: "Final Cut Pro en iPad ofrece herramientas de edición profesionales."
    },
    {
      id: 21,
      title: "Tecnología Lightning vs USB-C en Apple",
      excerpt: "¿Por qué Apple cambió a USB-C? Ventajas y compatibilidad.",
      category: "Tecnología",
      author: "Carlos López",
      date: "2023-11-25",
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "USB-C es reversible, más rápido y universal. iPhone 15 cambió a USB-C."
    },
    {
      id: 22,
      title: "Reseña: Mac Mini M3 - Poder compacto",
      excerpt: "Mac Mini con chip M3 ofrece rendimiento de escritorio en tamaño pequeño.",
      category: "Reseñas",
      author: "Ana Martínez",
      date: "2023-11-22",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "Mac Mini M3 es perfecto para espacios pequeños. Bajo consumo de energía."
    },
    {
      id: 23,
      title: "Tutorial: Seguridad en iPhone - Protege tus datos",
      excerpt: "Medidas de seguridad esenciales para proteger tu iPhone.",
      category: "Tutorial",
      author: "Roberto Díaz",
      date: "2023-11-20",
      image: "https://images.unsplash.com/photo-1633356713697-0e8e858eab48?w=800&h=400&fit=crop",
      readTime: "6 min",
      content: "Habilita Face ID, usa contraseñas fuertes y activa autenticación de dos factores."
    },
    {
      id: 24,
      title: "Noticias: Apple Vision Pro disponible en Perú",
      excerpt: "Apple Vision Pro, el dispositivo de realidad aumentada, ya está disponible.",
      category: "Noticias",
      author: "Laura Fernández",
      date: "2023-11-18",
      image: "https://images.unsplash.com/photo-1617638924702-92f37fcb0f6d?w=800&h=400&fit=crop",
      readTime: "5 min",
      content: "Vision Pro es el primer dispositivo spatial computing de Apple."
    },
    {
      id: 25,
      title: "Comparativa: iPhone 15 vs iPhone 14",
      excerpt: "Diferencias clave entre iPhone 15 y 14. ¿Vale la pena actualizar?",
      category: "Reseñas",
      author: "Juan Pérez",
      date: "2023-11-15",
      image: "https://images.unsplash.com/photo-1592286927505-1fed6258583d?w=800&h=400&fit=crop",
      readTime: "7 min",
      content: "iPhone 15 introduce chip A17 Pro, cámara de 48MP y USB-C."
    },
    {
      id: 26,
      title: "Tutorial: Usando Focus en iPhone para productividad",
      excerpt: "Configura Focus personalizado para diferentes momentos del día.",
      category: "Tutorial",
      author: "María García",
      date: "2023-11-12",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=400&fit=crop",
      readTime: "5 min",
      content: "Focus permite crear modos personalizados que controlan notificaciones."
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Post Detail View
  if (postId) {
    const post = blogPosts.find(p => p.id === parseInt(postId));
    
    if (!post) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</p>
            <Button onClick={() => navigate("/blog")} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Volver al blog
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-8">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-white mb-6 hover:gap-3 transition-all"
            >
              <ChevronLeft className="h-5 w-5" /> Volver al blog
            </button>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-purple-100">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('es-ES')}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 max-w-3xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold mb-6">
            {post.category}
          </div>
          <p className="text-lg text-foreground leading-relaxed mb-6">
            {post.content}
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Este artículo proporciona información valiosa sobre {post.title.toLowerCase()}. 
            Continúa siguiendo nuestro blog para más contenido de calidad.
          </p>

          <div className="mt-12 p-6 bg-secondary/50 border border-border rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Sobre el autor</h3>
            <p className="text-muted-foreground mb-4">
              {post.author} es un experto en tecnología con años de experiencia analizando productos Apple.
            </p>
            <Button onClick={() => navigate("/blog")} variant="outline">
              Ver más artículos
            </Button>
          </div>
        </article>
      </div>
    );
  }

  // Blog List View
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog NovaTech</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Descubre artículos, tutoriales y noticias sobre tecnología Apple
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6 text-center">
                Mostrando {filteredPosts.length} de {blogPosts.length} artículos
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <article
                    key={post.id}
                    className="group rounded-2xl overflow-hidden border border-border hover:border-primary bg-background hover:shadow-xl transition-all duration-300"
                  >
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

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

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

                        <button
                          onClick={() => navigate(`/blog/${post.id}`)}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                        >
                          Leer más <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
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