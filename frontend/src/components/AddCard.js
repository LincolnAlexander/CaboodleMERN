import PlusIcon from "../images/PlusIconImage.png";

function AddCard() {
    return (
        <div className=" bg-mainColors-lightGray h-64 w-60 m-4 flex flex-col items-center justify-center shadow-xl hover:scale-105 cursor-pointer delay-75 transition duration-500 rounded-md ease-in-out">
            <div className="h-3/4 mt-4 flex justify-center items-center ">
                <img src={PlusIcon}></img>
            </div>
            <div className="h-2/5 ">
                <p className="text-mainColors-silver font-medium text-lg ">
                    Create New Collection
                </p>
            </div>
        </div>
    );
}

export default AddCard;
