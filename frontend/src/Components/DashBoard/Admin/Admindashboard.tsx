

import { Chart } from 'primereact/chart';
import './adstyle.css'
import { useState ,useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import AdminNavbar from "./AdminNavbar";
import { FaCircleDollarToSlot ,FaChartLine} from "react-icons/fa6";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
                
const Admindashboard = () => {
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    interface Product {    
        UserName: string;
        DateTime: string;
    }
    
    interface ColumnMeta {
        field: string;
        header: string;
    }
    const [products, setProducts] = useState<Product[]>([]);
    const columns: ColumnMeta[] = [
        {field: 'UserName', header: 'User Name'},
        {field: 'DateTime', header: 'Date Time'},
      
    ];
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'All',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                    {
                        label: '1M',
                        backgroundColor: documentStyle.getPropertyValue('--blue-400'),
                        borderColor: documentStyle.getPropertyValue('--blue-400'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    },
                    {
                        label: '6M',
                        backgroundColor: documentStyle.getPropertyValue('--blue-300'),
                        borderColor: documentStyle.getPropertyValue('--blue-200'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    },{
                        label: '1Y',
                        backgroundColor: documentStyle.getPropertyValue('--blue-200'),
                        borderColor: documentStyle.getPropertyValue('--blue-200'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);


        // data insertion in table
        const productsdata: Product[] = [
            { UserName:'User1',DateTime:' 2023-12-1 / 10 a.m' },
            { UserName:'User2',DateTime:' 2023-12-1 / 10 a.m' },
            { UserName:'User3',DateTime:' 2023-12-1 / 10 a.m' },
            { UserName:'User4',DateTime:' 2023-12-1 / 10 a.m' },
            { UserName:'User5',DateTime:' 2023-12-1 / 10 a.m' },
            
        ];
        setProducts(productsdata);
    }, []);

    // header of table
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">User Activities</span>
        </div>
    );
return (
<>
<div className={`dashboard-container ${'' ? 'dashboard-container-lg' : ''}`}>
<AdminNavbar/>
<div className="main-content-admin">
<div className="main-admin">                   

  
   <div className="heading-container-admin">

        <div className="heading-container-txts">
                <h1 className="wlcm-msg">Welcome Back !</h1>
                <h5 className="line-msg">Here's what happening with your track today </h5>
        </div>

        <div className="calender">
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
        </div>
        </div>
   </div>
       <div className="box-container-admin">

           <div className="box-admin box1">

               <div className="text">
                   <h2 className="topic">Total Earnings</h2>
                   <h2 className="topic-heading">$5000</h2>
               </div>
               <FaCircleDollarToSlot className="box-logo-admin"/>
           </div>

           <div className="box-admin box2">
               <div className="text">
                   <h2 className="topic">Active Users</h2>
                   <h2 className="topic-heading">500</h2>
               </div>
              < FaChartLine className="box-logo-admin"/>

           </div>

           
       </div>

       <div className="report-container-admin">
           <div className="report-graph">
           <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
           </div>
           <div className="report-table">
           <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '48rem' }} header={header} showGridlines>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
           </div>
       </div>
  

</div>
</div>
</div>  
</>
)
}
export default Admindashboard;


