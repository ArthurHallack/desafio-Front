export async function FindMaterial (id) {
    let urlApi = `http://localhost:8080/material/Ficha/${id}`

    try {
        const dados = await fetch(urlApi, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },

        })

        const dadosJson = await dados.json()
        return dadosJson

    } catch (error) {
        console.error('Erro:', error);
    }
}