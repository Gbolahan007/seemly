const PaymentForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  total,
  formatCurrency,
  setStep,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold">Billing Information</h2>

      {/* First Name */}
      <div className="mb-4">
        <label className="mb-2 block text-gray-600" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className={`w-full rounded-lg border ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("firstName", {
            required: "First name is required",
          })}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="mb-2 block text-gray-600" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className={`w-full rounded-lg border ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("lastName", {
            required: "Last name is required",
          })}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="mb-2 block text-gray-600" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className={`w-full rounded-lg border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Total Amount - Readonly */}
      <div className="mb-6">
        <label className="mb-2 block text-gray-600">Amount</label>
        <input
          type="text"
          value={formatCurrency(total)}
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-600"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="submit"
          className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Pay ${formatCurrency(total)}`
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
