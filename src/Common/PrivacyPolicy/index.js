import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>Welcome to RAG Riya arts and gifts. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc pl-5">
          <li>Personal details such as name, email, phone number, and address.</li>
          <li>Payment information for order processing.</li>
          <li>Browsing and purchase history for customer experience improvement.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc pl-5">
          <li>To process and fulfill orders.</li>
          <li>To improve our website and services.</li>
          <li>To send updates, promotions, or support-related messages.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
        <p>We do not sell or trade your personal information. However, we may share it with third-party services for order fulfillment, payment processing, and legal requirements.</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>We implement security measures to protect your personal data but cannot guarantee absolute security.</p>
      </section>
      
      
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact Information</h2>
        <p>If you have any questions, reach out to us at <strong>info.riyaartsandgalleries@gmail.com</strong>.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
