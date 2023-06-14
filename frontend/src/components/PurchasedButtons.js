function PurchasedButtons(props) {
    try {
        return (
            <div className="col-span-2 text-mainColors-silver space-x-4 mb-2">
                <label className="font-medium">Purchased?</label>
                <label htmlFor="Yes">Yes</label>
                <input
                    id="Yes"
                    type="radio"
                    name="Purchased"
                    onClick={() => {
                        props.clickedYes();
                    }}
                ></input>
                <label htmlFor="No">No</label>
                <input
                    id="No"
                    type="radio"
                    name="Purchased"
                    onClick={() => {
                        props.clickedNo();
                    }}
                ></input>
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

export default PurchasedButtons;
