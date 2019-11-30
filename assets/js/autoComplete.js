

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
  document.addEventListener('click', event => {

   // console.log(event.target)

  })
})

// * Make the school input field appear
const addSklBtn = document.getElementById('add-school')
const uiPanel = document.getElementById('school-search-panel')

// * clicking add aggregates the list of schools minus the one that was selected







// ! College Object -- add info



class College {

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
// * this becomes a promise that holds a list of CUNY colleges
let collegeList
// * Search field
const schoolInput = document.querySelector('.school-text-field')
// * Autocomplete UL
const schoolAC = document.getElementById('school-input-ac')
// * Autocomplete container
const schoolIp = document.querySelector('.school-ac-panel')

// * COURSES PANEL
const coursePanel = document.getElementById('courses-panel')

let totalNumOfCollege = 0

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
  schoolAC.innerHTML = ''
  collegeList.then(x => {
    let matches = x.filter(college => {
      const regex = new RegExp(`${name}`, 'gi')
      return college.NAME.match(regex)
    })
    matches.forEach(college => {

      if(!userColleges.some(x => x.name === college.NAME)){

        let templi = document.createElement('li')
        let tempa = document.createElement('a')
        let temptxt = document.createTextNode(college.NAME)
        // TODO encase this with an if statement that checks to see if the college is alrdy selected!!
        tempa.appendChild(temptxt)
        templi.appendChild(tempa)
        // * if the school is clicked on from the autocomplete thennnn..... goto createSchoolPanel
        templi.addEventListener('click', event => {
        
        if(userColleges.length === 0 || !userColleges.some(x => x.name === college.NAME)) {
          // console.log(college.NAME)
          createSchoolPanel(event.target.innerText)

          // if the datalist item is clicked on, created a College object and push it in userCollege array
          userColleges.push(new College(college.NAME, college.Code))
        } 
          schoolAC.innerHTML = ''
          schoolIp.style.display = 'none'
          schoolInput.value = ''
          console.log(userColleges)

        })



        schoolAC.appendChild(templi)
        schoolIp.style.display = 'block'



      }
    
      
    })
  })
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

    let temp = userColleges.map(x=>x.name).indexOf(name)
    userColleges.splice(temp, 1)

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

  schoolAC.innerHTML = ''
  schoolIp.style.display = 'none'

}

schoolInput.addEventListener('keyup', event => {
  if (schoolInput.value.length >= 3) {
    matchSchool(schoolInput.value)

  } else if(schoolInput.value.length < 3){

    schoolAC.innerHTML = ''
    schoolIp.style.display = 'none'
  } if(event.keyCode === 13) {
   // console.log('Enter')
  }
})





