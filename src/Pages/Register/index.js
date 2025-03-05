import { useState } from "react";
import { REGISTER } from "../../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        phone_number: "",
        gender: "M",
        country_code: '',
        pin_code: '',
        landmark: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const countryCodes = [
        { code: "", country: "--Select Country--" },
        { code: "+91", country: "India" },
        { code: "+1", country: "USA" },
        { code: "+44", country: "UK" },
        { code: "+61", country: "Australia" },
        { code: "+971", country: "UAE" },
    ];
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};

        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Invalid email format.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters.";
        }

        if (!formData.first_name) tempErrors.first_name = "First name is required.";
        if (!formData.last_name) tempErrors.last_name = "Last name is required.";
        if (!formData.address) tempErrors.address = "Address is required.";
        if (!formData.city) tempErrors.city = "City is required.";
        if (!formData.landmark) tempErrors.landmark = "Landmark is required.";
        if (!formData.pin_code) tempErrors.pin_code = "Pin Code is required.";

        if (!formData.phone_number) {
            tempErrors.phone_number = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone_number)) {
            tempErrors.phone_number = "Phone number must be 10 digits.";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        if (e.target.name === 'landmark' || e.target.name === 'address') {
            const mergeData = {
                landmark: e.target.name === 'landmark' ? e.target.value : formData.landmark,
                address: e.target.name === 'address' ? e.target.value : formData.address,
                pin_code: e.target.name === 'pin_code' ? e.target.value : formData.pin_code,
            };

            const updatedAddress = `${mergeData.landmark} ${mergeData.address} ${mergeData.pin_code}`.trim(); // Trim to remove extra spaces
            setFormData({ ...formData, landmark: mergeData.landmark, pin_code: mergeData.pin_code, address: updatedAddress });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }




        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const data = {
                ...formData,
                phone_number: `${formData.country_code}${formData.phone_number}`
            }
            delete data.country_code
            delete data.landmark
            delete data.pin_code


            REGISTER(data).then((res) => {
                localStorage.setItem('access-token-user', res.data.access_token)
                localStorage.setItem('refresh-token-user', res.data.refresh_token)
                navigate('/login')
            }).catch((err) => {
                console.log(err);
                toast.error('Invalid Credentials');
                // window.location.reload();
            })
            // alert("Form submitted successfully!");
        } else {
            console.log("Validation failed.");
        }
    };

    return (
        <div className="h-screen flex items-center">
            <Toaster />
            <div className="shadow-2xl w-[700px] rounded-xl py-6 mx-auto px-6">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-6">Register</h1>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="p-2 border w-full mt-5 rounded-lg pr-10"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                            </button>
                            {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <input
                                type="text"
                                className="p-2 border rounded-lg w-full"
                                name="first_name"
                                placeholder="First name"
                                onChange={handleChange}
                            />
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                className="p-2 border rounded-lg w-full"
                                name="last_name"
                                placeholder="Last name"
                                onChange={handleChange}
                            />
                            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="HOUSE NO. / STREET / LANDMARK / AREA "
                            name="landmark"
                            onChange={handleChange}
                        />
                        {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark}</p>}

                    </div>
                    <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="STATE"
                        name="address"
                        onChange={handleChange}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                   <div className="mb-4">
                   <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="PIN CODE"
                        name="pin_code"
                        onChange={handleChange}
                    />
                    {errors.pin_code && <p className="text-red-500 text-sm">{errors.pin_code}</p>}
                   </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <input
                                type="text"
                                className="p-2 border rounded-lg w-full"
                                placeholder="City"
                                name="city"
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="flex items-center max-md:overflow-hidden border rounded-lg p-2">
                            <select
                                name="country_code"
                                className="bg-transparent focus:outline-none"
                                onChange={handleChange}
                                value={formData.country_code}
                            >
                                {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.code} ({country.country})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="p-2 border rounded-lg w-full"
                                placeholder="Phone Number"
                                name="phone_number"
                                onChange={handleChange}
                            />
                            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                        </div>
                        <select className="p-2 border rounded-lg w-full" name="gender" onChange={handleChange}>
                            <option value="">--Select Gender--</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-[#f0686a] text-white px-6 py-2 rounded-lg hover:bg-white border-[1px] border-[#f0686a] transition-all ease-in hover:text-[#f0686a] w-full"
                    >
                        Submit
                    </button>
                </form>
                <div className="text-center my-3">
                    <p>Already Have An Account ! <Link to={'/login'}><span className="text-[#f0686a] underline cursor-pointer">Log In</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
