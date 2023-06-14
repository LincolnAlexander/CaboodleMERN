import BooksImage from "../images/BooksImage.jpg";
import AccessoriesImage from "../images/AccessoriesImage.jpg";
import CarsImage from "../images/CarsImage.jpg";
import LargeButton from "../components/LargeButton";
import SmallCard from "../components/SmallCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    function renderBulletPoints() {
        return (
            <div>
                <ul className="list-disc space-y-4">
                    <li className="text-mainColors-silver font-medium ">
                        Keep track of all your wants and needs, all in one
                        place.
                    </li>
                    <li className="text-mainColors-silver font-medium ">
                        Effortlessly curate and manage your wish lists, shopping
                        list,<p>and inspiration boards.</p>
                    </li>
                    <li className="text-mainColors-silver font-medium">
                        Become a curator of your own personalized universe.
                    </li>
                </ul>
            </div>
        );
    }

    function renderLeftTitle() {
        return (
            <div className="">
                <p className="text-5xl text-mainColors-silver bg-clip-text font-bold text-center ">
                    Create and Organize{" "}
                    <p className=" text-transparent bg-clip-text  bg-gradient-to-r from-green-300 to-green-600">
                        Your Dream Collections
                    </p>
                    <p>with Ease</p>
                </p>
            </div>
        );
    }

    function renderLeftButtons() {
        return (
            <div className="flex flex-col space-y-8">
                <LargeButton
                    body="Sign In"
                    css=" bg-mainColors-lightGray"
                    functionCall={() => navigate("/signin")}
                />

                <LargeButton
                    body="Get Started For Free"
                    css=" bg-mainColors-green"
                    functionCall={() => navigate("/createAccount")}
                />
            </div>
        );
    }

    function renderLeftHalf() {
        return (
            <div className="flex flex-col items-center space-y-16">
                {renderLeftTitle()}
                {renderBulletPoints()}
                {renderLeftButtons()}
            </div>
        );
    }
    function renderRightHalf() {
        return <div className="mt-10">{renderCards()}</div>;
    }
    function renderCards() {
        return (
            <div className=" grid grid-cols-2 justify-items-center gap-4  mb-12">
                <div className="col-span-2">
                    <SmallCard
                        title={"Car Collection"}
                        description="Cars I want to buy in the next 10 years."
                        image={CarsImage}
                        showButtons="hidden"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <SmallCard
                        title={"Amazon Collection"}
                        description="Accessories I want to buy on Amazon Prime Day"
                        image={AccessoriesImage}
                        css="bg-mainColors-green"
                        showButtons="hidden"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <SmallCard
                        title={"Books Collection"}
                        description="Books I want to add to my library"
                        image={BooksImage}
                        showButtons="hidden"
                    />
                </div>
            </div>
        );
    }
    return (
        <div className="flex lg:flex-row flex-col bg-mainColors-gray items-center">
            <div className="w-1/2 m-4 ">{renderLeftHalf()}</div>
            <div className="w-1/2 m-4">{renderRightHalf()}</div>
        </div>
    );
}

export default LandingPage;
