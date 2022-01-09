//função para mostrar os itens das configurações
$(document).ready(function(){
    

    $('.config_icon').mouseover( function (){
        
        $('#config_menu').removeClass("dont_show_config").addClass("config_menu_display");
    });

    $('.config_icon').mouseout( function (){
        
        $('#config_menu').removeClass("config_menu_display").addClass("dont_show_config");
        
    });
    
    
})

//variaveis que recebem as configurações dos alarmes
var hora = null;
var minuto = null;
var turno = null;
var titulo = null;
var som = null;


//variavel que ira armazenar o alarme programaado
var alarmElement;

//variaveveis para tocar o som do alarme
var soundPadrao = new Audio("sounds/padrao.mp3");
soundPadrao.loop = true;


var soundAlerta = new Audio("sounds/alerta.mp3");
soundAlerta.loop = true;

var soundSino = new Audio("sounds/sino.mp3");
soundSino.loop = true;

var soundPi = new Audio("sounds/pipi.mp3");
soundPi.loop = true;



//função para salvar alarme no localStorage
$('#save_alarm').click( function (evento){
    
    let alarm_config = localStorage.getItem('alarme') || '[]';
    alarm_config = JSON.parse(alarm_config);
    
    
    //function pega os valores das caixas de configurar o alarme
    hora = $('#hora_select option:selected').each( function() {
        
        return ($(this).val());
    });
    
    minuto = $('#minuto_select option:selected').each( function() {
        
        return $(this).val();
        
    });
    
    turno = $('#turno_select option:selected').each( function() {
        
        return $(this).val();
    });
    
    som = $('#som_select option:selected').each( function() {
        
        return $(this).val();
    });
    
    titulo = $('#titulo_select').val();
    
    
    let alarme = {
        hora: $(hora).val(),
        minuto: $(minuto).val(),
        turno: $(turno).val(),
        som: $(som).val(),
        titulo: titulo
    }
    
    //alarm_config é um vetor de objetos do tipo alarme que armazena os dados passados pelo usuario
    alarm_config.push(alarme);
    localStorage.setItem("alarme", JSON.stringify(alarm_config));
    
});

//função para colocar alarme no html
function colocarHtml(){

    //pegou os dados do array de objetos alarme
    let dadosAlarme = JSON.parse(localStorage.getItem('alarme'));
    alarmElement = dadosAlarme;

    //Recebeu a o main do HTML
    let divCorpoMain = document.getElementById('corpo_main_interno');

    if (dadosAlarme){
        dadosAlarme.forEach( function( elemento ){
            
            let div = document.createElement('div');

            div.innerHTML = ` <div class="row despertadores">
                
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 despertar1">
                    
                    <div>
                            <span class="alarmeJs">${elemento.hora}:${elemento.minuto}:00 ${elemento.turno}  </span>
                           
                    </div>
            
                    <div class="col-12 col-sm-12 col-md-8 col-lg-10 descricao_despertar">
                        <p> ${elemento.titulo} </p>
                    </div>
            
                    <div class="col-12 col-sm-12 col-md-4 col-lg-2 down_seta">
                        <i class="fas fa-arrow-down"></i>
                        <button type="button" class="btn btn-danger delete_alarm">remove</button>
                    </div>

                </div> `;
            
            //adiciona toda a div acima no main do html
            divCorpoMain.appendChild(div);
        });
    }
    
};
colocarHtml();


//Function para pegar o horario atual do pc e fazer o alarme tocar
function showTime(){
    
    var now = new Date();
    
    currentTime = now.toLocaleTimeString();
    
    if (alarmElement){
        
        alarmElement.forEach( function( elemento){
            
            let alarmeProgramado = elemento.hora + ":" + elemento.minuto + ":" + "00 " + elemento.turno;
            
            
            if (currentTime === alarmeProgramado){
                
                alert(`ALARME: ${elemento.titulo}`);
                
                
                if ( elemento.som === "padrao"){
                    
                    soundPadrao.play();
                    
                }
                
                else if ( elemento.som === "sino"){
                    
                    soundSino.play();
                }
                
                else if ( elemento.som === "pi"){
                    
                    soundPi.play();
                }
                
                else if ( elemento.som === "alerta"){
                    
                    soundAlerta.play();
                }
            }
        });
    }
    
    setTimeout( showTime, 1000);//função para contabilizara a cada segundo
}
showTime();


//function para deletar alarmes programados
$('.delete_alarm').click( function(event){
    
    let main = document.getElementById('corpo_main_interno');
    
    if (event.target.tagName === 'BUTTON'){
        
        const button = event.target;
        
        const div = button.parentNode;
        
        const div_despertar1 = div.parentNode;
        
        const div_despertadores = div_despertar1.parentNode;
        
        const div_father = div_despertadores.parentNode;
        
        //Pegando o horario do elemento a ser apagado
        let element = document.querySelector('.alarmeJs');
        
        //alarme que sera apagado do local sorage
        let alarmeApagar = element.innerHTML;
        
        let i = 0;
        
        alarmElement.forEach( function(elemento){
            
            let temp = elemento.hora + ":" + elemento.minuto + ":" + "00 " + elemento.turno;
            let result = alarmeApagar.localeCompare(temp);
            
            
            if (result == 1){
                
                alarmElement.splice(i , 1);
                
                localStorage.setItem('alarme', JSON.stringify(alarmElement) );
            }
            
            i++;
        });
        
        
        i = 0;        
        
        if (button.textContent === 'remove'){
            
            main.removeChild(div_father);
        }
        
        
    }
});