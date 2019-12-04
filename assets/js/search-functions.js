const farLeftBoii = document.getElementById('kid-1')
const leftBoii = document.getElementById('kid-2')

const farRightGal = document.getElementById('kid-3')
const rightGal = document.getElementById('kid-4')


function dropTheBass() {
	let yScroll = window.scrollY
	let xScroll = window.scrollX
	let containerPos = header.getBoundingClientRect().bottom



	let dropFun = (timeStamp) => {
		if (containerPos > 0 && containerPos !== header.getBoundingClientRect().bottom) {
			console.log(containerPos)
			containerPos = header.getBoundingClientRect().bottom
			requestAnimationFrame(dropFun)
		} else {
			return;
		}


	}


	requestAnimationFrame(dropFun)
}
const header = document.getElementById('header')
document.addEventListener('scroll', () => {

	dropTheBass()
})