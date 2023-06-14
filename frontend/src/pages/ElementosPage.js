import axios from "axios";
import MediumButton from "../components/MediumButton";
import MediumTitle from "../components/MediumTitle";
import EditIcon from "../images/EditIcon.png";
import TrashIcon from "../images/TrashIcon.png";
import CreateElementoModal from "../components/modals/CreateElementoModal";
import EditElementoModal from "../components/modals/EditElementoModal";
import { useEffect, useState } from "react";

const bp = require("../components/Paths");
const caboodleId = sessionStorage.getItem("currentCaboodleId");
const caboodleName = sessionStorage.getItem("currentCaboodleName");

function ElementosPage() {
    const [viewCreateElementoModal, setCreateElementoModal] = useState(false);
    const [viewEditElementoModal, setEditElementoModal] = useState(false);
    const [selectedElemento, setSelectedElemento] = useState();
    const [elementosArray, setElementosArray] = useState([]);
    try {
        const loadElementos = async () => {
            await axios
                .post(bp.buildPath("./LoadElementos"), { caboodleId })
                .then((res) => {
                    setElementosArray(res.data.results);
                });
        };

        const deleteElemento = async (elemento_id) => {
            await axios
                .post(bp.buildPath("./DeleteElemento"), { elemento_id })
                .then(() => {
                    loadElementos();
                });
        };

        useEffect(() => {
            loadElementos();
        }, [viewEditElementoModal, viewCreateElementoModal]);

        function renderTop() {
            return (
                <div className="flex flex-col items-center m-10 space-y-6">
                    <MediumTitle paragraphBody={caboodleName + " Caboodle"} />
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
                            key={elemento.elementoName}
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

        return (
            <div className="bg-mainColors-gray h-screen flex flex-col items-center">
                {renderTop()}
                {renderTable()}

                <CreateElementoModal
                    value={viewCreateElementoModal}
                    functionCall={() => {
                        setCreateElementoModal(false);
                    }}
                    caboodleId={caboodleId}
                />
                <EditElementoModal
                    value={viewEditElementoModal}
                    functionCall={() => setEditElementoModal(false)}
                    elemento={selectedElemento}
                />
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

export default ElementosPage;
