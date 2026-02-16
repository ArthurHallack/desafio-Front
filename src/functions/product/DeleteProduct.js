export async function DeleteProduct(id) {
    let urlApi = `http://localhost:8080/product/Delete/${id}`

    try {
        const dados = await fetch(urlApi, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })

        if (dados.ok){
            alert("Realizado com sucesso!")
            return
        } else {
            alert("falha ao deletar")
            return
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}