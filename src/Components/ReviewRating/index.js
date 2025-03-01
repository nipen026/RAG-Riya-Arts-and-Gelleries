import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ADD_REVIEW } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";


export default function ReviewRatingComp() {

    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.rating > 0 && newReview.comment) {
            const formData = new FormData();
            formData.append("product", localStorage.getItem("productId"));
            formData.append("order_item", localStorage.getItem("orderID"));
            formData.append("rating", newReview.rating);
            formData.append("review_text", newReview.comment);

            ADD_REVIEW(formData).then((res) => {
                if (res.status == true) {
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err);
            })

        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

                <form onSubmit={handleSubmit} className="mb-6">

                    <textarea
                        placeholder="Your Review"
                        className="w-full p-2 border rounded-lg mb-2"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        required
                    />
                    <div className="flex items-center gap-2 my-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer text-2xl ${newReview.rating >= star ? "text-[#f0686a]" : "text-gray-300"}`}
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                            />
                        ))}
                    </div>
                    <button
                        className={`bg-[#f0686a] px-4 text-white py-2 ease-linear rounded-lg  text-center flex justify-center items-center text-xl hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold transition-all `}>
                        Submit Review
                    </button>
                </form>
                <div className="text-center flex justify-center">
                    <Link to={'/'}>
                    <button
                        className={`text-[#000]   py-2 ease-linear rounded-lg  text-center flex justify-center items-center text-xl  hover:underline font-semibold transition-all `}>
                        Continue Shopping
                    </button>
                    </Link>
                </div>

            </div>

        </>
    );
}
