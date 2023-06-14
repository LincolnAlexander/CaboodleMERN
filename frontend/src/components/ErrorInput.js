import WarningImage from "../images/warning.png";

function ErrorInput(props) {
    return (
        <div className="flex items-center mt-1 ">
            <div>
                <img className="w-4  " src={WarningImage}></img>
            </div>
            <div className="ml-2">
                <p className="text-red-400 font-medium text-base underline">
                    {props.errorMessage}
                </p>
            </div>
        </div>
    );
}
export default ErrorInput;
