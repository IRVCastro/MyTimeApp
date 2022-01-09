$(document).ready(function(){
    
    //recebendo informação da pagina geral
    if (localStorage.getItem('data_email')){
        
        nome.value = JSON.parse(localStorage.getItem('data_email')).emailG;
    }

    //função para alterar o css das caixas quando o cadastro tentar ser realizado, armazenar itens localStorageo
    $('#register').submit( function (evento){
    
        if ( (password.value == confirm_password.value) && (nome.value != 0) && 
             (user_name.value != 0) && (password.value != 0) && (confirm_password.value != 0) ){
            
            let usuario = {emailC: nome.value, password: password.value};
            
            localStorage.setItem('dados' , JSON.stringify(usuario));
            
            sucess_register.innerHTML = 'Cadastro realizado com sucesso';
            sucess_register.style.color = 'green';
            
        }
        
        else{
            sucess_register.innerHTML = 'Cadastro invalido';
            sucess_register.style.color= 'red';
            
            evento.preventDefault();
        }
    });
    


    /*Função para alterar o css das caixas de input */
    nome.onblur = () =>{
        
        if ( nome.value.length == 0){
            
            nome.style.border = '2px solid red';
            erro.style.display = 'block';
        }
        else{
            nome.style.border = '1px solid #ddd';
        }
    };
    
   
    user_name.onblur = () =>{
        

        if ( user_name.value.length == 0){
            
            user_name.style.border = '2px solid red';
            erro2.style.display = 'block';
        }
        else{
            user_name.style.border = '1px solid #ddd';
        }
    };

    
    password.onblur = () =>{
        

        if ( password.value.length == 0){
            
            password.style.border = '2px solid red';
            erro3.style.display = 'block';
        }
        else{
            password.style.border = '1px solid #ddd';
        }
    };

    
    confirm_password.onblur = () =>{
        

        if ( confirm_password.value.length == 0){
            
            confirm_password.style.border = '2px solid red';
            erro4.style.display = 'block';
        }
        else{
            confirm_password.style.border = '1px solid #ddd';
        }
    };
    
    nome.oninput = () =>{

        if (nome.value.length != 0){
            erro.style.display = 'none';

        }
    };


    user_name.oninput = () =>{

        if (user_name.value.length != 0){
            erro2.style.display = 'none';
        }
    };


    password.oninput = () =>{

        if (password.value.length != 0){
            erro3.style.display = 'none';
        }
    };


    confirm_password.oninput = () =>{

        if (confirm_password.value.length != 0){
            erro4.style.display = 'none';
        }
    };
});