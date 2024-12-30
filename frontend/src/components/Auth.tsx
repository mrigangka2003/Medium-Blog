import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "mrigangka-medium-common";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        name: "",
        password: "",
    });

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-400 ">
                            {type === "signin"?"Don't have an account ?":"Already have an account?"}
                            <Link to={ type==="signin"? "/signup":"/signin"} className="underline pl-2">
                                {type==="signin"?"Sign up":"Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
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
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg w-full mt-4 text-sm px-5 py-2.5 me-2 mb-2">{type==="signin" ? "signin" :"signup"}</button>
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
