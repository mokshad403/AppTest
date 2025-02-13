import React, { useState } from 'react';
import { Heart, Gift, ArrowRight, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingText = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="h-8 text-xl text-pink-600 mb-8 overflow-hidden">
      <motion.div
        key={currentTextIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {texts[currentTextIndex]}
      </motion.div>
    </div>
  );
};

const FloatingHeart = ({ index }) => {
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 10;
  const randomX = Math.random() * 100;
  
  return (
    <motion.div
      initial={{ y: '100vh', x: `${randomX}vw`, opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-red-400 opacity-50"
    >
      ❤️
    </motion.div>
  );
};

const BackgroundHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <FloatingHeart key={i} index={i} />
      ))}
    </div>
  );
};

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://example.com/your-romantic-song.mp3'));

  React.useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed top-4 right-4 z-50 bg-red-500 p-2 rounded-full shadow-lg"
    >
      {isPlaying ? 
        <VolumeX className="w-6 h-6 text-white" /> : 
        <Volume2 className="w-6 h-6 text-white" />
      }
    </button>
  );
};

const MemoryTimeline = () => {
  const memories = [
    { date: "First Meet", description: "The day our eyes met..." },
    { date: "First Date", description: "Our magical first date..." },
    { date: "First Kiss", description: "Under the starlit sky..." },
  ];

  return (
    <div className="max-w-md mx-auto space-y-4">
      {memories.map((memory, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white/80 p-4 rounded-lg shadow-lg"
        >
          <h3 className="font-bold text-red-600">{memory.date}</h3>
          <p className="text-gray-700">{memory.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

const LoveCoupons = () => {
  const coupons = [
    "One Free Hug 🤗",
    "One Romantic Date 🌹",
    "One Wish Granted ⭐",
    "One Movie Night 🎬"
  ];

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {coupons.map((coupon, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-red-100 p-4 rounded-lg shadow text-center cursor-pointer"
        >
          <p className="text-red-600 font-medium">{coupon}</p>
        </motion.div>
      ))}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGift, setShowGift] = useState(false);

  const handleMcdOrder = () => {
    window.open('https://www.mcdonalds.com', '_blank');
  };

  const Page1 = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 text-center"
    >
      <div className="animate-bounce mb-8">
        <Heart className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Happy Valentine's Day Shalu❤️
      </h1>
      <TypingText 
        texts={[
          'To the most beautiful girl in the world...',
          'To my soulmate...',
          'To my everything...'
        ]}
      />
      <button
        onClick={() => setCurrentPage(2)}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all"
      >
        Next <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );

  const Page2 = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 text-center"
    >
      <div className="max-w-md mx-auto mb-8">
        <p className="text-xl text-pink-800 leading-relaxed">
          Missing you a lot babes. Can't wait to meet you my cutie patotie, 
          my koochie poochie, my smartie, my hottie, my shawtiee. 
          ❤️💝✨
        </p>
      </div>
      <MemoryTimeline />
      <button
        onClick={() => setCurrentPage(3)}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all mt-8"
      >
        Click here for your Valentine Day Gift <Gift className="w-4 h-4" />
      </button>
    </motion.div>
  );

  const Page3 = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4"
    >
      {!showGift ? (
        <motion.div
          onClick={() => setShowGift(true)}
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Gift className="w-32 h-32 text-red-500" />
          <p className="text-lg text-pink-800 mt-4">Click to open your gift!</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <img
            src="/api/placeholder/300/300"
            alt="Valentine's Gift"
            className="mx-auto rounded-lg shadow-lg mb-8"
          />
          <LoveCoupons />
          <button
            onClick={handleMcdOrder}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto transition-all mt-8"
          >
            Order from McD <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="font-sans relative">
      <BackgroundHearts />
      <AudioPlayer />
      <AnimatePresence mode="wait">
        {currentPage === 1 && <Page1 />}
        {currentPage === 2 && <Page2 />}
        {currentPage === 3 && <Page3 />}
      </AnimatePresence>
    </div>
  );
};

export default App;
