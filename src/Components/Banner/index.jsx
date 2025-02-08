import Slider from "react-slick";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className="w-full h-[calc(100vh-150px)]">
                        <img src="/assets/images/banner-3.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full h-[calc(100vh-150px)]">
                        <img src="/assets/images/banner-4.jpg" className="w-full h-full object-contain" />
                    </div>
                </Slider>
            </div>

        </>
    )
}

export default Banner;