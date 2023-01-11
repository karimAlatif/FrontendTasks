const selectedFileName = document.querySelector("#selectedFileName");
const fileInput = document.querySelector("#file")

function convertToCsv(object) {
    let arr = Object.entries(object);
    let str = ""
    arr.forEach(row => {
        str += row.join(",") + "\n"
    });
    return str
}

function exportCSVFile(files, fileTitle) {
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    var blob = new Blob([files], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function getAverage(arr) {
    let average = {};
    const length = arr.length;
    arr.forEach((order)=>{
        average[order.name] =  ((order.quantity/length) + (average[order.name] || 0));
    });
    return average
}

function getItemBrands(arr) {
    let itemsWithBrands = {};
    arr.forEach((order)=>{
        itemsWithBrands[order.name] = {
            brands: {...itemsWithBrands[order.name]?.brands || {}, ...{
                [order.brand] :  ((itemsWithBrands[order.name] && itemsWithBrands[order.name].brands[order.brand]) || 0) +1,
            }}
        };
    });
    Object.keys(itemsWithBrands).forEach((objKey)=>{
        let sortedBrands = Object.keys(itemsWithBrands[objKey].brands).map((brandKey)=> ( {[brandKey]:itemsWithBrands[objKey].brands[brandKey]}))
        .sort((a,b)=> Object.values(b)[0]-Object.values(a)[0]);
        itemsWithBrands[objKey] = Object.keys(sortedBrands[0])[0] ;
    });
    return itemsWithBrands
}

fileInput.addEventListener('change', (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    selectedFileName.textContent = selectedFile.name
    reader.readAsText(selectedFile);
    reader.onloadend = () => {
        let orders = reader.result.split(/\r\n|\n/)
            .filter(order => order != "")
            .map(order => {
                let arr = order.split(",");
                return { //get rows as orders
                    name: arr[2],
                    quantity: Number(arr[3]),
                    brand: arr[4]
                }
            });
        let finalFiels = [getAverage(orders), getItemBrands(orders)]
        for (let i = 0; i < 2; i++) {
            const fileName = `${i}_${selectedFile.name}`
            exportCSVFile(convertToCsv(finalFiels[i]), fileName)
        }
    }
});