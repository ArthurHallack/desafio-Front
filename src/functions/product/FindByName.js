export async function FindByName (name) {
    let urlApi = `http://localhost:8080/product/Filtro/${name}`

    try {
        const dados = await fetch(urlApi, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },

        })
        
        const dadosJson = await dados.json()
        console.log(dadosJson)
        return dadosJson

    } catch (error) {
        console.error('Erro:', error);
    }
}