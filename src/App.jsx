import React, { useState, useEffect, useRef } from 'react';
import { Martini, Coins, TrendingUp, Beer, Music } from 'lucide-react';
import Matter from 'matter-js';


const generateTONSymbolPath = () => {
  return `
    M100,10 
    L180,50 
    L180,150 
    L100,190 
    L20,150 
    L20,50 
    Z
  `;
};

const Gallery = () => {
  const images = [
    '/gallery1.jpg',
    '/gallery2.jpg',
    '/gallery3.jpg',
    '/gallery4.jpg',
    '/gallery5.jpg',
    '/gallery6.jpg',
  ];

  return (
    <section id="gallery" className="py-16 bg-zinc-800">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#0098EA]">GinTONic Gallery</h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll">
          {images.concat(images).map((src, index) => (
            <div key={index} className="w-64 h-64 flex-shrink-0 mx-2">
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const LandingPage = ({ onAnimationComplete }) => {
  const [fillLevel, setFillLevel] = useState(0);

  useEffect(() => {
    const fillInterval = setInterval(() => {
      setFillLevel(prev => {
        const newLevel = prev + 0.005;
        if (newLevel >= 1) {
          clearInterval(fillInterval);
          setTimeout(onAnimationComplete, 1000);
        }
        return Math.min(newLevel, 1);
      });
    }, 50);

    return () => clearInterval(fillInterval);
  }, [onAnimationComplete]);

  const cupPath = `
    M 40,40 
    C 40,40 50,30 90,30 
    L 310,30 
    C 350,30 360,40 360,40 
    L 370,340 
    C 370,340 365,390 340,400 
    L 60,400 
    C 35,390 30,340 30,340 
    Z
  `;

  // Generate stable positions for ice cubes
  const iceCubes = Array.from({ length: 5 }, (_, i) => ({
    x: 100 + Math.random() * 200,
    y: 150 + Math.random() * 200,
    size: 20 + Math.random() * 15,
    rotation: Math.random() * 360,
    bobDuration: 3 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/backg.jpeg")' }}
      ></div>
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 text-center max-w-2xl w-full px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#0098EA] mb-8 font-custom">GinTONic Coin</h1>
        <div className="relative w-full aspect-[1/1] max-w-lg mx-auto">
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#0098EA" />
              </linearGradient>
              <clipPath id="cupClip">
                <path d={cupPath} />
              </clipPath>
              <mask id="textMask">
                <rect x="0" y="0" width="400" height="400" fill="black" />
                <text x="200" y="215" fontSize="110" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="Arial, sans-serif">TON</text>
              </mask>
              <filter id="liquidFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
            </defs>
            
            {/* Cup shadow */}
            <ellipse cx="200" cy="395" rx="150" ry="5" fill="rgba(0,0,0,0.3)" />
            
            {/* Cup outline */}
            <path d={cupPath} fill="none" stroke="#0098EA" strokeWidth="3" />
            
            <g clipPath="url(#cupClip)">
              {/* Liquid fill */}
              <rect 
                x="0" 
                y={400 - 370 * fillLevel} 
                width="400" 
                height={370 * fillLevel} 
                fill="url(#liquidGradient)"
                filter="url(#liquidFilter)"
              />

              {/* TON text revealed by liquid */}
              <rect 
                x="0" 
                y={400 - 370 * fillLevel} 
                width="400" 
                height={370 * fillLevel} 
                fill="#FFFFFF"
                mask="url(#textMask)"
              />

              {/* Ice cubes */}
              {iceCubes.map((cube, i) => (
                <g key={i} transform={`translate(${cube.x}, ${cube.y}) rotate(${cube.rotation})`}>
                  <rect
                    x={-cube.size / 2}
                    y={-cube.size / 2}
                    width={cube.size}
                    height={cube.size}
                    fill="rgba(255, 255, 255, 0.7)"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values={`0,-2; 0,2; 0,-2`}
                      dur={`${cube.bobDuration}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                </g>
              ))}
            </g>
            
            {/* Cup highlight */}
            <path d="M 50,50 Q 70,40 90,38 L 310,38 Q 330,40 350,50" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};
const Header = () => (
  <header className="bg-zinc-900 text-[#0098EA] p-6 border-b-2 border-[#0098EA]">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-4xl font-extrabold flex items-center">
        <Martini className="mr-2" />
        GinTONic 
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a 
              href="https://t.me/yourtelegramgroup" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com/yourtwitter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>
          </li>
          <li>
            <a 
              href="https://yourexchange.com/buy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Buy
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);


const Feature = ({ icon, title, description }) => (
  <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
    <div className="flex justify-center text-[#0098EA]">{icon}</div>
    <h3 className="text-2xl font-semibold mt-4 mb-2 text-center text-[#0098EA]">{title}</h3>
    <p className="text-center text-gray-300">{description}</p>
  </div>
);

const ShotGlass = ({ fillPercentage }) => (
  <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-24 h-40 pointer-events-none">
    <svg viewBox="0 0 100 160" className="w-full h-full">
      <path d="M10 10 L30 150 L70 150 L90 10 Z" fill="none" stroke="#0098EA" strokeWidth="2" />
      <path 
        d={`M30 150 L70 150 L${90 - 60 * (1 - fillPercentage)} ${10 + 140 * (1 - fillPercentage)} L${10 + 60 * (1 - fillPercentage)} ${10 + 140 * (1 - fillPercentage)} Z`} 
        fill="#0098EA"
      />
    </svg>
  </div>
);

const App = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollPercentage(Math.min(scrolled / scrollHeight, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showLanding && <LandingPage onAnimationComplete={() => setShowLanding(false)} />}
      <div className={`min-h-screen bg-zinc-900 text-white relative overflow-hidden ${showLanding ? 'hidden' : ''}`}>
        <ShotGlass fillPercentage={scrollPercentage} />
        <Header />
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-3xl mx-auto">
            <section id="about" className="mb-16">
              <h2 className="text-4xl font-bold mb-6 text-center text-[#0098EA]">Welcome to the GinTONic Bar</h2>
              <p className="text-xl text-center text-gray-300">
                Where blockchain meets mixology! Our cryptocurrency is distilled to perfection, 
                blending the smoothness of gin with the effervescence of blockchain technology. 
                Invest in GinTONic Coin and watch your portfolio get spirited away!
              </p>
            </section>
            
            <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
              <Feature 
                icon={<Beer size={48} />}
                title="High Proof Returns" 
                description="Our tokens are aged to perfection, promising returns that'll make your head spin!"
              />
              <Feature 
                icon={<TrendingUp size={48} />}
                title="On the Rocks Growth" 
                description="Watch your investments climb steadily, like the perfect pour over ice."
              />
              <Feature 
                icon={<Music size={48} />}
                title="Mixology Mastery" 
                description="Join our staking program and become a master of financial mixology!"
              />
            </section>
            
            <section id="invest" className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-[#0098EA]">Ready to Join the Party?</h2>
              <button 
                className="bg-[#0098EA] text-zinc-900 px-8 py-4 rounded-full text-2xl font-bold hover:bg-blue-400 transition-colors"
              >
                Pour Me a GinTONic!
              </button>
            </section>
          </div>
        </main>
        <footer className="bg-zinc-800 text-gray-300 text-center p-4 mt-12 border-t border-[#0098EA] relative z-10">
          <p>© 2024 GinTONic Coin Bar. Please invest responsibly. Don't drink and trade!</p>
        </footer>
      </div>
    </>
  );
};

export default App;