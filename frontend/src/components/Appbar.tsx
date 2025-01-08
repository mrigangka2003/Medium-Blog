import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link
                to={"/blogs"}
                className="flex flex-col justify-center cursor-pointer"
            >
                Medium
            </Link>
            <div>
                <Link to={"/publish"}>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        New
                    </button>
                </Link>
                <Avatar name="Mrigangka" size="big" />
                <Logout />
            </div>
        </div>
    );
};
