import { motion } from "framer-motion";

function BrandDescription() {
  return (
    <motion.div
      className="mx-auto my-9 max-w-2xl p-6 text-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
    >
      <h1 className="text-2xl font-bold text-gray-900">
        Your Ultimate Destination for Nursing Essentials
      </h1>
      <p className="mt-4 text-gray-700">
        <span className="font-semibold">Seemly Professionals</span> is your
        one-stop shop for all things nursing—where practicality meets passion!
      </p>
      <p className="mt-3 text-gray-700">
        Our carefully curated collection of high-quality nursing accessories
        reflects your commitment and hard work.{" "}
        <span className="font-semibold">Seemly Professionals</span> is more than
        just a brand; it’s a celebration of nurses worldwide. Every product
        blends function with style—because you deserve the very best.
      </p>
    </motion.div>
  );
}

export default BrandDescription;
