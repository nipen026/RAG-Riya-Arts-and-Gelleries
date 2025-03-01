import React, { useState } from "react";
import { LOGIN } from "../../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};

        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Invalid email format.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            LOGIN(formData)
                .then((res) => {
                    localStorage.setItem("access-token-user", res.data.detail.access_token);
                    localStorage.setItem("refresh-token-user", res.data.detail.refresh_token);
                    localStorage.setItem("userData", JSON.stringify(res.data.user));
                    navigate("/");

                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Invalid Credentials');
                    // window.location.reload()
                });
        }
    };

    return (
        <div className="h-screen flex items-center">
            <Toaster/>
            <div className="shadow-2xl w-[400px] rounded-xl py-6 mx-auto px-6">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="p-2 border w-full rounded-lg pr-10"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[12px] transform text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-[#f0686a] text-white px-6 py-2 rounded-lg hover:bg-white border-[1px] border-[#f0686a] transition-all ease-in hover:text-[#f0686a] w-full"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center my-3">
                    <p>
                        Don't have an account?{" "}
                        <span className="text-[#f0686a] underline cursor-pointer" onClick={() => navigate("/register")}>
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
