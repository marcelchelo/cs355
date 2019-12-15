function filter(name,otherName,items,word) {
    let length = items.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
    if (items[i].value.toLowerCase().includes(word)) {
        $(items[i]).show()
    }
    else {
        $(items[i]).hide()
        hidden++
    }
    }

    var tempName = "#empty"+otherName;
    if (hidden === length) {
    $(tempName).show()
    }
    else {
    $(tempName).hide()
    }
}

function buildDropDown(oName,tempItem,searchCollection) {
    var tempMenu = "#menu"+oName;
    var tempEmpty = "#empty"+oName;
    let contents = []
    $(tempMenu)[0].innerHTML="";
    for (let name of searchCollection) {
    contents.push('<input type="button" class="dropdown-item '+tempItem+'"/ type="button" value="' + name + '"/>')
    }
    $(tempMenu).append(contents.join(""))

    $(tempEmpty).hide()
}

function uniSearchBar(name,flagName,searchCollection,flag)
{
  var tempItem = name+"-dropdown-item"
  let items = document.getElementsByClassName(tempItem);

  if(flag)
  {
    var tempSearch = "search"+flagName;
    var tempName = "dropdown-"+name;
    let search = document.getElementById(tempSearch);
    filter(name,flagName,items,search.value.trim().toLowerCase())
  }
  else
  {
    buildDropDown(flagName,tempItem,searchCollection)
  }

}

function show(elementId) {
  document.getElementById(elementId).style.display="block";
}
function close(elementId)
{
  document.getElementById(elementId).style.display="none";
}

//only works with http://localhost:3000/colleges
async function fetchColleges() {
  var output = [];

  const collegeTemp = await fetch('/colleges')
  const collegeRes = await collegeTemp.json()

  for(let i=0;i<collegeRes.length;i++)
  {
    output.push(collegeRes[i].NAME)
  }

  return output;

}

var valueX3 = "tschools";
var valueY3 ="TSchool";
var flag4=false;
let p1 = fetchColleges();
p1.then(function(result) {
  uniSearchBar(valueX3,valueY3,result,false);
});

document.getElementById("dropdown_tschools").addEventListener('click',function(){
  if(flag4)
  {
    close("btn-h");
    close("testForm");
    close("testForm2");
    close("testForm3");
    document.getElementById('testText').innerHTML = "";
    flag4=false;
  }
})

document.querySelector("#search"+valueY3).addEventListener('input', function() {
  let p1 = fetchColleges();
  p1.then(function(result) {
    uniSearchBar(valueX3,valueY3,result,true);
  });
})
$('#menu'+valueY3).on('click', "."+valueX3+'-dropdown-item', function(){
    $('#dropdown_'+valueX3).text("Chosen School: "+$(this)[0].value);
    flag4=true;
    show("btn-h");
    $("#dropdown_"+valueX3).dropdown('toggle');
})

var testOption="-1";
document.getElementById("addT").addEventListener('click', function(){
  show("testForm");
  show("testForm2");
  show("testForm3");
  testOption="1";
  document.getElementById('testText').innerHTML = "You're in adding";
});
document.getElementById("editT").addEventListener('click', function(){
  show("testForm");
  show("testForm2");
  close("testForm3");
  testOption="2";
  document.getElementById('testText').innerHTML = "You're in editing";
});
document.getElementById("deleteT").addEventListener('click', function(){
  show("testForm");
  close("testForm2");
  close("testForm3");
  testOption="3";
  document.getElementById('testText').innerHTML = "You're in removing";
});

var valueX4 = "majors";
var valueY4 ="Major";
var flag5=false;
let p2 = fetchColleges();
p2.then(function(result) {
  uniSearchBar(valueX4,valueY4,result,false);
});

document.getElementById("dropdown_majors").addEventListener('click',function(){
  if(flag5)
  {
    close("majorForm");
    close("btn-j");
    flag5=false;
    document.getElementById('majorText').innerHTML = "";
  }
})

document.querySelector("#search"+valueY4).addEventListener('input', function() {
  let p2 = fetchColleges();
  p2.then(function(result) {
    uniSearchBar(valueX4,valueY4,result,true);
  });
})
$('#menu'+valueY4).on('click', "."+valueX4+'-dropdown-item', function(){
    $('#dropdown_'+valueX4).text("Chosen School: "+$(this)[0].value);
    flag5=true;
    show("btn-j");
    $("#dropdown_"+valueX4).dropdown('toggle');
})

var majorOption="1";
document.getElementById("deleteM").addEventListener('click', function(){
  show("majorForm");
  majorOption="1";
  document.getElementById('majorText').innerHTML = "You're removing";
});

//increment variable names by one, and change where needed
var valueX1 = "bases";
var valueY1 ="Base";
var flag1 =false;
var valueX2 = "exts";
var valueY2 ="Ext";
var flag2=false;
let currentBase="";
let p3 = fetchColleges();
p3.then(function(result) {
  uniSearchBar(valueX1,valueY1,result,false);
});

document.querySelector("#search"+valueY1).addEventListener('input', function() {
  let p3 = fetchColleges();
  p3.then(function(result) {
    uniSearchBar(valueX1,valueY1,result,true);
  });
})
document.getElementById("dropdown_bases").addEventListener('click',function(){
  if(flag1)
  {
    $('#dropdown_'+valueX2).text("Please select a extention school to continue");
    close("ext");
    flag1=false;
    close("btn-g");
    flag2=false;
    close("aForm");
    flag3=false;
  }
})
$('#menu'+valueY1).on('click', "."+valueX1+'-dropdown-item', function(){
    show("ext");
    flag1=true;
    currentBase=$(this)[0].value;
    let p4 = fetchColleges();
    p4.then(function(result) {
      let temp = [];
      for(let i=0;i<result.length;i++)
      {
        if(result[i]!=currentBase)
        {
          temp.push(result[i]);
        }
      }
      uniSearchBar(valueX2,valueY2,temp,false);
    });
    $('#dropdown_'+valueX1).text("Base School: "+$(this)[0].value);
    $("#dropdown_"+valueX1).dropdown('toggle');
})
//increment variable names by one, and change where needed

document.querySelector("#search"+valueY2).addEventListener('input', function() {
  let p4 = fetchColleges();
  p4.then(function(result) {
    let temp = [];
    for(let i=0;i<result.length;i++)
    {
      if(result[i]!=currentBase)
      {
        temp.push(result[i]);
      }
    }
    uniSearchBar(valueX2,valueY2,temp,true);
  });
})
document.getElementById("dropdown_exts").addEventListener('click',function(){
  if(flag2)
  {
    close("btn-g");
    close("aForm")
    flag2=false;
    flag3=false;
  }
})
$('#menu'+valueY2).on('click', "."+valueX2+'-dropdown-item', function(){
    show("btn-g");
    flag2=true;
    $('#dropdown_'+valueX2).text("Extension School: "+$(this)[0].value);
    $("#dropdown_"+valueX2).dropdown('toggle');
})

var option="1";
flag3=false;
document.getElementById("add").addEventListener('click', function(){
  show("aForm");
  option="1";
  document.getElementById('pText').innerHTML = "You're in adding";
});
document.getElementById("delete").addEventListener('click', function(){
  show("aForm");
  option="2";
  document.getElementById('pText').innerHTML = "You're in removing";
});
