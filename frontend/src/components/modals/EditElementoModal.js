import { useEffect, useState } from "react";
import axios from "axios";
import SmallTitle from "../SmallTitle";
import MediumButton from "../MediumButton";
import SmallInputBox from "../SmallInputBox";
import CloseIcon from "../../images/CloseIcon.png";
import PurchasedButtons from "../PurchasedButtons";
import Express from "../../middleware/middlewareHelper";

let priceInput = null;
let urlInput = "";
let elementoNameInput = "";
let priorityInput = null;
let purchasedInput = "";

function EditElementoModal(props) {
    let bp = require("../Paths");
    const [modalInView, setInView] = useState(false);
    const [selectedElemento, setSelectedElemento] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setInView(props.value);
    }, [props.value]);

    useEffect(() => {
        setSelectedElemento(props.elemento);
    }, [props.elemento]);

    try {
        const editElemento = async () => {
            const elemento = {
                name:
                    elementoNameInput.length == 0
                        ? selectedElemento.elementoName
                        : elementoNameInput,
                cost:
                    priceInput == null
                        ? selectedElemento.elementoCost
                        : priceInput,
                purchased: purchasedInput.length == 0 ? "No" : purchasedInput,
                priority:
                    priorityInput == null
                        ? selectedElemento.elementoPriority
                        : priorityInput,
                link:
                    urlInput.length == 0
                        ? selectedElemento.elementoUrl
                        : urlInput,
                elemento_id: selectedElemento._id,
                user_id: sessionStorage.getItem("user_id"),
            };

            // try {
            //     await axios
            //         .post(bp.buildPath("EditElemento"), elemento)
            //         .then((res) => {
            //             console.log(res.data);
            //         })
            //         .catch((e) => console.log(e));
            // } catch (e) {
            //     console.log(e);
            // }
            try {
                Express.call("EditElemento", elemento)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((e) => console.log(e));
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

        function renderFormInputs() {
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SmallInputBox
                            labelFor="Name"
                            labelBody="Name"
                            inputType="text"
                            value={selectedElemento.elementoName}
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        elementoNameInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("Name is empty");
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        />
                    </div>

                    <div>
                        <SmallInputBox
                            labelFor="Link"
                            labelBody="Link"
                            inputType="url"
                            value={selectedElemento.elementoUrl}
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        urlInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("A field is empty");
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <SmallInputBox
                            labelFor="Description"
                            labelBody="Price"
                            inputType="number"
                            value={selectedElemento.elementoCost}
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        priceInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("Price is empty");
                                    }
                                } catch (e) {}
                            }}
                        />
                    </div>
                    <div>
                        <SmallInputBox
                            labelFor="Priority"
                            labelBody="Priority"
                            inputType="number"
                            value={selectedElemento.elementoPriority}
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        priorityInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("Priority is empty");
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        />
                    </div>
                    <PurchasedButtons
                        clickedNo={() => {
                            purchasedInput = "No";
                        }}
                        clickedYes={() => {
                            purchasedInput = "Yes";
                        }}
                    />
                </div>
            );
        }

        function renderFormBottom() {
            return (
                <>
                    <MediumButton
                        paragraphBody="Submit"
                        functionCall={() => {
                            console.log("clicked");
                        }}
                    />
                    <div>
                        <SmallTitle paragraphBody={errorMessage} />
                    </div>
                </>
            );
        }
        function renderForm() {
            return (
                <form
                    onSubmit={(e) => {
                        try {
                            e.preventDefault();
                            editElemento();
                            setInView(false);
                            props.functionCall();
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    className="flex flex-col items-center h-full grow-0 "
                >
                    {renderFormInputs()}
                    {renderFormBottom()}
                </form>
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
                                    " relative flex flex-col bg-mainColors-lightGray fixed   h-96 w-96 shadow  cursor-pointer  rounded-md   "
                                }
                            >
                                <div className="flex flex-col items-center mt-4 p-4">
                                    {renderForm()}
                                </div>
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

export default EditElementoModal;
