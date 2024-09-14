class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // Height of the node
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Add a node to the tree
    add(value) {
        console.log("Adding node:", value);
        if (!this._contains(this.root, value)) {
            this.root = this._insertNode(this.root, value);
            this.drawTree();
        } else {
            console.log("Value already exists in the tree.");
        }
    }

    // Helper method to insert a node and balance the tree
    _insertNode(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }

        if (value < node.value) {
            node.left = this._insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertNode(node.right, value);
        }

        // Update height of the current node
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

        // Balance the node
        const balance = this._getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return this._rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return this._leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        return node;
    }

    // Helper method to remove a node and balance the tree
    remove(value) {
        console.log("Removing node:", value);
        this.root = this._removeNode(this.root, value);
        this.drawTree();
    }

    _removeNode(node, value) {
        if (node === null) {
            return node;
        }

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
        } else {
            // Node with one or no child
            if ((node.left === null) || (node.right === null)) {
                node = (node.left) ? node.left : node.right;
            } else {
                // Node with two children: Get the inorder successor (smallest in the right subtree)
                const temp = this._findMinNode(node.right);
                node.value = temp.value;
                node.right = this._removeNode(node.right, temp.value);
            }
        }

        if (node === null) {
            return node;
        }

        // Update height of the current node
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

        // Balance the node
        const balance = this._getBalance(node);

        // Left Left Case
        if (balance > 1 && this._getBalance(node.left) >= 0) {
            return this._rightRotate(node);
        }

        // Left Right Case
        if (balance > 1 && this._getBalance(node.left) < 0) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && this._getBalance(node.right) <= 0) {
            return this._leftRotate(node);
        }

        // Right Left Case
        if (balance < -1 && this._getBalance(node.right) > 0) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        return node;
    }

    // Rotate right
    _rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

        return x;
    }

    // Rotate left
    _leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
        y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

        return y;
    }

    // Get height of node
    _getHeight(node) {
        return node ? node.height : 0;
    }

    // Get balance factor of node
    _getBalance(node) {
        return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    // Find the minimum node
    _findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this._findMinNode(node.left);
        }
    }

    // Helper method to check if a value exists in the tree
    _contains(node, value) {
        if (node === null) {
            return false;
        }

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {
            return this._contains(node.left, value);
        } else {
            return this._contains(node.right, value);
        }
    }

    // Clear the tree
    clear() {
        console.log("Clearing tree");
        this.root = null;
        this.drawTree();
    }

    // Draw the tree on the canvas
    drawTree() {
        console.log("Drawing tree");
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        
        // Clear the canvas and adjust size
        canvas.width = canvas.clientWidth;
        canvas.height = 2000; // Set a large height initially or calculate based on tree depth
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (this.root !== null) {
            this._drawNode(context, this.root, canvas.width / 2, 40, canvas.width / 4);
        }
    }

    // Helper method to draw a node
    _drawNode(context, node, x, y, offset) {
        const nodeRadius = 20; // Radius of the node circle
        const fontSize = 20; // Font size for the node value

        context.beginPath();
        context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        context.fillStyle = 'lightblue';
        context.fill();
        context.stroke();
        context.closePath();

        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = `${fontSize}px Arial`; // Set font size and family
        context.fillText(node.value, x, y);

        if (node.left !== null) {
            context.beginPath();
            context.moveTo(x, y + nodeRadius);
            context.lineTo(x - offset, y + 80);
            context.stroke();
            this._drawNode(context, node.left, x - offset, y + 100, offset / 2);
        }

        if (node.right !== null) {
            context.beginPath();
            context.moveTo(x, y + nodeRadius);
            context.lineTo(x + offset, y + 80);
            context.stroke();
            this._drawNode(context, node.right, x + offset, y + 100, offset / 2);
        }
    }
}

// Ensure DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the tree
    const avlTree = new AVLTree();

    // Set up event listener for the "Add Node" button
    document.getElementById('add_button').addEventListener('click', () => {
        const input = document.getElementById('input');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            avlTree.add(value);
            input.value = ''; // Clear the input field after adding the node
        }
    });

    // Set up event listener for the "Remove Node" button
    document.getElementById('remove_button').addEventListener('click', () => {
        const input = document.getElementById('input');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            avlTree.remove(value);
            input.value = ''; // Clear the input field after removing the node
        }
    });

    // Set up event listener for the "Clear Tree" button
    document.getElementById('clear_button').addEventListener('click', () => {
        avlTree.clear();
    });
});
