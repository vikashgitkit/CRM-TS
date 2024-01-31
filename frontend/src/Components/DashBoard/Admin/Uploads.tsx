
import React from "react";
import './adstyle.css'
import '../styledashb.css'
import AdminNavbar from "./AdminNavbar";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewUpload from "./NewUpload";
import { useLocation } from "react-router-dom";


const Admindash = () => {
    const urll = 'http://localhost:8000'
    const location = useLocation();
    const meta_data_values = location.state;
    console.log("🚀 ~ file: Uploads.tsx:20 ~ Admindash ~ additionalData:", meta_data_values)

    interface Product {
        UploadDate: Date | null,
        UploadType: string,
        County: string,
        File: string,
        RecordCount: number,
        View: JSX.Element
    }
    useEffect(() => {

        setProducts(meta_data_values);
    }, []);

    const [products, setProducts] = useState<Product[]>([]);
   
    const handleButtonClick = (rowData:any) => {
        // Handle button click for the specific row data
        console.log('Button clicked for:', rowData);
      };
    const actionTemplate = (rowData:any) => {
        return (
          <Button label="View" onClick={() => handleButtonClick(rowData)} />
        );
      };
    const columns = [
        { field: 'upload_date', header: 'upload Date' },
        { field: 'upload_type', header: 'Upload Type' },
        { field: 'county', header: 'County' },
        { field: 'file_name', header: 'File' },
        { field: 'record_count', header: 'Record Count' },
        { field: 'view_data', header: 'View', body: actionTemplate,  },

    ];
    // new upload btn
    const Navigation = useNavigate()
    const NewUploadbtn = async () => {
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/upload-data/new-upload`, { headers: { 'Authorization': token } }).then(response => {
            console.log("response recieved ", response);
            if (response.status == 200) {
                Navigation('/Admin/upload-data/new-upload')
            }
        })
    }
    const handleCell = (e: any) => {
        console.log("🚀 ~ file: Uploads.tsx:60 ~ handleCell ~ e:", e)

    }
   

    return (
        <>
            <div className="dashboard-container">
                <AdminNavbar />

                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="top-content">
                            <h2>New Uploads</h2>
                            <div className="card flex justify-content-center">
                                <Button label="New Upload" onClick={NewUploadbtn} > <i style={{ marginLeft: '5px' }} className="pi pi-plus"></i>
                                </Button>
                            </div>
                        </div>
                        <>
                            {console.log("tezt", products)}
                        </>
                        {/* <p>hshshshs${meta_data_values}</p> */}
                        <div className="bottom-content">
                            <div className="card" style={{ width: '100%' }}>
                                <DataTable value={products} selectionMode='single'  onSelectionChange={(e) => handleCell(e)} tableStyle={{ minWidth: '50rem' }} className="upload-table" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                                    {columns.map((col) => (
                                        <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                                    ))}
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Admindash;


