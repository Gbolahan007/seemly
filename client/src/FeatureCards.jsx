import { FaTruck, FaClipboardCheck, FaClock, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const FeatureCards = () => {
  const features = [
    {
      icon: <FaTruck size={40} className="text-green-600" />,
      title: "On-time Delivery",
      description: "1-2 day lead time on in-stock products",
    },
    {
      icon: <FaClipboardCheck size={40} className="text-blue-600" />,
      title: "100% Accuracy",
      description: "All your products when you need them...",
    },
    {
      icon: <FaClock size={40} className="text-yellow-600" />,
      title: "Fast Response Times",
      description: "Expect responses in hours, not days...",
    },
    {
      icon: <FaHeart size={40} className="text-red-600" />,
      title: "Personalized Care",
      description: "We take pride in having 100% satisfaction",
    },
  ];

  return (
    <div className="mx-auto mt-20 max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            {feature.icon}
            <h1 className="mt-4 text-xl font-bold">{feature.title}</h1>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
