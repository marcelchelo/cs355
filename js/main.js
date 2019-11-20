// ! tab swapping //
const nav = document.getElementById("transfer-nav-container");
const panels = [
    {
        key: "instructions",
        data: document.getElementById("instructions-panel"),
        label: document.getElementById("instructions")
    },
    {
        key: "courses",
        data: document.getElementById("courses-panel"),
        label: document.getElementById("courses")
    },
    {
        key: "college-opt",
        data: document.getElementById("college-opt-panel"),
        label: document.getElementById("college-opt")
    },
    {
        key: "exam-scores",
        data: document.getElementById("exam-score-panel"),
        label: document.getElementById("exam-scores")
    },
    {
        key: "results",
        data: document.getElementById("results-panel"),
        label: document.getElementById("results")
    }
];
let currPanel;
let currLabel;
let currPos = 0;
let tempLeft;
let tempRight;
(async function preload() {
    let temp = await grabCurrPanel();
    currPos = 0;
})();

function grabCurrPanel() {
    panels.forEach(panel => {
        if (panel.data.classList.contains("active-panel")) {
            currPanel = panel.data;
            currLabel = panel.label;
            console.log(currLabel);
            currPos = panels.findIndex(x => x.data === currPanel);
        }
    });
}
console.log(`hello ${currPos}`);

nav.addEventListener("click", x => {
    //console.log(x);
    activatePanel(x.target.parentNode.id);
    console.log(currPos);
});

function activatePanel(panel, label) {
    console.log(currPos);
    let temp = panels.find(x => x.key === panel).data;
    let pos = panels.findIndex(x => x.key === panel);

    if (temp !== currPanel) {
        temp.classList.add("active-panel");
        temp.classList.remove("hidden-panel");

        currPanel.classList.remove("active-panel");
        currPanel.classList.add("hidden-panel");

        //console.log(`currPos: ${currPos}`);

        // ! affect landing pos
        console.log(currPos);
        tempLeft = pos - 1;
        tempRight = pos + 1;
        if (tempLeft >= 0) {
            panels[tempLeft].label.classList.add("right-corner");
        }
        if (tempRight <= 4) {
            panels[tempRight].label.classList.add("left-corner");
        }
        let tempId = panels[pos].label.id;
        panels[pos].label.classList.add("focused");
        panels[
            pos
        ].label.style.backgroundImage = `url(../images/${tempId}-invert.svg)`;
        tempLeft = currPos - 1;
        tempRight = currPos + 1;
        tempId = panels[currPos].label.id;
        console.log(tempId);

        // ! removing the background on the panel past
        panels[currPos].label.classList.remove("focused");

        panels[
            currPos
        ].label.style.backgroundImage = `url('../images/${tempId}.svg')`;

        if (tempLeft >= 0) {
            panels[tempLeft].label.classList.remove("right-corner");
        }
        if (tempRight <= 4) {
            panels[tempRight].label.classList.remove("left-corner");
        }

        currPos = pos;
        currPanel = temp;
        currLabel = panels[pos].label;
    }
}
