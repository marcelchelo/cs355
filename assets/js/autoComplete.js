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
// * clears the inputfields when refreshing! add class text-field to your input text elements... ** if you need anything to load when DOM load, write it here
window.ready(() => {
  const allInputFields = document.querySelectorAll('.text-field')
  allInputFields.forEach(field => {
    field.value = ''
  })
})

// * Make the school input field appear
const addSklBtn = document.getElementById('add-school')
const uiPanel = document.getElementById('school-search-panel')

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
let userColleges = []
let collegeList
// * Search field
const schoolInput = document.querySelector('.school-text-field')

async function colList() {
  const temp = await fetch('/colleges')
  const res = await temp.json()
  return res
}
// ? btn to make the school text field to show
// ? pressing btn also fetchs the database for the CUNY college list
addSklBtn.addEventListener('click', () => {
  addSklBtn.style.display = 'none'
  uiPanel.style.display = 'block'
  collegeList = colList()
})

function matchSchool(name) {
  colList().then(x => console.log(x))
}

schoolInput.addEventListener('keyup', event => {
  console.log(schoolInput.value.length)
  if (schoolInput.value.length >= 3) {
    matchSchool(schoolInput.value)
  }
})
