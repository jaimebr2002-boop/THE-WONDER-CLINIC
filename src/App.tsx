import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, MapPin, Phone, Instagram, Facebook, Clock, Plus, Star, Activity, Zap } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "" }: { target: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={counterRef}>{prefix}{count.toLocaleString('es-ES')}{suffix}</span>;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'El Método', href: '#el-metodo' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Instalaciones', href: '#instalaciones' },
    { name: 'Tecnología', href: '#tecnologia' },
    { name: 'Promos', href: '#promos' },
    { name: 'Equipo', href: '#equipo' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <div id="inicio" className="min-h-screen bg-black text-white font-body selection:bg-gold selection:text-black">
      
      {/* SECCIÓN 1: NAVBAR */}
      <header className={`sticky top-0 z-50 bg-black border-b border-gold h-20 flex items-center px-4 md:px-8 transition-shadow duration-300 ${hasScrolled ? 'shadow-[0_4px_20px_rgba(249,196,113,0.15)]' : ''}`}>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-wider uppercase text-white leading-none">
              THE WONDER CLINIC
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gold my-1" />
          <span className="font-body text-gray-400 text-xs md:text-sm leading-none">
            Crea músculo. Quema grasa.
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 mx-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white hover:text-gold transition-colors font-body text-sm uppercase tracking-widest font-bold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden xl:block">
          <a href="#contacto" className="bg-gold text-black font-display font-bold text-lg px-6 py-2 uppercase rounded-none hover:bg-white transition-colors inline-block">
            Pide tu cita
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden text-gold p-2 border-2 border-gold rounded-none hover:bg-gold hover:text-black transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-black border-t border-gold xl:hidden flex flex-col p-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 mb-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white hover:text-gold transition-colors font-display text-3xl uppercase font-bold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="bg-gold text-black font-display font-bold text-2xl py-4 uppercase rounded-none hover:bg-white transition-colors w-full mt-auto block text-center">
            Pide tu cita
          </a>
        </div>
      )}

      {/* SECCIÓN 2: HERO */}
      <section className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-start bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://placehold.co/1400x900/000000/000000" 
            alt="The Wonder Clinic Oviedo Hero" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full">


          {/* Recurso Tipográfico Obligatorio */}
          <div className="mb-8 flex flex-col items-start">
            <span className="font-display italic text-white text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-none tracking-tight">
              LLEGA EN FORMA
            </span>
            <div className="bg-gold px-2 pt-2 md:pt-4 pb-0 md:pb-2 mt-1">
              <span className="font-display text-black text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tight block">
                AL VERANO
              </span>
            </div>
          </div>

          {/* Textos Secundarios */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-body text-gold italic text-xl md:text-2xl font-bold">
              NO HAY EXCUSAS
            </span>
            <span className="font-body text-white text-xl md:text-2xl font-bold">
              PARA NO ENTRENAR
            </span>
          </div>

          <div className="mb-10 lg:mb-12">
            <span className="font-body text-gray-400 text-sm md:text-base">
              *Sesión de prueba 19,90€
            </span>
          </div>

          {/* Botón Principal */}
          <button className="bg-gold text-black font-display font-black text-xl md:text-2xl tracking-wide uppercase px-8 md:px-12 py-4 rounded-none hover:bg-white transition-colors block w-full sm:w-auto text-center">
            Reserva tu sesión
          </button>
          
          <div className="mt-4 text-gold text-sm md:text-base font-body font-bold text-center sm:text-left">
            @wonderclinicoviedo
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: BARRA DE CIFRAS */}
      <section className="bg-gold">
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
          {/* Cifra 1 */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border-b border-r lg:border-b-0 border-black h-full">
            <span className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-black uppercase leading-none">
              <AnimatedCounter target={1} suffix=" SESIÓN" />
            </span>
            <span className="font-display font-bold text-lg md:text-xl lg:text-2xl text-black uppercase mt-2 leading-tight">
              = 3H DE GYM
            </span>
          </div>
          
          {/* Cifra 2 */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-black h-full">
            <span className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-black uppercase leading-none">
              <AnimatedCounter target={60000} />
            </span>
            <span className="font-display font-bold text-lg md:text-xl lg:text-2xl text-black uppercase mt-2 leading-tight">
              contracciones musculares
            </span>
          </div>
          
          {/* Cifra 3 */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border-r border-black h-full">
            <span className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-black uppercase leading-none">
              <AnimatedCounter target={15} prefix="+" suffix=" AÑOS" />
            </span>
            <span className="font-display font-bold text-lg md:text-xl lg:text-2xl text-black uppercase mt-2 leading-tight">
              de experiencia
            </span>
          </div>
          
          {/* Cifra 4 */}
          <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border-black h-full">
            <span className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-black uppercase leading-none">
              <AnimatedCounter target={5000} prefix="+" />
            </span>
            <span className="font-display font-bold text-lg md:text-xl lg:text-2xl text-black uppercase mt-2 leading-tight">
              clientes satisfechos
            </span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: QUÉ ES WONDER */}
      <section id="el-metodo" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 flex flex-col items-start">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              EL MÉTODO
            </span>
            <div className="mb-8 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight">
                EL PRIMER TRATAMIENTO
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.8] tracking-tight block">
                  CLÍNICAMENTE PROBADO
                </span>
              </div>
            </div>
            <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Combina la reducción de grasa con la capacidad de aumentar la masa muscular y la definición. Zonas tratadas: abdomen, glúteos, piernas y brazos. Utiliza terapia Electromagnética Focalizada y emisiones Neuromusculares de Alta Intensidad.
            </p>
            <button className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-3 uppercase tracking-wide rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto">
              Quiero saber más
            </button>
          </div>
          <div className="order-1 lg:order-2 w-full">
            <img src="https://placehold.co/600x500/111111/F9C471?text=WONDER" alt="Equipo Wonder" className="w-full h-auto object-cover rounded-none" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: 3 VENTAJAS */}
      <section className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col items-center justify-center text-center mb-16 animate-fade-in-up">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              DESCUBRE 3
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-4 pb-0 md:pb-2 flex items-center gap-4 relative">
              <span className="font-display text-black text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                VENTAJAS DE WONDER
              </span>
              {/* Flecha triangular decorativa */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-l-[16px] border-l-gold border-b-[12px] border-b-transparent hidden md:block"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold border-transparent hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Activity className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">TECNOLOGÍA AVANZADA Y EFICAZ.</h3>
              <p className="font-body text-gray-400 text-base leading-relaxed">
                La aparatología WONDER® combina ondas electromagnéticas y emisiones neuromusculares, las dos tecnologías más potentes para crear músculo.
              </p>
            </div>
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Zap className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">RESULTADOS RÁPIDOS Y COMPROBADOS.</h3>
              <p className="font-body text-gray-400 text-base leading-relaxed">
                Resultados visibles desde la primera sesión. En 2-3 semanas tendrás un cuerpo tonificado y definido.
              </p>
            </div>
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Clock className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">SESIONES CORTAS Y SIN ESFUERZO.</h3>
              <p className="font-body text-gray-400 text-base leading-relaxed">
                Una sesión equivale a 3 horas de gimnasio. Sin dolor, sin recuperación, sin excusas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: TECNOLOGÍA */}
      <section id="tecnologia" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="w-full">
            <img src="https://placehold.co/600x450/111111/F9C471?text=FOTO+MAQUINA+WONDER" alt="Tecnología Wonder" className="w-full h-auto object-cover rounded-none" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              TECNOLOGÍA WONDER®
            </span>
            <div className="mb-10 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
                ¿CÓMO FUNCIONA
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                  LA TECNOLOGÍA?
                </span>
              </div>
            </div>

            <ul className="space-y-8 mb-10 w-full">
              <li className="flex gap-4 items-start">
                <Check className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase mb-1">ADELGAZAMIENTO. QUEMA DE GRASA.</h4>
                  <p className="font-body text-gray-400">Los tratamientos estéticos para reducir grasa se han vuelto la tendencia mundial. Wonder® lo hace sin cirugía.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Check className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase mb-1">TONIFICACIÓN. DESARROLLO MUSCULAR.</h4>
                  <p className="font-body text-gray-400">60.000 contracciones musculares a 20cm de profundidad en una sola sesión.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Check className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-xl text-white uppercase mb-1">CELULITIS. MEJORA DE LA PIEL.</h4>
                  <p className="font-body text-gray-400">Aumentarás el volumen de masa muscular y disminuirás significativamente el volumen de masa grasa.</p>
                </div>
              </li>
            </ul>

            <div className="bg-[#111111] p-6 border-l-4 border-gold w-full">
              <span className="font-display text-gold text-5xl md:text-6xl font-black block leading-none mb-2">60.000</span>
              <span className="font-body text-white font-bold text-lg uppercase tracking-wider">contracciones por sesión</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: ZONAS QUE TRATA */}
      <section className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase text-center mb-16 tracking-tight animate-fade-in-up">
            ¿QUÉ ZONAS TRATA WONDER®?
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Abdomen", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-6 h-6 border-2 border-gold" /></div> },
              { name: "Glúteos", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-6 h-6 rounded-t-full border-2 border-gold border-b-0" /></div> },
              { name: "Piernas", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-2 h-6 border-2 border-gold mx-1"/><div className="w-2 h-6 border-2 border-gold mx-1"/></div> },
              { name: "Brazos", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-6 h-2 border-2 border-gold" /></div> },
              { name: "Aductores", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-4 h-4 border-2 border-gold rotate-45" /></div> },
              { name: "Oblicuos", icon: <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center"><div className="w-6 h-6 border-2 border-gold rounded-full" /></div> }
            ].map((zona) => (
              <div key={zona.name} className="bg-[#111111] p-6 md:p-8 border border-gold/20 flex flex-col items-center justify-center text-center hover:border-gold hover:bg-[#1a1a1a] transition-colors group">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform">
                  {zona.icon}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white uppercase">{zona.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: BANNER PREGUNTA */}
      <section className="py-20 md:py-32 bg-black flex justify-center text-center">
        <div className="flex flex-col items-center">
          <span className="font-display italic text-white text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2">
            ¿TIENES MÁS
          </span>
          <div className="bg-gold px-4 pt-2 md:pt-4 pb-0 md:pb-2 mb-2">
            <span className="font-display text-black text-4xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
              DE 40 AÑOS...
            </span>
          </div>
          <span className="font-display italic text-white text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8">
            Y TE PASA ESTO?
          </span>
          
          <p className="font-body text-gold text-lg md:text-xl max-w-2xl px-6 mb-4">
            Retención de líquidos, abdomen sin tono y cansancio que no se va.
          </p>
          <p className="font-body text-white font-bold text-xl md:text-2xl mb-10">
            Te entendemos y podemos ayudarTE.
          </p>
          <button className="bg-gold text-black font-display font-bold text-xl px-10 py-4 uppercase rounded-none hover:bg-white transition-colors">
            Empieza hoy
          </button>
        </div>
      </section>

      {/* SECCIÓN 9: RESULTADOS */}
      <section id="resultados" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4 text-center">
            RESULTADOS
          </span>
          <div className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              LO QUE CONSIGUEN
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                NUESTRAS CLIENTAS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col items-center text-center">
                <img 
                  src={`https://placehold.co/500x600/111111/F9C471?text=ANTES+%2F+DESPU%C3%89S+${num}`} 
                  alt={`Antes y Después ${num}`} 
                  className="w-full h-auto object-cover border border-gold/20 mb-4"
                />
                <span className="font-display font-bold text-sm text-gold tracking-widest uppercase" style={{ fontVariant: 'small-caps'}}>
                  ANTES / DESPUÉS
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 10: BANNER CTA INTERMEDIO */}
      <section className="py-20 bg-gold text-center px-6">
        <div className="flex flex-col items-center">
          <span className="font-display italic text-black font-bold text-5xl md:text-7xl uppercase mb-2">
            1 SESIÓN
          </span>
          <div className="bg-black px-4 pt-2 md:pt-4 pb-0 md:pb-2 mb-8 inline-block">
            <span className="font-display text-gold text-5xl md:text-7xl font-black uppercase leading-[0.8] tracking-tight block">
              = 3H DE GYM
            </span>
          </div>
          <p className="font-body text-black text-xl md:text-2xl font-bold uppercase tracking-wider mb-10">
            NO HAY EXCUSAS PARA NO ENTRENAR
          </p>
          <button className="bg-black text-gold font-display font-black text-xl md:text-2xl uppercase px-8 py-5 tracking-wider rounded-none hover:bg-white hover:text-black transition-colors w-full md:w-auto">
            RESERVA TU SESIÓN DE PRUEBA · 19,90€
          </button>
        </div>
      </section>

      {/* SECCIÓN 11: INSTALACIONES */}
      <section id="instalaciones" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4 text-center flex items-center gap-2">
            <MapPin size={16} /> OVIEDO · CALLE POSADA HERRERA, 6
          </span>
          <div className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              NUESTRAS
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                INSTALACIONES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="relative group overflow-hidden bg-[#111] aspect-[5/4]">
                <img 
                  src={`https://placehold.co/500x400/111111/F9C471?text=LOCAL+${num}`} 
                  alt={`Local ${num}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Plus className="text-gold w-12 h-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 12: PATROCINIO */}
      <section id="patrocinio" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            PATROCINIO
          </span>
          <div className="mb-8 flex flex-col items-center animate-fade-in-up">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              DEL DEPORTE DE ÉLITE
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                A LA ESTÉTICA
              </span>
            </div>
          </div>
          <p className="font-body text-gray-400 text-lg md:text-xl max-w-3xl mb-16">
            La tecnología española WONDER® viene del mundo del deporte de élite y está transformando el sector de la medicina estética mundial. Presente en clínicas de prestigio de 46 países.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-16">
            {[1, 2, 3, 4, 5].map((num) => (
              <img 
                key={num}
                src={`https://placehold.co/160x60/222222/888888?text=MEDIO+${num}`} 
                alt={`Medio ${num}`} 
                className="h-10 md:h-12 w-auto object-contain"
              />
            ))}
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-gold text-6xl md:text-8xl leading-none">46 PAÍSES</span>
            <span className="font-body font-bold text-white uppercase text-lg mt-2">donde está presente Wonder®</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 13: EQUIPO */}
      <section id="equipo" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            EQUIPO
          </span>
          <div className="mb-16 flex flex-col items-center animate-fade-in-up">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              LAS PROFESIONALES
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                QUE TE CUIDAN
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {[1, 2].map((num) => (
              <div key={num} className="bg-[#111111] border-t-[3px] border-gold p-6 flex flex-col items-center text-center">
                <img 
                  src={`https://placehold.co/400x450/111111/F9C471?text=FOTO+PROFESIONAL+${num}`} 
                  alt={`Profesional ${num}`} 
                  className="w-full h-auto object-cover mb-6"
                />
                <h3 className="font-display font-bold text-3xl text-white uppercase mb-1">Nombre {num}</h3>
                <span className="font-body text-gold font-bold text-lg mb-4">Especialista Wonder®</span>
                <p className="font-body text-gray-400">
                  Líder en tratamientos estéticos avanzados con años de experiencia transformando cuerpos de forma rápida y efectiva.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 14: CLIENTES / TESTIMONIOS */}
      <section id="clientes" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            CLIENTES
          </span>
          <div className="mb-16 flex flex-col items-center animate-fade-in-up">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              LO QUE DICEN
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                NUESTRAS CLIENTAS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { text: "Increíbles resultados desde la primera sesión. No solo a nivel estético sino a nivel terapéutico — mayor rendimiento deportivo, mejora del sueño y desaparición de dolores de rodilla.", name: "Aleixandra C." },
              { text: "Magníficas profesionales, trato exquisito. El tratamiento increíble y resultados desde la primera sesión.", name: "Eduardo A." },
              { text: "Experiencia muy agradable en tiempo récord. Calidad-precio excelente.", name: "Francisca G." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#111111] p-8 border-l-[4px] border-gold flex flex-col h-full justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="font-body text-gray-300 italic mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
                <div>
                  <span className="font-display font-bold text-xl text-white uppercase block">{testimonial.name}</span>
                  <span className="font-body text-gray-500 text-sm">Clienta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 15: PROMOS */}
      <section id="promos" className="py-20 md:py-32 bg-black relative">
        <div className="absolute inset-0 max-w-full overflow-hidden opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F9C471 0, #F9C471 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center relative z-10">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            PROMOCIONES
          </span>
          <div className="mb-16 flex flex-col items-center animate-fade-in-up">
            <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              OFERTA
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                SESIÓN DE PRUEBA
              </span>
            </div>
          </div>

          <div className="bg-[#111111] border-2 border-gold p-8 md:p-12 flex flex-col items-center text-center max-w-2xl w-full mb-8">
            <span className="font-display font-black text-gold text-7xl md:text-8xl leading-none mb-4">19,90€</span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-8 tracking-tight">SESIÓN DE PRUEBA</h3>
            
            <ul className="space-y-4 text-left w-full max-w-md mb-8">
              {[
                "Primera sesión completa con protocolo personalizado",
                "Asesoramiento gratuito",
                "Sin compromiso de permanencia",
                "Resultados visibles desde el primer día"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <Check className="text-gold w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-body text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            
            <span className="font-body text-gray-500 text-sm mb-8 block">*Oferta válida presentando este anuncio</span>
            <button className="bg-gold text-black font-display font-bold text-2xl px-12 py-5 uppercase tracking-wider rounded-none hover:bg-white transition-colors w-full">
              Reservar ahora
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="bg-[#111111] border border-gold/20 p-6 flex flex-col items-center text-center">
              <h4 className="font-display font-bold text-2xl text-white uppercase mb-2">BONO 5 SESIONES</h4>
              <span className="font-body text-gray-400 mb-6">Precio a consultar</span>
              <button className="border-2 border-gold text-gold font-display font-bold text-lg px-6 py-2 uppercase rounded-none hover:bg-gold hover:text-black transition-colors w-full">
                Consultar
              </button>
            </div>
            <div className="bg-[#111111] border border-gold/20 p-6 flex flex-col items-center text-center">
              <h4 className="font-display font-bold text-2xl text-white uppercase mb-2">BONO 10 SESIONES</h4>
              <span className="font-body text-gray-400 mb-6">Precio a consultar</span>
              <button className="border-2 border-gold text-gold font-display font-bold text-lg px-6 py-2 uppercase rounded-none hover:bg-gold hover:text-black transition-colors w-full">
                Consultar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 16: CITAS / CONTACTO */}
      <section id="contacto" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col items-start">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              CITAS
            </span>
            <div className="mb-12 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
                PIDE TU
              </span>
              <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-5xl md:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                  CITA AHORA
                </span>
              </div>
            </div>

            <ul className="space-y-6 mb-12">
              <li className="flex items-center gap-4">
                <MapPin className="text-gold w-6 h-6 shrink-0" />
                <span className="font-body text-white text-lg">Calle Posada Herrera, 6, Oviedo</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-gold w-6 h-6 shrink-0" />
                <span className="font-body text-white text-lg">684 68 30 57</span>
              </li>
              <li className="flex items-center gap-4">
                <Instagram className="text-gold w-6 h-6 shrink-0" />
                <span className="font-body text-white text-lg">@wonderclinicoviedo</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="text-gold w-6 h-6 shrink-0" />
                <span className="font-body text-white text-lg">Lunes a Viernes · 9:00 – 20:00h</span>
              </li>
            </ul>

            <button className="bg-gold text-black font-display font-black text-xl px-8 py-4 uppercase tracking-wider rounded-none hover:bg-white transition-colors mb-4 w-full sm:w-auto">
              LLAMAR AHORA → 684 68 30 57
            </button>
            <button className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-4 uppercase tracking-wider rounded-none hover:bg-gold hover:text-black transition-colors mb-8 w-full sm:w-auto">
              VER EN GOOGLE MAPS
            </button>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div className="bg-[#111111] border border-gold p-8 md:p-12">
            <h3 className="font-display font-bold text-3xl text-white uppercase tracking-tight mb-8">RESERVA TU SESIÓN</h3>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Nombre completo</label>
                <input type="text" className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors" />
              </div>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Teléfono de contacto</label>
                <input type="tel" className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors" />
              </div>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Email</label>
                <input type="email" className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors" />
              </div>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Fecha deseada</label>
                <input type="date" className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors [color-scheme:dark]" />
              </div>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Zona a tratar</label>
                <select className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors appearance-none pr-8 relative">
                  <option className="bg-[#111] text-white">Abdomen</option>
                  <option className="bg-[#111] text-white">Glúteos</option>
                  <option className="bg-[#111] text-white">Piernas</option>
                  <option className="bg-[#111] text-white">Brazos</option>
                  <option className="bg-[#111] text-white">Aductores</option>
                  <option className="bg-[#111] text-white">Oblicuos</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-body text-white text-xs uppercase tracking-widest mb-2 bg-black py-1 px-2 border-b border-gold w-max">Mensaje</label>
                <textarea rows={3} className="bg-transparent border-0 border-b border-gray-600 rounded-none text-white font-body py-2 px-0 focus:outline-none focus:ring-0 focus:border-gold transition-colors resize-none" />
              </div>
              <button type="submit" className="bg-gold text-black font-display font-bold text-xl uppercase tracking-wider py-4 rounded-none hover:bg-white transition-colors mt-4 w-full">
                ENVIAR MI SOLICITUD
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECCIÓN 17: FOOTER */}
      <footer className="bg-black border-t border-gold py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="flex flex-col items-start">
            <span className="font-display font-bold text-2xl tracking-wider uppercase text-white leading-none">
              THE WONDER CLINIC
            </span>
            <div className="w-12 h-0.5 bg-gold my-2" />
            <span className="font-body text-gray-400 text-sm mb-4">
              Crea músculo. Quema grasa.
            </span>
            <span className="font-body text-gray-500 text-sm">
              Calle Posada Herrera, 6 · Oviedo
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="font-display text-white hover:text-gold uppercase tracking-wider text-sm">Aviso Legal</a>
            <a href="#" className="font-display text-white hover:text-gold uppercase tracking-wider text-sm">Política de Privacidad</a>
            <a href="#" className="font-display text-white hover:text-gold uppercase tracking-wider text-sm">Política de Cookies</a>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="font-body text-gold font-bold mb-4">@wonderclinicoviedo</span>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center text-gray-600 font-body text-sm">
          © 2025 The Wonder Clinic Oviedo. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
