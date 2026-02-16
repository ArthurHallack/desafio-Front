export async function GetByMaterial (id) {
    let urlApi = `http://localhost:8080/productMaterial/byMaterial/${id}`

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