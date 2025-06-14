import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function RelatedItem({ relatedItems }) {
  const navigate = useNavigate();
  const { slug, image, name, category, price } = relatedItems;

  return (
    <div
      onClick={() => navigate(`/product/${category}/${slug}`)}
      className="group relative flex h-[300px] w-full max-w-[200px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-lg sm:h-[350px] sm:max-w-[260px] sm:p-0 md:h-[400px] md:max-w-[300px]"
    >
      {/* Image Container */}
      <div className="relative h-3/5 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={name}
        />

        {/* Quick Action Buttons - Appear on Hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100">
            <AiOutlineEye size={16} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100">
            <AiOutlineShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-grow flex-col justify-between p-3">
        <div>
          <p className="mb-1 line-clamp-1 text-xs font-medium text-gray-500">
            {category}
          </p>
          <h3 className="line-clamp-2 text-sm font-bold text-gray-800 sm:text-base">
            {name}
          </h3>
        </div>

        <div className="mt-2">
          <p className="text-base font-semibold text-gray-900 sm:text-lg">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RelatedItem;
