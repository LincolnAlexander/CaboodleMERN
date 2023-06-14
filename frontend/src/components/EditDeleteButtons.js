import TrashIcon from "../images/TrashIcon.png";
import EditIcon from "../images/EditIcon.png";
function EditDeleteButtons(props) {
    return (
        <div className={"flex " + props.css}>
            <div className="w-1/2">
                <button
                    className="flex w-full h-full p-1 hover:border-2 justify-center items-center bg-stone-800 rounded invisible group-hover:visible"
                    onClick={() => props.edit()}
                >
                    <span className="text-mainColors-silver  text-base px-2">
                        {" "}
                        Edit
                    </span>{" "}
                    <img className="h-5" src={EditIcon}></img>
                </button>
            </div>
            <div className="w-1/2">
                <button
                    className="flex w-full h-full p-1 hover:border-2 justify-center items-center bg-red-800 rounded invisible group-hover:visible"
                    onClick={() => props.delete()}
                >
                    <span className="text-mainColors-silver  text-base px-2">
                        {" "}
                        Delete
                    </span>{" "}
                    <img className="h-5" src={TrashIcon}></img>
                </button>
            </div>
        </div>
    );
}

export default EditDeleteButtons;
