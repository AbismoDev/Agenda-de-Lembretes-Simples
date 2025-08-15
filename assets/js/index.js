document.addEventListener("DOMContentLoaded", () => {
    let listaLembretes = [];
    let id = 1;

    let botaoCriado = false;

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
            // Erro  

            res.innerHTML = `                
                <div class="container--feedback falha">
                    <p>Insira todos os campos corretamente!</p>
                </div>
            `;

            return;
        }

        // Vamos pegar a data e hora do usuario;
        const dataLembrete = new Date(valorDataLembrete);
        const diaLembrete = (dataLembrete.getDate() < 10) ? `0${dataLembrete.getDate()}` : dataLembrete.getDate();
        const mesLembrete = ((dataLembrete.getMonth() + 1) < 10) ? `0${(dataLembrete.getMonth() + 1)}` : (dataLembrete.getMonth() + 1);
        const anoLembrete = dataLembrete.getFullYear();
        const dataLembreteFormatada = `${diaLembrete}/${mesLembrete}/${anoLembrete}`;

        const horaLembrete = (dataLembrete.getHours() < 10) ? `0${dataLembrete.getHours()}` : dataLembrete.getHours();
        const minutosLembrete = (dataLembrete.getMinutes() < 10) ? `0${dataLembrete.getMinutes()}` : dataLembrete.getMinutes();
        const horaLembreteFormatada = `${horaLembrete}:${minutosLembrete}`;

        const dataAtual = new Date();

        // Cadastramos o lembrete
        // Agora teremos que ver como iremos fazer para lembrar ksfnksnfk
        listaLembretes.push(
            {
                id: id, 
                nome_lembrete: valorNomeLembrete, 
                data_lembrete: dataLembrete,
                data_lembrete_formatada: dataLembreteFormatada, 
                hora_lembrete_formatada: horaLembreteFormatada,
                msg_lembrete: valorMsgLembrete,
                lembrete_feito: false
            }
        );

        valorNomeLembrete = "";
        valorDataLembrete = "";
        valorMsgLembrete = "";

        id++;

        res.innerHTML = `
            <div class="container--feedback sucesso">
                <p>Lembrete agendado para ${listaLembretes[listaLembretes.length - 1].data_lembrete_formatada} às ${listaLembretes[listaLembretes.length - 1].hora_lembrete_formatada}!</p>
            </div>
        `;

        for(let i = 0; i < listaLembretes.length; i++) {
            const tempoEmMilissegundos = listaLembretes[i].data_lembrete.getTime() - dataAtual.getTime();

            if(!listaLembretes[i].lembrete_feito) {
                setTimeout(() => {
                    alert(`Lembrete: ${listaLembretes[i].nome_lembrete} \nMensagem: ${listaLembretes[i].msg_lembrete}`);
                }, tempoEmMilissegundos);
                console.log("Lembrete " + (i + 1));
                listaLembretes[i].lembrete_feito = true;
            }            
        }   
        
        if(listaLembretes.length > 0) {

            const btnMostrarLista = document.createElement("button");
            btnMostrarLista.type = "button";
            btnMostrarLista.textContent = "Mostrar Lembretes";

            if(!botaoCriado) {
                form.appendChild(btnMostrarLista);
                botaoCriado = true;
            }

            btnMostrarLista.addEventListener("click", () => {
                // Abriremos um modal e mostraremos nossos lembretes cadastrados!
                console.log("Abrimos Modal!");
                // Pegaremos o container--modal
                const modal = document.querySelector(".container--modal");
                modal.style.display = "flex";
                const btnCloseModal = document.querySelector("#close--modal");
                btnCloseModal.addEventListener("click", () => modal.style.display = "none");

                // Quando abrimos o modal
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
        console.log("Quantos btn tenho " + deleteButton.length);
        for(let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].addEventListener("click", (e) => deletarLembrete(e));
        }
    }

});