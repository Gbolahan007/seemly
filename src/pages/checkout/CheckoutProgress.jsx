const CheckoutProgress = ({ step }) => {
  return (
    <div className="mb-12">
      <div className="mb-2 flex justify-between">
        <span
          className={`font-medium ${step >= 1 ? "text-blue-600" : "text-gray-500"}`}
        >
          Shipping
        </span>
        <span
          className={`font-medium ${step >= 2 ? "text-blue-600" : "text-gray-500"}`}
        >
          Payment
        </span>
        <span className="font-medium text-gray-500">Confirmation</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: step === 1 ? "33%" : "66%" }}
        ></div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
