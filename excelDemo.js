  const ExcelJs = require('exceljs');

  async function writeExcelTest(searchText,replaceText,change,filePath)
  {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value= replaceText;
    await workbook.xlsx.writeFile(filePath);
 }
 
 async function readExcel(worksheet,searchText){
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,number)=>
    row.eachCell((cell,colNumber)=>
    {
        if(cell.value===searchText){
            output.row=number;
            output.column=colNumber;
        }
    }
    )
    )
    return output;
 }
 writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:\\Users\\ASUS\\Downloads\\download.xlsx");