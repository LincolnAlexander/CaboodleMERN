import MediumTitle from "../components/MediumTitle";
import SmallCard from "../components/SmallCard";
import LeftArrow from "../images/LeftIcon.png";
import RightArrow from "../images/RightIcon.png";
import MediumButton from "../components/MediumButton";
import Header from "../components/Header";
import CreateCaboodleModal from "../components/modals/CreateCaboodleModal";
import EditCaboodleModal from "../components/modals/EditCaboodleModal";
import DeleteCaboodleModal from "../components/modals/DeleteCaboodleModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

let totalCaboodles;
const user_id = sessionStorage.getItem("user_id");
const bp = require("../components/Paths");

function HomePage() {
    let navigate = useNavigate();
    let [viewCreateCaboodleModal, setCreateCaboodleModal] = useState(false);
    let [viewEditCaboodleModal, setEditCaboodleModal] = useState(false);
    let [viewDeleteCaboodleModal, setDeleteCaboodleModal] = useState(false);
    let [caboodlesArray, setCaboodlesArray] = useState([]);
    let [editBoodleInfo, setEditBoodleInfo] = useState();
    let [skipNumber, setSkipNumber] = useState(0);
    let [viewArrows, showArrows] = useState(false);

    try {
        const loadCaboodles = async () => {
            try {
                await axios
                    .post(bp.buildPath("LoadCaboodles"), {
                        user_id: user_id,
                        skip: skipNumber,
                    })
                    .then((res) => {
                        caboodlesArray = res.data.results;
                        console.log(caboodlesArray);

                        console.log(caboodlesArray.length);
                        totalCaboodles = res.data.totalCaboodles.length;
                        console.log(totalCaboodles + " total");
                        if (totalCaboodles > 5) showArrows(true);

                        setCaboodlesArray(res.data.results);
                    });
            } catch (e) {
                console.log(e);
            }
        };

        useEffect(() => {
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
                                    console.log("going left");
                                    if (skipNumber !== 0)
                                        setSkipNumber(skipNumber - 1);
                                }}
                            >
                                <img src={LeftArrow} />
                            </button>
                            <button
                                onClick={() => {
                                    console.log("going right");
                                    if (caboodlesArray.length >= 5)
                                        setSkipNumber(skipNumber + 1);
                                }}
                            >
                                <img src={RightArrow} />
                            </button>
                        </div>
                    )}
                </>
            );
        }

        return (
            <div className="bg-mainColors-gray h-screen flex flex-col items-center">
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
