import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { MultiSelect , MultiSelectChangeEvent } from 'primereact/multiselect';
import { DataTableRowEditCompleteEvent, DataTableSelectionMultipleChangeEvent } from 'primereact/datatable'; 
import './styledashb.css'

const DashFC = () => {   
    const columns = [
        { field: "AuctnDate", header: "Auctn Date" },
        { field: "CaseNumber", header: "Case Number#" },
        { field: "Address", header: "Address" },
        { field: "Defendant", header: "Defendant(s)" },
        { field: "plaintiff", header: "Plaintiff(s)" },
        { field: "Jdgmnt", header: "Jdgmnt $" }
    ];
    interface Product {
        AuctnDate: string;
        CaseNumber: string;
        Address: string;
        Defendant: number;
        plaintiff: string;
        Jdgmnt: number;
    }
    // const displayname=localStorage.getItem("display_name")
    const [products, setProducts] = useState<Product[] | null>(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [rowClick, setRowClick] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState(columns);
    const [csvData, setCsvData] = useState([]);

    // const [date, setDate] = useState(null);

    const dt = useRef(null);
    const cities = [
        { name: 'Orange', code: 'NY' },
        { name: 'Hillsborough', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    useEffect(() => {
        const productsdata: Product[] = [
            { AuctnDate: 'P001', CaseNumber: 'Product 1', Address: 'Category A', Defendant: 10, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P002', CaseNumber: 'Product 2', Address: 'Category B', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P003', CaseNumber: 'Product 3', Address: 'Category C', Defendant: 20, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P004', CaseNumber: 'Product 4', Address: 'Category D', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P005', CaseNumber: 'Product 5', Address: 'Category E', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P006', CaseNumber: 'Product 6', Address: 'Category G', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P007', CaseNumber: 'Product 7', Address: 'Category H', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P008', CaseNumber: 'Product 8', Address: 'Category I', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P009', CaseNumber: 'Product 9', Address: 'Category J', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },
            { AuctnDate: 'P0010', CaseNumber: 'Product 10', Address: 'Category K', Defendant: 15, plaintiff: "BankA", Jdgmnt: 1000 },

        ];
        setProducts(productsdata);

    }, []);

    const onColumnToggle = (event: MultiSelectChangeEvent) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol:any) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        if (products === null) {
            return;
        }
        let _products = [...products];
        let { newData, index } = e;

        // _products[index] = newData;
        let updatedProduct: Product = newData as Product;

        _products[index] = updatedProduct;
        setProducts(_products);
    };

    const textEditor = (options:any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };


    const header = (
        <div className='headerdata' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <div className="row-click">
                <label htmlFor="input-rowclick">Row Click</label>
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} style={{ marginLeft: '2px' }} />
            </div>

            <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem coltoggle" display="chip" />

            <Tooltip target=".export-buttons>button" position="bottom" />

            <div className=" save flex align-items-center justify-content-center ">

                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            </div>


        </div>
    );
    interface CSVExportOptions {
        filename: string;
        // properties needed for configuring the CSV export
    }

    interface TypeExportCSV {
        exportCSV: (options: CSVExportOptions) => void;
        // Add other properties or methods if available
    }
    const exportCSV = (selectionOnly: boolean) => {
        // dt.current.exportCSV({ selectionOnly });
        if (dt.current !== null && dt.current !== undefined) {
            const dtCurrent = dt.current as TypeExportCSV;
            const options: CSVExportOptions = {
                filename: "exported_data.csv", // Example filename
                // Add other necessary properties based on the requirements
            };
            dtCurrent.exportCSV(options);
        } 
        else {
            console.error("dt.current is null or undefined.");}

    };


    return (
        <div className='parent'>


            {products !== null ? (
                <div className='def'>
                    <DataTable value={products}
                        ref={dt}
                        showGridlines
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                        removableSort
                        selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts}
                        onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<Product[]>) => setSelectedProducts(e.value)}
                        columnResizeMode="expand" resizableColumns
                        tableStyle={{ minWidth: '50rem' }}
                        onRowEditComplete={onRowEditComplete} editMode="row" scrollable scrollHeight="400px"
                        header={header} >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        {visibleColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} style={{ width: '20%' }} />
                        ))}
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    )

}
export default DashFC;  