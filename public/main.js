const form = document.querySelector('#message-form');
const container = document.querySelector('#container');

form.addEventListener('submit', (e) => submit(e));

const sendMessage = async (user, message) => {
    try {

        const data = {user, message};

        const response = await fetch('http://localhost:8080/api/messages', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
         });
         if(response.ok){
            console.log('Mensaje enviado correctamente')
         }else{
            console.error('Ocurrio un error enviando el mensaje')
         }
    } catch (error) {
        console.error('Error en la solicitud: ', error)
    }
}

const submit = (e) => {
    e.preventDefault();

    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    sendMessage(emailInput.value, messageInput.value);

    console.log('Mensaje enviado')
}
