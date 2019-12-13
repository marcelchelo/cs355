// ! tab swapping //
const nav = document.getElementById('transfer-nav-container')
const panels = [
	{
		key: 'instructions',
		data: document.getElementById('instructions-panel'),
		label: document.getElementById('instructions')
	},
	{
		key: 'courses',
		data: document.getElementById('courses-panel'),
		label: document.getElementById('courses')
	},
	{
		key: 'college-opt',
		data: document.getElementById('college-opt-panel'),
		label: document.getElementById('college-opt')
	},
	{
		key: 'exam-scores',
		data: document.getElementById('exam-score-panel'),
		label: document.getElementById('exam-scores')
	},
	{
		key: 'results',
		data: document.getElementById('results-panel'),
		label: document.getElementById('results')
	}
]
let currPanel
let currLabel
let currPos = 0
let tempLeft
let tempRight;

// var tab_btns = document.getElementsByClassName("tab-btn");


// for( i = 0 ; i < tab_btns.length ;i++){
// 	 tab_btns[i].addEventListener('click' , (x) => {
// 		activatePanel(x.target.parentNode.id)
// 	 });
// }

(async function preload() {
	let temp = await grabCurrPanel()
	currPos = 0
})()

function grabCurrPanel() {
	panels.forEach((panel) => {
		if (panel.data.classList.contains('active-panel')) {
			currPanel = panel.data
			currLabel = panel.label
			//console.log(currLabel)
			currPos = panels.findIndex((x) =>  x.data === currPanel)
		}
	})
}
// ! START HERE - to follow the
nav.addEventListener('click', (x) => {
	//console.log(x);
	console.log( " This is  x "+ x.target.parentNode.id)
	activatePanel(x.target.parentNode.id)
	// console.log(currPos)
})

function activatePanel(panel, label) {
	console.log(panel)
	let temp = panels.find( (x) => x.key === panel).data
	let pos = panels.findIndex((x) => x.key === panel)

	if (temp !== currPanel) {
		temp.classList.add('active-panel')
		temp.classList.remove('hidden-panel')

		currPanel.classList.remove('active-panel')
		currPanel.classList.add('hidden-panel')

		//console.log(`currPos: ${currPos}`);

		// ! affect landing pos
		console.log(currPos)
		tempLeft = pos - 1
		tempRight = pos + 1
		if (tempLeft >= 0) {
			panels[tempLeft].label.classList.add('right-corner')
		}
		if (tempRight <= 4) {
			panels[tempRight].label.classList.add('left-corner')
		}
		let tempId = panels[pos].label.id
		panels[pos].label.classList.add('focused')
		panels[pos].label.style.backgroundImage = `url(./assets/images/${tempId}-invert.svg)`
		tempLeft = currPos - 1
		tempRight = currPos + 1
		tempId = panels[currPos].label.id
		// console.log("TempId whatver that is")
		console.log(tempId)

		// ! removing the background on the panel past
		panels[currPos].label.classList.remove('focused')

		panels[currPos].label.style.backgroundImage = `url(./assets/images/${tempId}.svg)` //  `url('../images/${tempId}.svg')`

		if (tempLeft >= 0) {
			panels[tempLeft].label.classList.remove('right-corner')
		}
		if (tempRight <= 4) {
			panels[tempRight].label.classList.remove('left-corner')
		}

		currPos = pos
		currPanel = temp
		currLabel = panels[pos].label
	}
}

// Switching tabs when user is done
function switchCourses() {
	activatePanel("courses", undefined);
}
function switchCollegeOpt() {
	activatePanel("college-opt", undefined);
}
function switchExams() {
	activatePanel("exam-scores", undefined);
}


document.addEventListener("DOMContentLoaded", dropTheBass)

const farLeftBoii = document.getElementById('kid-1')
const leftBoii = document.getElementById('kid-2')
const title = document.querySelector('.title')
const farRightGal = document.getElementById('kid-3')
const rightGal = document.getElementById('kid-4')
let yScroll
let xScroll
let containerPos

function dropTheBass() {

	yScroll = window.scrollY
	xScroll = window.scrollX
	containerPos = header.getBoundingClientRect().bottom

	function translate(element, x, y) {
		element.style.transform = `translate3d(0, ${y}px, 0)`
	}

	let dropFun = (timeStamp) => {
		if (containerPos > 0) {
			translate(farLeftBoii, 0, yScroll * 0.65)
			translate(leftBoii, 0, yScroll * 0.32)
			translate(farRightGal, 0, yScroll * -0.06)
			translate(rightGal, 0, yScroll * 0.22)
			translate(title, 0, yScroll * 0.60)
		}

	}


	requestAnimationFrame(dropFun)
}
const header = document.getElementById('header')
document.addEventListener('scroll', () => {

	dropTheBass()
})

const footContainer = document.getElementById('footer-container')
const rightFooter = document.getElementById('right-footer')
const leftFooter = document.getElementById('left-footer')

document.addEventListener('scroll', () => {
	let ele = footContainer.getBoundingClientRect()

	if (ele.top >= 0 && ele.bottom + 200 <= window.innerHeight) {
		rightFooter.classList.add('open')
		leftFooter.classList.add('open')
	}


})

function switchPanel(value ){
	console.log(value);
	// $(`.${class_value}`).fadeOut('fast', function() {
	// 	$(`#${id_value}` + ID).fadeIn('fast')

}

