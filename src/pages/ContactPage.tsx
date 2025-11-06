

// ============= CONTACT PAGE =============
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envío de formulario
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Resetear mensaje después de 5 segundos
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@novatech.pe",
      detail: "Responderemos en 24 horas"
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "+51 (1) 234-5678",
      detail: "Lun - Vie, 9:00 - 18:00"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: "Lima, Perú",
      detail: "Av. Principal 123, Lima 15001"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            ¿Tienes preguntas? Nos encantaría saber de ti. Contáctanos hoy.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-background border border-border rounded-2xl p-8 text-center hover:border-primary transition-all hover:shadow-lg"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                  <p className="text-primary font-semibold text-lg mb-1">{info.value}</p>
                  <p className="text-muted-foreground text-sm">{info.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-background border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Envíanos un Mensaje</h2>
              <p className="text-muted-foreground mb-8">
                Completa el formulario y nos pondremos en contacto pronto.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">¡Mensaje enviado!</p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Gracias por contactarnos. Pronto recibirás una respuesta.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="+51 123 456 789"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Cuéntanos tu mensaje..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Preguntas Frecuentes</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "¿Cuál es el tiempo de entrega?",
                  a: "Entregamos dentro de 2-3 días hábiles en Lima y 5-7 días en el resto del país."
                },
                {
                  q: "¿Ofrecen garantía en los productos?",
                  a: "Sí, todos nuestros productos tienen garantía oficial de fábrica de 1 año."
                },
                {
                  q: "¿Aceptan devoluciones?",
                  a: "Sí, aceptamos devoluciones dentro de 30 días si el producto no cumple tus expectativas."
                },
                {
                  q: "¿Cuáles son los métodos de pago?",
                  a: "Aceptamos tarjetas de crédito, transferencias bancarias, efectivo contra entrega y billeteras digitales."
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-background border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-all"
                >
                  <summary className="flex items-start gap-3 font-semibold text-foreground">
                    <span className="text-lg group-open:text-primary transition-colors">+</span>
                    {faq.q}
                  </summary>
                  <p className="mt-4 text-muted-foreground ml-7">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;