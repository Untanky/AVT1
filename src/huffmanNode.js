/**
 * The node of a huffman tree
 */
export default class HuffmanNode {

    /**
     * the left subtree
     */
    leftChild;

    /**
     * the right subtree
     */
    rightChild;

    /**
     * The constructor for a huffman node taking to subtrees
     * 
     * @param {HuffmanNode} leftChild the left subtree
     * @param {HuffmanNode} rightChild the right subtree
     */
    constructor(leftChild, rightChild) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}