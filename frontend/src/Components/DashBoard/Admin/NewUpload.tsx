import React, { useState, useRef, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import './adstyle.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios ,{AxiosResponse}from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';


const NewUpload = () => {
    const toast = useRef<Toast>(null);
    const urll = 'http://localhost:8000'
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [selectedfileType, setSelectedfileType] = useState(null);

    const [file, setFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileContent, setFileContent] = useState<string>('');
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [csvJObj, setCsvObj] = useState<string[][]>([]);
    const [RowCount,setRowCount]=useState<number>(0);
    const dropdown = localStorage.getItem('county_fileType');
    const dropdownValues = dropdown ? JSON.parse(dropdown) : {};

    const countyOptions = dropdownValues.county;
    const fileTypeOptions = dropdownValues.fileType; 
   
    //sample file
    const sample_foreclosure_url = 'http://localhost:3000/Foreclosure.csv';
    //navigation element
    const Navigation = useNavigate();
    
    const handleBackbtn=async ()=>
    {
        const token = localStorage.getItem('jwtToken')
        await axios.get(`${urll}/upload-data`, { headers: { 'Authorization': token } }).then((response:AxiosResponse) => {
            // Handle successful response and update the dashboard UI
            console.log("response recieved from upload data verification", response);
           
            if (response.status == 200) {
               const metaData=response.data.DataRows;
                console.log("🚀 ~ file: AdminNavbar.tsx:59 ~ awaitaxios.get ~ metaData:", metaData)
                Navigation("/Admin/upload-data",{state:metaData})
            }
        })
    }
    const parseCSV = (content: string): string[][] => {
        const rows = content.split('\n');
        setRowCount(rows.length);
        return rows.map((row) => row.split(','));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( !selectedCounty || !selectedfileType) {
            toast.current?.show({ severity: 'error', summary: 'Select All the Options' });
  
              return; }
        if (e.target.files && e.target.files.length > 0) {
            // setFile(e.target.files[0]);
            const selectedFile = e.target.files[0];

            if (selectedFile.type !== 'text/csv') {
          toast.current?.show({ severity: 'error', summary: 'Please Select CSV file' });
                
                return;
            }
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    const content = event.target.result;
                    setFileContent(content);
                    // Parse CSV data into array for table display
                    const parsedData = parseCSV(content);
                    console.log("parsed data : ", parsedData, "and its type is :", typeof (parsedData))
                    // setTest(parsedData)
                    setCsvData(parsedData);
                    console.log("🚀 ~ file: NewUpload.tsx:57 ~ handleFileChange ~ parsedData:", parsedData)

                    console.log("🚀 ~ file: NewUpload.tsx:57 ~ handleFileChange ~ handleData:")
                    handleData(parsedData)

                }
            }; reader.readAsText(selectedFile);
        }
    }
    const handleFileUpload = async () => {
        if (!file || !selectedCounty || !selectedfileType) {
          toast.current?.show({ severity: 'error', summary: 'Select All the Options' });

            return; }
        
        const formData = new FormData();
        console.log("form data ", formData)
        console.log("file is present")
        formData.append('file', file);
        formData.append('county',JSON.stringify(selectedCounty))
        formData.append('fileType',JSON.stringify(selectedfileType))
        formData.append('RowCount',JSON.stringify(RowCount))

        console.log(" 90 line : newupload.tsx : rows present are : ",RowCount)
        try {
            await axios.post(`${urll}/new-upload/file`, formData).then((res)=>
            {if(res.status==200)
            {
                toast.current?.show({ severity: 'success', summary: 'Login Successful', detail: `file uploaded successfully ` });
                console.log("file uploaded successfully ...")

            }});  
            
        } catch (error) {
          toast.current?.show({ severity: 'error', summary: 'Error uploading file' });

            console.error('Error uploading file:', error);
        }
    }
    const handleCancelFile = async () => {
        setFile(null)
        csvData.length = 0;
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    }
    const handleData = (csvD: any) => {

        console.log("🚀 ~ file: NewUpload.tsx:95 ~ handleData ~ csvData: length", csvD.length)
        const headers = csvD[0];
        console.log("🚀 ~ file: NewUpload.tsx:95 ~ handleData ~ headers:", headers)

        const _rowDataObjects = csvD
            .slice(1);
        let splittt = _rowDataObjects
        const dataAsObjects = splittt.map((row: any) => {
            const obj: any = {};
            headers.forEach((header: any, index: any) => {
                obj[header] = row[index];
            });
            return obj;
        });
        console.log("🚀 ~ file: NewUpload.tsx:93 ~ dataAsObjects ~ dataAsObjects:", dataAsObjects)
        console.log("🚀 ~ file: NewUpload.tsx:85 ~ NewUpload ~ splittt:", splittt)
        setCsvObj(dataAsObjects)

    }
    const hadleSampleFileDownload = (sample_foreclosure_url:string) => {
        const fileName = 'Foreclosure_sample.csv';
        const aTag=document.createElement('a');
        aTag.href=sample_foreclosure_url;
        aTag.setAttribute('download',fileName)
        document.body.appendChild(aTag)
        aTag.click();
        aTag.remove();

    }

    return (
        <>
            <div className="dashboard-container dashboard-container-lg">
            <Toast ref={toast} />
                <AdminNavbar />
                <div className="main-content-admin">
                    <div className="main-admin">
                        <div className="new-upload-heading">
                            <FaArrowLeftLong className="back-btn" onClick={handleBackbtn}/>
                            <h2> New Upload</h2>
                        </div>
                        <div className="new-upload-filters">
                            {/* Select County */}
                            <div className="card flex justify-content-center new-upload-filters-btn">
                                <Dropdown value={selectedCounty} onChange={(e: DropdownChangeEvent) => setSelectedCounty(e.value)} options={countyOptions} optionLabel="name"
                                    placeholder="Select File Type" className="w-full md:w-14rem" />
                            </div>
                            {/* Select File Type */}
                            <div className="card flex justify-content-center new-upload-filters-btn">
                                <Dropdown value={selectedfileType} onChange={(e: DropdownChangeEvent) => setSelectedfileType(e.value)} options={fileTypeOptions} optionLabel="name"
                                    placeholder="Select County" className="w-full md:w-14rem" />
                            </div>
                            {/* Input File */}
                            <div className="card flex justify-content-center">           
                                <div className="dropdown">
                                    <button className="dropbtn" >Select Operation</button>
                
                                    <div className={`dropdown-content` }>
                                          <input type="file" ref={inputFileRef} className="custom-file-input1  "name="select file to upload"placeholder="Insert" onChange={(e)=>handleFileChange(e)}></input>
                                            <input type="file" ref={inputFileRef} className="custom-file-input2 "name="select file to upload" onChange={(e)=>handleFileChange(e)}></input>
                                    </div>
                                </div>
                            </div>
                            {/* Upload */}
                            <div className="card flex justify-content-center new-upload-filters-btn">
                                <Button label="Upload" icon="pi pi-check" onClick={handleFileUpload} />
                            </div>
                            {/* Cancel*/}
                            <div className="card flex justify-content-center new-upload-filters-btn">
                                <Button label="Cancel" icon="pi pi-times" onClick={handleCancelFile} />
                            </div>
                            {/* Sample File */}
                            <div className="card flex justify-content-center new-upload-filters-btn">
                                <Button label="Sample File" onClick={()=>{hadleSampleFileDownload(sample_foreclosure_url)}} />
                            </div>
                        </div>

                        <div className="new-upload-data">

                            <div className="new-upload-data-top">

                            </div>
                            <div className="new-upload-data-bottom">
                                {csvData.length > 0 &&
                                    (<div>
                                        <h2>Preview</h2>
                                        <div className="card">
                                            <DataTable value={csvJObj} tableStyle={{ minWidth: '50rem' }} paginator rows={5}>
                                                {csvData[0].map((cell, index) => (
                                                    <Column key={cell} header={cell} field={cell} />
                                                ))}
                                            </DataTable>
                                        </div>
                                    </div>

                                    )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default NewUpload;