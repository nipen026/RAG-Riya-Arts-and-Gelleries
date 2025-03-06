import { useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import Loader from "../../Common/Loader";
import AdditionProduct from "../../Components/Addition-product";
import Banner from "../../Components/Banner";
import Product from "../../Components/Product";
import { Helmet } from "react-helmet-async";
import { GET_ALL_BANNERS } from "../../api/api";

const Home = () => {
    const [loader, setloader] = useState(false);
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        getAllBanners();
    }, []);

    const getAllBanners = () => {
        GET_ALL_BANNERS()
            .then((res) => {
                setBanner(res.data);
                setloader(true)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Helmet>
                {/* Basic SEO */}
                <title>Rag Riya Arts and Gifts | Unique & Personalized Gifts</title>
                <meta name="description" content="Discover unique and personalized gifts for every occasion at Rag Riya Arts and Gifts. Perfect for birthdays, anniversaries, and special moments!" />
                <meta name="keywords" content="Rag Riya Arts and Gifts, unique gifts, personalized gifts, handmade gifts, birthday gifts, anniversary gifts" />
                <meta name="author" content="Rag Riya Arts and Gifts" />

                {/* Open Graph (for Facebook, LinkedIn) */}
                <meta property="og:title" content="Rag Riya Arts and Gifts | Unique & Personalized Gifts" />
                <meta property="og:description" content="Find beautiful, handcrafted gifts for your loved ones. Shop now for the best collection!" />
                <meta property="og:image" content="https://api.riyaartsandgifts.in/media/banners/grand-opening-best-online-giftshop-surat-20-off.jpg" />
                <meta property="og:url" content="https://riyaartsandgifts.in" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rag Riya Arts and Gifts | Unique & Personalized Gifts" />
                <meta name="twitter:description" content="Explore our collection of handmade and customized gifts for every occasion." />
                <meta name="twitter:image" content="https://api.riyaartsandgifts.in/media/banners/grand-opening-best-online-giftshop-surat-20-off.jpg" />
                <meta name="twitter:site" content="@ragriyaarts" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://riyaartsandgifts.in" />

                {/* Structured Data (JSON-LD for SEO) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "name": "Rag Riya Arts and Gifts",
                        "url": "https://riyaartsandgifts.in",
                        "description": "Discover unique and personalized gifts for every occasion at Rag Riya Arts and Gifts.",
                        "logo": "https://riyaartsandgifts.in/assets/images/logo.png",
                        "sameAs": [
                            "https://www.facebook.com/profile.php?id=61573508771852",
                            "https://www.instagram.com/rag_gifts/"
                        ]
                    })}
                </script>
            </Helmet>
            {!loader ?
                <Loader /> :
                <>
                    <Header />
                    <Banner banner={banner}/>
                    <Product />
                    <div className="w-full h-[600px] max-lg:h-[300px]">
                        <img src="/assets/images/3.jpg" className="max-xl:object-cover w-full h-full object-cover object-center" />
                    </div>
                    {/* <AdditionProduct /> */}
                    <Footer />
                </>
            }
        </>
    )
}

export default Home;