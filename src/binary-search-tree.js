const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor () {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }
  //сделал по видео, вроде понял, но нужно побольше с деревьями поработать
  //для закрепления.
  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }

  }

  has(data) {
    //console.log(data);
    //console.log(search(this.rootNode, data));
    return search(this.rootNode, data);

    function search (node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  find(data) {
    if (!this.has(data)) {
      return null;
    }
    return search(this.rootNode, data)
    function search (node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }

  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null
        }

        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        //раз уж энивей по видео делаю, то сделал интереса ради оба
        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeNode(node.left, maxFromLeft.data);
        return node;
        /*
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
        */
      }

    }
  }

  min() {
    return search(this.rootNode)
    function search(node) {
      if (node.left) {
        return search(node.left);
      } else {
        return node.data;
      }
    }
  }

  max() {
    return search(this.rootNode)
    function search(node) {
      if (node.right) {
        return search(node.right);
      } else {
        return node.data;
      }
    }
  }
}

module.exports = {
  BinarySearchTree
};