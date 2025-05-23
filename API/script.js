function buscarCep(){
    const cep = document.getElementById("cep").value

    const url = `https://viacep.com.br/ws/$(cep)/json`
   
    fetch(url)
        .then((response) => {
            return response.json()
        })

        .then((data) => {
            if(data.erro){

             alert('cep invalido')}
             return

             document.getElementById("logradouro").value = data.logradouro
             document.getElementById("bairro").value = data.bairro
             document.getElementById("cidade").value = data.localidade
             document.getElementById("estado").value = data.uf
        })
        .catch((error) =>{
            console.log(error)
            alert("erro ao buscar cep")
        }
            )
}