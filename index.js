let participantes = [
    {
        nome: "Jaqueline Volcian",
        email: "jaqueline@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Evanira Martins",
        email: "evanira@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckIn: new Date(2024, 1, 5, 20, 20)
    },
    {
        nome: "João Silva",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 3, 15, 10, 30),
        dataCheckIn: new Date(2024, 3, 20, 9, 0)
    },
    {
        nome: "Maria Souza",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 4, 10, 15, 45),
        dataCheckIn: new Date(2024, 4, 12, 18, 10)
    },
    {
        nome: "Carlos Oliveira",
        email: "carlos@gmail.com",
        dataInscricao: new Date(2024, 5, 5, 12, 0),
        dataCheckIn: new Date(2024, 5, 8, 14, 30)
    },
    {
        nome: "Ana Santos",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 6, 20, 9, 15),
        dataCheckIn: new Date(2024, 6, 25, 11, 45)
    },
    {
        nome: "Pedro Costa",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 7, 8, 17, 30),
        dataCheckIn: null
    },
    {
        nome: "Lúcia Fernandes",
        email: "lucia@gmail.com",
        dataInscricao: new Date(2024, 8, 12, 14, 20),
        dataCheckIn: new Date(2024, 8, 15, 16, 40)
    },
    {
        nome: "Rafael Barbosa",
        email: "rafael@gmail.com",
        dataInscricao: new Date(2024, 9, 18, 11, 10),
        dataCheckIn: null
    },
    {
        nome: "Sandra Pereira",
        email: "sandra@gmail.com",
        dataInscricao: new Date(2024, 10, 5, 8, 50),
        dataCheckIn: new Date(2024, 10, 8, 10, 15)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
    
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)
    
    //condicional
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `
    }
    
    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
    
    // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()
    
    const dadosDoFormulario = new FormData(event.target)
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email:dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
    
    // verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )
    
    if(participanteExiste) {
        alert("Email já cadastrado!")
        return
    }
    
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
    
    // limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // confirmar se realmente quer fazer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?';
    
    if (confirm(mensagemConfirmacao) == false) {
        return
    }
    
    // encontrar o participante dentro da lista
    const participante = participantes.find(
        (p) => p.email == event.target.dataset.email
    );
    
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date();
    
    // atualizar a lista de participantes
    atualizarLista(participantes);
}