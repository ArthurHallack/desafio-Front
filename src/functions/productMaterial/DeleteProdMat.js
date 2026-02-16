export async function DeleteProdMat(pId, mId) {
    let urlApi = `http://localhost:8080/productMaterial/delete?productId=${pId}&materialId=${mId}`

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
            console.log( await dados.json());
            return
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}