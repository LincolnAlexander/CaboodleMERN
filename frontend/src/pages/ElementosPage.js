import MediumButton from "../components/MediumButton";
import MediumTitle from "../components/MediumTitle";
import EditIcon from "../images/EditIcon.png";
import TrashIcon from "../images/TrashIcon.png";
import Header from "../components/Header";
import CreateElementoModal from "../components/modals/CreateElementoModal";
import EditElementoModal from "../components/modals/EditElementoModal";
import { useEffect, useState } from "react";
import Express from "../middleware/middlewareHelper";

let caboodleId;
let caboodleName;
let user_id;

function ElementosPage() {
    const [viewCreateElementoModal, setCreateElementoModal] = useState(false);
    const [viewEditElementoModal, setEditElementoModal] = useState(false);
    const [selectedElemento, setSelectedElemento] = useState();
    const [elementosArray, setElementosArray] = useState([]);

    try {
        const loadElementos = async () => {
            const results = await Express.call("LoadElementos", {
                caboodleId,
                user_id,
            });
            setElementosArray(results.data.results);
        };

        const deleteElemento = async (elemento_id) => {
            try {
                await Express.call("DeleteElemento", {
                    elemento_id,
                    user_id: user_id,
                }).then(() => {
                    loadElementos();
                });
            } catch (e) {
                console.log(e);
            }
        };

        useEffect(() => {
            user_id = sessionStorage.getItem("user_id");
            caboodleId = sessionStorage.getItem("currentCaboodleId");
            caboodleName = sessionStorage.getItem("currentCaboodleName");
            loadElementos();
        }, [viewEditElementoModal, viewCreateElementoModal, caboodleId]);

        function renderTop() {
            return (
                <div className="flex flex-col items-center m-10 space-y-6">
                    <MediumTitle paragraphBody={caboodleName + " caboodle"} />
                    <MediumButton
                        paragraphBody="Add Elemento"
                        functionCall={() => {
                            setCreateElementoModal(true);
                        }}
                    />
                </div>
            );
        }

        function renderTopTable() {
            const tableHeaderNames = [
                "Title",
                "Price",
                "Priority",
                "Purchased",
                "",
            ];
            return (
                <>
                    <caption className="p-6 text-left text-mainColors-silver">
                        <p className="text-mainColors-silver font-medium text-base">
                            Browse your elementos below, click on the name to
                            redirect you to the specified url.
                        </p>
                    </caption>
                    <thead className="text-mainColors-silver bg-stone-800 bg-opacity-50">
                        <tr>
                            {tableHeaderNames.map((name) => (
                                <th scope="col" className="px-6 py-3">
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </>
            );
        }

        function renderTableButtons(elemento) {
            return (
                <td className="flex px-6 py-2 space-x-4">
                    <button
                        className="bg-stone-800 rounded p-1 w-8"
                        onClick={() => {
                            try {
                                setEditElementoModal(true);
                                setSelectedElemento(elemento);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        <img src={EditIcon} />
                    </button>
                    <button
                        className="bg-red-800 p-1 rounded w-8"
                        onClick={() => {
                            try {
                                deleteElemento(elemento._id);
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        <img src={TrashIcon} />
                    </button>
                </td>
            );
        }

        function renderTableBody() {
            return (
                <tbody>
                    {elementosArray.map((elemento) => (
                        <tr
                            className="border-b group border-gray-300 hover:bg-mainColors-silver hover:bg-opacity-25 cursor-pointer text-mainColors-silver"
                            key={elemento._id}
                        >
                            <td
                                onClick={() => {}}
                                className="px-6 py-2 font-medium"
                            >
                                <a
                                    href={
                                        elemento.elementoUrl.length == 0
                                            ? null
                                            : elemento.elementoUrl
                                    }
                                    target="_blank"
                                >
                                    {elemento.elementoName}
                                </a>
                            </td>
                            <td className="px-6 py-2">
                                ${elemento.elementoCost}
                            </td>
                            <td className="px-6 py-2">
                                {elemento.elementoPriority}
                            </td>

                            <td className="px-6 py-2">
                                {elemento.elementoPurchased + ""}
                            </td>
                            {renderTableButtons(elemento)}
                        </tr>
                    ))}
                </tbody>
            );
        }

        function renderTable() {
            return (
                <div className="w-3/5 h-4/6 bg-mainColors-lightGray rounded overflow-auto ">
                    <table className="rounded-lg w-full overflow-scroll text-left">
                        {renderTopTable()}
                        {renderTableBody()}
                    </table>
                </div>
            );
        }
        function renderHeader() {
            return <Header />;
        }

        return (
            <div className="bg-mainColors-gray h-screen flex flex-col items-center">
                {renderHeader()}
                {renderTop()}
                {renderTable()}

                <CreateElementoModal
                    value={viewCreateElementoModal}
                    functionCall={() => {
                        setCreateElementoModal(false);
                        loadElementos();
                    }}
                    caboodleId={caboodleId}
                />
                <EditElementoModal
                    value={viewEditElementoModal}
                    functionCall={() => {
                        setEditElementoModal(false);
                    }}
                    elemento={selectedElemento}
                />
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

export default ElementosPage;
