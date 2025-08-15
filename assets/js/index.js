document.addEventListener("DOMContentLoaded", () => {
    let listaLembretes = [];
    let id = 1;

    let botaoCriado = false;
    let mensagem;

    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();        

        const inputNomeLembrete = document.querySelector("#nome--lembrete");
        const inputDataLembrete = document.querySelector("#data--lembrete");
        const inputMsgLembrete = document.querySelector("#msg--lembrete");
        const res = document.querySelector("#res");

        let valorNomeLembrete = inputNomeLembrete.value;
        let valorDataLembrete = inputDataLembrete.value;
        let valorMsgLembrete = inputMsgLembrete.value;

        if(valorDataLembrete === "" || valorNomeLembrete === "" || valorMsgLembrete === "") {
            mensagem = "Insira todos os campos corretamente!";
            res.innerHTML = exibirMensagem(mensagem, "falha");
            limpaMensagemFeedback(res);

            return;
        }

        const dataLembrete = new Date(valorDataLembrete);
        const dataEHoraLembrete = formataDatEHoraLembrete(dataLembrete);

        adicionaLembreteNaLista(valorNomeLembrete, valorMsgLembrete, dataLembrete, dataEHoraLembrete);
        inputNomeLembrete.value = "";
        inputDataLembrete.value = "";
        inputMsgLembrete.value = "";

        mensagem = `Lembrete agendado para ${listaLembretes[listaLembretes.length - 1].data_lembrete_formatada} às ${listaLembretes[listaLembretes.length - 1].hora_lembrete_formatada}!`;
        res.innerHTML = exibirMensagem(mensagem, "sucesso");
        limpaMensagemFeedback(res);

        criaLembrete();
        
        if(listaLembretes.length > 0) {
            const btnMostrarLista = criaBotaoMostrarLembretes();

            btnMostrarLista.addEventListener("click", () => {
                const modal = document.querySelector(".container--modal");
                modal.style.display = "flex";

                const btnCloseModal = document.querySelector("#close--modal");
                btnCloseModal.addEventListener("click", () => modal.style.display = "none");

                mostrarListaLembretes();
                eventoDeletar();
            });
        }
    });

    function mostrarListaLembretes() {
        const containerLembrete = document.querySelector("#container--lembrete");
        containerLembrete.innerHTML = "";
        listaLembretes.forEach((lembrete) =>
            containerLembrete.innerHTML += `
                <div class="lembrete">
                    <div>
                        <p><span class="destaque">Nome:</span> ${lembrete.nome_lembrete}</p>
                        <p><span class="destaque">Data e Hora:</span> ${lembrete.data_lembrete_formatada} e ${lembrete.hora_lembrete_formatada}</p>
                        <p><span class="destaque">Mensagem:</span> ${lembrete.msg_lembrete}</p>
                    </div>
                    <button id="${lembrete.id}" class="deleteButton"><i class="fa-solid fa-trash"></i>Excluir Lembrete</button>
                </div>
            `                    
        );
    }

    function deletarLembrete(e) {
        const id = parseInt(e.target.id);
        const idParaRemover = listaLembretes.findIndex(lembrete => lembrete.id === id);
        listaLembretes.splice(idParaRemover, 1);    
        mostrarListaLembretes();   
        eventoDeletar(); 
    }

    function eventoDeletar() {
        const deleteButton = document.querySelectorAll('.deleteButton');
        for(let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].addEventListener("click", (e) => deletarLembrete(e));
        }
    }

    function exibirMensagem(msg, tipo) {
        return `
            <div class="container--feedback ${tipo}">
                <p>${msg}</p>
            </div>
        `
    }

    function formataDatEHoraLembrete(data) {
        const diaLembrete = (data.getDate() < 10) ? `0${data.getDate()}` : data.getDate();
        const mesLembrete = ((data.getMonth() + 1) < 10) ? `0${(data.getMonth() + 1)}` : (data.getMonth() + 1);
        const anoLembrete = data.getFullYear();

        const horaLembrete = (data.getHours() < 10) ? `0${data.getHours()}` : data.getHours();
        const minutosLembrete = (data.getMinutes() < 10) ? `0${data.getMinutes()}` : data.getMinutes();

        return {data: `${diaLembrete}/${mesLembrete}/${anoLembrete}`, hora: `${horaLembrete}:${minutosLembrete}`};
    }

    function adicionaLembreteNaLista(valorNome, valorMsg, data, dataFormatada) {
        listaLembretes.push(
            {
                id: id, 
                nome_lembrete: valorNome, 
                data_lembrete: data,
                data_lembrete_formatada: dataFormatada.data, 
                hora_lembrete_formatada: dataFormatada.hora,
                msg_lembrete: valorMsg,
                lembrete_feito: false
            }
        );

        id++;
    }

    function criaLembrete() {
        const dataAtual = new Date();

        for(let i = 0; i < listaLembretes.length; i++) {
            const tempoEmMilissegundos = listaLembretes[i].data_lembrete.getTime() - dataAtual.getTime();

            if(!listaLembretes[i].lembrete_feito) {
                setTimeout(() => {
                    alert(`Lembrete: ${listaLembretes[i].nome_lembrete} \nMensagem: ${listaLembretes[i].msg_lembrete}`);
                }, tempoEmMilissegundos);
                
                listaLembretes[i].lembrete_feito = true;
            }            
        }  
    }

    function criaBotaoMostrarLembretes() {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Mostrar Lembretes";

        if(!botaoCriado) {
            form.appendChild(btn);
            botaoCriado = true;
        }

        return btn;
    }

    function limpaMensagemFeedback(container) {
        setTimeout(() => {
            container.innerHTML = "";
        }, 5000);
    }

});