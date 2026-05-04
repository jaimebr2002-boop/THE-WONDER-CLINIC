import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, MapPin, Phone, Instagram, Facebook, Clock, Plus, Star, Activity, Zap } from 'lucide-react';
import ZonasTratamiento from './components/ZonasTratamiento';
import TestimonialSlider from './components/TestimonialSlider';

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
  const [activeAboutTab, setActiveAboutTab] = useState<'musculatura' | 'zonas' | 'beneficios'>('musculatura');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  
  const galleryImages = [
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758530/IMG_9133_fspvld.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" },
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758529/IMG_9126_c60ell.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" },
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758528/A7407541_wvv5mu.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" },
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758528/A7407536_vm6cw9.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" },
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758527/A7407459_zlqsmf.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" },
    { src: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758527/A7407426_m5x9if.jpg", alt: "Instalaciones Wonder Clinic Oviedo — Calle Posada Herrera 6" }
  ];

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % galleryImages.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'El Método', href: '#el-metodo' },
    { name: 'Tecnología', href: '#tecnologia' },
    { name: 'Instalaciones', href: '#instalaciones' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <div id="inicio" className="min-h-screen bg-black text-white font-body selection:bg-gold selection:text-black">
      
      {/* SECCIÓN 1: NAVBAR */}
      
      <header className={`sticky top-0 z-50 bg-black border-b border-gold h-20 flex items-center px-4 md:px-8 transition-shadow duration-300 ${hasScrolled ? 'shadow-[0_4px_20px_rgba(249,196,113,0.15)]' : ''}`}>
        <div className="flex-1 flex flex-col justify-center">
          <a href="#inicio" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777904393/logo_def-removebg-preview_byny5b.png" 
              alt="The Wonder Clinic" 
              className="h-[50px] md:h-[60px] w-auto" 
            />
          </a>
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
          <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo" target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-display font-bold text-lg px-6 py-2 uppercase rounded-none hover:bg-white transition-colors inline-block">
            Reservar cita
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
          <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="bg-gold text-black font-display font-bold text-2xl py-4 uppercase rounded-none hover:bg-white transition-colors w-full mt-auto block text-center">
            Reservar cita
          </a>
        </div>
      )}

      {/* SECCIÓN 2: HERO */}
      <section 
        className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-start bg-black bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%), var(--hero-bg)",
          "--hero-bg": "url('https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777846196/DSC00215_jpvcec.jpg')" 
        } as React.CSSProperties}
      >
        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full">


          {/* Recurso Tipográfico Obligatorio */}
          <h1 className="mb-8 flex flex-col items-start">
            <span className="font-display italic text-white text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-none tracking-tight">
              LLEGA EN FORMA
            </span>
            <div className="bg-gold px-2 pt-2 md:pt-4 pb-0 md:pb-2 mt-1">
              <span className="font-display text-black text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tight block">
                AL VERANO
              </span>
            </div>
          </h1>

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
          <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo" target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-display font-black text-sm uppercase px-6 py-2 rounded-none hover:bg-white transition-colors inline-block text-center">
            Reserva tu cita ahora
          </a>
          
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


            {/* SECCIÓN 12: SOBRE NOSOTROS */}
      <section id="sobre-nosotros" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Imagen */}
            <div className="w-full relative min-h-[400px] lg:min-h-full rounded-none">
              <img loading="lazy" 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758529/IMG_9126_c60ell.jpg" 
                alt="Clínica estética Oviedo tonificación muscular" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
            
            {/* Contenido */}
            <div className="flex flex-col items-start py-4 lg:py-8">
              <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
                SOBRE NOSOTROS
              </span>
              <h2 className="mb-8 flex flex-col items-start animate-fade-in-up">
                <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                  <span className="sr-only">Del deporte de élite a la medicina estética en Oviedo</span>
                  DEL DEPORTE DE ÉLITE
                </span>
                <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1 block w-fit" aria-hidden="true">
                  <span className="font-display text-black text-3xl md:text-4xl font-black uppercase leading-[0.8] tracking-tight block">
                    A LA MEDICINA ESTÉTICA.
                  </span>
                </div>
              </h2>
              
              <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed mb-10 w-full">
                La tecnología española WONDER® nació en el deporte de élite y hoy lidera el sector de la estética no invasiva a nivel mundial. Presente en clínicas de prestigio de 46 países, combina electroestimulación muscular de alta intensidad con resultados clínicamente probados para reducir grasa y crear músculo de forma rápida y segura.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
                <button 
                  onClick={() => setActiveAboutTab('musculatura')}
                  className={`border-2 border-gold font-display font-bold text-sm md:text-base px-6 py-3 uppercase tracking-wide transition-colors flex-1 text-center ${activeAboutTab === 'musculatura' ? 'bg-gold text-black' : 'text-gold hover:bg-gold/10'}`}
                >
                  Musculatura
                </button>
                <button 
                  onClick={() => setActiveAboutTab('zonas')}
                  className={`border-2 border-gold font-display font-bold text-sm md:text-base px-6 py-3 uppercase tracking-wide transition-colors flex-1 text-center ${activeAboutTab === 'zonas' ? 'bg-gold text-black' : 'text-gold hover:bg-gold/10'}`}
                >
                  Zonas
                </button>
                <button 
                  onClick={() => setActiveAboutTab('beneficios')}
                  className={`border-2 border-gold font-display font-bold text-sm md:text-base px-6 py-3 uppercase tracking-wide transition-colors flex-1 text-center ${activeAboutTab === 'beneficios' ? 'bg-gold text-black' : 'text-gold hover:bg-gold/10'}`}
                >
                  Beneficios
                </button>
              </div>

              <div className="relative w-full">
                <div className={`transition-opacity duration-500 ease-in-out ${activeAboutTab === 'musculatura' ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                  <p className="font-body text-gray-400 text-base md:text-lg leading-relaxed">
                    Esta es la gran tendencia mundial: los tratamientos estéticos para aumentar la musculatura, porque lo que se lleva ahora son cuerpos saludables y tonificados.
                  </p>
                </div>
                <div className={`transition-opacity duration-500 ease-in-out ${activeAboutTab === 'zonas' ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                  <p className="font-body text-gray-400 text-base md:text-lg leading-relaxed mb-4">
                    El exclusivo tratamiento de The Wonder Clinic es extremadamente eficaz al abordar los siguientes problemas:
                  </p>
                  <ul className="font-body text-gray-400 text-base md:text-lg leading-relaxed list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>Exceso de grasa</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>Músculos débiles</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>Piel flácida</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>Falta de energía física</li>
                  </ul>
                </div>
                <div className={`transition-opacity duration-500 ease-in-out ${activeAboutTab === 'beneficios' ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                  <p className="font-body text-gray-400 text-base md:text-lg leading-relaxed">
                    Es tan efectivo, que solo una sesión brinda aproximadamente los mismos beneficios de tonificación para tu cuerpo que hacer 3-4 agotadoras horas de entrenamiento en el gimnasio.
                  </p>
                </div>
              </div>

            </div>
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
            <h2 className="mb-8 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight">
                El primer tratamiento clínicamente probado
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-[0.8] tracking-tight block">
                  para crear músculo y quemar grasa en Oviedo
                </span>
              </div>
            </h2>
            <p className="font-body text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Wonder Clinic Oviedo ofrece el único tratamiento estético no invasivo clínicamente probado que combina reducción de grasa localizada y aumento de masa muscular en una sola sesión. Mediante tecnología HIEMT (electroestimulación neuromuscular de alta intensidad) y terapia electromagnética focalizada, tratamos abdomen, glúteos, piernas, brazos, aductores y oblicuos. Sin cirugía. Sin recuperación. Con resultados visibles desde la primera sesión.
            </p>
            <a href="#contacto" className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-3 uppercase tracking-wide rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto inline-block text-center" title="Más información reducir grasa Oviedo">
              Quiero saber más
            </a>
          </div>
          <div className="order-1 lg:order-2 w-full">
            <img loading="lazy" src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777757493/IMG_9128_gdp9vw.jpg" alt="Equipo Wonder" className="w-full h-auto object-cover rounded-none" />
          </div>
        </div>
      </section>


      {/* SECCIÓN 5: 3 VENTAJAS */}
      <section className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="flex flex-col items-center justify-center text-center mb-16 animate-fade-in-up">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              3 razones para elegir
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-4 pb-0 md:pb-2 flex items-center gap-4 relative">
              <span className="font-display text-black text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.8] tracking-tight block">
                Wonder Clinic en Oviedo
              </span>
              {/* Flecha triangular decorativa */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-l-[16px] border-l-gold border-b-[12px] border-b-transparent hidden md:block"></div>
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold border-transparent hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Activity className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">TECNOLOGÍA WONDER® CERTIFICADA EN 46 PAÍSES</h3>
              <p className="font-body text-gray-400 text-base leading-relaxed">
                La aparatología WONDER® combina ondas electromagnéticas y emisiones neuromusculares, las dos tecnologías más potentes para crear músculo.
              </p>
            </div>
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Zap className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">RESULTADOS VISIBLES DESDE LA PRIMERA SESIÓN EN OVIEDO</h3>
              <p className="font-body text-gray-400 text-base leading-relaxed">
                Resultados visibles desde la primera sesión. En 2-3 semanas tendrás un cuerpo tonificado y definido.
              </p>
            </div>
            <div className="bg-[#111111] p-8 md:p-10 border-t-[3px] border-gold hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <Clock className="text-gold w-12 h-12 mb-6" />
              <h3 className="font-display font-bold text-2xl text-white uppercase mb-4">30 MINUTOS = 3 HORAS DE GIMNASIO SIN ESFUERZO</h3>
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
          <div className="w-full grid grid-rows-2 gap-4">
            <img loading="lazy" src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777758030/A7407542_xrguro.jpg" alt="Tecnología Wonder® electroestimulación muscular Oviedo" className="w-full h-auto object-cover rounded-none" />
            <img loading="lazy" src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777757793/A7407517_m1gwst.jpg" alt="Aplicación de tecnología HIEMT en tratamiento estético no invasivo" className="w-full h-auto object-cover rounded-none" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              TECNOLOGÍA WONDER®
            </span>
            <h2 className="mb-10 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                Cómo funciona la tecnología Wonder®
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-2xl md:text-3xl font-black uppercase leading-[0.8] tracking-tight block">
                  Electroestimulación muscular de alta intensidad
                </span>
              </div>
            </h2>

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
      <ZonasTratamiento />

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
          
          <p className="font-body text-gold text-lg md:text-xl w-full max-w-3xl px-4 md:px-6 mb-4">
            ¿Tienes más de 40 años y sufres retención de líquidos, abdomen sin tono o cansancio crónico?
          </p>
          <p className="font-body text-white font-bold text-xl md:text-2xl mb-10 w-full max-w-3xl px-4 md:px-6">
            En Wonder Clinic Oviedo te ayudamos a recuperar tu cuerpo con tratamientos no invasivos y resultados comprobados. Sin cirugía. Sin dietas extremas. Sin excusas.
          </p>
          <a href="#contacto" className="bg-gold text-black font-display font-bold text-xl px-10 py-4 uppercase rounded-none hover:bg-white transition-colors inline-block text-center">
            Empieza hoy
          </a>
        </div>
      </section>

            {/* SECCIÓN 10: INSTALACIONES */}
      <section id="instalaciones" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4 text-center">
            INSTALACIONES
          </span>
          <h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              NUESTRAS INSTALACIONES EN OVIEDO
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative group overflow-hidden bg-[#111] aspect-[5/4] cursor-pointer" onClick={() => setLightboxImage(index)}>
                <img loading="lazy" 
                  src={img.src} 
                  alt={img.alt} 
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

      
{/* SECCIÓN 9: RESULTADOS */}
      <section id="resultados" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4 text-center">
            RESULTADOS
          </span>
          <h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              Resultados reales de nuestras clientas en Oviedo
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                Antes y después
              </span>
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            <div className="relative bg-[#111] aspect-[4/3] group overflow-hidden">
              <img loading="lazy" src="https://placehold.co/800x600/111111/F9C471?text=ANTES+Y+DESPUES+1" alt="Resultados Antes y Después 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative bg-[#111] aspect-[4/3] group overflow-hidden">
              <img loading="lazy" src="https://placehold.co/800x600/111111/F9C471?text=ANTES+Y+DESPUES+2" alt="Resultados Antes y Después 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative bg-[#111] aspect-[4/3] group overflow-hidden">
              <img loading="lazy" src="https://placehold.co/800x600/111111/F9C471?text=ANTES+Y+DESPUES+3" alt="Resultados Antes y Después 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative bg-[#111] aspect-[4/3] group overflow-hidden">
              <img loading="lazy" src="https://placehold.co/800x600/111111/F9C471?text=ANTES+Y+DESPUES+4" alt="Resultados Antes y Después 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 13: EQUIPO */}
      <section id="equipo" className="py-20 md:py-32 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
          <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            EQUIPO
          </span>
          <h2 className="mb-16 flex flex-col items-center animate-fade-in-up text-center">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              Especialistas en estética avanzada
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1 text-center">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                El equipo de Wonder Clinic Oviedo
              </span>
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {[
              { name: 'Lucía', imgNum: 1 },
              { name: 'María', imgNum: 2 }
            ].map((prof) => (
              <div key={prof.name} className="bg-[#111111] p-6 flex flex-col items-center text-center">
                <img loading="lazy" 
                  src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="450" viewBox="0 0 400 450"><rect width="400" height="450" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23666666">Foto próximamente</text></svg>`} 
                  alt={`${prof.name} — Especialista en tratamientos estéticos avanzados Wonder Clinic Oviedo`} 
                  className="w-full h-[450px] object-cover mb-6 border-2 border-dashed border-gold/30 rounded-lg"
                />
                <h3 className="font-display font-black text-3xl text-white uppercase mb-1">{prof.name}</h3>
                <span className="font-body text-gold font-bold text-lg mb-4">Certificada Wonder®</span>
                <p className="font-body text-gray-400">
                  Líder en tratamientos estéticos avanzados con años de experiencia transformando cuerpos de forma rápida y efectiva.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 14: CLIENTES / TESTIMONIOS */}
      <section id="clientes" className="py-20 md:py-32 bg-black">
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

          <div className="w-full mb-12">
            <TestimonialSlider />
          </div>
          
          <a 
            href="https://www.google.com/maps/place/The+Wonder+Clinic/@43.3637748,-5.8535328,17z/data=!4m8!3m7!1s0xd368db67cdc214d:0x73ca95a32a68cc4!8m2!3d43.363771!4d-5.8486619!9m1!1b1!16s%2Fg%2F11ththdsqs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-body font-bold text-base md:text-lg px-8 py-4 uppercase tracking-wider rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto"
          >
            <Star className="w-5 h-5 fill-current" /> Déjanos tu reseña en Google
          </a>
        </div>
      </section>

      {/* SECCIÓN 15: PROMOS */}
      <section id="promos" className="py-20 md:py-32 bg-[#0d0d0d] relative">
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
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-4 tracking-tight">SESIÓN DE PRUEBA</h3>
            
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
            <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo" target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-display font-bold text-2xl px-12 py-5 uppercase tracking-wider rounded-none hover:bg-white transition-colors w-full text-center">
              Reservar ahora
            </a>
          </div>


        </div>
      </section>

      {/* SECCIÓN 16: CITAS / CONTACTO */}
      <section id="contacto" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center">
            <span className="text-gold font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              CITAS
            </span>
            <h2 className="mb-12 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                Reserva tu cita en Wonder Clinic
              </span>
              <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-2xl md:text-3xl font-black uppercase leading-[0.8] tracking-tight block">
                  Oviedo, Calle Posada Herrera, 6
                </span>
              </div>
            </h2>

            <div className="flex flex-col sm:flex-row justify-start gap-8 w-full mb-12">
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <MapPin className="text-gold w-6 h-6 shrink-0" />
                  <span className="font-body text-white text-lg">Calle Posada Herrera, 6, Oviedo</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="text-gold w-6 h-6 shrink-0" />
                  <span className="font-body text-white text-lg">684 68 30 57</span>
                </li>
              </ul>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Clock className="text-gold w-6 h-6 shrink-0" />
                  <span className="font-body text-white text-lg">Lunes a Viernes · 9:00 – 20:00h</span>
                </li>
                <li className="flex items-center gap-4">
                  <Instagram className="text-gold w-6 h-6 shrink-0" />
                  <span className="font-body text-white text-lg">@wonderclinicoviedo</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
              <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo" target="_blank" rel="noopener noreferrer" className="bg-gold text-black font-display font-black text-lg md:text-xl px-8 py-4 uppercase tracking-wider rounded-none hover:bg-white transition-colors w-full sm:w-auto text-center flex items-center justify-center">
                RESERVAR CITA AHORA
              </a>
              <a href="tel:+34684683057" className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-4 uppercase tracking-wider rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto text-center flex items-center justify-center">
                LLAMAR AHORA
              </a>
            </div>
            
            <div className="flex gap-4">
              <a href="https://www.instagram.com/wonderclinicoviedo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/wonderclinicoviedo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex flex-col h-full">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-tight mb-8">NUESTRA UBICACIÓN</h3>
            <div className="w-full flex-grow min-h-[400px] rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.1!2d-5.8486619!3d43.363771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd368db67cdc214d%3A0x73ca95a32a68cc4!2sThe%20Wonder%20Clinic!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 17: FOOTER */}
      <footer className="bg-black border-t border-gold py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Col 1: Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img loading="lazy" src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777757587/491446116_17986769747804061_3871277705596088368_n_hnmgem.jpg" alt="The Wonder Clinic Oviedo — Clínica de estética avanzada" className="h-40 md:h-48 w-auto mb-4" />
            <p className="font-display font-black text-lg text-white uppercase italic">No prometemos. Transformamos.</p>
          </div>

          {/* Col 2: Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-300">
            <h3 className="font-display font-bold text-gold text-lg uppercase mb-4 tracking-wider">Contacto</h3>
            <p className="flex items-center gap-2 mb-2 font-body"><Phone size={16} className="text-gold" /> 684 68 30 57</p>
            <div className="flex items-start gap-2 mb-2 font-body">
              <Clock size={16} className="text-gold mt-1" />
              <div>
                <p>L-V: 9:00 – 20:00</p>
                <p>S-D: Cerrado</p>
              </div>
            </div>
            <p className="flex items-center gap-2 font-body"><MapPin size={16} className="text-gold" /> Oviedo centro</p>
          </div>

          {/* Col 3: Social/Branding */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <p className="font-body text-gold font-bold text-sm">@wonderclinicoviedo</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-white/50 text-xs font-body mt-4">Powered by WONDER®</p>
          </div>
        </div>
      </footer>
    
      
      {lightboxImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-[110]" onClick={() => setLightboxImage(null)}>
            <X size={40} />
          </button>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-4 z-[110]" onClick={handlePrevImage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <img loading="lazy" 
            src={galleryImages[lightboxImage].src} 
            alt={galleryImages[lightboxImage].alt}
            className="max-w-full max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-4 z-[110]" onClick={handleNextImage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      )}
      
    </div>
  );
}
