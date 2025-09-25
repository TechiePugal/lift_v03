import store from "../store/index"; // Import your Redux store

/** Open Whatsapp for essentials subscription users */
export const openWhatsappMessager = (whatsappLink) => {
  const currentUser = store?.getState()?.auth; // Access the auth slice from your Redux store

  if (currentUser?.subscriptionInfo === "Essentials" && whatsappLink) {
    // Open the WhatsApp message link in a new window
    window.open(whatsappLink, "_blank");
  } else if (!whatsappLink) {
    console.error("No WhatsApp link provided.");
    // Optionally, you can throw an error, show a message, or handle the scenario accordingly.
  } else {
    console.log("User does not have Essentials subscription.");
    // Optionally, you can show a message or handle the scenario accordingly.
  }
};
