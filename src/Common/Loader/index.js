import Header from "../Header";

const Loader = () => {
    return (
        <>
            <Header />
            <div className="bg-white flex justify-center items-center w-full h-[calc(100vh-100px)] z-30">
                <img src="/assets/images/loader.gif" />
            </div>
        </>
    )
}

export default Loader;