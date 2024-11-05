import html2canvas from 'html2canvas'

export const generarImagen = async (div) => {
    return await html2canvas(div,{allowTaint: true,useCORS: true, scale: 4}).then(canvas => {
        return canvas.toDataURL("image/png")
    })
    
}


