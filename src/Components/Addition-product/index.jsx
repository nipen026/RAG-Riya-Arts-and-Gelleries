const AdditionProduct = () => {
    return (
        <>
            <div className="container">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[50px] items-center">
                    <div className="w-full h-[400px]">
                        <img src="/assets/images/products/customize-cover-2.jpg" className="w-full h-full object-center object-cover rounded-3xl" />
                    </div>
                    <div className="text-center w-full max-w-[70%] mx-auto">
                        <p className="text-[16px] my-2 text-[#b4b4b4] text-center">Valentine's Exclusive</p>
                        <h1 className="text-[30px] my-2 font-semibold text-[#131313] text-center">Love Plaque</h1>
                        <p className="text-[16px] my-2 text-center text-black leading-7">Celebrate love in the most personal and meaningful way. This beautifully crafted plaque allows you to showcase your favorite photo alongside a heartfelt, custom message. Whether it's a romantic snapshot or a cherished moment, you can capture the essence of your relationship in a stunning, aesthetic design.</p>
                        <button className="border-[1px] rounded-lg py-2 px-5 mt-5 border-[#000] text-black">Shop Now</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[50px] items-center">

                    <div className="text-center w-full max-w-[70%] mx-auto">
                        <p className="text-[16px] my-2 text-[#b4b4b4] text-center">Valentine's Exclusive</p>
                        <h1 className="text-[30px] my-2 font-semibold text-[#131313] text-center">Love Plaque</h1>
                        <p className="text-[16px] my-2 text-center text-black leading-7">Celebrate love in the most personal and meaningful way. This beautifully crafted plaque allows you to showcase your favorite photo alongside a heartfelt, custom message. Whether it's a romantic snapshot or a cherished moment, you can capture the essence of your relationship in a stunning, aesthetic design.</p>
                        <button className="border-[1px] rounded-lg py-2 px-5 mt-5 border-[#000] text-black">Shop Now</button>
                    </div>
                    <div className="w-full h-[400px]">
                        <img src="/assets/images/products/customize-cover-2.jpg" className="w-full h-full object-cover rounded-3xl" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdditionProduct;