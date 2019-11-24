// Script for adding additional past schools
var numOfPastSchoolsSelection = 0;

// Stores the list of selected schools
var selectedSchools = []

// Input search box
let searchInput = document.getElementsByClassName("searchPastSchool")
let pastSchoolsSearchInput = searchInput[0]

// Find all items inside the dropdown
let pastSchoolsDropdownItems = document.getElementsByClassName("past-dropdown-item")

function buildPastDropDown(values, numOfDropdowns) {
    let contents = []
    for (let school of values) {
        if (selectedSchools.includes(school.NAME)) {
            contents.push('<input type="button" class="dropdown-item past-dropdown-item" name="' + school.NAME + '" value="' + school.NAME + '" onclick="selectSchool(this, ' + numOfDropdowns + ' )" disabled/>')
        } else {
            contents.push('<input type="button" class="dropdown-item past-dropdown-item" name="' + school.NAME + '" value="' + school.NAME + '" onclick="selectSchool(this, ' + numOfDropdowns + ' )" />')
        }
    }

    // Hides all schools by default.
    var dropdowntest = $('#past-menu-dropdown-items-' + numOfDropdowns)
    dropdowntest.append(contents.join("")).hide()
    $('.pastEmpty').show()
}

$(document).ready(function () {
    initEvents();
})

function initEvents() {
    $("#From").on('click', '.school-added-container a.close', deleteSchool);
    $('.btn-add-past-schools').on('click', addAnotherSchool);
    $(".done-adding-credits").on('click', goToTransferSchool);
}

function addAnotherSchool() {
    if (numOfPastSchoolsSelection < 3) {
        $('.btn-add-past-schools').hide()
        numOfPastSchoolsSelection++;

        var newSchoolSelection = $("<div class='dropdown dropdown-past-schools-div' id='past-schools-selection-container-'" + numOfPastSchoolsSelection + " style='display:none'> <button id='past-schools-" + numOfPastSchoolsSelection + "' class='btn btn-secondary dropdown-toggle dropdown_past_schools' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> Find your past college or university </button> <div class='menu dropdown-menu' aria-labelledby='dropdown_past_schools'> <form class='px-4 py-2'> <input id='search-past-school-" + numOfPastSchoolsSelection + "' type='search' class='form-control searchPastSchool' placeholder='' autofocus='autofocus' oninput='searchPastSchool(this)'> </form> <div id='past-menu-dropdown-items-" + numOfPastSchoolsSelection + "' class='pastMenuItems'></div> <div class='dropdown-header pastEmpty'>No schools found</div> </div> </div>")
        // var newAddSchoolContainer = $("<div class='add-school-container' style='display: block;'> <div class='add-school-input-container'> <input class='add-school-input' type='text' placeholder='Type School Name'> </div> <a class='close'> <img src='style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> </div>")
        
        $('.school-added-container').after(newSchoolSelection)
        // $('#From').append(newAddSchoolContainer)

        buildDropDown(numOfPastSchoolsSelection)
        newSchoolSelection.show()
    } else {
        console.log("Exceeded the number of past schools")
    }
}

// Jquery ajax call to backend api; retrieve list of colleges
function buildDropDown(numOfDropdowns) {
    let loadedSchools = []

    $.ajax({
        type: 'GET',
        url: "/colleges",
        dataType: "json",
        success: function(data) {
            loadedSchools = data
            buildPastDropDown(loadedSchools, numOfDropdowns)
        }
    })
}

function deleteSchool() {
    var $this = $(this)
    var $school = $(this).closest('.school')
    $school.remove()
    var schoolName = ($($school).attr("id"))

    for (var i = 0; i < selectedSchools.length; i++) {
        if (selectedSchools[i] === schoolName) {
            selectedSchools.splice(i, 1);
            numOfPastSchoolsSelection--;
        }
    }

    if (numOfPastSchoolsSelection < 3) {
        if (!($('#From').find('.dropdown-past-schools-div').length)) {
            $('.btn-add-past-schools').insertAfter($('.school-added-container'))
            $('.btn-add-past-schools').show()
        }
    }
}

function goToTransferSchool() {
    $('.nav-tabs a[href="#To"]').tab('show')
}

// Capture the event when user types into search box
function searchPastSchool(elem) {
    if (elem.value.length !== 0) {
        filterSearchFromPast(elem.value.trim().toLowerCase())
    } else {
        $('.pastMenuItems').hide()
        $('.pastEmpty').show()
    }
}

// For every word entered by user, check if symbol includes with that word
// If symbol exists, show the symbol; else hide it
function filterSearchFromPast(word) {
    let length = pastSchoolsDropdownItems.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
        if (pastSchoolsDropdownItems[i].value.toLowerCase().includes(word)) {
            $(pastSchoolsDropdownItems[i]).show()
            $('.pastMenuItems').show()
        }
        else {
            $(pastSchoolsDropdownItems[i]).hide()
            hidden++
        }
    }
    // If all items are hidden, show the empty view
    if (hidden === length) {
        $('.pastEmpty').show()
    }
    else {
        $('.pastEmpty').hide()
    }
}

// If the user clicks on any school, set the title of button as the text of the school,
// and store the school name in an array
function selectSchool(elem, number) {
    if (!selectedSchools.includes(elem.value)) {
        var selectedSchool = $("<div class='school' id='" + elem.value + "'> <h2> <span></span> " + elem.value + " </h2> <a class='close'> <img src='style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> </div>")
        $('.school-added-container').append(selectedSchool)

        // $('#past-schools-' + number).text(elem.value)
        $('#past-schools-' + number).dropdown('toggle')
        selectedSchools.push(elem.value)
        $('#search-past-school-' + number).val("")
        $('.pastMenuItems').hide()
        $('.pastEmpty').show()
        $('.dropdown-past-schools-div').remove()
        console.log(selectedSchools)
        $('.btn-add-past-schools').insertAfter($('.school-added-container'))

        if (numOfPastSchoolsSelection < 3) {
            $('.btn-add-past-schools').show()
        }

    } else {
        alert("Already selected this school.")
    }
}

let transferSchools = ["Baruch College", "Borough of Manhattan CC", "Bronx Community College", "CUNY Queens College"]

let transferSchoolsSearchInput = document.getElementById("searchTransferSchool")

let transferSchoolsDropdownItems = document.getElementsByClassName("transfer-dropdown-item")

function buildTransferDropdown(values) {
    let contents = []
    for (let school of values) {
        contents.push('<input type="button" class="dropdown-item transfer-dropdown-item" type="button" value="' + school + '"/>')
    }

    $('#transferMenuItems').append(contents.join("")).hide()
    $('#transferEmpty').show()
}

document.querySelector("#searchTransferSchool").addEventListener('input', function () {
    if (transferSchoolsSearchInput.value.length !== 0) {
        filterSearchFromTransfer(transferSchoolsSearchInput.value.trim().toLowerCase())
    }

    else {
        $('#transferMenuItems').hide()
        $('#transferEmpty').show()
    }
})

function filterSearchFromTransfer(word) {
    let length = transferSchoolsDropdownItems.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
        if (transferSchoolsDropdownItems[i].value.toLowerCase().includes(word)) {
            $('#transferMenuItems').show()
            $(transferSchoolsDropdownItems[i]).show()
        }
        else {
            $(transferSchoolsDropdownItems[i]).hide()
            hidden++
        }

        if (hidden === length) {
            $('#transferEmpty').show()
        }
        else {
            $('#transferEmpty').hide()
        }
    }
}

$('#transferMenuItems').on('click', '.transfer-dropdown-item', function () {
    $('#dropdown_transfer_schools').text($(this)[0].value)
    $('#dropdown_transfer_schools').dropdown('toggle')
})

buildTransferDropdown(transferSchools)