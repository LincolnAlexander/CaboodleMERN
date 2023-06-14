function MediumCard(props) {
    return (
        <div className="flex flex-col justify-center items-start bg-mainColors-lightGray rounded-md h-80 w-72 drop-shadow-xl">
            <div className="h-2/3 ml-4 mr-4">
                <div className="">
                    <img
                        className="rounded"
                        src={props.cardImage}
                        alt="Books"
                    ></img>
                </div>
            </div>
            <div className=" self-start ml-4">
                <p className="text-mainColors-silver font-medium text-xl">
                    {props.cardTitle}
                </p>

                <p className="text-mainColors-silver font-medium text-sm">
                    {props.cardDescription}
                </p>
            </div>
        </div>
    );
}

export default MediumCard;
