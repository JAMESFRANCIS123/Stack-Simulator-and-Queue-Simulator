let queue = [];
let deleted = [];

const input = document.getElementById("valueInput");
const display = document.getElementById("queueDisplay");
const deletedDisplay = document.getElementById("deletedDisplay");
const message = document.getElementById("message");

function showMessage(text) {
    message.textContent = text;
}

function renderQueue(highlightFront = false) {
    display.innerHTML = "";

    queue.forEach((value, index) => {
        const block = document.createElement("div");
        block.className = "block";

        // Front is the first item
        if (index === 0) {
            block.textContent = "FRONT: " + value;

            if (highlightFront) {
                block.classList.add("highlight");
            }
        } 
        // Rear is the last item
        else if (index === queue.length - 1) {
            block.textContent = "REAR: " + value;
        } 
        else {
            block.textContent = value;
        }

        display.appendChild(block);
    });

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

function enqueue() {
    const value = input.value.trim();

    if (value === "") {
        showMessage("Please enter a value.");
        return;
    }

    queue.push(value);
    input.value = "";

    showMessage("Enqueued: " + value);
    renderQueue();
}

function dequeue() {
    if (queue.length === 0) {
        showMessage("Cannot dequeue. Queue is empty.");
        return;
    }

    // Remove the FIRST item, not the last
    const value = queue.shift();

    deleted.push(value);

    showMessage("Dequeued: " + value);
    renderQueue();
}

function peek() {
    if (queue.length === 0) {
        showMessage("Cannot peek. Queue is empty.");
        return;
    }

    const frontValue = queue[0];

    showMessage("Front element: " + frontValue);

    // Highlight without removing
    renderQueue(true);
}

function clearQueue() {
    queue = [];
    deleted = [];

    showMessage("Queue and deleted elements cleared.");
    renderQueue();
}

renderQueue();
