// const payWithPaystack = ({
//   email,
//   amount,
//   firstName,
//   lastName,
//   onSuccess,
//   onClose,
// }) => {
//   // Check if Paystack is available
//   if (!window.PaystackPop) {
//     console.error("Paystack script not loaded!");
//     return;
//   }

//   // Initialize Paystack correctly
//   const handler = window.PaystackPop.setup({
//     key: "pk_test_17451f81a1c75562a680e95d9dd515b62673fcff",
//     email: email,
//     amount: amount * 100, // Convert to kobo/cents
//     currency: "NGN",
//     firstname: firstName,
//     lastname: lastName,
//     reference: "" + Math.floor(Math.random() * 1000000000),
//     callback: function (response) {
//       onSuccess(response);
//     },
//     onClose: function () {
//       if (onClose) onClose();
//     },
//   });

//   // Open the popup
//   handler.openIframe();
// };

// export default payWithPaystack;
