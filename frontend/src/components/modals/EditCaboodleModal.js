import { useState, useEffect } from "react";
import UploadImageIcon from "../../images/UploadPictureIcon.png";
import SmallInputBox from "../SmallInputBox";
import MediumButton from "../MediumButton";
import CloseIcon from "../../images/CloseIcon.png";
import CheckmarkIcon from "../../images/CheckmarkIcon.png";
import Express from "../../middleware/middlewareHelper";

let nickNameInput = "";
let descriptionInput = "";
let user_id;

function EditCaboodleModal(props) {
    const [modalInView, setInView] = useState(false);
    const [selectedCaboodle, setSelectedCaboodle] = useState();
    const [postImage, setPostImage] = useState({ myFile: "" });
    const [uploadedImage, setUploadedImage] = useState();

    useEffect(() => {
        user_id = sessionStorage.getItem("user_id");
        setSelectedCaboodle(props.caboodle);
        setInView(props.value);
    }, [props.value, props.caboodle]);

    try {
        const editCaboodle = async () => {
            const caboodle = {
                name:
                    nickNameInput.length == 0
                        ? selectedCaboodle.nickname
                        : nickNameInput,
                description:
                    descriptionInput.length == 0
                        ? selectedCaboodle.description
                        : descriptionInput,
                caboodleId: selectedCaboodle._id,

                image:
                    postImage.myFile == ""
                        ? selectedCaboodle.image
                        : postImage.myFile,
                user_id: user_id,
            };
            try {
                Express.call("EditCaboodle", caboodle)
                    .then((res) => {
                        nickNameInput = "";
                        descriptionInput = "";
                    })
                    .catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            editCaboodle();
            setUploadedImage(false);
        };

        const handleFileUpload = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            setPostImage({ ...postImage, myFile: base64 });
            setUploadedImage(true);
        };

        function renderFormInputs() {
            return (
                <div className=" h-3/5 flex flex-col">
                    <SmallInputBox
                        labelFor="Name"
                        labelBody="Name"
                        inputType="text"
                        value={selectedCaboodle.nickname}
                        onChange={(input) => {
                            nickNameInput = input;
                        }}
                    />
                    <SmallInputBox
                        labelFor="Description"
                        labelBody="Description"
                        inputType="text"
                        value={selectedCaboodle.description}
                        inputPlaceholder="Description of caboodle"
                        onChange={(input) => {
                            descriptionInput = input;
                        }}
                    />
                </div>
            );
        }

        function renderFormAddImage() {
            return (
                <div className="h-2/5 w-full h-full  flex flex-col items-center m-4 rounded grow-0 ">
                    <label className="" htmlFor="fileUpload">
                        <img
                            className="object-center  "
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
        function renderForm() {
            return (
                <form
                    onSubmit={(e) => {
                        try {
                            handleSubmit(e);
                            props.functionCall();
                            setInView(false);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    className="flex flex-col items-center h-full "
                >
                    {renderFormAddImage()}
                    {renderFormInputs()}
                    <MediumButton
                        paragraphBody="Submit"
                        functionCall={() => {}}
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
                        try {
                            props.functionCall();
                            setInView(false);
                            setUploadedImage(false);
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
                                    " relative flex flex-col bg-mainColors-lightGray fixed   h-96 w-56 shadow  cursor-pointer  rounded-md   "
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

export default EditCaboodleModal;

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
