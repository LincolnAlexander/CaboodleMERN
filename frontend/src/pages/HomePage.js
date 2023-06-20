import MediumTitle from "../components/MediumTitle";
import SmallCard from "../components/SmallCard";
import LeftArrow from "../images/LeftIcon.png";
import RightArrow from "../images/RightIcon.png";
import MediumButton from "../components/MediumButton";
import CreateCaboodleModal from "../components/modals/CreateCaboodleModal";
import EditCaboodleModal from "../components/modals/EditCaboodleModal";
import DeleteCaboodleModal from "../components/modals/DeleteCaboodleModal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Express from "../middleware/middlewareHelper";
import Header from "../components/Header";

let totalCaboodles;
let user_id;

function HomePage() {
    const navigate = useNavigate();
    const [viewCreateCaboodleModal, setCreateCaboodleModal] = useState(false);
    const [viewEditCaboodleModal, setEditCaboodleModal] = useState(false);
    const [viewDeleteCaboodleModal, setDeleteCaboodleModal] = useState(false);
    const [caboodlesArray, setCaboodlesArray] = useState([]);
    const [editBoodleInfo, setEditBoodleInfo] = useState();
    const [skipNumber, setSkipNumber] = useState(0);
    const [viewArrows, showArrows] = useState(false);

    try {
        const loadCaboodles = async () => {
            try {
                const results = await Express.call("LoadCaboodles", {
                    user_id: user_id,
                    skip: skipNumber,
                });
                setCaboodlesArray(results.data.results);
                totalCaboodles = results.data.totalCaboodles.length;
                if (totalCaboodles > 5) showArrows(true);
            } catch (e) {
                console.log(e);
            }
        };
        useEffect(() => {
            user_id = sessionStorage.getItem("user_id");
            loadCaboodles();
        }, [
            skipNumber,
            viewCreateCaboodleModal,
            viewDeleteCaboodleModal,
            viewEditCaboodleModal,
        ]);

        function setBoodleInfo(boodle) {
            setEditBoodleInfo(boodle);
        }

        function renderTop() {
            return (
                <div className="flex flex-col items-center m-10">
                    <MediumTitle paragraphBody="Caboodles " />
                    <MediumButton
                        paragraphBody="Create Caboodle"
                        functionCall={() => {
                            try {
                                setCreateCaboodleModal(true);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                </div>
            );
        }

        function renderCards() {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-center ">
                    {caboodlesArray.map((boodle) => (
                        <SmallCard
                            key={boodle.nickname}
                            title={boodle.nickname}
                            description={boodle.description}
                            image={boodle.image}
                            functionCall={() => {
                                try {
                                    sessionStorage.setItem(
                                        "currentCaboodleId",
                                        boodle._id
                                    );
                                    sessionStorage.setItem(
                                        "currentCaboodleName",
                                        boodle.nickname
                                    );
                                    navigate("/elementos");
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                            delete={(event) => {
                                try {
                                    setDeleteCaboodleModal(true);
                                    setBoodleInfo(event);
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                            edit={(event) => {
                                try {
                                    setBoodleInfo(event);
                                    setEditCaboodleModal(true);
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                            boodle={boodle}
                        />
                    ))}
                </div>
            );
        }

        function renderArrows() {
            return (
                <>
                    {viewArrows && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    try {
                                        if (skipNumber !== 0)
                                            setSkipNumber(skipNumber - 1);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }}
                            >
                                <img src={LeftArrow} />
                            </button>
                            <button
                                onClick={() => {
                                    try {
                                        if (caboodlesArray.length >= 5)
                                            setSkipNumber(skipNumber + 1);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }}
                            >
                                <img src={RightArrow} />
                            </button>
                        </div>
                    )}
                </>
            );
        }
        function renderHeader() {
            return <Header />;
        }

        return (
            <div className="bg-mainColors-gray min-h-screen flex flex-col items-center">
                {renderHeader()}
                {renderTop()}
                {renderCards()}
                {renderArrows()}
                <CreateCaboodleModal
                    value={viewCreateCaboodleModal}
                    functionCall={() => {
                        setCreateCaboodleModal(false);
                    }}
                />
                <EditCaboodleModal
                    value={viewEditCaboodleModal}
                    functionCall={() => {
                        setEditCaboodleModal(false);
                    }}
                    caboodle={editBoodleInfo}
                />
                <DeleteCaboodleModal
                    value={viewDeleteCaboodleModal}
                    functionCall={() => {
                        setDeleteCaboodleModal(false);
                    }}
                    caboodle={editBoodleInfo}
                />
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

export default HomePage;
