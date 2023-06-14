function LargeButton(props) {
    return (
        <button
            className={
                "outline-0 text-mainColors-silver drop-shadow-md  h-11 w-80 ps-2 font-medium hover:border-mainColors-green hover:scale-105 hover:bg-opacity-50  delay-75 transition duration-500 rounded-md ease-in-out " +
                props.css
            }
            onClick={() => props.functionCall()}
        >
            {props.body}
        </button>
    );
}

export default LargeButton;
