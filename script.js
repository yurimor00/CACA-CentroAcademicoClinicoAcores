//Constants
const form = document.getElementById("form-newsletter")
const nomeF = document.getElementById("nome")
const telemovelF = document.getElementById("telemovel")
const emailF = document.getElementById("email")
const toTopbtn = document.getElementById("to-top")
const mensagemFeedback = document.getElementById("mensagem-feedback")
const imagens = ["media/hero.png", "media/evento1.png", "media/sobre_nos.png"]
const forward = document.getElementById("forward")
const prev = document.getElementById("prev")


//Checks if each user input is correct, if not correct, makes the border of the incorrect input red
function validadeForm(event) {
    event.preventDefault()
//Here all border colors and the feedback messages are resetted 
    nomeF.style.border = ''
    telemovelF.style.border = ''
    emailF.style.border = ''
    mensagemFeedback.textContent = ''

    let error = false //Created an boolean to check if any error is detected
    //If value inserted by user is blank, changes border to red and makes error var true
    if (nomeF.value.trim() === '') {
        error = true
        nomeF.style.border = "2px solid red"
    }
    //If value inserted by user is not 9 in lenght, makes border red and error set to true
    if (telemovelF.value.trim().length !== 9) {
        error = true
        telemovelF.style.border = "2px solid red"
    }
    //If value inserted by user doesnt contain an @ makes border red and sets error to true
    if (!emailF.value.includes('@')) {
        error = true
        emailF.style.border = "2px solid red"
    }
    //If error is true, changes the feedback message that was blankk, and makes the color red to emphasize user error
    if (error === true) {
        mensagemFeedback.textContent = "Por favor, corrija os campos a vermelho."
        mensagemFeedback.style.color = "red"
    } else {//If error is not true, shows sucecs message and makes the text color green to show correct submission by the user
        mensagemFeedback.textContent = "Sucesso! A sua inscrição foi enviada."
        mensagemFeedback.style.color = "#29B89E" 
        //Resets the form only when there are no errors
        form.reset()
    }
}

//Changes scroll to top button, as user scrolls down
function scrollPos(){
   const alturaTotal = document.documentElement.scrollHeight - window.innerHeight
   const percentagemScroll = (window.scrollY / alturaTotal) * 100
     if (percentagemScroll > 10 ) { //Makes the button show up when user scrolls past header
        toTopbtn.style.display = "block"
        toTopbtn.style.color = 'white'

        if (percentagemScroll > 87){ //Changes the color of the button as soon as user goes near the footer that is a darker color
         toTopbtn.style.backgroundColor = 'white'
         toTopbtn.style.color = 'black'
        }
        else{
         toTopbtn.style.backgroundColor = "var(--accent-color)"
        }
      }
      else {
         toTopbtn.style.display = "none"
      }
}
//Makes user go to top of the page
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}



let indiceAtual = 0

function mudarImagem(direcao) {
    if (direcao === 'next') {
        indiceAtual = (indiceAtual + 1) % imagens.length
    } else {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length
    }
    hero.style.backgroundImage = `url('${imagens[indiceAtual]}')`
}



//Event Listeners
forward.addEventListener("click", () => mudarImagem('next'))
prev.addEventListener("click", () => mudarImagem('prev'))
toTopbtn.addEventListener("click", voltarAoTopo)
window.addEventListener("scroll", scrollPos)
form.addEventListener("submit", validadeForm)


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const sunIcon = '☀️';
    const moonIcon = '🌙';

    // Function to set the theme
    const setTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? sunIcon : moonIcon;
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in localStorage or user's preference (Media Querie)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Set initial theme
    setTheme(currentTheme);

    // Listener for the toggle button
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listener for changes in OS theme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only change if user hasn't set a preference
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
