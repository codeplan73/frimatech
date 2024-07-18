"use client";

import { useState } from "react";

const MessagePage = () => {
  const [message, setMessage] = useState("");

  const messageToSend = {
    text: "Hello, I would like to make an order",
    contact: "+2348168189258",
    items: [
      {
        name: "Product 1",
        quantity: 1,
        price: 1000,
      },
      {
        name: "Product 2",
        quantity: 2,
        price: 2000,
      },
    ],
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Convert messageToSend object to a string representation
    const messageString = `Order Request: ${messageToSend.text}, Contact: ${
      messageToSend.contact
    }, Items: ${messageToSend.items
      .map(
        (item) =>
          `${item.name} (Quantity: ${item.quantity}, Price: ${item.price})`
      )
      .join(", ")}`;
    const whatsappNumber = "+2349168189258"; // Replace with the WhatsApp number you want to send messages to
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      messageString
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="container py-20 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col w-6/12 gap-8 p-8">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="py-4 font-bold text-white bg-blue-500 rounded-md"
        >
          Send to WhatsApp
        </button>
      </form>
    </div>
  );
};

export default MessagePage;
