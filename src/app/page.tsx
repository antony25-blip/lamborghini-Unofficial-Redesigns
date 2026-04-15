'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const modelsData = {
  revuelto: {
    name: "Revuelto",
    subtitle: "From Now On",
    engine: "V12 Hybrid",
    power: "1015 CV",
    topSpeed: ">350 km/h",
    accel: "2.5s (0-100 km/h)",
    img: "/revuelto.png",
    description: "The first High Performance Electrified Vehicle (HPEV) hybrid super sports car by Lamborghini. Relentless power meets electrified innovation."
  },
  temerario: {
    name: "Temerario",
    subtitle: "You Can't Hide",
    engine: "V8 Twin-Turbo Hybrid",
    power: "907 CV",
    topSpeed: ">340 km/h",
    accel: "2.7s (0-100 km/h)",
    img: "/temerario.png",
    description: "A new era of the Lamborghini super sports car. Temerario takes hybrid performance to the extreme."
  },
  urus_se: {
    name: "Urus SE",
    subtitle: "Dare To Live More",
    engine: "V8 PHEV",
    power: "800 CV",
    topSpeed: "312 km/h",
    accel: "3.4s (0-100 km/h)",
    img: "/urus_se.png",
    description: "The first plug-in hybrid Super SUV, delivering unparalleled performance, driving emotion and luxury."
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedModel, setSelectedModel] = useState<keyof typeof modelsData | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#111] text-white overflow-hidden">
      
      {/* ----------------- MODALS ----------------- */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-20"
          >
            <button onClick={() => setSelectedModel(null)} className="absolute top-6 right-10 text-gray-400 hover:text-white transition-colors text-4xl">&times;</button>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-[#111] border border-gray-800 w-full max-w-6xl h-full md:h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
               <div className="flex-1 relative h-64 md:h-full">
                 <Image src={modelsData[selectedModel].img} alt={modelsData[selectedModel].name} fill className="object-cover" />
               </div>
               <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <h4 className="text-[#e6b31e] tracking-[5px] uppercase mb-2 text-sm">{modelsData[selectedModel].subtitle}</h4>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-8">{modelsData[selectedModel].name}</h2>
                  <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">{modelsData[selectedModel].description}</p>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-gray-800 pt-8">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Max Power</p>
                      <p className="text-2xl font-bold">{modelsData[selectedModel].power}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">0-100 km/h</p>
                      <p className="text-2xl font-bold">{modelsData[selectedModel].accel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Top Speed</p>
                      <p className="text-2xl font-bold">{modelsData[selectedModel].topSpeed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Engine</p>
                      <p className="text-xl font-bold">{modelsData[selectedModel].engine}</p>
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----------------- END MODALS ----------------- */}


      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#111]/95 backdrop-blur-md py-4 border-b border-gray-800' : 'bg-transparent py-6'} px-10 flex justify-between items-center`}>
        <div className="flex gap-8 text-xs font-bold tracking-widest uppercase hidden md:flex">
          <a href="#models" className="hover:text-[#e6b31e] transition-colors">Models</a>
          <a href="#motorsport" className="hover:text-[#e6b31e] transition-colors">Motorsport</a>
        </div>
        <div className="flex items-center justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png" alt="Logo" className={`transition-all duration-300 object-contain ${scrolled ? 'h-10' : 'h-14'}`} />
        </div>
        <div className="flex gap-8 text-xs font-bold tracking-widest uppercase hidden md:flex">
          <a href="#dealers" className="hover:text-[#e6b31e] transition-colors">Dealerships</a>
          <a href="#store" className="hover:text-[#e6b31e] transition-colors">Store</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pl-[10vw]">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[1.05] contrast-[1.15] saturate-[1.2]"
        >
          <source src="/HeroSection.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#111]/90 to-transparent z-10" />
        
        <motion.div 
          className="relative z-20"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.h4 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 tracking-[5px] uppercase mb-4 text-xl"
          >
            Lamborghini
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 max-w-3xl leading-none shadow-black drop-shadow-2xl"
          >
            Driving Humans Beyond
          </motion.h1>
          <motion.a 
            href="#models"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="inline-flex items-center justify-center py-4 px-10 border border-gray-500 hover:bg-white hover:text-black transition-colors font-bold tracking-widest text-sm hex-btn bg-black/30 backdrop-blur-sm"
          >
            <span className="skew-x-[10deg]">Explore Models</span>
          </motion.a>
        </motion.div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-32 px-[5vw]">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16"
        >
          Models
        </motion.h2>

        <div className="flex flex-col gap-32">
          {/* Revuelto */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 group cursor-pointer"
            onClick={() => setSelectedModel('revuelto')}
          >
            <div className="flex-1 w-full overflow-hidden relative h-[300px] md:h-[500px]">
              <Image src="/revuelto.png" alt="Revuelto" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 px-8">
              <h3 className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-2">Revuelto</h3>
              <p className="text-gray-400 tracking-[4px] uppercase mb-8">From Now On</p>
              <button onClick={() => setSelectedModel('revuelto')} className="font-bold tracking-widest group-hover:text-[#e6b31e] transition-colors flex items-center gap-2 uppercase">
                Explore The Model <span className="group-hover:translate-x-2 transition-transform">⟶</span>
              </button>
            </div>
          </motion.div>

          {/* Temerario */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-center gap-12 group cursor-pointer"
            onClick={() => setSelectedModel('temerario')}
          >
            <div className="flex-1 w-full overflow-hidden relative h-[300px] md:h-[500px]">
              <Image src="/temerario.png" alt="Temerario" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 px-8 text-left md:text-right">
              <h3 className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-2">Temerario</h3>
              <p className="text-gray-400 tracking-[4px] uppercase mb-8">You Can't Hide</p>
              <button onClick={() => setSelectedModel('temerario')} className="font-bold tracking-widest group-hover:text-[#e6b31e] transition-colors flex items-center md:flex-row-reverse gap-2 uppercase">
                Explore The Model <span className="group-hover:-translate-x-2 transition-transform">⟵</span>
              </button>
            </div>
          </motion.div>

          {/* Urus SE */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 group cursor-pointer"
            onClick={() => setSelectedModel('urus_se')}
          >
            <div className="flex-1 w-full overflow-hidden relative h-[300px] md:h-[500px]">
              <Image src="/urus_se.png" alt="Urus SE" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 px-8">
              <h3 className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-2">Urus SE</h3>
              <p className="text-gray-400 tracking-[4px] uppercase mb-8">Dare To Live More</p>
              <button onClick={() => setSelectedModel('urus_se')} className="font-bold tracking-widest group-hover:text-[#e6b31e] transition-colors flex items-center gap-2 uppercase">
                Explore The Model <span className="group-hover:translate-x-2 transition-transform">⟶</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Motorsport Section */}
      <section id="motorsport" className="relative py-40 border-y border-gray-800 overflow-hidden bg-[#0a0a0b]">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-20 pointer-events-none mix-blend-color-dodge">
          <Image src="/gt3.png" alt="Motorsport background" fill className="object-cover" unoptimized />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-[5vw]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-20"
          >
            <h4 className="text-[#e6b31e] tracking-[5px] uppercase mb-4 text-sm font-bold">Squadra Corse</h4>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Motorsport</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Lamborghini Squadra Corse represents the pinnacle of performance and racing heritage. From the Super Trofeo one-make series to the grueling endurance races in the GT3 and LMDh categories, we race to push human boundaries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "SC63 LMDh",
                subtitle: "Endurance Prototype",
                img: "/sc63.png"
              },
              {
                title: "Huracán GT3 EVO2",
                subtitle: "GT Racing Excellence",
                img: "/gt3.png"
              },
              {
                title: "Super Trofeo",
                subtitle: "The Ultimate One-Make",
                img: "/trofeo.png"
              }
            ].map((racecar, idx) => (
              <motion.div 
                key={racecar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative h-96 overflow-hidden border border-gray-800 bg-[#111]"
              >
                {racecar.img ? (
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-[2px] group-hover:blur-none bg-[#111]">
                    <Image src={racecar.img} alt={racecar.title} fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-all duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <p className="text-[#e6b31e] text-xs font-bold uppercase tracking-widest mb-1">{racecar.subtitle}</p>
                  <h3 className="text-2xl font-black uppercase tracking-widest">{racecar.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-[5vw] bg-black">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div className="flex flex-col md:flex-row gap-8 text-sm font-bold tracking-widest uppercase text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Company</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <div className="text-left md:text-right">
            <span className="block text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">Follow Us</span>
            <div className="flex justify-start md:justify-end gap-4">
              {['IN', 'IG', 'YT'].map(social => (
                <a key={social} href="#" className="w-10 h-10 border border-gray-500 flex items-center justify-center text-xs hover:bg-white hover:text-black transition-colors hex-btn">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-12 text-center md:text-left">
          <p className="text-gray-500 text-xs tracking-widest leading-loose">
            <strong>Concept Design by Antony.</strong><br/>
            Not affiliated with Automobili Lamborghini S.p.A. All logos, images, and trademarks belong to their respective owners. <br/>
            Created as a personal portfolio piece. Copyright © 2025.
          </p>
        </div>
      </footer>
    </main>
  );
}
