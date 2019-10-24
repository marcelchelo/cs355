
function loadStoredColor(){
    if (localStorage.getItem('colour')) {
        document.body.style.backgroundColor = localStorage.getItem('colour');
    }
    else{
        document.body.style.backgroundColor =  "black";
        localStorage.setItem('colour', "black");
    }
}


function changeColor(){
    var newColor = document.getElementById("studentPageColor").value;
    document.body.style.backgroundColor = newColor;
    localStorage.setItem('colour', newColor);
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