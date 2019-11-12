/*
* This is the functions for the nav menu
*/
let overlay = document.getElementById('overlay');
let closeMenu = document.getElementById('close-menu');

document.getElementById('open-menu').addEventListener('click', function() {
    overlay.classList.add('show-menu');
  
});

document.getElementById('close-menu').addEventListener('click', () => {
    overlay.classList.remove('show-menu');
});

function changeBackgroundColor(newColor){
    document.body.style.backgroundColor=newColor;
    window.localStorage.bgcolor = newColor;
    console.log("function called");
}











