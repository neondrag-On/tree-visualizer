// Max Heap Implementation

let maxHeap = [];
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

function drawMaxHeap() {
    console.log("Drawing Max Heap");
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Clear the canvas and adjust size
    canvas.width = canvas.clientWidth;
    canvas.height = 2000; // Set a large height initially or calculate based on tree depth
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (maxHeap.length === 0) return;

    const nodeRadius = 20; // Consistent node radius with binary search tree
    const fontSize = 20; // Consistent font size with binary search tree

    function drawNode(value, x, y, offset) {
        // Draw the node
        context.beginPath();
        context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        context.fillStyle = 'lightblue';
        context.fill();
        context.stroke();
        context.closePath();

        // Draw the value inside the node
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = `${fontSize}px Arial`;
        context.fillText(value, x, y);
    }

    function drawHeapNode(index, x, y, offset) {
        drawNode(maxHeap[index], x, y, offset);

        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;

        if (leftChildIndex < maxHeap.length) {
            context.beginPath();
            context.moveTo(x, y + nodeRadius);
            context.lineTo(x - offset, y + 100);
            context.stroke();
            drawHeapNode(leftChildIndex, x - offset, y + 100, offset / 2);
        }

        if (rightChildIndex < maxHeap.length) {
            context.beginPath();
            context.moveTo(x, y + nodeRadius);
            context.lineTo(x + offset, y + 100);
            context.stroke();
            drawHeapNode(rightChildIndex, x + offset, y + 100, offset / 2);
        }
    }

    // Start drawing the heap from the root
    drawHeapNode(0, canvas.width / 2, 40, canvas.width / 4);
}


// Function to insert a new value into the Max Heap
function insertMaxHeap(value) {
    maxHeap.push(value);
    let index = maxHeap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    // Bubble up
    while (index > 0 && maxHeap[index] > maxHeap[parentIndex]) {
        [maxHeap[index], maxHeap[parentIndex]] = [maxHeap[parentIndex], maxHeap[index]];
        index = parentIndex;
        parentIndex = Math.floor((index - 1) / 2);
    }

    drawMaxHeap();
}

// Function to remove the root of the Max Heap
function removeMaxHeap() {
    if (maxHeap.length === 0) return;

    let lastElement = maxHeap.pop();
    if (maxHeap.length === 0) {
        drawMaxHeap();
        return;
    }

    maxHeap[0] = lastElement;
    let index = 0;
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;

    // Bubble down
    while ((leftChildIndex < maxHeap.length && maxHeap[index] < maxHeap[leftChildIndex]) ||
           (rightChildIndex < maxHeap.length && maxHeap[index] < maxHeap[rightChildIndex])) {
        let largerChildIndex = (rightChildIndex < maxHeap.length && maxHeap[rightChildIndex] > maxHeap[leftChildIndex]) ?
                               rightChildIndex : leftChildIndex;

        [maxHeap[index], maxHeap[largerChildIndex]] = [maxHeap[largerChildIndex], maxHeap[index]];
        index = largerChildIndex;
        leftChildIndex = 2 * index + 1;
        rightChildIndex = 2 * index + 2;
    }

    drawMaxHeap();
}

// Function to clear the Max Heap
function clearMaxHeap() {
        console.log("Clearing tree");
        this.root = null;
        this.drawTree();
    }


// Event listeners for buttons
document.getElementById('add_button').addEventListener('click', function() {
    let value = Number(document.getElementById('input').value);
    if (!isNaN(value) && value >= 0 && value <= 99) {
        insertMaxHeap(value);
    }
});

document.getElementById('remove_button').addEventListener('click', function() {
    removeMaxHeap();
});

document.getElementById('clear_button').addEventListener('click', function() {
    clearMaxHeap();
});
