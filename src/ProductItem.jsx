import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function ProductItem({ product, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => navigate(`/products/${product.category}/${product.slug}`)}
      className="cursor-pointer rounded-lg border p-4 shadow-md"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="mb-3 h-64 w-full rounded-md object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.jpg";
        }}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="text-lg font-bold text-green-600">
        {formatCurrency(product.price)}
      </p>
    </motion.div>
  );
}

export default ProductItem;
