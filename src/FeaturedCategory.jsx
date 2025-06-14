// import { motion, useInView } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import "swiper/css";
// import "swiper/css/navigation";

// function FeaturedCategory() {
//   const navigate = useNavigate();
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const categories = [
//     { title: "Badges", image: "/badge.webp" },
//     { title: "Scrubs", image: "/scrubs.webp" },
//     { title: "Caps", image: "/nurse-cap.jpg" },
//     { title: "Tees", image: "/nurse-tees.jpg" },
//   ];

//   return (
//     <motion.div
//       ref={sectionRef}
//       initial={{ opacity: 0, x: -100 }}
//       animate={isInView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.8 }}
//       className="my-10 text-center"
//     >
//       <h1 className="text-3xl font-bold text-gray-900 underline decoration-green-500">
//         Featured Categories
//       </h1>

//       {/* 🔹 Large Screens (Grid Layout) */}
//       <div className="mx-auto hidden max-w-7xl grid-cols-2 gap-8 p-6 md:hidden lg:grid lg:grid-cols-4">
//         {categories.map((item, index) => (
//           <motion.div
//             key={index}
//             onClick={() => navigate("/products")}
//             className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-300 p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//             initial={{ opacity: 0, x: -50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: index * 0.2, duration: 0.8 }}
//           >
//             <img
//               src={item.image}
//               className="h-52 w-48 rounded-lg object-cover"
//               alt={item.title}
//             />
//             <h1 className="mt-4 text-xl font-semibold text-gray-900">
//               {item.title}
//             </h1>
//           </motion.div>
//         ))}
//       </div>

//       {/* 🔹 Medium & Small Screens (SwiperJS) */}
//       <div className="mx-5 md:block lg:hidden">
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation
//           breakpoints={{
//             480: { slidesPerView: 2.2 }, // Small screens → 2.2 slides per view
//             768: { slidesPerView: 3 }, // Medium screens → 3 slides per view
//           }}
//         >
//           {categories.map((item, index) => (
//             <SwiperSlide key={index}>
//               <motion.div
//                 onClick={() => navigate("/products")}
//                 className="my-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-300 p-8 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={isInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ delay: index * 0.2, duration: 0.6 }}
//               >
//                 <img
//                   src={item.image}
//                   className="h-52 w-48 rounded-lg object-cover"
//                   alt={item.title}
//                 />
//                 <h1 className="mt-4 text-xl font-semibold text-gray-900">
//                   {item.title}
//                 </h1>
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </motion.div>
//   );
// }

// export default FeaturedCategory;
