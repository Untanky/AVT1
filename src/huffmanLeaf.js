import HuffmanNode from './huffmanNode.js';

/**
 * Class for a leaf of the huffman tree
 */
export default class HuffmanLeaf extends HuffmanNode {
    
    /**
     * the value stored in the leaf
     */
    value = 0

    /**
     * A constructor for a huffman leaf that stores a values of any kind
     * 
     * @param {any} value the value stored in the leaf
     */
    constructor(value) {
        // needs to call parent constructor
        super(null, null)
        this.value = value;
    }
}