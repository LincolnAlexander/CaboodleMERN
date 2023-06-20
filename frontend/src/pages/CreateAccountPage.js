import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import LargeButton from "../components/LargeButton";
import MediumTitle from "../components/MediumTitle";
import SmallTitle from "../components/SmallTitle";
import Express from "../middleware/middlewareHelper";

let emailInput = "";
let passwordInput = "";
let profileInput = "";

function CreateAccountPage() {
    const [showEmailError, updateEmailError] = useState(false);
    const [showPasswordError, updatePasswordError] = useState(false);
    const [showProfileError, updateProfileError] = useState(false);
    const [successMessage, updateSuccessMessage] = useState();
    const navigate = useNavigate();

    try {
        const createAccount = async () => {
            const loginInfo = {
                email: emailInput,
                password: passwordInput,
                profileName: profileInput,
            };
            try {
                Express.callPublic("Register", loginInfo)
                    .then((res) => {
                        const results = res.data;
                        if (results.status === 200) {
                            updateSuccessMessage(
                                "Account successfully created, you may login now! "
                            );
                            setTimeout(() => {
                                navigate("/signIn");
                            }, 2000);
                        } else {
                            updateSuccessMessage(results.error);
                        }
                    })
                    .catch((e) => console.log(e));
            } catch (e) {
                console.log(e);
            }
        };

        function renderInputs() {
            return (
                <div>
                    <InputBox
                        labelBody="Email"
                        labelFor="email"
                        inputType="email"
                        inputPlaceholder="Enter your email"
                        onChange={(email) => {
                            try {
                                const emailRegex =
                                    /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
                                if (
                                    !email.match(emailRegex) ||
                                    email.length <= 0
                                ) {
                                    updateEmailError(true);
                                } else {
                                    emailInput = email.toLowerCase();
                                    updateEmailError(false);
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
                        inputPlaceholder="Enter a password"
                        onChange={(password) => {
                            try {
                                if (
                                    password.length < 7 ||
                                    password.length == 0
                                ) {
                                    updatePasswordError(true);
                                } else {
                                    passwordInput = password;
                                    updatePasswordError(false);
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                        errorMessage="Your password is too short."
                        showError={showPasswordError}
                    />

                    <InputBox
                        labelBody="What would you like to be called?"
                        labelFor="profileName"
                        inputType="text"
                        inputPlaceholder="Enter a profile name"
                        onChange={(profile) => {
                            try {
                                if (profile.length == 0 || profile.length < 4) {
                                    updateProfileError(true);
                                } else {
                                    updateProfileError(false);
                                    profileInput = profile.toLowerCase();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                        showError={showProfileError}
                        errorMessage="Your profile name is too short."
                    />
                </div>
            );
        }

        function renderButton() {
            return (
                <div className="flex flex-col items-center">
                    <LargeButton
                        body="Create Account"
                        css="bg-mainColors-green"
                        functionCall={() => {
                            try {
                                if (
                                    showEmailError === true ||
                                    showPasswordError === true ||
                                    showProfileError === true
                                ) {
                                    updateSuccessMessage(
                                        "One of your fields aren't correct"
                                    );
                                    return;
                                }
                                updateSuccessMessage("");
                                createAccount();
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                    <div>
                        <SmallTitle paragraphBody={successMessage} />
                    </div>
                </div>
            );
        }

        function renderTitle() {
            return (
                <div className="mb-10">
                    <MediumTitle paragraphBody="Create Account" />
                </div>
            );
        }

        return (
            <div className="flex flex-col justify-center items-center h-screen border-4 border-black bg-mainColors-gray">
                <div className="flex flex-col justify-center items-center bg-mainColors-lightGray rounded h-screen  md:h-3/4 lg:h-4/6 xl:h-4/5 w-screen sm:w-2/3  lg:w-2/4 xl:w-1/3  drop-shadow-xl">
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
export default CreateAccountPage;
