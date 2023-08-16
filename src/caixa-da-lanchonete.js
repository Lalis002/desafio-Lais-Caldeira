class CaixaDaLanchonete {
  produtos = [
    {
      codigo: "cafe",
      descricao: "café",
      valor: 3.0,
    },
    {
      codigo: "chantily",
      descricao: "chantily(extra do café)",
      valor: 1.5,
    },
    {
      codigo: "suco",
      descricao: "Suco Natural",
      valor: 6.2,
    },
    {
      codigo: "sanduiche",
      descricao: "Sanduíche",
      valor: 6.5,
    },
    {
      codigo: "queijo",
      descricao: "Queijo(extra do Sanduíche)",
      valor: 2.0,
    },
    {
      codigo: "salgado",
      descricao: "Salgado",
      valor: 7.25,
    },
    {
      codigo: "combo1",
      descricao: "1 Suco e 1 Sanduiche",
      valor: 2.0,
    },
    {
      codigo: "combo2",
      descricao: "1 Café e 1 Sanduiche",
      valor: 7.5,
    },
  ];

  validarMetodoPagamento(formaDePagamento) {
    if (
      formaDePagamento == "dinheiro" ||
      formaDePagamento == "debito" ||
      formaDePagamento == "credito"
    ) {
      return true;
    } else {
      return false;
    }
  }

  validarQuantidade(quantidade) {
    if (quantidade <= 0) {
      return false;
    } else {
      return true;
    }
  }

  calcularPrecoTotal(metodoDePagamento, quantidade, preco) {
    let total;

    if (metodoDePagamento === "credito") {
      total = (preco + (preco / 100) * 3) * quantidade;
    }

    if (metodoDePagamento === "dinheiro") {
      total = (preco - (preco / 100) * 5) * quantidade;
    }

    if (metodoDePagamento === "debito") {
      total = preco * quantidade;
    }

    const totalFormatado = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return totalFormatado;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const retornoMetodoPagemento =
      this.validarMetodoPagamento(metodoDePagamento);

    if (retornoMetodoPagemento === false) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const item = itens[0];
    const informacoes = item.split(","); 
    const codigo = informacoes[0]; 
    const quantidade = informacoes[1]; 

    const retornoQuantidade = this.validarQuantidade(quantidade);
    if (retornoQuantidade === false) {
      return "Quantidade inválida!";
    }

    const produto = this.produtos.find((produto) => produto.codigo === codigo);

    if (produto === undefined) {
      return "Item inválido!";
    }

    const retornoTotal = this.calcularPrecoTotal(
      metodoDePagamento,
      quantidade,
      produto.valor
    );

    return retornoTotal;
  }
}

export { CaixaDaLanchonete };
