const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node{
  constructor(data){
    this.data = data
    this.left = null
    this.rigth = null
  }
}

class BinarySearchTree {

  constructor(){
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(data) {
    let newNode = new Node(data)
    if(this.treeRoot == null){
      this.treeRoot = newNode
    }
    else this.addNode(this.treeRoot, newNode)
  }

  addNode(node, newNode){
    if(newNode.data < node.data){
      if(node.left === null){
        node.left = newNode
      }
      else{
        this.addNode(node.left, newNode)
      }
    }
    else{
      if(node.rigth === null){
        node.rigth = newNode
      }
      else{
        this.addNode(node.rigth, newNode)
      }
    }
  }

  has(data) {
    return searchWithin(this.treeRoot, data)

    function searchWithin(node, data){
      if(!node) return false

      if(node.data === data) return true

      return data < node.data ? 
        searchWithin(node.left, data):
        searchWithin(node.rigth, data)
    }
  }
  

  find(data) {
    return backNode(this.treeRoot, data)

    function backNode(node, data){
      if(!node) return null

      if(node.data === data) return node

      return data < node.data ? 
        backNode(node.left, data):
        backNode(node.rigth, data)
    }
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    return this.treeRoot ? searchMin(this.treeRoot) : null

    function searchMin(node){
      if(!node.left) return node.data
      return searchMin(node.left)
    }
  }

  max() {
    return this.treeRoot ? searchMax(this.treeRoot) : null

    function searchMax(node){
      if(!node.rigth) return node.data
      return searchMax(node.rigth)
    }
  }
}

module.exports = {
  BinarySearchTree
};