# O Homem nos Campos 

Um jogo de suspense e sobrevivência atmosférico desenvolvido com **Three.js**. Você está sozinho em uma casa isolada e precisa realizar um ritual de proteção antes que o tempo se esgote.

---

## Gameplay
> **ASSISTA AO VÍDEO DA GAMEPLAY ABAIXO:**

https://github.com/user-attachments/assets/0c15df2c-aa3c-44fb-8614-01cc1197f8d7

---

## Como Clonar e Rodar o Projeto

Se você deseja baixar este projeto para sua máquina local, siga os passos abaixo:

### 1. Clonando o Repositório
Abra o terminal (ou CMD) no seu computador e digite o comando abaixo:
```bash
git clone [https://github.com/SEU_USUARIO/homem-nos-campos-jogo.git](https://github.com/SEU_USUARIO/homem-nos-campos-jogo.git)
```
---

## Como Abrir e Jogar (Passo a Passo)

Devido às restrições de segurança dos navegadores modernos para carregar modelos 3D (`.glb`) e áudios, você **NÃO** pode abrir o jogo clicando duas vezes no arquivo `index.html`. É necessário usar um servidor local.

### 1. Usando o VS Code (Método Recomendado)
1. Abra a pasta do projeto no seu **Visual Studio Code**.
2. Vá até a aba de extensões (ícone de quadrados no lado esquerdo) e instale a extensão chamada **"Live Server"** (de Ritwick Dey).
3. Com a extensão instalada, clique com o botão direito sobre o arquivo **`index.html`** na barra lateral.
4. Selecione a opção **"Open with Live Server"**.
5. O seu navegador abrirá automaticamente no endereço `http://127.0.0.1:5500`.

### 2. Controles do Jogador
* **Clique na Tela:** Ativa o controle do mouse (trava o cursor para você olhar ao redor).
* **W, A, S, D:** Movimentação.
* **Shift Esquerdo:** Corre (gasta stamina).
* **Tecla E:** Interagir (Abre/Fecha portas, baús e usa a cama).
* **ESC:** Libera o cursor do mouse.

---

## Objetivo do Jogo
A noite caiu e algo observa você dos campos. Para sobreviver, você deve garantir que a casa esteja completamente selada. 
1. Verifique cada porta, tampa de baú e porta de armário.
2. Se houver algum objeto aberto, o contador no topo da tela indicará.
3. Feche tudo antes que o relógio atinja a meia-noite.
4. Assim que tudo estiver fechado, corra para a **Cama** e aperte **E** para dormir e terminar o ritual.
5. **Aviso:** Nunca olhe na direção da entidade... **Ela** pode ver você.

---

## Tecnologias e Estrutura

O projeto utiliza a engine **Three.js** via módulos nativos do JavaScript (ES6), sem a necessidade de instalar pacotes externos via NPM para rodar.

* `index.html`: Estrutura principal e interface (HUD).
* `js/Main.js`: O coração do jogo (Loop de renderização e lógica de tempo).
* `js/SomGame.js`: Gerenciamento de áudio espacial e efeitos.
* `js/PlayerController.js`: Lógica de física e câmera do jogador.
* `casajogo.glb`: Modelo 3D contendo todo o cenário e animações.

---

## Estrutura de Arquivos para o GitHub

Para que o jogo funcione corretamente após o upload, mantenha esta organização:
```text
/homem-nos-campos-jogo
├── index.html          <-- (ABRA ESTE ARQUIVO COM LIVE SERVER)
├── casajogo.glb
├── fundo.mp3
├── passos.mp3
├── morte.mp3
├── abrirObjeto.mp3
├── README.md
└── js/
    ├── Main.js
    ├── PlayerController.js
    ├── SomGame.js
    ├── UI.js
    ├── ObjectManager.js
    └── InteractionSystem.js
```
