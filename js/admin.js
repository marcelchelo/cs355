
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

function buildDropDown(name,tempItem,searchCollection) {
    var tempMenu = "#menu"+name;
    var tempEmpty = "#empty"+name;
    let contents = []
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
