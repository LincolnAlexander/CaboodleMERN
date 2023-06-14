import ErrorInput from "./ErrorInput";

function SmallInputBox(props) {
    return (
        <div className="flex flex-col ">
            <label
                className="text-mainColors-silver font-medium text-base"
                htmlFor={props.labelFor}
            >
                {props.labelBody}
            </label>
            <input
                className="peer bg-transparent outline-0  border-2 text-mainColors-silver rounded h-11 w-44 ps-2 text-sm font-medium hover:border-mainColors-green focus:border-mainColors-green focus:border-4 transformation ease-in"
                type={props.inputType}
                placeholder={props.inputPlaceholder}
                id={props.labelFor}
                defaultValue={props.value}
                min={props.min}
                max={props.max}
                // value={props.value}
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
                // onKeyUp={(e) => {
                //     props.onKeyUp(e);
                // }}
            />
            <div className={props.showError == true ? "visible" : "invisible"}>
                <ErrorInput errorMessage={props.errorMessage} />
            </div>
        </div>
    );
}

export default SmallInputBox;
