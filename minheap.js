window.print("minheap");
let minHeap = [];
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

function drawMinHeap() {
    console.log("Drawing Min Heap");
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Clear the canvas and adjust size
    canvas.width = canvas.clientWidth;
    canvas.height = 2000; // Set a large height initially or calculate based on tree depth
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (minHeap.length === 0) return;

    const nodeRadius = 20; // Consistent node radius with binary search tree
    const fontSize = 20; // Consistent font size with binary search tree

    function drawNode(value, x, y, offset) {
        // Draw the node
        context.beginPath();
        context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        context.fillStyle = 'lightgreen';
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
        drawNode(minHeap[index], x, y, offset);

        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;

        if (leftChildIndex < minHeap.length) {
            context.beginPath();
            context.moveTo(x, y + nodeRadius);
            context.lineTo(x - offset, y + 100);
            context.stroke();
            drawHeapNode(leftChildIndex, x - offset, y + 100, offset / 2);
        }

        if (rightChildIndex < minHeap.length) {
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

// Function to insert a new value into the Min Heap
function insertMinHeap(value) {
    minHeap.push(value);
    let index = minHeap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    // Bubble up
    while (index > 0 && minHeap[index] < minHeap[parentIndex]) {
        [minHeap[index], minHeap[parentIndex]] = [minHeap[parentIndex], minHeap[index]];
        index = parentIndex;
        parentIndex = Math.floor((index - 1) / 2);
    }

    drawMinHeap();
}

// Function to remove the root of the Min Heap
function removeMinHeap() {
    if (minHeap.length === 0) return;

    let lastElement = minHeap.pop();
    if (minHeap.length === 0) {
        drawMinHeap();
        return;
    }

    minHeap[0] = lastElement;
    let index = 0;
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;

    // Bubble down
    while ((leftChildIndex < minHeap.length && minHeap[index] > minHeap[leftChildIndex]) ||
           (rightChildIndex < minHeap.length && minHeap[index] > minHeap[rightChildIndex])) {
        let smallerChildIndex = (rightChildIndex < minHeap.length && minHeap[rightChildIndex] < minHeap[leftChildIndex]) ?
                                rightChildIndex : leftChildIndex;

        [minHeap[index], minHeap[smallerChildIndex]] = [minHeap[smallerChildIndex], minHeap[index]];
        index = smallerChildIndex;
        leftChildIndex = 2 * index + 1;
        rightChildIndex = 2 * index + 2;
    }

    drawMinHeap();
}

// Function to clear the Min Heap
function clearMinHeap() {
    minHeap = [];
    ctx.clearRect(0, 0, width, height); // Clear the canvas
}

// Event listeners for buttons
document.getElementById('add_button').addEventListener('click', function() {
    let value = Number(document.getElementById('input').value);
    if (!isNaN(value) && value >= 0 && value <= 99) {
        insertMinHeap(value);
    }
});

document.getElementById('remove_button').addEventListener('click', function() {
    removeMinHeap();
});

document.getElementById('clear_button').addEventListener('click', function() {
    clearMinHeap();
});
