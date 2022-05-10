//==============================================================

//Declarando variáveis
const listElement = document.querySelector('ul');
const inputElement = document.querySelector('input');
const buttonElement = document.querySelector('button');

//==============================================================

//Declaração de variável (array de tarefas) para pegar o item, usando o getItem do localStorage
const tarefas = JSON.parse(localStorage.getItem('list_tarefas')) || [];

//==============================================================

//Função para mostrar as minhas tarefas ao HTML
function mostraTarefas () {

    //limpando a ul para cada item ser adicionado 1 a 1
    listElement.innerHTML = '';

    //For para percorrer o array de tarefas
    for (item of tarefas){

        //criando elemento li
        const itemList = document.createElement('li');
        //criando texto
        const itemText = document.createTextNode(item);

        itemList.setAttribute('class', 'mdl-list-item')

        //criando elemento link
        const linkElement = document.createElement('a');
        linkElement.setAttribute('class', 'material-icons')

        //criando elemento de texto do botão de excluir da tarefa
        const linkText = document.createTextNode('delete');
        //adicionando o texto do botão de excluir a tarefa
        linkElement.appendChild(linkText);

        //constante para pegar a posição do momento do for e colocar como posição do item do array tarefas
        const pos = tarefas.indexOf(item);
        //adicionando evento de click ao elemento link para usar a função deletaTarefa()
        linkElement.setAttribute('onclick', `removeTarefa(${pos})`);

        //elemento tarefa recebe texto tarefa (texto tarefa passa a ser filho de li)
        itemList.appendChild(itemText);
        //elemento lista recebe elemento tarefa (elemento tarefa passa a ser filho de elemento lista)
        itemList.appendChild(linkElement);
        //adicionar link para execução da função deleta tarefa
        listElement.appendChild(itemList);
    }
}

mostraTarefas();

//==============================================================

//Função para adicionar tarefas
function addTarefa (){

    //constante para pegar o valor de texto digitado pelo usuário
    const tarefa = inputElement.value;
    //adicionando item texto tarefa ao array de tarefas
    tarefas.push(tarefa);
    //limpando elemento imput para não haver duplicidade de adição de tarefas (limpando o elemento input)
    inputElement.value = '';

    //chamar função mostraTarefas() para o usuário vizualizar no HTML
    mostraTarefas();
    salvarNoLocalStorage();
}

//adicionar evento de click ao botão, para executar a função addTarefa
buttonElement.setAttribute('onclick', 'addTarefa()');

//==============================================================

//Função para deletar tarefa
function removeTarefa(pos) {
    //método splice usado para retirar (excluir) a tarefa na posição escolhida e quantos itens serão excluidos
    tarefas.splice(pos, 1);
    //chamando a função mostra tarefas de novo para rederizar a lista de tarefas sem a tarefa excluida anteriormente
    mostraTarefas();
    salvarNoLocalStorage();
}

//==============================================================

//Função para salvar no localStorage

function salvarNoLocalStorage() {
    //vai entrar no localStorage e setar um item nele, sendo uma chave list_tarefas e valores do array de tarefas
    //ou seja, vou colocar os itens do array de tarefas dentro da minha chave list_tarefas
    localStorage.setItem('list_tarefas', JSON.stringify(tarefas));
}

//==============================================================

