// *BETTER COMMENTS EXTENSION for VScode to help read this comment mess
// *Tab Section..
// TODO 1. Get this thing eff working
// TODO 2. you can dance if you want to. you can leave your friends behind.

const tabBtns = document.querySelectorAll(".tab-item");

tabBtns.forEach(x => {
    x.addEventListener("click", event => {
        console.log("working");
    });
});

// *Current School Panel
// TODO add functionality
// TODO delete functionality DONE!! COMPLETE

// search bar
const pastSkooSearch = document.getElementById("past-colleges");
// ul element that acts as a dropdown list
const pastSkooAAResults = document.getElementById("past-college-results");
// !THIS IS STATIC... DATABASE NEEDED FOR NEXT PRESENTATION

async function searchSkooList(text) {
    const res = await fetch("./js/skoo.json");
    const skoos = await res.json();
    //console.log(skoos);
    // *Get matches to text input
    let matches = skoos.filter(skoo => {
        const regex = new RegExp(`${text}`, "gi");
        return skoo.skooName.match(regex);
    });
    //console.log(text.length);
    if (text.length === 0) {
        matches = [];
    }
    //console.log(matches);
    return matches;
    //outputSkoo(matches);
}

function outputSkoo(text, callback) {
    callback(text).then(resolve => {
        if (resolve.length > 0) {
            const html = mapping(resolve);
            pastSkooAAResults.innerHTML = html;
            skooSelector();
        } else {
            pastSkooAAResults.innerHTML = "";
        }
    });
}

function mapping(input) {
    return input
        .map(
            match =>
                `<li class="list-item"><h4 class="skoo-item">${match.skooName}</h4></li>`
        )
        .join("");
}

function skooSelector() {
    const res = document.querySelectorAll(".skoo-item");

    res.forEach(x => {
        x.addEventListener("click", s => {
            pastSkooSearch.value = s.target.innerText;
            pastSkooAAResults.innerHTML = "";
        });
    });
}

pastSkooSearch.addEventListener("input", x => {
    //console.log(x.target.value);
    if (x.target.value.length >= 3) {
        //  console.log(pastSkooSearch.value);
        outputSkoo(pastSkooSearch.value, searchSkooList);
        // searchSkooList(pastSkooSearch.value, outputSkoo);
    } else {
        //  console.log("sd");
        pastSkooAAResults.innerHTML = "";
    }
});

// *If the cursor clicks outside of the dropdown divs, it removes them... kinda like how a normal down does list does on a form.

window.addEventListener("click", x => {
    if (!x.target.classList.contains("skoo-item")) {
        pastSkooAAResults.innerHTML = "";
    } else if (x.target.classList.contains("chosen-prev-school")) {
        deleteSkooEntry(x);
    }
});

// DELETETION OF CHOSEN SKOO
// MAX AMT OF CHOSEN SKOO DETERMINED BY RESULTCOUNTMAX ...
const selectedSchool = document.querySelectorAll(".school-result");
const currSchoolPanel = document.getElementById("curr-school");
const deleteSkooBtn = document.querySelectorAll(".chosen-prev-school");

selectedSchool.forEach(school => {
    school.addEventListener("click", item => {
        //console.log(item);
        if (item.srcElement.nodeName === "BUTTON") {
            item.target.parentNode.remove();
        }
    });
});

// *Adding school
// btn
const btnForPastSkoo = document.getElementById("past-college-submit");
let resultCountMax = 2;
let resultCount = 0;

btnForPastSkoo.addEventListener("click", () => {
    console.log(pastSkooSearch.value);
    if (pastSkooSearch.value.length < 1) {
        //console.log("sad");
    } else {
        addSkoo(pastSkooSearch.value, searchSkooList);
    }
});

function addSkoo(skoo, callback) {
    callback(skoo)
        .then(resolve => {
            let temp = resolve[0].skooName;
            console.log(temp);
            if (
                skoo.toLowerCase() === temp.toLowerCase() &&
                resultCount < resultCountMax
            ) {
                let div = document.createElement("div");
                div.className = "school-result";
                div.innerHTML = `
                <h3>${skoo}</h3>
                <button class="chosen-prev-school">Delete</button>
            `;
                div.addEventListener("click", item => {
                    if (item.srcElement.nodeName === "BUTTON") {
                        item.target.parentNode.remove();
                        resultCount--;
                    }
                });
                resultCount++;
                console.log(resultCount);
                currSchoolPanel.appendChild(div);
            } else if (resultCount === resultCountMax) {
                // !RELAY TO USER THAT THE MAX IS REEEACHHHED
            }
        })
        .catch(error => {
            // !SOMEONE COMPLETE THE ERROR STATE : IN THIS COND, THE COLLEGE INPUT IS NOT IN DATABASE!!!
            // !WE NEED TO RELAY TO THE USER SIDE.
            console.log("sd");
        });
}
