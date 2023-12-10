document.getElementById('myForm').addEventListener('submit', function(event){
    var phoneInput = document.querySelector('.mobileNumber');
    var error = document.getElementById('p')

    if(phoneInput.value.length<10){
        error.textContent="minimum 10 charecters required"
        event.preventDefault();

    }
})