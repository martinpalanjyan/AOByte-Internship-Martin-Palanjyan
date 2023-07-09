let lengthInput = document.getElementById("length");
let outputContainer = document.getElementById("output-container");
let rotateButtonContainer = document.getElementById("rotateButtonContainer");
let rotatedContainer = document.getElementById("rotated-container");
function createTriangle(length) {
    let result = "";
    for (let i = 1; i <= length; i++) {
        for (let j = length; j > i; j--) {
            result += "";
        }
        for (let j = 1; j <= i; j++) {
            result += "*" + " ";
        }
        result += "\n";
    }
    return result;
}

function rotateTriangle(triangle) {
    const lines = triangle.trim().split("\n");
    const length = lines.length;
    let rotatedTriangle = "";
    for (let i = 0; i < length; i++) {
        rotatedTriangle += "".repeat(i);
        rotatedTriangle += lines[length - i - 1];
        rotatedTriangle += "\n";
    }
    return rotatedTriangle;
}


function resetPage() {
    lengthInput.value = "";
    outputContainer.innerHTML = "";
    rotateButtonContainer.style.display = "none";
    rotatedContainer.innerHTML = "";
    lengthInput.disabled = false;
    lengthInput.focus();
}


function handleKeyPress(event) {
    if (event.key === "Enter") {
        const length = parseInt(lengthInput.value);
        if (isNaN(length) || length >= 25) {
            alert("Invalid input! Please enter a number less than 25.");
            resetPage();
        } else {
            const triangle = createTriangle(length);
            outputContainer.innerHTML = "<pre>" + triangle + "</pre>";
            rotateButtonContainer.style.display = "block";
            document.getElementById("rotateButton").disabled = false;
            document.getElementById("rotateButton").textContent = "Rotate";
            rotatedContainer.innerHTML = "";
            lengthInput.disabled = true;
        }
    }
}


function handleRotateClick() {
    const triangleElement = outputContainer.querySelector("pre");
    const triangle = triangleElement.textContent;
    const rotatedTriangle = rotateTriangle(triangle);
    const rotatedTriangleElement = document.createElement("pre");
    rotatedTriangleElement.textContent = rotatedTriangle;
    rotatedContainer.appendChild(rotatedTriangleElement);
    rotateButtonContainer.style.display = "none";
}


lengthInput.addEventListener("keypress", handleKeyPress);
document.getElementById("rotateButton").addEventListener("click", handleRotateClick);
document.getElementById("resetButton").addEventListener("click", resetPage);
