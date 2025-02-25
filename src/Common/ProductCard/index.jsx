import { Link } from "react-router-dom";

const ProductCard = ({ productData }) => {
    return (
        <>
            <div className="grid grid-cols-4 max-xl:grid-cols-2 max-2xl:grid-cols-3 max-sm:grid-cols-1  gap-5">
                {productData?.filter((obj)=>obj.status === 'IN_STOCK').map((item, index) => {
                    return (
                        <>
                            <div className="w-full max-lg:flex max-lg:justify-center max-lg:flex-col max-lg:items-center">
                                <div className="w-[300px] h-[300px]">
                                    <img src={item.image} className="rounded-lg h-full w-full object-cover bg-no-repeat" />
                                </div>
                                <div className="">
                                    
                                    <div className="mt-2  font-semibold">
                                        <Link to={'/product-details'} state={item}>
                                        <p>{item.name}</p>
                                        <div className="flex items-center gap-5">
                                            {/* <del className="text-[#d7d7d7] text-[14px]">Rs.:- {item.actual_price}.00</del> */}
                                            <p>Rs.:- {item.price}.00</p>
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
