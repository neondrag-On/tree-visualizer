class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Add a node to the tree
    add(value) {
        console.log("Adding node:", value);
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            // Check for duplicate value before inserting
            if (this._contains(this.root, value)) {
                console.log("Value already exists in the tree.");
                return; // Do not add duplicate values
            }
            this._insertNode(this.root, newNode);
        }

        this.drawTree();
    }

    // Helper method to insert a node
    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
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

    // Remove a node from the tree
    remove(value) {
        console.log("Removing node:", value);
        this.root = this._removeNode(this.root, value);
        this.drawTree();
    }

    // Helper method to remove a node
    _removeNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
            return node;
        } else {
            // Node with no children
            if (node.left === null && node.right === null) {
                return null;
            }

            // Node with one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Node with two children
            const aux = this._findMinNode(node.right);
            node.value = aux.value;
            node.right = this._removeNode(node.right, aux.value);
            return node;
        }
    }

    // Find the minimum node in the tree
    _findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this._findMinNode(node.left);
        }
    }

    // Clear the tree
    clear() {
        console.log("Clearing tree");
        this.root = null;
        this.drawTree();
    }

    // Draw the tree on the canvas
    // In binary_search.js

// Update the drawTree method to adjust canvas height based on tree size
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

// Optionally, you may need a method to dynamically adjust canvas height based on tree depth


    // Helper method to draw a node
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
    const binaryTree = new BinaryTree();

    // Set up event listener for the "Add Node" button
    document.getElementById('add_button').addEventListener('click', () => {
        const input = document.getElementById('input');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            binaryTree.add(value);
            input.value = ''; // Clear the input field after adding the node
        }
    });

    // Set up event listener for the "Remove Node" button
    document.getElementById('remove_button').addEventListener('click', () => {
        const input = document.getElementById('input');
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            binaryTree.remove(value);
            input.value = ''; // Clear the input field after removing the node
        }
    });

    // Set up event listener for the "Clear Tree" button
    document.getElementById('clear_button').addEventListener('click', () => {
        binaryTree.clear();
    });
});


/*
import matplotlib.pyplot as plt
import networkx as nx

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def add_edges(graph, node, pos, x=0, y=0, layer=1):
    if node is not None:
        graph.add_node(node.val, pos=(x, y))
        if node.left:
            graph.add_edge(node.val, node.left.val)
            l = x - 1 / layer
            add_edges(graph, node.left, pos, x=l, y=y-1, layer=layer+1)
        if node.right:
            graph.add_edge(node.val, node.right.val)
            r = x + 1 / layer
            add_edges(graph, node.right, pos, x=r, y=y-1, layer=layer+1)

def visualize_binary_tree(root):
    graph = nx.DiGraph()
    add_edges(graph, root, pos={})
    pos = nx.get_node_attributes(graph, 'pos')
    labels = {n: n for n in graph.nodes()}
    
    plt.figure(figsize=(8, 8))
    nx.draw(graph, pos, labels=labels, with_labels=True, node_size=3000, node_color="skyblue", font_size=16, font_weight="bold", arrows=False)
    plt.show()

# Example usage:
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

visualize_binary_tree(root)
*/