import { useState, useEffect } from "react";
import MediumButton from "../MediumButton";
import CloseIcon from "../../images/CloseIcon.png";
import SmallTitle from "../SmallTitle";
import Express from "../../middleware/middlewareHelper";

function DeleteCaboodleModal(props) {
    const [modalInView, setInView] = useState(false);
    const [selectedCaboodle, setSelectedCaboodle] = useState();

    useEffect(() => {
        setInView(props.value);
        setSelectedCaboodle(props.caboodle);
    }, [props.value, props.caboodle]);

    try {
        const deleteCaboodle = async () => {
            try {
                Express.call("DeleteCaboodle", {
                    caboodleId: selectedCaboodle._id,
                    user_id: sessionStorage.getItem("user_id"),
                }).catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
        };

        function renderCloseIcon() {
            return (
                <img
                    className="absolute top-[-15px] right-[-15px] w-12"
                    src={CloseIcon}
                    onClick={() => {
                        try {
                            props.functionCall();
                            setInView(false);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                />
            );
        }

        function renderModalButtons() {
            return (
                <>
                    <MediumButton
                        css="bg-red-800"
                        paragraphBody="Yes"
                        functionCall={() => {
                            try {
                                deleteCaboodle();
                                props.functionCall();
                                setInView(false);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                    <MediumButton
                        css=""
                        paragraphBody="No"
                        functionCall={() => {
                            try {
                                props.functionCall();
                                setInView(false);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                </>
            );
        }
        function renderModalBody() {
            return (
                <div className="flex flex-col items-center mt-4 p-4">
                    <SmallTitle
                        paragraphBody={
                            "Are you sure you want to delete " +
                            selectedCaboodle.nickname +
                            "?"
                        }
                    />
                    <p className="text-mainColors-silver  text-center text-base">
                        This action will delete all items associated with this
                        caboodle.
                    </p>
                    {renderModalButtons()}
                </div>
            );
        }
        return (
            <>
                {modalInView && (
                    <div className="fixed z-50 bg-stone-800 bg-opacity-75 flex flex-col items-center justify-center w-full h-full  overflow-x-hidden overflow-y-auto">
                        <div className="relative">
                            <div
                                className={
                                    props.css +
                                    " relative flex flex-col bg-mainColors-lightGray fixed h-60 w-96 shadow  cursor-pointer  rounded-md   "
                                }
                            >
                                {renderModalBody()}
                                {renderCloseIcon()}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } catch (e) {
        console.log(e);
    }
}

export default DeleteCaboodleModal;
