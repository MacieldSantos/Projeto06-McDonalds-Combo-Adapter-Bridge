/* 
    PROJETO 06 - MC DONALDS - COMBO
Data de conclusão 16 de outubro de 2026 às 09:40
•
Vários envios permitidos
Instruções
PROJETO PRÁTICO – PADRÕES ESTRUTURAIS GoF: ADAPTER E BRIDGE
Uma rede de fast-food, como o McDonald's, deseja desenvolver um sistema de personalização de combos, permitindo que os clientes escolham livremente os itens que compõem seus pedidos. Cada combo deverá conter obrigatoriamente um lanche, uma bebida e uma porção de batata frita, conforme as opções disponíveis:

Lanches: Big Mac, Quarteirão e McFish.

Bebidas: Refrigerante ou suco, nos tamanhos de 300 ml, 500 ml e 700 ml.

Batatas fritas: Pequena, média e grande.

Desenvolva uma aplicação em JavaScript, utilizando obrigatoriamente os padrões estruturais Bridge e Adapter, que permita montar diferentes combinações de combos e personalizá-los durante a execução. O padrão Bridge deverá permitir combinar os diferentes lanches, bebidas e tamanhos de batata sem criar uma classe específica para cada combinação. Além disso, a empresa possui um sistema legado de bebidas que identifica os produtos por códigos numéricos (101, 102 e 103 para refrigerantes; 201, 202 e 203 para sucos, respectivamente nos tamanhos de 300 ml, 500 ml e 700 ml). O padrão Adapter deverá permitir utilizar essas bebidas no novo sistema, sem modificar a implementação original do sistema legado.


O programa deverá demonstrar, por meio do terminal, a montagem de pelo menos cinco combos diferentes, a alteração das bebidas e dos tamanhos de batata de combos já existentes e a criação de um combo utilizando uma bebida obtida pelo sistema legado por meio do Adapter. Os dois padrões deverão funcionar de maneira integrada, utilizando programação orientada a objetos, classes, herança e composição.


Código-fonte JavaScript funcional, disponibilizado em repositório GitHub, com a identificação das classes responsáveis pela implementação de cada padrão e evidências da execução do programa.
*/

// 1. Componentes do combo - Padrão Bridge

// --- LANCHES ---
class Lanche {
    constructor(nome){
        this.nome = nome;
    }
}

class BigMac extends Lanche{
    constructor() {
        super("Big Mac");
    }
}

class Quarteirao extends Lanche{
    constructor() {
        super("Quarteirão com Queijo");
    }
}

class McFish extends Lanche{
    constructor() {
        super("McFish");
    }
}

// --- Bebidas ---
class Bebida {
    constructor(nome, tamanho){
        this.nome = nome;
        this.tamanho = tamanho; // 300ml, 500ml, 700ml
    }
    getDescricao() {
        return `${this.nome} (${this.tamanho})`;
    }
}

// --- Batatas Fritas ---
class Batata {
    constructor(tamanho) {
        this.tamanho = tamanho; // pequena, média, grande
    }
    getDescricao(){
        return `Batata (${this.tamanho})`;
    }
}

class BatataPequena extends Batata {
    constructor() {
        super("Pequena");
    }
}

class BatataMedia extends Batata {
    constructor() {
        super("Média");
    }
}

class BatataGrande extends Batata {
    constructor() {
        super("Grande");
    }
}

// 2. Sistema Legado de Bebidas e Adapter

// O sistema legado que não pode ser alterado
class SistemaLegadoBebida {
    buscarBebidaPorCodigo(codigo) {
        const tabelaBebidas = {
            101: { tipo: "Refrigerante", tamanho: "300 ml" },
            102: { tipo: "Refrigerante", tamanho: "500 ml" },
            103: { tipo: "Refrigerante", tamanho: "700 ml" },
            201: { tipo: "Suco", tamanho: "300 ml" },
            202: { tipo: "Suco", tamanho: "500 ml" },
            203: { tipo: "Suco", tamanho: "700 ml" }
        };
        return tabelaBebidas[codigo] || null;
    }
}

// ADAPTER: Converte o código numérico do sistema legado na interface esperada pelo Combo

class BebidaLegadaAdapter {
    constructor(codigoBebida, sistemaLegado) {
        this.sistemaLegado = sistemaLegado || new SistemaLegadoBebida();
        this.dadosBebida = this.sistemaLegado.buscarBebidaPorCodigo(codigoBebida);

        if (!this.dadosBebida) {
            throw new Error(`Código de bebida legado inválido: ${codigoBebida}`);
        }
    }
    getDescricao() {
        return `${this.dadosBebida.tipo} Legado (${this.dadosBebida.tamanho})`;
    }
}

// 3. Abstração do combo - Bridge
class Combo {
    constructor(lanche, bebida, batata) {
        this.lanche = lanche;
        this.bebida = bebida;
        this.batata = batata;
    }

    // Métodos para alterar itens em tempo de execução (Bridge em ação)
    setBebida(novaBebida) {
        this.bebida = novaBebida;
    }

    setBatata(novaBatata) {
        this.batata = novaBatata;
    }

    exibirResumo(numeroCombo) {
        console.log(`=============================================`);
        console.log(`🍔 COMBO Nº ${numeroCombo}`);
        console.log(`    - Lanche: ${this.lanche.nome}`);
        console.log(`    - Bebida: ${this.bebida.getDescricao()}`);
        console.log(`    - Batata: ${this.batata.getDescricao()}`);
        console.log(`=============================================\n`)
    }
}

// 4. Demonstração e testes no terminal

function executarDemonstracao() {
    console.log("🍟 SISTEMA DE COMBOS MC DONALD´S - DEMONSTRAÇÃO DE PADRÕES GoF\n");

    const sistemaLegado = new SistemaLegadoBebida();

    // 1. Criando 5 combos diferentes (Exigência do enunciado)
    const combo1 = new Combo(
        new BigMac(),
        new Bebida("Refrigerante Guaraná", "500 ml"),
        new BatataMedia()
    );

    const combo2 = new Combo(
        new Quarteirao(),
        new Bebida("Suco de Laranja", "300 ml"),
        new BatataGrande()
    )

    const combo3 = new Combo(
        new McFish(),
        new Bebida("Refrigerante Coca-Cola", "700 ml"),
        new BatataPequena
    )

    const combo4 = new Combo(
        new BigMac(),
        new Bebida("Suco de Uva", "500 ml"),
        new BatataGrande()
    );

    // Combo 5 utilizando a bebida do SISTEMA LEGADO via ADAPTER (Código 203 = Suco 700ml)
    const bebidaAdapter203 = new BebidaLegadaAdapter(203, sistemaLegado);
    const combo5 = new Combo(
        new Quarteirao(),
        bebidaAdapter203,
        new BatataMedia()
    );

    console.log("--- 1. EXIBIÇÃO DOS 5 COMBOS INICIAIS ---");
    combo1.exibirResumo(1);
    combo2.exibirResumo(2);
    combo3.exibirResumo(3);
    combo4.exibirResumo(4);
    combo5.exibirResumo(5);

    // 2. Personalizando combos em tempo de execução (Alteração de bebida e batata)
    console.log("---2. PERSONALIZAÇÃO / ALTERAÇÃO DE COMBOS EXISTENTES ---");

    console.log("🔄 Alterando a Batata do Combo 1 (de Média para Grande)...");
    combo1.setBatata(new BatataGrande());
    combo1.exibirResumo(1);

    console.log("🔄 Alterando a Bebida do Combo 3 para uma Bebida Legada (Código 102 = Refri 500ml) via Adapter...");
    const bebidaAdapter102 = new BebidaLegadaAdapter(102, sistemaLegado);
    combo3.setBebida(bebidaAdapter102);
    combo3.exibirResumo(3);
}

// Executa a demonstração
executarDemonstracao();
