import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SigninInput, SignupInput } from "mrigangka-medium-common";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();

    type AuthType = SigninInput | SignupInput;
    const [postInputs, setPostInputs] = useState<AuthType>(
        type === "signin"
            ? { username: "", password: "" }
            : { username: "", password: "", name: "" }
    );

    const sendRequest = async () => {
        const typeUrl = type === "signin" ? "signin" : "signup";
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${typeUrl}`,
                postInputs
            );
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error:unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                alert("The Username is already registered.use something else !");
            } else {
                alert("Something went wrong, try again later!");
            }
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signin"
                                ? "Welcome Back!"
                                : "Create an account"}
                        </div>
                        <div className="text-slate-400 ">
                            {type === "signin"
                                ? "Don't have an account ?"
                                : "Already have an account?"}
                            <Link
                                to={type === "signin" ? "/" : "/signin"}
                                className="underline pl-2"
                            >
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Name"
                                placeholder="Enter Your name"
                                onChange={(e) => {
                                    setPostInputs((c) => ({
                                        ...c,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        ) : null}
                        <LabelledInput
                            label="Username"
                            placeholder="Enter your Username"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    username: e.target.value,
                                }));
                            }}
                        />
                        <LabelledInput
                            label="Password"
                            placeholder="Enter Your Password"
                            type="password"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    password: e.target.value,
                                }));
                            }}
                        />
                        <button
                            type="button"
                            onClick={sendRequest}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg w-full mt-4 text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {type === "signin" ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <div>
                <label className="block mb-2 text-sm font-medium text-white dark:text-gray-900 pt-2">
                    {label}
                </label>
                <input
                    type={type || "text"}
                    id="first_name"
                    className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder}
                    required
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
