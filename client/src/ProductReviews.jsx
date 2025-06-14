import { FaCheck, FaHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      product: "Nursing Badge",
      rating: 5,
      verified: true,
      recommends: true,
      review:
        "Absolutely love this nursing badge! It's lightweight yet sturdy, and the print is so clear. Makes identifying staff easy and stylish.",
    },
    {
      name: "Michella Chen",
      product: "Nursing Badge",
      rating: 4,
      verified: true,
      recommends: true,
      review:
        "The nursing badge is top-notch! Precise stitching, vibrant colors, and excellent quality. A perfect, professional touch to my scrubs.",
    },
    {
      name: "Priya Patel",
      product: "Nursing Badge",
      rating: 5,
      verified: true,
      recommends: true,
      review:
        "This badge is not only practical but also super cute! It adds personality to my uniform while still looking professional.",
    },
    {
      name: "Ella Wilson",
      product: "Nursing Badge",
      rating: 4,
      verified: true,
      recommends: true,
      review:
        "The design is elegant and clear. It's held up well through many shifts and even after being sanitized multiple times. Great purchase!",
    },
  ];

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`${index < rating ? "text-black" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-7xl px-4 py-8">
      <h2 className="relative mx-auto mb-10 w-fit text-center text-2xl font-bold after:absolute after:-bottom-4 after:left-1/2 after:h-1 after:w-24 after:-translate-x-1/2 after:rounded-full after:bg-green-600">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
            key={index}
            className="flex flex-col rounded-lg bg-white p-6 shadow-md"
          >
            <div className="mb-3">
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="mb-1 text-sm text-gray-500">on {review.product}</p>
              <div className="mb-2 flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>

              <div className="mb-4 flex items-center space-x-2">
                {review.verified && (
                  <div className="flex items-center text-sm text-green-600">
                    <FaCheck className="mr-1" />
                    <span>Verified Customer</span>
                  </div>
                )}
              </div>
            </div>

            <p className="mb-4 flex-grow text-gray-700">{review.review}</p>

            {review.recommends && (
              <div className="mt-auto flex items-center text-sm text-red-500">
                <FaHeart className="mr-1" />
                <span>I recommend this product</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
