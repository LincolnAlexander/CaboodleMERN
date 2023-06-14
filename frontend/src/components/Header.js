import { useNavigate } from "react-router-dom";
import MediumSubmitButton from "./MediumButton";
function Header() {
    try {
        let navigate = useNavigate();
        return (
            <header className=" h-1/7 w-full bg-stone-800 grid grid-cols-3 items-center content-center p-4  ">
                <div className="justify-self-start">
                    <p className="text-white font-medium ">Monday</p>
                </div>
                <div className="justify-self-center">
                    <p className="text-xl text-white font-medium">Logo</p>
                </div>
                <div className="justify-self-end flex">
                    <button
                        onClick={() => navigate("/signIn")}
                        className="hover:bg-slate-700 rounded hover:scale-105 transition ease-in delay-75 mr-4"
                    >
                        <p className="text-white m-2 text-base font-medium">
                            Sign In
                        </p>
                    </button>

                    <MediumSubmitButton
                        paragraphBody="Create Account"
                        functionCall={() => {
                            try {
                                navigate("/createAccount");
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    ></MediumSubmitButton>
                </div>
            </header>
        );
    } catch (e) {
        console.log(e);
    }
}

export default Header;
