import html2canvas from 'html2canvas'

export const generarImagen = async (div) => {
    return await html2canvas(div,{allowTaint: true,useCORS: true,}).then(canvas => {
        return canvas.toDataURL("image/png")
    })
    
}

