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
let user_id;
function CreateElementoModal(props) {
    const [modalInView, setInView] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setInView(props.value);
        user_id = sessionStorage.getItem("user_id");
    }, [props.value]);

    try {
        const createElemento = async () => {
            const elemento = {
                name: elementoNameInput,
                cost: priceInput,
                purchased: purchasedInput.length == 0 ? "No" : purchasedInput,
                priority: priorityInput == null ? 1 : priorityInput,
                link: urlInput.length == 0 ? "" : urlInput,
                caboodle_id: props.caboodleId,
                user_id: user_id,
            };

            await Express.call("CreateElemento", elemento)
                .then(() => {
                    priceInput = null;
                    urlInput = "";
                    elementoNameInput = "";
                    priorityInput = null;
                    purchasedInput = "";
                })
                .catch((e) => console.log(e));
        };

        function renderInputs() {
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SmallInputBox
                            labelFor="Name"
                            labelBody="Name"
                            inputType="text"
                            inputPlaceholder="Name of Elemento"
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
                            inputPlaceholder="https://example.com"
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
                            labelFor="Price"
                            labelBody="Price"
                            inputType="number"
                            inputPlaceholder="$$$$"
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        priceInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("Price is empty");
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <SmallInputBox
                            labelFor="Priority"
                            labelBody="Priority"
                            inputType="number"
                            inputPlaceholder="1-5"
                            onChange={(input) => {
                                try {
                                    if (input.length != 0) {
                                        priorityInput = input;
                                        setErrorMessage("");
                                    } else {
                                        setErrorMessage("Price is empty");
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
                        paragraphBody="Create Elemento"
                        functionCall={() => {}}
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
                            if (
                                elementoNameInput.length != 0 &&
                                priceInput != null
                            ) {
                                createElemento();
                                props.functionCall();
                                setInView(false);
                            } else setErrorMessage("Check Name, Price fields");
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    className="flex flex-col items-center h-full grow-0 "
                >
                    {renderInputs()}
                    {renderFormBottom()}
                </form>
            );
        }

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

export default CreateElementoModal;
