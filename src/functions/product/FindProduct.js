export async function FindProduct (id) {
    let urlApi = `http://localhost:8080/product/Ficha/${id}`

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