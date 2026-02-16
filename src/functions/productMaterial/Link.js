export async function Link (Newdata) {
    let urlApi = 'http://localhost:8080/productMaterial/link'
    
    try {
        const dados = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(Newdata)
        })

        if (dados.ok) {
            alert("Ação concluída com sucesso!");
        } else {
            const dadosJson = await dados.json()
            alert(`falha: ${dadosJson.error}`);
            return dadosJson
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}