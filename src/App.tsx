/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Laptop, 
  MapPin, 
  TrendingUp, 
  ShoppingCart, 
  MessageCircle, 
  ArrowRight, 
  Instagram, 
  Linkedin,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  whatsappMsg: string;
}

// --- Constants ---
const WHATSAPP_NUMBER = "5515981723627";
const SERVICES: Service[] = [
  {
    title: "Sitios Web Profesionales",
    description: "WordPress de alto rendimiento con autogestión total. Velocidad y diseño que convierten visitas en dinero.",
    icon: <Laptop className="w-10 h-10" />,
    color: "text-[#FF0099]",
    whatsappMsg: "Hola, quiero información sobre Sitios Web"
  },
  {
    title: "Google Mi Negocio",
    description: "Aparece en el mapa local antes que nadie. Optimizamos tu ficha para que te llamen a ti y no a ellos.",
    icon: <MapPin className="w-10 h-10" />,
    color: "text-[#00E5FF]",
    whatsappMsg: "Hola, quiero información sobre Google Business"
  },
  {
    title: "Consultoría SEO",
    description: "Estrategia de posicionamiento real. No solo tráfico, sino visibilidad estratégica donde están tus clientes.",
    icon: <TrendingUp className="w-10 h-10" />,
    color: "text-[#FFD600]",
    whatsappMsg: "Hola, quiero información sobre SEO"
  },
  {
    title: "Tiendas Online",
    description: "E-commerce completo. Tu catálogo disponible 24/7 con pasarelas de pago seguras y gestión de stock.",
    icon: <ShoppingCart className="w-10 h-10" />,
    color: "text-[#9B30FF]",
    whatsappMsg: "Hola, quiero información sobre Tiendas Online"
  }
];

// --- Components ---

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string; opacity: number }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: Math.random() > 0.5 ? '#FF0099' : '#00E5FF',
          opacity: Math.random() * 0.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = (msg: string = "") => {
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#080808] text-white font-sans selection:bg-[#FF0099] selection:text-white">
      <ParticleBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0099] to-[#00E5FF] z-[1100] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-400 px-[5%] ${isScrolled ? 'bg-[#080808]/95 backdrop-blur-md py-4 border-b border-[#2A2A2A]' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-['Barlow_Condensed'] text-3xl font-black uppercase tracking-tighter">
            Impulso<span className="text-[#FF0099]">IT</span>
          </a>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#servicios" className="text-sm font-semibold uppercase tracking-widest hover:text-[#FF0099] transition-colors">Servicios</a>
            <a href="#urgencia" className="text-sm font-semibold uppercase tracking-widest hover:text-[#FF0099] transition-colors">Urgencia</a>
            <a href="#contacto" className="text-sm font-semibold uppercase tracking-widest hover:text-[#FF0099] transition-colors">Contacto</a>
            <button 
              onClick={() => openWhatsApp("Hola, quiero mi sitio web con ImpulsoIT")}
              className="bg-[#FF0099] text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,153,0.5)] hover:scale-105 transition-transform"
            >
              Quiero Mi Sitio Ahora
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => openWhatsApp()}>
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,0,153,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(0,229,255,0.10)_0%,transparent_60%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-5xl"
        >
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-8xl font-black uppercase leading-[0.95] mb-6">
            ¿TU NEGOCIO EXISTE EN INTERNET? <br />
            <span className="bg-gradient-to-r from-[#FF0099] to-[#00E5FF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,0,153,0.6)]">
              SI NO APARECES EN GOOGLE, NO EXISTES.
            </span>
          </h1>
          <div className="mb-8 inline-block bg-[#FF0099]/10 border border-[#FF0099]/30 px-6 py-2 rounded-lg">
            <p className="text-[#FF0099] font-bold text-xl md:text-2xl uppercase tracking-tighter">
              Planes Profesionales desde <span className="text-white text-3xl md:text-4xl ml-2">$599.000 ARS</span>
            </p>
          </div>
          <p className="text-lg md:text-xl text-[#AAAAAA] max-w-3xl mx-auto mb-10">
            Llevamos tu negocio al mundo digital en tiempo récord. Sitios web de alto rendimiento, posicionamiento estratégico y ventas online — todo bajo una misma orquestación técnica.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF0099] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest shadow-[0_0_35px_rgba(255,0,153,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(255,0,153,0.7)] transition-all"
            >
              Ver Servicios y Planes
            </button>
            <button 
              onClick={() => openWhatsApp("Hola, quiero información sobre los planes de ImpulsoIT")}
              className="border border-[#FF0099] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#FF0099]/10 hover:shadow-[0_0_20px_rgba(255,0,153,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Hablar con un Experto
            </button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#AAAAAA]"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-[#0D0D0D] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-['Barlow_Condensed'] text-5xl md:text-7xl font-extrabold uppercase mb-4">
              ORQUESTACIÓN DE <span className="bg-gradient-to-r from-[#FF0099] to-[#00E5FF] bg-clip-text text-transparent">NEGOCIOS CON IA</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF0099] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[#111111] border border-[#2A2A2A] p-10 rounded-xl hover:border-[#FF0099] hover:shadow-[0_0_25px_rgba(255,0,153,0.3)] transition-all group cursor-pointer"
                onClick={() => openWhatsApp(service.whatsappMsg)}
              >
                <div className={`${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase mb-4">{service.title}</h3>
                <p className="text-[#AAAAAA] mb-6 leading-relaxed">{service.description}</p>
                <span className="text-sm font-bold uppercase tracking-widest border-b border-[#FF0099] pb-1 group-hover:text-[#FF0099] transition-colors">
                  Consultar Ahora
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section id="urgencia" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-3xl overflow-hidden text-center border border-transparent bg-gradient-to-br from-[#FF0099] to-[#00E5FF] p-[1px]"
          >
            <div className="bg-[#111] rounded-[calc(1.5rem-1px)] p-12 md:p-20">
              <h2 className="font-['Barlow_Condensed'] text-4xl md:text-6xl font-black uppercase mb-6">
                SI TU NEGOCIO NO ESTÁ <span className="bg-gradient-to-r from-[#FF0099] to-[#00E5FF] bg-clip-text text-transparent">EN GOOGLE HOY</span>
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Tus competidores están robando tus clientes AHORA MISMO. Cada día sin presencia digital es dinero que estás perdiendo. La transformación no es opcional, es supervivencia.
              </p>
              <button 
                onClick={() => openWhatsApp("Hola, quiero una consulta gratuita")}
                className="bg-[#FF0099] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest shadow-[0_0_35px_rgba(255,0,153,0.5)] hover:scale-105 transition-all"
              >
                Consulta Gratuita AHORA
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-[#050505] py-20 px-6 border-t border-[#2A2A2A] relative z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <a href="#" className="font-['Barlow_Condensed'] text-4xl font-black uppercase tracking-tighter mb-4 inline-block">
            Impulso<span className="text-[#FF0099]">IT</span>
          </a>
          <p className="text-[#AAAAAA] mb-8">Acelerando el futuro de los negocios locales.</p>
          
          <div className="flex justify-center gap-6 mb-12">
            <button onClick={() => openWhatsApp()} className="text-white hover:text-[#FF0099] transition-colors">
              <MessageCircle className="w-8 h-8" />
            </button>
            <a href="#" className="text-white hover:text-[#FF0099] transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="#" className="text-white hover:text-[#FF0099] transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
          
          <p className="text-xs text-[#555] uppercase tracking-widest">
            © 2024 ImpulsoIT. All rights reserved. Powered by Innovation.
          </p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <button 
        onClick={() => openWhatsApp()}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.6)] z-[9999] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
