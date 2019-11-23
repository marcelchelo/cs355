// ! Make school search field appear
const addSchoolBtn = document.getElementById("add-school");
const schoolSearchContainer = document.querySelector(".add-school-container");

addSchoolBtn.addEventListener("click", () => {
    schoolSearchContainer.classList.remove("hidden");
    schoolSearchContainer.classList.add("active");
    addSchoolBtn.classList.add("hidden");
    autocompleter();
});

// ! AutoSearch
let schoolData;

async function pullSchools() {
    const res = await fetch("../data/skoo.json");
    const data = await res.json();

    return data;
}

function searchSchool(input) {
    let matches = schoolData.filter(school => {
        console.log(school);
    });
}

function autocompleter() {
    let schoolSearchField = document.querySelector(".search-school");
    // ? Clears input
    schoolSearchField.value = "";
    // ? fetches the json for the CUNY schools. Revised as last time it would fetch every time a user typed something in
    if (schoolData === undefined) {
        pullSchools().then(res => {
            schoolData = res;
        });
    }
    schoolSearchField.addEventListener("input", () => {
        searchSchool(schoolSearchField.value);
    });
}
