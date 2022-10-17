const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rt = null;
  }

  root() {
    return this.rt;
  }

  add(data) {
    const newListNode = new listNode(data);
    if (!this.rt) {
      this.rt = newListNode;
      return;
    }
    let curListNode = this.rt;
    while (curListNode) {
      if (newListNode.data < curListNode.data) {
        if (!curListNode.left) {
          curListNode.left = newListNode;
          return;
        }
        curListNode = curListNode.left;
      } else {
        if (!curListNode.right) {
          curListNode.right = newListNode;
          return;
        }
        curListNode = curListNode.right;
      }
    }
  }

  has(data) {
    let res = false;
    let array = [];
    this.depthFirstSearch((listNode) => {
      array.push(listNode.data);
    }, 'pre_order');
    array.forEach(elem => {
        if(elem == data) {
            res = true;
        }            
    });
    return res;
  }

  find(data) {
    const findListNode = new listNode(data);
    let curListNode = this.rt;
    while (curListNode) {
      if (findListNode.data < curListNode.data) {
        curListNode = curListNode.left;
      } else if (findListNode.data > curListNode.data) {
        curListNode = curListNode.right;
      } else if (findListNode.data == curListNode.data) {
        return curListNode;
      }
    }
    return null;
  }

  pre_order(listNode, callback) {
    if (!listNode) {
        return;
    }
    if (callback) {
      callback(listNode);
    }
    this.pre_order(listNode.left, callback);
    this.pre_order(listNode.right, callback);
  }
  
  in_order(listNode, callback) {
    if (!listNode) {
      return;
    }    
    this.pre_order(listNode.left, callback);
    if (callback) {
      callback(listNode);
    }
    this.pre_order(listNode.right, callback);
  }
  
  post_order(listNode, callback) {
    if (!listNode) {
      return;
    }
    this.pre_order(listNode.left, callback);
    this.pre_order(listNode.right, callback);
    if (callback) {
      callback(listNode);
    }
  }
  
  depthFirstSearch(callback, method) {
    if (method = 'pre_order') {
        return this.pre_order(this.rt, callback);
    }
    if (method = 'in_order') {
        return this.in_order(this.rt, callback);
    }
    return this.post_order(this.rt, callback);
  }

  remove(data) {
    this.depthFirstSearch((listNode) => {
      if (listNode.data == data) {
        listNode.data = null;
      }    
  }, 'pre_order');
  }

  min() {
    let min = 0;
    let array = [];
    this.depthFirstSearch((listNode) => {
      if (listNode.data !== null) {
        array.push(listNode.data);
      }
    }, 'pre_order');
    min = Math.min(...array);
    return min;
  }

  max() {
    let max = 0;
    let array = [];
    this.depthFirstSearch((listNode) => {
      if (true) {
        array.push(listNode.data); 
      }
    }, 'pre_order');
    max = Math.max(...array);
    return max;
  }
}

class listNode {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

module.exports = {
  BinarySearchTree
};