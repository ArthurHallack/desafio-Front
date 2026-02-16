let urlApi ='http://localhost:8080/product/Pagina';

export async function GetAllProducts() {
    try {
        const dados = await fetch(urlApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!dados.ok) {
            throw new Error('Network response was not ok');
        }

        const dadosJson = await dados.json();
        return dadosJson;

    } catch (error) {
        console.error('Erro:', error);
    }
}