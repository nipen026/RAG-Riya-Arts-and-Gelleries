import { useState } from "react";
import { REGISTER } from "../../api/api";

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
        country_code:''
    });
    const countryCodes = [
        { code: "+1", country: "USA" },
        { code: "+44", country: "UK" },
        { code: "+91", country: "India" },
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

        if (!formData.phone_number) {
            tempErrors.phone_number = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone_number)) {
            tempErrors.phone_number = "Phone number must be 10 digits.";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
        
        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Form submitted:", formData);
            const data = {
                ...formData,
                phone_number:`${formData.country_code}${formData.phone_number}`
            }
            delete data.country_code
            REGISTER(data).then((res) => {
                console.log(res);
                localStorage.setItem('access-token-user',res.data.access_token)
                localStorage.setItem('refresh-token-user',res.data.refresh_token)
            }).catch((err) => {
                console.log(err);

            })
            alert("Form submitted successfully!");
        } else {
            console.log("Validation failed.");
        }
    };

    return (
        <div className="h-screen flex items-center">
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

                        <input
                            type="password"
                            name="password"
                            className="p-2 border w-full mt-5 rounded-lg"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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

                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder="Address"
                        name="address"
                        onChange={handleChange}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

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
                        <div className="flex items-center border rounded-lg p-2">
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
            </div>
        </div>
    );
};

export default RegisterPage;
