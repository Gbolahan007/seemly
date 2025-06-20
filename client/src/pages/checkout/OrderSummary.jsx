const OrderSummary = ({
  cart,
  subtotal,
  shipping,
  tax,
  total,
  formatCurrency,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="mb-6 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex border-b border-gray-200 py-4 last:border-0"
          >
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-12 max-w-12"
                />
              ) : (
                <div className="h-12 w-12 rounded bg-gray-200"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="mt-1 font-medium text-gray-800">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-gray-200 py-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-800">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(tax)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
        <span className="font-bold text-gray-800">Total</span>
        <span className="text-xl font-bold text-blue-600">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Secure Checkout</span>
        </div>
        <p className="text-sm text-gray-600">
          Your payment information is processed securely.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
