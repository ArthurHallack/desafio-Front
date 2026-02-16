export async function SaveMaterial (Newdata) {
    let urlApi = 'http://localhost:8080/material/Grava'
    
    try {
        const dados = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(Newdata)
        })

        const dadosJson = await dados.json()
        return dadosJson

    } catch (error) {
        console.error('Erro:', error);
    }
}