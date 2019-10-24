function loadStoredTitle(){
    if (localStorage.getItem('title')) {
        document.getElementById("studentTitle").innerHTML = localStorage.getItem('title');
    }
    else{
        var placeHolderTitle = "Transfer Protocol: Student";
        document.getElementById("studentTitle").innerHTML = placeHolderTitle;
        localStorage.setItem('title', placeHolderTitle);
    }
}


function loadStoredColor(){
    if (localStorage.getItem('colour')) {
        document.body.style.backgroundColor = localStorage.getItem('colour');
    }
    else{
        document.body.style.backgroundColor =  "white";
        localStorage.setItem('colour', "white");
    }
}

function loadStoredDescription(){
    if(localStorage.getItem('text')){
        document.getElementById("studentDescription").innerHTML = localStorage.getItem('text');
    }
    else{
        var placeholderText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam alias voluptatum expedita, dolorum ipsum et voluptate facilis ad eum quis natus aliquid, debitis inventore! Corporis beatae asperiores obcaecati velit? Incidunt.";
        document.getElementById("studentDescription").innerHTML= placeholderText;
        localStorage.setItem('text', placeholderText);
    }
}


function changeColor(){
    var newColor = document.getElementById("studentPageColor").value;
    localStorage.setItem('colour', newColor);
}

function changeDescription(){
    var newDesc = document.getElementById("aDesc").value;
    localStorage.setItem('text', newDesc);
}

function changeTitle(){
    var newTitle = document.getElementById("aTitle").value;
    console.log(newTitle);
    localStorage.setItem('title', newTitle);
}

function clearAllFromSchools(){
    var checkboxArray = document.getElementsByName("from-check");
    for(i=0; i<checkboxArray.length; i++){
        if(checkboxArray[i].checked == true){
            checkboxArray[i].checked = false;
        }
    }
}

function clearAllToSchools(){
    var checkboxArray = document.getElementsByName("to-check");
    for(i=0; i<checkboxArray.length; i++){
        if(checkboxArray[i].checked == true){
            checkboxArray[i].checked = false;
        }
    }
}