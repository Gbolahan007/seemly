import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./cart/cartSlice";
import { useModal } from "./contexts/ModalProvider";
import { useMoveBack } from "./hooks/useMoveBack";
import Loader from "./Loader";
import { useProduct } from "./pages/useProduct";
import { useRelatedProducts } from "./pages/useRelatedProduct";
import RelatedItem from "./RelatedItem";

// Move formatter outside component to prevent recreation on each render
const formatCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Create separate tab components for better organization
const ProductDetails = ({ description }) => (
  <p className="text-base leading-relaxed text-gray-700">{description}</p>
);

const ProductReviews = () => (
  <div className="text-gray-700">
    <p className="text-base">This product has no reviews yet.</p>
  </div>
);

const QuantitySelector = ({ quantity, productId, onIncrease }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-sm font-medium text-gray-900">Quantity</h2>
      <div className="flex h-10 w-32 items-center">
        <button
          onClick={() =>
            quantity > 1 && dispatch(decreaseItemQuantity(productId))
          }
          disabled={quantity <= 1}
          className={`flex h-full w-10 items-center justify-center rounded-l-md border border-gray-300 ${
            quantity <= 1
              ? "bg-gray-100 text-gray-300"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Decrease quantity"
        >
          <AiOutlineMinus size={16} />
        </button>
        <div className="flex h-full w-12 items-center justify-center border-y border-gray-300 bg-white text-center font-medium">
          {quantity}
        </div>
        <button
          onClick={onIncrease}
          className="flex h-full w-10 items-center justify-center rounded-r-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
          aria-label="Increase quantity"
        >
          <AiOutlinePlus size={16} />
        </button>
      </div>
    </div>
  );
};

function ProductDisplay() {
  const { isLoadingProduct, product } = useProduct();
  const moveBack = useMoveBack();
  const dispatch = useDispatch();
  const { setShowModal } = useModal();
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  // Load related products only when product is loaded and has category
  const { isLoadingRelatedProduct, relatedProducts } = useRelatedProducts(
    product?.category,
    product?.id,
  );

  // Use useSelector with memoized selector function to prevent unnecessary re-renders
  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.id === product?.id),
  );

  const quantity = cartItem?.quantity || 0;

  // Only extract product data if product exists
  const { name, image, category, description, price } = product || {};

  // Memoize handlers to prevent recreation on each render
  const handleAddToCart = useMemo(() => {
    return () => {
      if (product) {
        dispatch(addItem(product));
        toast.success(`${product.name} added to cart`);
        setShowModal(true);
      }
    };
  }, [dispatch, product, setShowModal]);

  const handleIncreaseQuantity = useMemo(() => {
    return () => product && dispatch(increaseItemQuantity(product));
  }, [dispatch, product]);

  if (isLoadingProduct) return <Loader />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-white font-tektur">
      {/* Product Details */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={moveBack}
          className="mb-6 flex items-center text-gray-600 transition-colors hover:text-black"
          aria-label="Back to products"
        >
          <AiOutlineArrowLeft size={18} className="mr-1" />
          <span>Back to products</span>
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
            <img
              src={image}
              className="h-full w-full object-cover object-center sm:h-[500px]"
              alt={name}
              loading="lazy"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {category}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {name}
              </h1>
              <p className="mt-4 text-2xl font-semibold text-gray-900">
                {formatCurrency(price)}
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="relative flex space-x-8 border-b border-gray-200">
                {["details", "review"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "details" ? "Product Details" : "Reviews"}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                {activeTab === "details" ? (
                  <ProductDetails description={description} />
                ) : (
                  <ProductReviews />
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              productId={product.id}
              onIncrease={handleIncreaseQuantity}
            />

            {/* Buy and Add to Cart Buttons */}
            <div className="mt-auto flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full rounded-lg bg-black px-6 py-3 text-center font-medium text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:flex-1"
                aria-label="Buy Now"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto sm:flex-1"
                aria-label="Add To Cart"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-32 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
            You might also like
          </h2>

          {isLoadingRelatedProduct ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : relatedProducts && relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedItem) => (
                <RelatedItem key={relatedItem.id} relatedItems={relatedItem} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-gray-500">
              No related products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
