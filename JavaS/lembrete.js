//função para mostrar os itens das configurações
$(document).ready(function(){
    

    $('.config_icon').mouseover( function (){
        
        $('#config_menu').removeClass("dont_show_config").addClass("config_menu_display");
    });

    $('.config_icon').mouseout( function (){
        
        $('#config_menu').removeClass("config_menu_display").addClass("dont_show_config");
        
    });


    
    
    let titulo = null;
    let description = null;
    let dataProgramada = null;
    let lembreteElement; //sera usado para apagar os elementos do local storage

    //função para salvar lembretes no localStorage
    $('#save_lembrete').click( function(evento){
        
        let lembrete_config = localStorage.getItem('has_lembrete') || '[]';
        lembrete_config = JSON.parse(lembrete_config);
        
        
        titulo = $('#lembrete_titulo').val();
        description = $('#lembrete_description').val();
        dataProgramada = $('#lembrete_data').val();
        
        let lembrete = {
            titulo: titulo,
            conteudo: description,
            data: dataProgramada
        }
        
        lembrete_config.push(lembrete);
        
        localStorage.setItem("has_lembrete", JSON.stringify(lembrete_config) );
        
    });
});


//coloca itens no html e ordena o vetor do local storage
function colocarHtml(){
    
    // ----------- Inicio da operação para ordenar vetor do local storage ------------
    let arrayLembrete = new Array();
    let arrayTeste = new Array();
    
    //se tem algum lembrete salvo
    if (localStorage.getItem('has_lembrete')){

        arrayLembrete = JSON.parse(localStorage.getItem('has_lembrete'));

        //interação para padronizar datas
        for (i = 0; i < arrayLembrete.length; i++){

            arrayTeste.push(arrayLembrete[i]['data'].split("-"));
            //data antes = 2021-07-10 AAAA-MM-DD
        }
    
    }

    //interação para ordenar o vetor
    for ( i = 0; i < arrayLembrete.length; i++){

        for ( j = i + 1; j < arrayLembrete.length; j++){

            let data1 = new Date (arrayTeste[i][0], arrayTeste[i][1], arrayTeste[i][2], );
            let data2 = new Date (arrayTeste[j][0], arrayTeste[j][1], arrayTeste[j][2], );

            if (data1.getTime() > data2.getTime()){

                let aux = arrayLembrete[i];
                arrayLembrete[i] = arrayLembrete[j];
                arrayLembrete[j] = aux;
            }
        }
    }

    // ----------- Fim da operação para ordenar vetor do local storage ------------


    //pega vetor de objetos contendo as informaçoes dos lembretes
    let dadosLembrete = JSON.parse(localStorage.getItem('has_lembrete'));
    lembreteElement = dadosLembrete;
    
    //recebeu o main do html
    let divCorpoMain = document.getElementById('main_lembrete');

    if (dadosLembrete){
        
        //recebe o vetor ordenado
        dadosLembrete = arrayLembrete;

        //enquanto dadosLembrete tiver elementos o ciclo interage
        dadosLembrete.forEach( function( elemento){
            
            let div = document.createElement('div');

            div.innerHTML = ` 
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 despertadores" id="lembrete_cadastrado">

                <p><h1 class="lembrete_title">${elemento.titulo} </h1> <span>${elemento.data}</span></p>
            
                <p class="lembrete_content">${elemento.conteudo}</p>
                <button type="button" class="btn btn-danger delete_alarm2">remove</button>

            </div>`;

            //adiciona toda a div acima no main do html
            divCorpoMain.appendChild(div);
        });
    }
}
colocarHtml();


$('.delete_alarm2').click( function(event){
    //função para apagar elementos  do html e do local storage

    let main = document.getElementById('main_lembrete');

    if (event.target.tagName === 'BUTTON'){

        const button = event.target;

        const divResponsiva = button.parentNode;

        const divFather = divResponsiva.parentNode;
        
        
        //pegando as divs htmls
        let element = document.querySelector('.lembrete_title');
        let element2 = document.querySelector('.lembrete_content');
        
        //pegando o conteudo das divs html
        let titulo_html =  element.innerHTML;
        let conteudo_html = element2.innerHTML;
        
        
        let i = 0; //controla a posição a ser eliminada

        //ciclo para eliminar elementos do localStorage
        lembreteElement.forEach( function(elemento){
            
            //Conteudos dos lembretes
            let temp = elemento.titulo
            let temp2 = elemento.conteudo;


            let result = titulo_html.localeCompare(temp);
            let result2 = conteudo_html.localeCompare(temp2);

            if ( (result == 1 || result == 0) && (result2 == 1 || result2 == 0) ){


                
                lembreteElement.splice(i, 1); //Remove elementos do vetor
                localStorage.setItem('has_lembrete', JSON.stringify(lembreteElement) );
            }
            i++;
        });
        
        i = 0;

        //Remove o elemeto do html
        if (button.textContent === 'remove'){

            main.removeChild(divFather);
        }
    }
});