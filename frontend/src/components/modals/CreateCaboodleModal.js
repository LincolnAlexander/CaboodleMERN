import axios from "axios";
import { useState, useEffect } from "react";
import UploadImageIcon from "../../images/UploadPictureIcon.png";
import CheckmarkIcon from "../../images/CheckmarkIcon.png";
import SmallInputBox from "../SmallInputBox";
import MediumButton from "../MediumButton";
import CloseIcon from "../../images/CloseIcon.png";
import Express from "../../middleware/middlewareHelper";

let nickNameInput = "";
let descriptionInput = "";
const bp = require("../Paths");
const user_id = sessionStorage.getItem("user_id");

function CreateCaboodleModal(props) {
    let [modalInView, setInView] = useState(false);
    let [uploadedImage, setUploadedImage] = useState(false);
    const [postImage, setPostImage] = useState({ myFile: "" });

    useEffect(() => {
        setInView(props.value);
    }, [props.value]);

    try {
        const createCaboodle = async () => {
            let caboodle = {
                name: nickNameInput,
                description: descriptionInput,
                user_id: user_id,
                elementos: [],
                image: postImage.myFile,
                user_id: sessionStorage.getItem("user_id"),
            };
            // try {
            //     await axios
            //         .post(bp.buildPath("createCaboodle"), caboodle)
            //         .then((res) => {
            //             console.log(res.data);
            //         })
            //         .catch((e) => console.log(e));
            // } catch (e) {
            //     console.log(e);
            // }
            try {
                await Express.call("createCaboodle", caboodle)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
        };

        const handleSubmit = (e) => {
            createCaboodle();
            setUploadedImage(false);
        };

        const handleFileUpload = async (e) => {
            const file = e.target.files[0];
            console.log(file);
            const base64 = await convertToBase64(file);
            console.log(base64);
            setPostImage({ ...postImage, myFile: base64 });
            setUploadedImage(true);
        };

        function renderFormAddImage() {
            return (
                <div className="h-2/5 w-full h-full  flex flex-col items-center m-4 rounded  ">
                    <label className="h-full" htmlFor="fileUpload">
                        <img
                            className="object-center "
                            src={
                                uploadedImage ? CheckmarkIcon : UploadImageIcon
                            }
                        ></img>
                    </label>

                    <input
                        className="hidden"
                        type="file"
                        id="fileUpload"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                    />
                </div>
            );
        }

        function renderFormInputs() {
            return (
                <div className=" h-3/5 flex flex-col">
                    <SmallInputBox
                        labelFor="Name"
                        labelBody="Name"
                        inputType="text"
                        inputPlaceholder="Enter Nickname for Caboodle"
                        onChange={(input) => {
                            nickNameInput = input;
                        }}
                    />
                    <SmallInputBox
                        labelFor="Description"
                        labelBody="Description"
                        inputType="text"
                        inputPlaceholder="Enter description for caboodle"
                        onChange={(input) => {
                            descriptionInput = input;
                        }}
                    />
                </div>
            );
        }
        function renderForm() {
            return (
                <form
                    onSubmit={() => {
                        try {
                            if (
                                descriptionInput.length != 0 ||
                                nickNameInput.length != 0
                            ) {
                                handleSubmit();
                            }
                            props.functionCall();
                            setInView(false);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    className="flex flex-col items-center h-full grow-0 "
                >
                    {renderFormAddImage()}
                    {renderFormInputs()}
                    <MediumButton
                        paragraphBody="Add Caboodle"
                        functionCall={() => {
                            console.log("clicked");
                        }}
                    />
                </form>
            );
        }

        function renderCloseIcon() {
            return (
                <img
                    className="absolute top-[-15px] right-[-15px] w-12"
                    src={CloseIcon}
                    onClick={() => {
                        props.functionCall();
                        setInView(false);
                        setUploadedImage(false);
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
                                    " relative flex flex-col bg-mainColors-lightGray fixed   h-96 w-56 shadow cursor-pointer rounded-md"
                                }
                            >
                                {renderForm()}
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

export default CreateCaboodleModal;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (e) => {
            reject(e);
        };
    });
}
