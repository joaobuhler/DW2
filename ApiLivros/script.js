function buscarLivro() {
      const isbn = document.getElementById("isbn").value.trim().replace(/[^0-9X]/gi, "");

      document.getElementById("titulo").value = "";
      document.getElementById("autores").value = "";
      document.getElementById("editora").value = "";
      document.getElementById("publicacao").value = "";

      if (!isbn || (isbn.length !== 10 && isbn.length !== 13)) {
        alert("ISBN inválido. Insira um ISBN com 10 ou 13 dígitos");
        return;
      }

      const url = `https://brasilapi.com.br/api/isbn/v1/${isbn}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Livro não encontrado");
          }
          return response.json();
        })
        .then((data) => {
          document.getElementById("titulo").value = data.title;
          document.getElementById("autores").value = data.authors.join(", ");
          document.getElementById("editora").value = data.publisher;
          document.getElementById("publicacao").value = data.published;
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao buscar livro. Verifique o ISBN digitado");
        });
    }