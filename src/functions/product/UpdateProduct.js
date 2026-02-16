export async function UpdateProduct (Newdata) {
    let urlApi = 'http://localhost:8080/product/Atualiza'
    
    try {
        const dados = await fetch(urlApi, {
            method: 'PUT',
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