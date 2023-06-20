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
                        css="bg-red-800"
                    />
                </div>
            </header>
        );
    } catch (e) {
        console.log(e);
    }
}

export default Header;
