import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [showText, setShowText] = useState(false);

  const desktopImages = ["/Logo-1.webp", "/Logo-2.webp"];
  const mobileImages = [
    "/badge.webp",
    "/badge-1.webp",
    "/mobilel.webp",
    "/loogo.webp",
    "/mobilelog.webp",
    "/mobilelo.webp",
    "/mobileloo.webp",
  ];

  // Preload images
  const preloadImages = (imageArray) => {
    imageArray.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  useEffect(() => {
    preloadImages([...desktopImages, ...mobileImages]);

    setActiveImage(0);

    const initialTextTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    let textTimer;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % mobileImages.length);
      setShowText(false);
      textTimer = setTimeout(() => {
        setShowText(true);
      }, 1000);
    }, 7000);

    return () => {
      clearTimeout(initialTextTimer);
      clearTimeout(textTimer);
      clearInterval(interval);
    };
  }, [mobileImages.length]);

  const isGreenTheme = activeImage % 2 === 0;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop Images */}
      <div className="relative hidden h-[500px] w-full sm:block">
        <AnimatePresence>
          {desktopImages.map(
            (image, index) =>
              activeImage % 2 === index && (
                <motion.img
                  key={`desktop-${index}`}
                  src={image}
                  alt={`Nursing Accessories Desktop ${index + 1}`}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Images */}
      <div className="relative h-[350px] w-full sm:hidden">
        <AnimatePresence>
          {mobileImages.map(
            (image, index) =>
              activeImage === index && (
                <motion.img
                  key={`mobile-${index}`}
                  src={image}
                  alt={`Nursing Accessories Mobile ${index + 1}`}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Text Overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute left-[10%] top-[15%] hidden p-3 font-bigshoulders text-white md:left-[30%] md:top-[15%] md:block lg:left-[40%] lg:top-[25%]"
          >
            <h1 className="text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
              Limited Time Only
            </h1>
            <h2
              className={`mt-2 text-3xl font-extrabold ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] bg-clip-text text-transparent"
                  : "text-blue-500"
              } md:text-4xl lg:text-7xl`}
            >
              Up to 20% Off
            </h2>

            <p className="mt-4 text-lg text-white md:text-xl lg:text-2xl">
              Upgrade your workwear with comfort, quality,
              <br className="hidden md:inline" />
              and unbeatable deals.
            </p>
            <button
              onClick={() => navigate("/products")}
              className={`mt-6 rounded-lg px-8 py-4 text-xl font-semibold text-white transition-transform duration-300 hover:scale-105 ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Text Overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col p-4 font-bigshoulders text-black sm:hidden"
          >
            <h1 className="text-2xl font-bold uppercase">Limited Time Only</h1>

            <h2
              className={`mt-1 text-3xl font-extrabold ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] bg-clip-text text-transparent"
                  : "text-blue-500"
              }`}
            >
              Up to 20% Off
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Comfort, quality & unbeatable deals.
            </p>
            <button
              onClick={() => navigate("/products")}
              className={`mt-4 w-full max-w-[400px] rounded-lg px-5 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-105 ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;
