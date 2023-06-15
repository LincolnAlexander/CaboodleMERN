import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediumTitle from "../components/MediumTitle";
import SmallTitle from "../components/SmallTitle";
import InputBox from "../components/InputBox";
import LargeButton from "../components/LargeButton";
import Express from "../middleware/middlewareHelper";

let emailInput = "";
let passwordInput = "";

function LoginPage() {
    let [showEmailError, updateEmailError] = useState(false);
    let [showPasswordError, updatePasswordError] = useState(false);
    let [successMessage, updateSuccessMessage] = useState("");
    const navigate = useNavigate();

    try {
        const signIn = async () => {
            let accountInfo = {
                email: emailInput,
                password: passwordInput,
            };
            try {
                await Express.call("Login", accountInfo).then((res) => {
                    const results = res.data;
                    if (results.status != 200) {
                        updateSuccessMessage("Incorrect login information.");
                    } else {
                        updateSuccessMessage("");
                        sessionStorage.setItem("user_id", res.data.user_id);
                        sessionStorage.setItem("accessToken", results.webToken);
                        setTimeout(() => {
                            navigate("/home");
                        });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        };

        function renderTitle() {
            return (
                <div className="mx-10 mb-12">
                    <MediumTitle paragraphBody="Sign In" />
                </div>
            );
        }

        function renderInputs() {
            return (
                <div>
                    <InputBox
                        labelBody="Email or profile name"
                        labelFor="email"
                        inputType="email"
                        inputPlaceholder="eg: JohnnyG@outlook.com"
                        onChange={(email) => {
                            try {
                                const emailRegex =
                                    /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
                                if (!email.match(emailRegex)) {
                                    updateEmailError(true);
                                    updateSuccessMessage("");
                                } else {
                                    updateEmailError(false);
                                    updateSuccessMessage("");
                                    emailInput = email.toLowerCase();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                        showError={showEmailError}
                        errorMessage="Invalid Email"
                    />
                    <InputBox
                        labelBody="Password"
                        labelFor="password"
                        inputType="password"
                        inputPlaceholder="Enter password"
                        onChange={(password) => {
                            try {
                                if (password.length < 7) {
                                    updatePasswordError(true);
                                    updateSuccessMessage("");
                                } else {
                                    passwordInput = password;
                                    updatePasswordError(false);
                                    updateSuccessMessage("");
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                        errorMessage="Your password is too short."
                        showError={showPasswordError}
                    />
                </div>
            );
        }

        function renderButton() {
            return (
                <div className="flex flex-col items-center">
                    <LargeButton
                        body="Sign In"
                        css="bg-mainColors-green"
                        functionCall={(e) => {
                            try {
                                if (
                                    emailInput.length == 0 ||
                                    passwordInput.length == 0
                                ) {
                                    updateSuccessMessage(
                                        "Error, one of your fields aren't correct"
                                    );
                                    return;
                                }
                                updateSuccessMessage("");
                                signIn();
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                    <div className="m-4">
                        <SmallTitle paragraphBody={successMessage} />
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col justify-center items-center h-screen border-4 border-black bg-mainColors-gray">
                <div className="flex flex-col justify-center items-center bg-mainColors-lightGray rounded h-screen w-screen md:w-1/2 md:h-3/5 lg:h-3/4 xl:w-1/3 drop-shadow-xl">
                    {renderTitle()}
                    {renderInputs()}
                    {renderButton()}
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

export default LoginPage;
