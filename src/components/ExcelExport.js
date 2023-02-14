import * as FileSaver from 'file-saver'
import XLSX from  'sheetjs-style'

export default({excelData,fileName})=>{
const fileType='application/vnd.openxmlformats-officedocument.spredsheetml.sheet;charest=UTF-8'
const fileExtension='.xlsx'
const exportToExcel=async()=>{
    const ws=XLSX.utils.json_to_sheet(excelData);
    const wb={Sheets:{'data':ws},SheetNames:['data']}
    const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'})
    const data= new Blob([excelBuffer],{type:fileType})
    FileSaver.saveAs(data,fileName+fileExtension)
}
return(
<>
{/* <Tooltip title="Excel Export"> */}
<button variant="contained"
onClick={(e)=>exportToExcel(fileExtension)}color='primary'
> download</button>
{/* </Tooltip> */}
</>
)}
