import { useNavigate } from "react-router-dom";
import MediumSubmitButton from "./MediumButton";
import SmallButton from "./SmallButton";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Header() {
    try {
        const navigate = useNavigate();

        return (
            <header className=" h-20 w-full bg-mainColors-lightGray bg-opacity-50 grid grid-cols-3 items-center content-center p-4  ">
                <div className="justify-self-start">
                    <p className="text-white font-medium ">App Name</p>
                </div>
                <div className="justify-self-center cursor-pointer">
                    <p
                        onClick={() => {
                            navigate("../home");
                        }}
                        className="text-xl text-white font-medium underline"
                    >
                        Home
                    </p>
                </div>
                <div className="justify-self-end flex">
                    {/* <button
                        onClick={() => navigate("/signIn")}
                        className="hover:bg-slate-700 rounded hover:scale-105 transition ease-in delay-75 mr-4"
                    >
                        <p className="text-white m-2 text-base font-medium">
                            Sign In
                        </p>
                    </button> */}

                    <SmallButton
                        paragraphBody="Sign Out"
                        functionCall={() => {
                            try {
                                navigate("/");
                                sessionStorage.clear();
                                cookies.remove("jwt");
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                </div>
            </header>
        );
    } catch (e) {
        console.log(e);
    }
}

export default Header;
