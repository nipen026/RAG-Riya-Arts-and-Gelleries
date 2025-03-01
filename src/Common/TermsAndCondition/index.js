import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>Welcome to RAG Riya arts and gifts. By using our website and purchasing our products, you agree to comply with the following terms and conditions.</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">2. Ordering & Payments</h2>
        <ul className="list-disc pl-5">
          <li>All orders must be <strong>prepaid</strong>. <strong>Cash on Delivery (COD) is not available.</strong></li>
          <li>Payments must be made through our accepted payment methods at checkout.</li>
          <li>Orders will be processed only after payment confirmation.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">3. Shipping & Delivery</h2>
        <ul className="list-disc pl-5">
          <li>We aim to dispatch all orders within 7 Working Days.</li>
          <li>Delivery timelines vary based on location and courier services.</li>
          <li>We are not responsible for delays caused by courier companies or unforeseen circumstances.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">4. Cancellations & Refunds</h2>
        <ul className="list-disc pl-5">
          <li><strong>Once an order is placed, cancellations are not allowed.</strong></li>
          <li>Refunds or replacements are only provided for defective or damaged products (proof required).</li>
          <li>If you receive a damaged item, contact us within 7 days with photos.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">5. Returns & Exchanges</h2>
        <ul className="list-disc pl-5">
          <li>We do not accept returns or exchanges unless the product is defective.</li>
          <li>Custom or personalized items cannot be returned or exchanged.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">6. Product Descriptions</h2>
        <p>We strive to provide accurate descriptions and images, but slight variations may occur.</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">7. Privacy Policy</h2>
        <p>We value your privacy and ensure that your personal details are kept secure.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
        <p>For any queries, reach out to us at <strong>info.riyaartsandgalleries@gmail.com</strong>.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
