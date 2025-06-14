import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ComingSoonModal({ isOpen, setIsOpen }) {
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative flex w-[90%] max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Text Section */}
            <div className="flex-1 p-8 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Coming Soon</h2>
              <p className="mt-4 text-lg text-gray-600">
                We are putting the finishing touches on something special for
                you.
              </p>
              <p className="mt-2 text-gray-500">
                Our team is working around the clock to deliver an exceptional
                experience.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-white transition-all hover:shadow-lg"
              >
                Close
              </button>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 items-center justify-center bg-[#f2f2f2] p-6">
              <img
                src="/badge-1.webp"
                alt="Coming Soon"
                className="w-full max-w-[200px] sm:max-w-[250px]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ComingSoonModal;
