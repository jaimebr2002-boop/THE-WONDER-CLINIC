import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    name: "Lorena Hevia",
    text: "Ya en la primera sesión salí desinflamada y a la 7ª sesión mi cuerpo había cambiado un montón (menos volumen, más músculo, piel más tersa). La atención espectacular, Lucía me encanta, me da mucha confianza y tranquilidad, siempre me anima a superarme y se preocupa de que esté cómoda."
  },
  {
    name: "ALE C.V.",
    text: "Increíbles resultados desde la primera sesión, no solo a nivel estético sino a nivel terapéutico, mayor rendimiento deportivo, mejora del sueño, suelo pélvico… súper importante si haces deportes de impacto."
  },
  {
    name: "Ana González",
    text: "Después de unas sesiones ves como tu cuerpo va cambiando y te sientes más ágil, incluso descanso mejor. Son muy buenas profesionales y te lo hacen muy llevadero. Destaco la atención de Lucía que, además de ser una gran profesional, se encarga de hacerte sentir cómoda y bien en todo momento."
  },
  {
    name: "Maria Jesus Fernandez",
    text: "Si tienes poco tiempo para ir al gimnasio, es la solución. Dos sesiones a la semana y menudo cambio en poco tiempo. Apenas bajé peso, pero sí volumen y mi celulitis está mejorando. Lucía y Míriam, dos grandes profesionales y encantadoras, hacen las sesiones muy amenas."
  },
  {
    name: "Yolanda Castro Ferrer",
    text: "Buen sitio para ponerse en forma si no tienes tiempo. Lucía siempre trata de sacar el máximo partido de tu sesión y con su maravilloso trato te hace la sesión más llevadera. Gracias Lucía."
  },
  {
    name: "Nuria Rodriguez Posada",
    text: "Puedo garantizar que los resultados son reales. The Wonder Clinic cambia tu cuerpo y tu mente. Dar las gracias especialmente a Lucía y María por su profesionalidad y buena atención al cliente."
  },
  {
    name: "Maria Torralba Cano",
    text: "Me encanta, las sesiones son cada vez más efectivas. No solo se nota a nivel muscular, la piel se nota más suave y relax general del cuerpo. Lucía un 10 en todo."
  },
  {
    name: "Marlene Álvarez Menéndez",
    text: "Magníficas profesionales, trato excelente y resultados notables. Con Lucía se pasa la sesión volando, siempre intentando superar las últimas sesiones. 100% recomendable tanto Wonder como tratamientos faciales."
  },
  {
    name: "Mónica Riestra",
    text: "La sensación de bienestar y de fuerza es apreciable desde la primera sesión, así como el mejor aspecto de la piel. Lucía consigue que te encuentres como en casa sin perder la profesionalidad."
  },
  {
    name: "Sonia Gomez Abalo",
    text: "Recomendable y el tratamiento garantizado, la profesionalidad de Lucía es impresionante, con ella te sientes como en tu casa."
  },
  {
    name: "Edu Álvarez",
    text: "Magníficas profesionales, trato exquisito. El tratamiento increíble y resultados desde la segunda sesión."
  },
  {
    name: "Chusa DT",
    text: "Espectacular, ¡vaya cambio! Sin gimnasio y solo 25 minutos 2 días a la semana."
  }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / cardsToShow);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, totalPages]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, totalPages]); // Depends on totalPages inside the logic implicitly via functions

  // Swipe logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={handlePrev}
          className="p-2 md:p-3 text-[#f5a623] hover:bg-[#f5a623]/10 rounded-full transition-colors hidden md:block"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
        
        <div 
          className="overflow-hidden w-full mx-0 md:mx-4"
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 flex justify-center gap-6">
                {reviews.slice(pageIndex * cardsToShow, (pageIndex + 1) * cardsToShow).map((review, i) => (
                  <div 
                    key={i} 
                    className="bg-[#111111] rounded-[8px] p-[32px] flex flex-col justify-between"
                    style={{ 
                      border: '1px solid rgba(245, 166, 35, 0.2)',
                      width: cardsToShow === 1 ? '100%' : 'calc((100% - 48px) / 3)'
                    }}
                  >
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-[18px] h-[18px] text-[#f5a623] fill-[#f5a623]" />
                        ))}
                      </div>
                      <p className="text-white text-[14px] leading-[1.6] italic mb-6">
                        "{review.text}"
                      </p>
                    </div>
                    
                    <div className="flex flex-col mt-4 border-t border-[#f5a623]/10 pt-4">
                      <span className="text-white font-bold text-[15px]">{review.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <GoogleIcon />
                        <span className="text-[#999999] text-[12px]">Google</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleNext}
          className="p-2 md:p-3 text-[#f5a623] hover:bg-[#f5a623]/10 rounded-full transition-colors hidden md:block"
          aria-label="Siguiente"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Mobile arrows overlaid or below, but requirement says arrow navigation left/right. In mobile, they can swipe or we put arrows. Custom: */}
      <div className="flex md:hidden justify-between w-full absolute top-1/2 -translate-y-1/2 px-2 pointer-events-none">
        <button 
          onClick={handlePrev}
          className="p-3 bg-black/50 text-[#f5a623] rounded-full pointer-events-auto backdrop-blur-sm"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="p-3 bg-black/50 text-[#f5a623] rounded-full pointer-events-auto backdrop-blur-sm"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === i ? 'bg-[#f5a623]' : 'bg-[#f5a623]/30'}`}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
