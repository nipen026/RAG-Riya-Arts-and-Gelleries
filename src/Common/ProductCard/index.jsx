import { Link } from "react-router-dom";

const ProductCard = ({ productData }) => {
    return (
        <>
            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1  gap-5">
                {productData?.map((item, index) => {
                    return (
                        <>
                            <div className="w-full">
                                <div className="w-[300px] h-[300px]">
                                    <img src={item.image} className="rounded-lg h-full w-full object-cover" />
                                </div>
                                <div className="">
                                    
                                    <div className="mt-2  font-semibold">
                                        <Link to={'/product-details'}>
                                        <p>{item.name}</p>
                                        <div className="flex items-center gap-5">
                                            <del className="text-[#d7d7d7] text-[14px]">Rs.:- {item.actual_price}.00</del>
                                            <p>Rs.:- {item.lastPrice}.00</p>
                                        </div>
                                        </Link>      
                                    </div>
                                </div>
                            </div></>
                    )
                })}

            </div>

        </>
    )
}

export default ProductCard;

// import { useState } from "react";

// const ProductCard = ({ productData }) => {
//   return (
//     <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
//       {productData?.map((item, index) => {
//         const [currentImage, setCurrentImage] = useState(item.image);

//         return (
//           <div key={index} className="w-full">
//             <div
//               className="w-[300px] h-[300px] overflow-hidden"
//               onMouseEnter={() => item.imageHover && setCurrentImage(item.imageHover)}
//               onMouseLeave={() => setCurrentImage(item.image)}
//             >
//               <img
//                 src={currentImage}
//                 alt={item.name}
//                 className="rounded-lg h-full w-full object-cover transition-all duration-300"
//               />
//             </div>
//             <div className="mt-2 font-semibold">
//               <p>{item.name}</p>
//               <div className="flex items-center gap-5">
//                 <del className="text-[#d7d7d7] text-[14px]">Rs.:- {item.actual_price}.00</del>
//                 <p>Rs.:- {item.lastPrice}.00</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductCard;
