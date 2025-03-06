import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Loader from "../../Common/Loader";
import PrivacyPolicy from "../../Common/PrivacyPolicy";

const PrivacyPolicyPage = () => {
    const [loader, setloader] = useState(false);
    setTimeout(() => {
        setloader(true)
    }, 2000);
    return (

        <>
            {!loader ?
                <Loader /> :
                <>
                    <Header />
                    <PrivacyPolicy />
                    <Footer />
                </>}
        </>
    )
}

export default PrivacyPolicyPage;