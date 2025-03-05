import Slider from "react-slick";
import { GET_ALL_BANNERS } from "../../api/api";
import { useEffect, useState } from "react";

const Banner = () => {
    const [banner, setBanner] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,       // Enables auto-slide
        autoplaySpeed: 3000,  // Slide every 3 seconds
        pauseOnHover: true,   // Pause autoplay on hover
        responsive: [
            {
                breakpoint: 1024, // For tablets & small desktops
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,

                },
            },
            {
                breakpoint: 768, // For mobile landscape
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,

                },
            },

        ],
    };


    useEffect(() => {
        getAllBanners();
    }, []);

    const getAllBanners = () => {
        GET_ALL_BANNERS()
            .then((res) => {
                setBanner(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="slider-container">
            {banner.length == 1 ? banner.map((f, i) => (
                <div
                    key={i}
                    className="w-full h-[80vh] max-lg:h-[60vh] max-md:h-[50vh] max-sm:h-[40vh]"
                >
                    <img
                        src={f.image}
                        className="w-full h-full object-center
                     object-cover  bg-no-repeat"
                        alt={f.name}
                    />
                </div>
            )) :
                <Slider {...settings}>
                    {banner.map((f, i) => (
                        <div
                            key={i}
                            className="w-full h-[80vh] max-lg:h-[60vh] max-md:h-[50vh] max-sm:h-[40vh]"
                        >
                            <img
                                src={f.image}
                                className="w-full h-full object-center
                                  object-cover  bg-no-repeat"
                                alt={f.name}
                            />
                        </div>
                    ))}
                </Slider>}
        </div>
    );
};

export default Banner;
