
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page and follow instructions.",
  },
  {
    question: "How can I update an order?",
    answer: "Go to Orders → Select order → Edit details → Save changes.",
  },
  {
    question: "How do I add a new menu item?",
    answer: "Navigate to Menu → Add Item → Fill details → Save.",
  },
  {
    question: "The dashboard is loading slowly, what do I do?",
    answer:
      "Try refreshing, clear your browser cache, or check your internet connection. Contact support if it continues.",
  },
];

const SupportTicketForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !issue) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ name, email, issue, priority, date: new Date().toLocaleString() });
    setName("");
    setEmail("");
    setIssue("");
    setPriority("Medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mx-auto mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Submit a Support Ticket</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Describe your issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      ></textarea>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Submit Ticket
      </button>
    </form>
  );
};

const Support = () => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets([ticket, ...tickets]);
    alert("Ticket submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Restaurant Manager Support
      </h2>
      <SupportTicketForm onSubmit={addTicket} />
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4  text-center">Submitted Tickets</h3>
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <p>
                  <strong>Name:</strong> {ticket.name}
                </p>
                <p>
                  <strong>Email:</strong> {ticket.email}
                </p>
                <p>
                  <strong>Issue:</strong> {ticket.issue}
                </p>
                <p>
                  <strong>Priority:</strong> {ticket.priority}
                </p>
                <p className="text-sm text-gray-400">{ticket.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white p-4 rounded-lg shadow cursor-pointer"
            >
              <summary className="font-medium">{faq.question}</summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
