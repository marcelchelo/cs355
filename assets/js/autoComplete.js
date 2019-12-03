// Stores the selected schools in this array
var selectedSchools = []

// Stores the selected TRANSFER schools in this array
var selectedTransferSchools = []

// * Clear input fields on load
// ? mimics $(document).ready()
// ? if(document.addEventListener) returns false if there are no addEventListeners on document
function ready(fn) {
  if (typeof fn === 'function') {
    if (document.readyState !== 'loading') {
      fn()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContendLoaded', fn())
    } else {
      document.attachEvent('onreadystatechange', () => {
        if (document.readyState !== 'loading') {
          fn()
        }
      })
    }
  }
}

$(document).ready(function() {
  initEvents();
})

function initEvents() {
  $("#add-school-btn").on('click', addAnotherSchool);
  $("#add-transfer-school-btn").on('click', addAnotherTransferSchool);
  $("#courses-panel").on('click', '.school-added-container a.close', deleteSelectedSchool);
  $("#courses-panel").on('click', '.add-school-container a.close', deleteSchoolInputContainer);
  $(".done-adding-schools").on('click', goToCollegeOption);

  $("#college-opt-panel").on('click', '.transfer-school-added-container a.close', deleteSelectedTransferSchool);
  $("#college-opt-panel").on('click', '.add-transfer-school-container a.close', deleteTransferSchoolInputContainer);
}

// * clears the inputfields when refreshing! add class text-field to your input text elements... ** if you need anything to load when DOM load, write it here
window.ready(() => {
  const allInputFields = document.querySelectorAll('.text-field')
  allInputFields.forEach(field => {
    field.value = ''
  })
  document.addEventListener('click', event => {
    console.log(event.target)
  })
})

// * Make the school input field appear
const addSklBtn = document.getElementById('add-school-btn')

// * clicking add aggregates the list of schools minus the one that was selected



// ! College Object -- add info


class CollegeProf {
  constructor(name, code) {
    this.name = name
    this.code = code
  }
  addMajor(major) {
    this.major.append(major)
  }

  // getters
  getMajors() {
    this.major.forEach(major => console.log(major))
  }
}
let userColleges = [
  {
    NAME: 'Baruch COllege',
    CODE: 'BU101',
    COURSES: []
  }
]
// * this becomes a promise that holds a list of CUNY colleges
let collegeList

// * COURSES PANEL
const coursePanel = document.getElementById('courses-panel')

async function colList() {
  const temp = await fetch('/colleges')
  const res = await temp.json()
  return res
}

// ? btn to make the school text field to show
// ? pressing btn also fetchs the database for the CUNY college list
function addAnotherSchool() {
  if (selectedSchools.length < 3) {
    addSklBtn.style.display = 'none'

    var newAddSchoolContainer = $("<div class='add-school-container' style='display: block; display: none;'> <div class='add-school-input-container'> <input class='school-text-field' type='text' placeholder='Type School Name' oninput='handleSchoolNameInput(this)' onblur='hideSchoolList(this)' onfocus='handleSchoolNameInput(this)'> <div class='school-ac-panel hidden'> <ul class='school-input-ac-1'></ul> </div> </div> <a class='close'> <img src='../../style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> <div class='pastMenuItems'> </div> <div class='dropdown-header pastEmpty' style='display: none;'>No schools found</div> </div>");
    $(newAddSchoolContainer).insertBefore('.school-added-container')
    newAddSchoolContainer.show()

    collegeList = colList()
  }
}

function hideSchoolList(element) {
  var panel = $(element).next(".school-ac-panel")
  if (!$(".school-input-ac-1:hover").length) {
    $(panel).hide();
  }
}

function matchSchool(name, element) {
  var schoolIp = $(element).next(".school-ac-panel")[0]
  console.log("found ul: "+ $(element).next(".school-ac-panel").children(".school-input-ac-1").attr('class'))
  var schoolAC = $(element).next(".school-ac-panel").children(".school-input-ac-1")[0]
  schoolAC.innerHTML = ''
  collegeList.then(x => {
    let matches = x.filter(college => {
      const regex = new RegExp(`${name}`, 'gi')
      return college.NAME.match(regex)
    })
    if (matches.length === 0) {
      let tempinput = document.createElement('input')
      tempinput.type = 'button'
      tempinput.className = 'school-option'
      tempinput.value = "Sorry, the school you have entered was not found in our system."
      let templi = document.createElement('li')
      templi.className = 'disable-select-school'
      templi.appendChild(tempinput)
      schoolAC.appendChild(templi);
      schoolIp.style.display = 'block'
    }
    matches.forEach(college => {
      let tempinput = document.createElement('input')
      tempinput.type = 'button'
      tempinput.className = 'school-option'
      tempinput.value = college.NAME
      let templi = document.createElement('li')

      // Checks if school is already selected
      if (selectedSchools.includes(college.NAME)) {
        templi.className = 'disable-select-school'
      }

      templi.appendChild(tempinput)

      templi.addEventListener('click', event => {
        addSchoolPanel(event.target.value)
      })

      schoolAC.appendChild(templi);
      schoolIp.style.display = 'block'
    })
  })
}

function addSchoolPanel(name) {
  selectedSchools.push(name);
  var selectedSchool = $("<div class='school' id='" + name + "'> <h2> <span></span> " + name + " </h2> <a class='close'> <img src='style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> </div>");
  $('.school-added-container').append(selectedSchool);
  $('.add-school-container').remove();
  $('#add-school-btn').insertBefore($('.school-added-container'));
  if (selectedSchools.length < 3) {
    $('#add-school-btn').show();
  }
}

function deleteSelectedSchool() {
  var $this = $(this)
  var $school = $this.closest('.school')
  $school.remove()
  var schoolName = ($($school).attr("id"))

  for (var i = 0; i < selectedSchools.length; i++) {
    if (selectedSchools[i] === schoolName) {
      selectedSchools.splice(i, 1);
    }
  }

  if (selectedSchools.length < 3) {
    if (!($('#courses-panel').find('.add-school-container').length)) {
      $('#add-school-btn').insertBefore($('.school-added-container'))
      $('#add-school-btn').show()
    }
  }
}

function deleteSchoolInputContainer() {
  $(this).parent().remove()
  
  if (selectedSchools.length < 3) {
    $('#add-school-btn').insertBefore($('.school-added-container'))
    $('#add-school-btn').show()
  }
}

// ! HELP HEREEEEE I NEED TO RECREATE THE COLLEGE PANEL U SEE IN COLLEGE TAB (QUEENS COLLEGE)
function createSchoolPanel(name) {
  // overall school panel
  let panel = document.createElement('div')
  panel.className = 'college-selection inner-panel gray'
  // your selected school section
  let innerPanel = document.createElement('div')
  innerPanel.className = 'row school-section flex-horizontal'
  // * the close button that should delete the school (left sidt)
  let close = document.createElement('div')
  close.className = 'col one'
  let closeBtn = document.createElement('a')
  closeBtn.classList = 'delete-college'
  closeBtn.addEventListener('click', (event) => {
    panel.remove()
  })
  close.appendChild(closeBtn)
  // School name (center)
  let schoolName = document.createElement('div')
  schoolName.className = 'col ten center-text'
  schoolName.innerHTML = `<h4>${name}</h4>`

  // counter

  let courseCount = document.createElement('div')
  courseCount.className = 'col one'
  let countStart = document.createElement('span')
  countStart.innerText = '0'
  courseCount.appendChild(countStart)
  // stitching it all together

  innerPanel.appendChild(close)
  innerPanel.appendChild(schoolName)
  innerPanel.appendChild(courseCount)
  panel.appendChild(innerPanel)
  // append to course panel
  coursePanel.appendChild(panel)
  // schoolAC.innerHTML = ''
  schoolIp.style.display = 'none'

}

// $(".school-text-field").keyup(function() {
//   if (this.value.length >= 2) {
//     matchSchool(this.value, this)
//   } else {
//     
//     schoolIp.style.display = 'none'
//   }
// })

function handleSchoolNameInput(element) {
  var schoolAC = $(element).next(".school-ac-panel").children(".school-input-ac-1")[0]
  var schoolIp = $(element).next(".school-ac-panel")[0]
  if (element.value.length >= 1) {
    matchSchool(element.value, element)
  } else {
    schoolAC.innerHTML = ''
    schoolIp.style.display = 'none'
  }
}

function goToCollegeOption() {
  $('#transfer-nav-container #college-opt').click();
}

function addAnotherTransferSchool() {
  $('#add-transfer-school-btn').hide();
  var newAddSchoolContainer = $("<div class='add-transfer-school-container' style='display: block; display: none;'> <div class='add-transfer-school-input-container'> <input class='transfer-school-text-field' type='text' placeholder='Type School Name' oninput='handleTransferSchoolNameInput(this)' onblur='hideTransferSchoolList(this)' onfocus='handleTransferSchoolNameInput(this)'> <div class='transfer-school-ac-panel hidden'> <ul class='transfer-school-input-ac'></ul> </div> </div> <a class='close'> <img src='../../style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> </div>");
  $(newAddSchoolContainer).insertBefore('.transfer-school-added-container')
  newAddSchoolContainer.show()
  collegeList = colList()
}

function handleTransferSchoolNameInput(element) {
  var schoolAC = $(element).next(".transfer-school-ac-panel").children(".transfer-school-input-ac")[0]
  var schoolIp = $(element).next(".transfer-school-ac-panel")[0]
  if (element.value.length >= 1) {
    matchTransferSchool(element.value, element)
  } else {
    schoolAC.innerHTML = ''
    schoolIp.style.display = 'none'
  }
}

function matchTransferSchool(name, element) {
  let schoolIp = $(element).next(".transfer-school-ac-panel")[0]
  let schoolAC = $(element).next(".transfer-school-ac-panel").children(".transfer-school-input-ac")[0]
  schoolAC.innerHTML = ''
  collegeList.then(x => {
    let matches = x.filter(college => {
      const regex = new RegExp(`${name}`, 'gi')
      return college.NAME.match(regex)
    })
    if (matches.length === 0) {
      let tempinput = document.createElement('input')
      tempinput.type = 'button'
      tempinput.className = 'school-option'
      tempinput.value = "Sorry, the school you have entered was not found in our system."
      let templi = document.createElement('li')
      templi.className = 'disable-select-school'
      templi.appendChild(tempinput)
      schoolAC.appendChild(templi);
      schoolIp.style.display = 'block'
    }
    matches.forEach(college => {
      let tempinput = document.createElement('input')
      tempinput.type = 'button'
      tempinput.className = 'school-option'
      tempinput.value = college.NAME
      let templi = document.createElement('li')

      // Checks if school is already selected
      if (selectedSchools.includes(college.NAME)) {
        templi.className = 'disable-select-school'
      }

      templi.appendChild(tempinput)

      templi.addEventListener('click', event => {
        addTransferSchoolPanel(event.target.value)
      })

      schoolAC.appendChild(templi);
      schoolIp.style.display = 'block'
    })
  })
}

function addTransferSchoolPanel(name) {
  selectedTransferSchools.push(name);
  let selectedTransferSchool = $("<div class='transfer-school' id='" + name + "'> <h2> <span></span> " + name + " </h2> <a class='close'> <img src='style/images/close-button.svg' alt='close button' class='close-button' align='middle'/> </a> </div>");
  $('.transfer-school-added-container').append(selectedTransferSchool);
  $('.add-transfer-school-container').remove();
  $('#add-transfer-school-btn').insertBefore($('.transfer-school-added-container'));
  if (selectedTransferSchools.length < 1) {
    $('#add-transfer-school-btn').show();
  }
}

function deleteSelectedTransferSchool() {
  let $this = $(this)
  let $transferSchool = $this.closest('.transfer-school')
  $transferSchool.remove()
  var transferSchoolName = ($($transferSchool).attr("id"))

  for (var i = 0; i < selectedTransferSchools.length; i++) {
    if (selectedTransferSchools[i] === transferSchoolName) {
      selectedTransferSchools.splice(i, 1);
    }
  }

  if (selectedTransferSchools.length < 1) {
    if (!($('#college-opt-panel').find('.add-transfer-school-container').length)) {
      $('#add-transfer-school-btn').insertBefore($('.transfer-school-added-container'))
      $('#add-transfer-school-btn').show()
    }
  }
}

function deleteTransferSchoolInputContainer() {
  $(this).parent().remove()

  if (selectedTransferSchools.length < 1) {
    $('#add-transfer-school-btn').insertBefore($('.transfer-school-added-container'))
    $('#add-transfer-school-btn').show()
  }
}