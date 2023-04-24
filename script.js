const fileInput = document.querySelector('#inputContactos');
const btn = document.querySelector('#btnDescargar');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  let i = 0;

  reader.addEventListener('load', () => {
    const lines = reader.result.split('\n');
    let vcf = '';

    console.log(lines[0].split(', ').length)

    if (lines[0].split(', ').length == 2){
        for (const line of lines) {
            const [nombre, telefono] = line.split(', ');
            
            vcf += `BEGIN:VCARD
VERSION:3.0
FN:${nombre}
TEL;TYPE=CELL:${telefono}
END:VCARD
`;  
        }
    }else if(lines[0].split(', ').length == 1){
        for (const line of lines) {
            const telefono = line;
            const nombrePred = document.getElementById('nombreContacto').value;
            let nombre = `${nombrePred}${i}`

            console.log(nombre, telefono)

            vcf += `BEGIN:VCARD
VERSION:3.0
FN:${nombre}
TEL;TYPE=CELL:${telefono}
END:VCARD
`;
        i++;
        }
    }else{
        alert("Error en el archivo txt")
    }

    btn.addEventListener('click', () => {
        const blob = new Blob([vcf], { type: 'text/vcard' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'contactos.vcf';
        link.click();
    })
  });
  reader.readAsText(file);
});
