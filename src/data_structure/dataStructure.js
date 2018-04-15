export class Node {
    constructor(data) {
        this.id = data.id;
        this.data = {
            question: data.question,
            type: data.type,
            parentType: data.parentType,
            condition: data.condition,
            conditionValue: data.conditionValue,
            anchorLevel: data.anchorLevel
        }
        this.parent = null;
        this.children = [];
    }
}

export class Tree {
    constructor() {
        this.root = {
            id: 'rootNode',
            question: 'noQuestion',
            type: 'noType',
            condition: 'noCondition',
            conditionValue: 'noConditionValue',
            anchorLevel: 0,
            parent: 'noParent',
            children: []
        };
    }

    traverseBF(callback) {
        const arr = [this.root];
    
        while(arr.length) {
            const node = arr.shift();
    
            arr.push(...node.children);
            callback(node);
        }
    }

    traverseDF(callback) {
        const arr = [this.root];
    
        while(arr.length) {
            const node = arr.shift();
    
            arr.unshift(...node.children);
            callback(node);
        } 
    }

    contains(callback, traversal) {
        traversal.call(this, callback);
    }

    add(data, toParentId, traversal) {
        let child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node.id === toParentId) {
                    parent = node;
                }
            };
 
        this.contains(callback, traversal);
    
        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        } 
    }

    remove(data, fromData, traversal) {
        let parent = null,
            childToRemove = null,
            index;
     
        let callback = function(node) {
            if (node.data[0] === fromData) { parent = node; }
        };

        const findIndex = function(arr, data) {
            var index;
         
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === data) { index = i; }
            }
         
            return index;
        }
     
        this.contains(callback, traversal);
     
        if (parent) {
            index = findIndex(parent.children, data);
     
            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }
     
        return childToRemove;
    };
}