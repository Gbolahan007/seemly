import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaInstagram,
  FaPaperPlane,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    toast.success("Thank you! Your message has been sent successfully.");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-gray-900">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <a
                href="mailto:Seemlyprofessionals@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:bg-green-200">
                  <FaEnvelope className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 group-hover:text-blue-600">
                    Seemlyprofessionals@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/9031982940"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:bg-green-200">
                  <FaWhatsapp className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 group-hover:text-green-600">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/seemly_professionals?igsh=MWptMW1scDFqcG91YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:bg-green-200">
                  <FaInstagram className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-pink-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Instagram</p>
                  <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 group-hover:text-pink-600">
                    Follow us on Instagram
                  </p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@seemly_profession?_t=ZM-8vYXnzwttUF&_r=1 "
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:bg-green-200">
                  <FaTiktok className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">TikTok</p>
                  <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 group-hover:text-black">
                    Watch our TikToks
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="mb-8 text-xl font-semibold text-gray-900">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Input with underline style */}
              <div className="relative">
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-gray-800 placeholder-transparent focus:border-green-500 focus:outline-none focus:ring-0 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your Name"
                />
                <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-600">
                  Your Name
                </label>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Input with underline style */}
              <div className="relative">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-gray-800 placeholder-transparent focus:border-green-500 focus:outline-none focus:ring-0 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email Address"
                />
                <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-600">
                  Email Address
                </label>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Textarea with underline style */}
              <div className="relative">
                <textarea
                  {...register("message", {
                    required: "Message is required",
                  })}
                  rows="4"
                  className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-gray-800 placeholder-transparent focus:border-green-500 focus:outline-none focus:ring-0 ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Your Message"
                ></textarea>
                <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-600">
                  Your Message
                </label>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-700 px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:from-green-600 hover:to-green-800 hover:shadow-lg active:translate-y-[1px] disabled:opacity-75"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <FaPaperPlane className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
