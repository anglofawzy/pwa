const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const signupBtn = document.querySelector('#signup');
const signinBtn = document.querySelector('#signin');
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-pass')
const regexEmail = /[a-zA-Z0-9]+[@][a-z]+[.][a-z]{2,}/;
const regexPassword = /([A-Z]+[a-z]*[0-9]+|[a-z]*[A-Z]+[0-9]+|[a-z]*[0-9]+[A-Z]+|[0-9]+[A-Z]+[a-z]*|[0-9]+[a-z]*[A-Z]+)/
let data;

signupBtn?.addEventListener('click', () => {
    validationSignup()
})
signinBtn?.addEventListener('click', () => {
    validationSignin()
})

async function validationSignup(){
    const errorUsername = document.querySelector('.error-username')
    const regexUsername = /^[a-z|A-Z]/;
    
    if (regexUsername.test(usernameInput?.value) == false) {
        console.log(regexUsername.test(usernameInput.value) == false);
        errorUsername?.classList.contains('d-none') ? errorUsername?.classList.remove('d-none') : ''
    }else {
        console.log(regexUsername.test(usernameInput?.value) == false);
        errorUsername?.classList.contains('d-none') ?  '' : errorUsername?.classList.add('d-none')
    }

    if (regexEmail.test(emailInput.value) == false) {
        errorEmail.classList.remove("d-none") ? errorEmail.classList.add("d-none") : ''
        
    }else
    {
        errorEmail.classList.contains('d-none') ?  '' : errorEmail.classList.add('d-none')

    }
    if (regexPassword.test(passwordInput.value) == false) {
        errorPassword.classList.remove("d-none") ?  errorPassword.classList.add("d-none") : ''
    }else
    {
        errorPassword.classList.contains('d-none') ?  '' : errorPassword.classList.add('d-none')
    }

    if (regexUsername.test(usernameInput?.value) && regexEmail.test(emailInput.value) && regexPassword.test(passwordInput.value)) {
        console.log(regexUsername.test(usernameInput?.value));
        data = {
            username : usernameInput?.value,
            email : emailInput.value,
            password : passwordInput.value
        }
        const {message} = await postApi(data, 'signup');
        if (message == "Success Add") {
            location.assign("index.html")
        }
    }
}
async function validationSignin(){
    if (regexEmail.test(emailInput.value) == false) {
        errorEmail.classList.remove("d-none") ? errorEmail.classList.add("d-none") : ''
        
    }else
    {
        errorEmail.classList.contains('d-none') ?  '' : errorEmail.classList.add('d-none')

    }
    if (regexPassword.test(passwordInput.value) == false) {
        errorPassword.classList.remove("d-none") ?  errorPassword.classList.add("d-none") : ''
    }else
    {
        errorPassword.classList.contains('d-none') ?  '' : errorPassword.classList.add('d-none')
    }

    if (regexEmail.test(emailInput.value) && regexPassword.test(passwordInput.value)) {
        data = {
            email : emailInput.value,
            password : passwordInput.value
        }
        const {message} = await postApi(data, 'signin');
        console.log(message);
        if (message == "welcome") {
        }else if (message == "password incorrect") {
            errorPassword.classList.contains('d-none') ?  errorPassword.classList.remove('d-none') : '';
        }else if (message =="Dont Exist Email") {
            errorEmail.classList.contains('d-none') ?  errorEmail.classList.remove('d-none')  : '';
        }
    }
}

async function  postApi(data, endPoint) {
    const response = await fetch(`http://localhost:3000/users/${endPoint}`, {
        method: 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        }
    });
    console.log(JSON.stringify(data));
    return await response.json();
}


// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
  .register('/pwa/js/sw.js')
  .then(() => { console.log('Service Worker Registered'); });
}
  
  // Code to handle install prompt on desktop
  
let deferredPrompt;
const addBtn = document.querySelector('#pwa');
addBtn?.style.display = 'none';
  
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
});