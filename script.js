var doc = new jsPDF('p', 'mm', [297, 210]);

function generate() {
    doc = new jsPDF('p', 'mm', [297, 210]);
    try {
        var file = document.getElementById("myfile").files[0];
        getBase64(file);
    }
    catch (err) {
        console.log("Error: Benötige Bild Datei");
    }
}

function download() {
    doc.save("button-template.pdf");
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        image64 = reader.result;
        continueGenerate(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function continueGenerate(fileString) {
    if (document.getElementById('radiusInput').value === null || document.getElementById('radiusInput').value === "") {
        console.log("Error: Benötige Radius");
        return;
    }
    let radius = Number(document.getElementById('radiusInput').value);

    //drawButton(fileString, radius, 20, 50);
    drawRow(fileString, radius);
    
    const elem = document.getElementById("my-iframe");
    elem.src = doc.output('datauristring') + "#toolbar=0&navpanes=0&scrollbar=0";
}


function drawButton(fileString, radius, x, y){

    //Todo: This Function needs to do way more math them i want

    doc.addImage(fileString, 'JPEG', x, y, radius * 2, radius * 2)

    doc.setLineWidth(40)
    doc.setDrawColor(255,255,255); 
    doc.circle(x + radius, y + radius, radius + 7, 'Fd')
}

function drawRow(fileString, radius){
    for (let i = 10; i < 40; i += 10) {
        drawButton(fileString, radius, i, 10);
    }
}

