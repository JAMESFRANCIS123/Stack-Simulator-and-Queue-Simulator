let stack = [];
let deleted = [];

const input = document.getElementById("valueInput");
const display = document.getElementById("stackDisplay");
const deletedDisplay = document.getElementById("deletedDisplay");
const message = document.getElementById("message");

function showMessage(text) {
    message.textContent = text;
}

function renderStack() {
    display.innerHTML = "";

    // Display from bottom to top
    for (let i = 0; i < stack.length; i++) {
        const block = document.createElement("div");
        block.className = "block";
        block.textContent = stack[i];

        if (i === stack.length - 1) {
            block.textContent += " (TOP)";
        }

        display.appendChild(block);
    }

    renderDeleted();
}

function renderDeleted() {
    deletedDisplay.innerHTML = "";

    deleted.forEach(value => {
        const block = document.createElement("div");
        block.className = "deleted";
        block.textContent = value;
        deletedDisplay.appendChild(block);
    });
}

function push() {
    const value = input.value.trim();

    if (value === "") {
        showMessage("Please enter a value.");
        return;
    }

    stack.push(value);
    input.value = "";

    showMessage("Successfully pushed " + value);
    renderStack();
}

function pop() {
    if (stack.length === 0) {
        showMessage("Stack is empty.");
        return;
    }

    const value = stack.pop();
    deleted.push(value);

    showMessage("Popped: " + value);
    renderStack();
}

function peek() {
    if (stack.length === 0) {
        showMessage("Stack is empty.");
        return;
    }

    showMessage("Top element: " + stack[stack.length - 1]);
    renderStack();

    const blocks = display.children;
    blocks[blocks.length - 1].classList.add("highlight");
}

function clearStack() {
    stack = [];
    deleted = [];

    showMessage("Stack and deleted elements cleared.");
    renderStack();
}

renderStack();