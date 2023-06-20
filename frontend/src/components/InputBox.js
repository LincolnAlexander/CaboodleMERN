import ErrorInput from "./ErrorInput";

function InputBox(props) {
    return (
        <div className="flex flex-col m-2">
            <label
                className="text-mainColors-silver font-medium text-base"
                htmlFor={props.labelFor}
            >
                {props.labelBody}
            </label>
            <input
                className="peer bg-transparent outline-0  mt-2 border-2 text-mainColors-silver rounded h-11 w-80 ps-2 font-medium hover:border-mainColors-green focus:border-mainColors-green focus:border-4 transformation ease-in"
                type={props.inputType}
                placeholder={props.inputPlaceholder}
                id={props.labelFor}
                onChange={(event) => {
                    if (props.onChange) {
                        props.onChange(event.target.value);
                    }
                }}
                onBlur={(event) => {
                    if (props.onBlur) {
                        props.onBlur(event.target.value);
                    }
                }}
                max={props.max}
                min={props.min}
            />
            <div className={props.showError == true ? "visible" : "invisible"}>
                <ErrorInput errorMessage={props.errorMessage} />
            </div>
        </div>
    );
}

export default InputBox;
