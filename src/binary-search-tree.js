const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.first = {
      data: null,
      left: null,
      right: null,
    }
  }

  root() {
    if (!this.first.data) {
      return null;
    }
    return this.first;
  }

  add(data) {
    if (!this.first.data) {
      this.first.data = data;
    }

    let current = this.first;
    while (current) {
      if (data === current.data) return null;
      if (data < current.data) {
        if (current.left === null) {
          current.left = { data, left: null, right: null };
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = { data, left: null, right: null };
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    const node = this.find(data);
    if (node) {
      return true;
    }
    return false;
  }

  find(data) {
    if (!this.first) {
      return null;
    }
    let current = this.first;
    let found = null;
    while (current && !found) {
      if (data < current.data) {
        current = current.left
      } else if (data > current.data) {
        current = current.right
      } else {
        found = current
      }
    }
    if (!found) {
      return null;
    }
    return found;
  }

  remove(data) {
    const removeNode = (current, data) => {
      const findSmallest = (node) => {
        while (!(node.left == null))
          node = node.left;
        return node;
      }

      if (data == current.data) {
        if (current.left == null && current.right == null) {
          return null;
        } else if (current.left == null)
          return current.right;
        else if (current.right == null)
          return current.left;
        else {
          let tmp = findSmallest(current.right);
          current.data = tmp.data;
          current.right = removeNode(current.right, tmp.data);
          return current;
        }
      } else if (data < current.data) {
        current.left = removeNode(current.left, data);
        return current;
      } else {
        current.right = removeNode(current.right, data);
        return current;
      }
    }
    this.first = removeNode(this.first, data);
  }

  min() {
    let current = this.first;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.first;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};