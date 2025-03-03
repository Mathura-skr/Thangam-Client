import { Fragment, useEffect } from "react"
import { Link } from "react-router-dom"
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function ProductList() {
    const data = {
        columns: [
            { label: "ID", field: "id", sort: "asc" },
            { label: "Name", field: "name", sort: "asc" },
            { label: "Price", field: "price", sort: "asc" },
            { label: "Stock", field: "stock", sort: "asc" },
            { label: "Actions", field: "actions", sort: "asc" },
        ],
        rows: [],
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 p-6">
                <h1 className="text-2xl font-bold my-4">Product List</h1>
                <Fragment>
                    <MDBDataTable
                        data={data}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />

                </Fragment>
            </div>
        </div>
    );
}
