import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [customText, setCustomText] = useState("");

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleExtraImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setExtraImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Image */}
        <div>
          {mainImage ? (
            <img src={mainImage} alt="Uploaded" className="w-full rounded-lg" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Main Image Preview</span>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            {extraImages.map((src, index) => (
              <img key={index} src={src} alt={`Extra ${index}`} className="w-16 h-16 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Right Section - Details */}
        <div>
          <h1 className="text-2xl font-semibold">3D MINIATURE FRAME</h1>
          <p className="text-lg text-gray-600">Rs. 2,850.00</p>
          <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">Sold Out</span>
          <p className="mt-4 text-gray-700">
            Our customized 3D miniature frames bring your memories to life in stunning detail.
          </p>

          {/* Select Theme */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Theme</label>
            <select className="mt-1 w-full border-gray-300 rounded-lg shadow-sm">
              <option>Theme 1</option>
              <option>Theme 2</option>
            </select>
          </div>

          {/* File Uploads */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Main Photo</label>
            <input type="file" onChange={handleMainImageUpload} className="w-full border p-2 rounded-lg" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Extra Images</label>
            <input type="file" multiple onChange={handleExtraImagesUpload} className="w-full border p-2 rounded-lg" />
          </div>

          {/* Custom Text */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Customize Name/Date/Text</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Buy Button */}
          <div className="mt-6">
            <Link to={'/cart'}>
              <button className="w-full border-[1px] border-[#f0686a] text-[#f0686a] hover:bg-[#f0686a] hover:text-white py-2 rounded-lg font-semibold">ADD TO CART</button>
            </Link>
          </div>

          <div className="mt-6">
            <Link to={'/checkout'}>
            <button className="w-full bg-[#f0686a] text-white py-2 rounded-lg hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold">Buy it now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
