# Projeto 06 - McDonald's Combo (Bridge & Adapter)

Aplicação desenvolvida para o sistema de personalização de combos da rede McDonald's utilizando os Padrões Estruturais GoF **Bridge** e **Adapter**.

## 🛠️ Padrões de Projeto Utilizados

- **Bridge**: A classe `Combo` atua como a abstração principal e compõe as interfaces de `Lanche`, `Bebida` e `BatataFrita`. Isso permite alterar e combinar livremente os itens sem necessidade de subclasses rígidas para cada variação.
- **Adapter**: A classe `BebidaLegadaAdapter` adapta a classe `SistemaLegadoBebida` (baseada em códigos numéricos 101, 102, 201, etc.) para que ela seja compatível com o método `getDescricao()` esperados pelo `Combo`.

## 🚀 Como Executar

```bash
node app.js
