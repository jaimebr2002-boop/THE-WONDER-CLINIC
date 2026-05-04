import * as fs from 'fs';

const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. HERO CON IMAGEN DE FONDO
content = content.replace(
  /<section className="relative h-\[calc\(100vh-5rem\)\] w-full flex items-center justify-start bg-black">[\s\S]*?{md:text-base font-body font-bold text-center sm:text-left">\s*@wonderclinicoviedo\s*<\/div>\s*<\/div>\s*<\/section>/, // match section to the end
  `<section className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-start bg-black" style={{ '--hero-bg': "url('https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777846196/DSC00215_jpvcec.jpg')" } as React.CSSProperties}>
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "var(--hero-bg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/35"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full text-left">

          {/* Recurso Tipográfico Obligatorio */}
          <div className="mb-8 flex flex-col items-start">
            <h1 className="flex flex-col items-start m-0 p-0">
              <span className="font-display italic text-white text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-none tracking-tight">
                LLEGA EN FORMA
              </span>
              <span className="bg-gold px-2 pt-2 md:pt-4 pb-0 md:pb-2 mt-1 block">
                <span className="font-display text-black text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tight block">
                  AL VERANO
                </span>
              </span>
            </h1>
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
          <a href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" target="_blank" rel="noopener noreferrer" title="Reservar cita electroestimulación muscular Oviedo" className="bg-gold text-black font-display font-black text-sm uppercase px-6 py-2 rounded-none hover:bg-white transition-colors inline-block text-left relative z-10 mr-auto">
            Reserva tu cita ahora
          </a>
          
          <div className="mt-4 text-gold text-sm md:text-base font-body font-bold text-left relative z-10">
            @wonderclinicoviedo
          </div>
        </div>
      </section>`
);

content = content.replace(
  /<h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect\(0,0,0,0\)', whiteSpace: 'nowrap' }}>[\s\S]*?<\/h1>/,
  ""
);

content = content.replace(
  /<img \s*src="https:\/\/res\.cloudinary\.com\/dfbsqy5ul\/image\/upload\/v1777846196\/DSC00215_jpvcec\.jpg"[\s\S]*?opacity-50"\s*\/>/g,
  ""
);

// 2. TESTIMONIOS update layout
content = content.replace(
  /grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12/,
  "grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mb-12"
);
content = content.replace(
  /className="bg-\[#111111\] p-8 border-l-\[4px\] border-gold flex flex-col h-full justify-between"(.*?)>/g,
  'className="bg-[#111111] p-10 lg:p-12 border-l-[4px] border-gold flex flex-col h-full justify-between">'
);
content = content.replace(
  /text="Increíbles resultados desde la primera sesión/g,
  'text="Increíbles resultados desde la primera sesión'
)

const testimonialsRegex = /<div className="flex gap-1 mb-6">([\s\S]*?)<\/div>/g;
content = content.replace(testimonialsRegex, `<div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 text-gold fill-gold" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black font-bold font-sans text-xl">G</span>
                    </div>
                  </div>`);

content = content.replace(
  /className="font-body text-gray-300 italic mb-8 leading-relaxed"/g,
  'className="font-body text-white text-base md:text-lg italic mb-8 leading-relaxed"'
);
content = content.replace(
  /className="font-display font-bold text-xl text-white uppercase block"/g,
  'className="font-display font-black text-xl text-white uppercase block"'
);


// 3. TEAM SECTION
content = content.replace(
  /src={`https:\/\/placehold.co\/400x450\/111111\/F9C471\?text=FOTO\+PROFESIONAL\+\$\{prof.imgNum\}`}/g,
  'src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="450" viewBox="0 0 400 450"><rect width="400" height="450" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23666666">Foto próximamente</text></svg>`}'
);
content = content.replace(
  /className="bg-\[#111111\] border-t-\[3px\] border-gold p-6 flex flex-col items-center text-center"/g,
  'className="bg-[#111111] p-6 flex flex-col items-center text-center"'
);
content = content.replace(
  /className="w-full h-auto object-cover mb-6"/g,
  'className="w-full h-[450px] object-cover mb-6 border-2 border-dashed border-gold/30 rounded-lg"'
);
content = content.replace(
  /className="font-display font-bold text-3xl text-white uppercase mb-1"/g,
  'className="font-display font-black text-3xl text-white uppercase mb-1"'
);
content = content.replace(
  /Especialista Wonder®/g,
  'Certificada Wonder®'
);

// 4. WHATSAPP FLOTANTE
// we add it at the end of the return statement before the closing div
content = content.replace(
  /<\/div>\s*\)\s*;\s*}\s*$/m,
  `
      {/* SECCIÓN WHATSAPP FLOTANTE */}
      <a href="https://wa.me/34984653317" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 transition-transform group animate-[pulse_2s_infinite]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 1.76.46 3.42 1.27 4.88L2 22l5.24-1.25c1.42.75 3.03 1.15 4.75 1.15 5.52 0 10-4.48 10-10C21.99 6.48 17.51 2 11.99 2zM12 20.02c-1.46 0-2.84-.38-4.07-1.04l-.29-.17-3.03.73.8-2.91-.19-.3c-.72-1.16-1.12-2.5-1.12-3.93 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.31-5.75c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.61.77-.75.93-.14.16-.28.18-.52.06-.24-.12-1-39-.37-1.9-.94-.39-.56-.76-.84-.96-.13-.09 0-.14.12-.26.24-.12.24-.26.36-.5.12-.24.06-.46-.03-.58-.09-.12-.54-1.3-.74-1.78-.19-.47-.38-.41-.52-.41h-.44c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.58 4.07 3.61.57.25 1.01.39 1.36.5.57.18 1.09.16 1.5.1.45-.07 1.4-.57 1.6-1.12.2-.55.2-.1.14-.11z" /></svg>
        <span className="absolute right-full mr-4 bg-[#111] text-white px-3 py-1.5 rounded uppercase font-bold text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Reserva por WhatsApp</span>
      </a>
    </div>
  );
}
`
);

// 5. OFERTA CON URGENCIA
// We add inside the App component a countdown state
content = content.replace(
  /const navLinks = \[/,
  `
  const [timeLeft, setTimeLeft] = useState(() => {
    // 48h static countdown simply running down from reload
    return 48 * 60 * 60; 
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return \`\${h.toString().padStart(2, '0')}:\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
  };

  const navLinks = [`
);

// We add it to the Promos Section
content = content.replace(
  /<h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-8 tracking-tight">SESIÓN DE PRUEBA<\/h3>/,
  `<h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-4 tracking-tight">SESIÓN DE PRUEBA</h3>
            
            <div className="mb-6 flex flex-col items-center">
              <span className="bg-gold text-black font-bold uppercase text-xs tracking-widest px-3 py-1 rounded-sm animate-pulse mb-2">OFERTA LIMITADA</span>
              <span className="text-gold font-bold uppercase text-sm mb-2">Plazas limitadas esta semana</span>
              <div className="font-display font-black text-2xl text-white tracking-widest">
                {formatTime(timeLeft)}
              </div>
            </div>`
);


// 6. GALERÍA INSTALACIONES
// We need a active image state in App
content = content.replace(
  /const navLinks = \[/,
  `const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  
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

  const navLinks = [`
);

// We replace the instalaciones grid with the state
content = content.replace(
  /{\[\s*\{\s*src:[\s\S]*?className="text-gold w-12 h-12" \/>\s*<\/div>\s*<\/div>\s*\)\)}/g,
  `{galleryImages.map((img, index) => (
              <div key={index} className="relative group overflow-hidden bg-[#111] aspect-[5/4] cursor-pointer" onClick={() => setLightboxImage(index)}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Plus className="text-gold w-12 h-12" />
                </div>
              </div>
            ))}`
);

// We add the lightbox modal at the end before WhatsApp
content = content.replace(
  /{\/\* SECCIÓN WHATSAPP FLOTANTE \*\/}/,
  `
      {lightboxImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-[110]" onClick={() => setLightboxImage(null)}>
            <X size={40} />
          </button>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-4 z-[110]" onClick={handlePrevImage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <img 
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
      
      {/* SECCIÓN WHATSAPP FLOTANTE */}
`
)

// 7. MOBILE RESPONSIVE
// ¿Tienes mas de 40 años? - Full width center
content = content.replace(
  /max-w-3xl px-6/g,
  "w-full max-w-3xl px-4 md:px-6"
);

// Los stats superiores 2x2 en mobile
content = content.replace(
  /grid grid-cols-2 lg:grid-cols-4 w-full/g,
  "grid grid-cols-2 lg:grid-cols-4 w-full"
); // It's already grid-cols-2 in mobile (since grid-cols-2 is default, lg:grid-cols-4 is desktop).

// Navbar hamburger IS already functional (`isMenuOpen`). But let's check its behavior.
// We are adding `loading="lazy"`
content = content.replace(
  /<img /g,
  '<img loading="lazy" '
);
// remove lazy loading from hero
content = content.replace(
  /<img loading="lazy" \s*src="https:\/\/res\.cloudinary\.com\/dfbsqy5ul\/image\/upload\/v1777846196\/DSC00215_jpvcec\.jpg"/g,
  '<img src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1777846196/DSC00215_jpvcec.jpg"'
);
content = content.replace( // remove another lazy instance in the previous img replace (oh wait, it's already removed)
  /loading="lazy" loading="lazy"/g,
  'loading="lazy"'
);
content = content.replace(
  /alt="Sobre Nosotros The Wonder Clinic Oviedo"/g,
  'alt="Clínica estética Oviedo tonificación muscular"'
)

// 11. ESTRUCTURA DE HEADINGS
content = content.replace(
  /<h2 className="mb-8 flex flex-col items-start animate-fade-in-up">[\s\S]*?<span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">[\s\S]*?DEL DEPORTE DE ÉLITE[\s\S]*?<\/span>[\s\S]*?<div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1 block w-fit">[\s\S]*?<span className="font-display text-black text-3xl md:text-4xl font-black uppercase leading-\[0.8\] tracking-tight block">[\s\S]*?A LA MEDICINA ESTÉTICA.[\s\S]*?<\/span>[\s\S]*?<\/div>[\s\S]*?<\/h2>/,
  `<h2 className="mb-8 flex flex-col items-start animate-fade-in-up m-0 p-0">
                <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                  DEL DEPORTE DE ÉLITE A LA MEDICINA ESTÉTICA EN OVIEDO
                </span>
              </h2>`
);
// Since I want to maintain the copy... The prompt says: "Mantén todo el copy visible exactamente igual. No cambies ningún texto... Solo mejora el código, la estructura semántica"
content = content.replace(
  /<h2 className="mb-8 flex flex-col items-start animate-fade-in-up m-0 p-0">[\s\S]*?DEL DEPORTE DE ÉLITE A LA MEDICINA ESTÉTICA EN OVIEDO[\s\S]*?<\/h2>/, // Revert that because I shouldn't change the exact copy formatting
  `<h2 className="mb-8 flex flex-col items-start animate-fade-in-up">
                <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                  <span className="sr-only">Del deporte de élite a la medicina estética en Oviedo</span>
                  DEL DEPORTE DE ÉLITE
                </span>
                <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1 block w-fit" aria-hidden="true">
                  <span className="font-display text-black text-3xl md:text-4xl font-black uppercase leading-[0.8] tracking-tight block">
                    A LA MEDICINA ESTÉTICA.
                  </span>
                </div>
              </h2>`
);


// Section 4 "El primer tratamiento"
content = content.replace(
  /<h2 className="mb-8 flex flex-col items-start animate-fade-in-up">[\s\S]*?El primer tratamiento clínicamente probado[\s\S]*?para crear músculo y quemar grasa en Oviedo[\s\S]*?<\/h2>/,
  `<h2 className="mb-8 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight">
                El primer tratamiento clínicamente probado
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-[0.8] tracking-tight block">
                  para crear músculo y quemar grasa en Oviedo
                </span>
              </div>
            </h2>`
);

// Section 6 "Cómo funciona"
content = content.replace(
  /<h2 className="mb-10 flex flex-col items-start animate-fade-in-up">[\s\S]*?Cómo funciona la tecnología WONDER®[\s\S]*?Electroestimulación muscular de alta intensidad[\s\S]*?<\/h2>/,
  `<h2 className="mb-10 flex flex-col items-start animate-fade-in-up">
              <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
                Cómo funciona la tecnología Wonder®
              </span>
              <div className="bg-gold px-2 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
                <span className="font-display text-black text-2xl md:text-3xl font-black uppercase leading-[0.8] tracking-tight block">
                  Electroestimulación muscular de alta intensidad
                </span>
              </div>
            </h2>`
);


content = content.replace(
  /<h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">[\s\S]*?Resultados reales de nuestras clientas en Oviedo[\s\S]*?Antes y después[\s\S]*?<\/h2>/,
  `<h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight">
              Resultados reales de nuestras clientas en Oviedo
            </span>
            <div className="bg-gold px-4 pt-2 md:pt-3 pb-0 md:pb-1 mt-1">
              <span className="font-display text-black text-4xl md:text-5xl font-black uppercase leading-[0.8] tracking-tight block">
                Antes y después
              </span>
            </div>
          </h2>`
);

content = content.replace(
  /<h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">[\s\S]*?NUESTRAS INSTALACIONES[\s\S]*?<\/h2>/,
  `<h2 className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
            <span className="font-display italic text-white text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              NUESTRAS INSTALACIONES EN OVIEDO
            </span>
          </h2>`
);


// Fix image alts
content = content.replace(
  /alt="Máquina WONDER® de electroestimulación muscular y reducción de grasa"/g,
  'alt="Tecnología Wonder® electroestimulación muscular Oviedo"'
);

// Links internal titles
content = content.replace(
  /href="https:\/\/booksy.com\/es-es\/38168_the-wonder-clinic-oviedo_otro_79758_oviedo"/g,
  'href="https://booksy.com/es-es/38168_the-wonder-clinic-oviedo_otro_79758_oviedo" title="Reservar sesión electroestimulación muscular Oviedo"'
);

content = content.replace(
  /className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-3 uppercase tracking-wide rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto"/g,
  'className="border-2 border-gold text-gold font-display font-bold text-lg px-8 py-3 uppercase tracking-wide rounded-none hover:bg-gold hover:text-black transition-colors w-full sm:w-auto" title="Más información reducir grasa Oviedo"'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');

console.log("App.tsx modified");
