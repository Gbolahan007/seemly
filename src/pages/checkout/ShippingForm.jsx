const ShippingForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  loading,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold">Shipping Information</h2>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className={`w-full rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className={`w-full rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="mb-2 block text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className={`w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="mb-2 block text-gray-700" htmlFor="address">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          className={`w-full rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register("address", {
            required: "Address is required",
          })}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* City, ZIP, Country */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="col-span-2 md:col-span-1">
          <label className="mb-2 block text-gray-700" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            className={`w-full rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="zipCode">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            className={`w-full rounded-lg border ${errors.zipCode ? "border-red-500" : "border-gray-300"} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("zipCode", {
              required: "ZIP code is required",
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: "Invalid ZIP code format",
              },
            })}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.zipCode.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-gray-700" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("country", {
              required: "Country is required",
            })}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Nigeria">Nigeria</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
        disabled={loading}
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;
