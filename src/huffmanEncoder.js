import HuffmanNode from './huffmanNode.js';
import HuffmanLeaf from './huffmanLeaf.js';

export default class HuffmanEncoder {
    /**
     * Static method creates a huffman tree from symbols.
     * @param {[number, number][]} symbols Array with pairs of symbol value and symbol count.
     * @returns {HuffmanNode} Root node of the huffman tree.
     */
    static getTree(symbols) {
        
        let subtrees = []

        // create leaf node for every value so they can be combined into trees
        for (let index = 0; index < symbols.length; index++) {
            subtrees.push({ node: new HuffmanLeaf(symbols[index][0]), count: symbols[index][1] });
        }

        // while there is more than one root node
        while(subtrees.length > 1) {
            subtrees.sort((a, b) => a.count - b.count); // sort the subtrees, so the tree with the lowest symbol count is at index 0
            let removedTrees = subtrees.splice(0, 2); // remove the first two trees from the list
            let newNode = new HuffmanNode(removedTrees[0].node, removedTrees[1].node) // combine the first two trees
            let newCount = removedTrees[0].count + removedTrees[1].count; // add the symbol counts of the trees
            subtrees.push({node: newNode, count: newCount }) // add the new tree with the symbol count to the list
        }

        return subtrees[0].node
    }

    /**
     * Static method creates an array with codes for every symbol in the Huffman tree.
     * @param {HuffmanNode} rootNode Root node of a huffman tree.
     * @returns {Map<number, string>} Map of symbol values with corresponding binary codes.
     */
    static getCodes(rootNode) {
        const codes = new Map();

        this.getCodesRecursively(rootNode, "", codes)        

        return codes;
    }

    /**
     * Recursive function for returning codes.
     * 
     * @param {HuffmanNode} node Root node of a huffman tree 
     * @param {string} code The current code of the tree. With every recursion step another character is appended
     * @param {Map<number, string>} map Map of symbol values with corresponding binary codes
     */
    static getCodesRecursively(node, code, map) {
        if(node.value == undefined) {
            if(node.leftChild != null && node.leftChild != undefined)
                this.getCodesRecursively(node.leftChild, code + "0", map);
            if(node.rightChild != null && node.rightChild != undefined)
                this.getCodesRecursively(node.rightChild, code + "1", map);
        }
        else {
            map.set(node.value, code)
        }
    }

    /**
     * Static method encodes the vlc code pairs and the source data itself.
     * @param {Map<number, string>} codes Map of symbol values with corresponding binary codes.
     * @param {DataView} sourceData Source data to be encoded using the code pairs.
     * @returns {string} Huffman encoded binary data as a string of bits.
     */
    static encodeData(codes, sourceData) {
        let encodedString = '';

        let vlcHeader = this.getVLCHeader(codes)
        let vlcHeaderLength = vlcHeader.length.toString(2).padStart(16, '0')
        
        encodedString += vlcHeaderLength + vlcHeader;
        for(let i = 0; i < sourceData.byteLength; i++) {
            encodedString += codes.get(sourceData.getUint8(i))
        }

        return encodedString;
    }

    /**
     * Creates the header for the encrypted file
     * 
     * @param {Map<number, string>} codes the code mappings of a huffman tree
     */
    static getVLCHeader(codes) {
        let header = ""
        let entries = codes.entries();
        for(let entry of entries) {
            let codeLength = entry[1].length.toString(2).padStart(8, '0');
            let symbol = entry[0].toString(2).padStart(8, '0');
            let code = entry[1]
            header += codeLength + symbol + code
        }
        return header;
    }
}