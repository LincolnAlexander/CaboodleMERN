import React from "react";

function MediumButton(props) {
    return (
        <div className="m-2">
            <button
                onClick={() => props.functionCall()}
                type="submit"
                className={
                    props.css +
                    " outline-0 bg-mainColors-green text-center text-mainColors-silver drop-shadow-md  h-11 w-44 ps-2 font-medium hover:border-mainColors-green hover:scale-105 hover:bg-opacity-50  delay-75 transition duration-500 rounded-md ease-in-out"
                }
            >
                {props.paragraphBody}
            </button>
        </div>
    );
}

export default MediumButton;
