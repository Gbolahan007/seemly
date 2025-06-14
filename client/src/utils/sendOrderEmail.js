// utils/sendOrderEmail.js
import emailjs from "emailjs-com";

emailjs.init("HUZ0GxF3GIhPzkSeU");

const sendOrderEmail = async ({ shippingInfo, cart, total }) => {
  const items = cart
    .map((item) => `${item.name} (x${item.quantity}) - $${item.price}`)
    .join("\n");

  const sharedParams = {
    customer_email: shippingInfo.email,
    customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
    address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.country}`,
    cart_items: items,
    total: `$${total.toFixed(2)}`,
  };

  // Email to store
  const storeParams = {
    ...sharedParams,
    to_email: "seemlyprofessional@gmail.com", // Store email
  };

  // Email to user
  const userParams = {
    ...sharedParams,
    to_email: shippingInfo.email, // User email
  };

  // Send both emails
  await emailjs.send("service_qt51krc", "template_y48cvzo", storeParams);
  await emailjs.send("service_qt51krc", "template_o51vfmc", userParams);
};

export default sendOrderEmail;
