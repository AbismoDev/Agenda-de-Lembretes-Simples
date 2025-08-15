document.addEventListener("DOMContentLoaded", () => {
    let listaLembretes = [];
    let id = 1;

    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();        

        const inputNomeLembrete = document.querySelector("#nome--lembrete");
        const inputDataLembrete = document.querySelector("#data--lembrete");
        const inputMsgLembrete = document.querySelector("#msg--lembrete");
        const res = document.querySelector("#res");

        const valorNomeLembrete = inputNomeLembrete.value;
        const valorDataLembrete = inputDataLembrete.value;
        const valorMsgLembrete = inputMsgLembrete.value;

        if(valorDataLembrete === "" || valorNomeLembrete === "" || valorMsgLembrete === "") {
            // Erro
            (valorNomeLembrete === "") ? inputNomeLembrete.style.border = "1px solid red" : inputNomeLembrete.style.border = "1px solid #26303F";
            (valorDataLembrete === "") ? inputDataLembrete.style.border = "1px solid red" : inputDataLembrete.style.border = "1px solid #26303F";
            (valorMsgLembrete === "") ? inputMsgLembrete.style.border = "1px solid red" : inputMsgLembrete.style.border = "1px solid #26303F";           

            res.innerHTML = `                
                <div class="container--feedback falha">
                    <p>Corrija os campos em vermelho para cadastrar um lembrete!</p>
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
    });

});