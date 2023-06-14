import EditDeleteButtons from "./EditDeleteButtons";
function SmallCard(props) {
    function renderTopPicture() {
        return (
            <div className="h-3/5 bg-slate-400 m-4 rounded shadow-lg ">
                <div className="h-full w-full flex justify-center items-center">
                    <img
                        className="object-center h-full w-full rounded "
                        src={props.image}
                    ></img>
                </div>
            </div>
        );
    }

    function renderMiddleInfo() {
        return (
            <div className=" h-2/5 flex flex-col">
                <div className="h-1/3 mx-4">
                    <p className="text-mainColors-silver  font-bold text-base ">
                        {props.title}
                    </p>
                </div>
                <div className="h-1/3 mx-4 ">
                    <p className="text-mainColors-silver font-medium text-xs ">
                        {props.description}
                    </p>
                </div>
            </div>
        );
    }
    function clickableHalf() {
        return (
            <div
                className="w-full h-full"
                onClick={() => {
                    if (props.functionCall) {
                        props.functionCall();
                    }
                }}
            >
                {renderTopPicture()}
                {renderMiddleInfo()}
            </div>
        );
    }

    function renderBottomButtons() {
        return (
            <div className={props.showButtons}>
                <EditDeleteButtons
                    delete={() => props.delete(props.boodle)}
                    edit={() => props.edit(props.boodle)}
                    css={"w-full"}
                />
            </div>
        );
    }

    return (
        <div
            className={
                props.css +
                " flex flex-col justify-center group bg-mainColors-lightGray hover:bg-mainColors-silver hover:bg-opacity-5 h-75 w-52 shadow-xl hover:scale-105 cursor-pointer delay-75 transition duration-500 rounded-md ease-in-out  "
            }
        >
            {clickableHalf()}
            {renderBottomButtons()}
        </div>
    );
}

export default SmallCard;
