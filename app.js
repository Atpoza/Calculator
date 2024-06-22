//Part 1: Tokenization

//Demo inputs
/*
    10/2*2*2+5/5
    25+50+3+20
    80*5+25/2-3
    80*5+25/2-80*5+25/2
*/


function Token(value,index,lenght,type){
    this.value = value;
    this.index = index;
    this.lenght = lenght;
    this.type = type;
}

let cursor = 0;

function nextToken(operation){
    if(parseInt(operation.charAt(cursor))){
            let index = cursor;
            let length = 1;
            let tokenValue = operation.charAt(cursor);
            cursor++;
            while(parseInt(operation.charAt(cursor)) || operation.charAt(cursor) === "0"){
                    tokenValue += operation.charAt(cursor);
                    cursor++;
                    length++;
            }
            return new Token(tokenValue,index,length,"Number");
    }
    
    switch(operation.charAt(cursor)){
            case "+":
              return new Token("+",cursor++,1,"Operator");
            case "-":
              return new Token("-",cursor++,1,"Operator");
            case "*":
              return new Token("*",cursor++,1,"Operator");
            case "/":
              return new Token("/",cursor++,1,"Operator");
    }
    if(cursor >= operation.length){
            return new Token("EOF",operation.length,0,"EndOfFile");
    }
    return new Token("",cursor,0,"Unknown");
}

function tokensToArray(operation){
    const arr = [];
    let i = nextToken(operation);
    while(i.type != "Unknown" && i.type != "EndOfFile"){
            arr.push(i);
            i = nextToken(operation);
    }
    return arr;
}

//Part 2: Binary Tree

function Node(value,left,right,parent){
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.setNode = function(node){
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
        this.parent = node.parent;
    }
}

function findLastSum(arr){
    for(let i = arr.length-1; i >= 0;i--){
            if(arr[i].value == "+" || arr[i].value == "-"){
                    return i;
            }
    }
    return -1;
}

function findLastMul(arr){
    for(let i = arr.length-1; i >= 0;i--){
            if(arr[i].value == "*" || arr[i].value == "/"){
                    return i;
            }
    }
    return -1;
}

function separate(array,separator){
    //Separator is a function that is used to find operator for separation
    //op is number 
    //result[0] = op,   result[1] = left   , result[2] = right
    let op = separator(array);
    let left = [];
    let right = [];
    for(let i = 0;i < op;i++){
            left.push(array[i]);
    }
    for(let i = op+1;i < array.length;i++){
            right.push(array[i]);
    }
    let result = [];
    result.push(op);
    result.push(left);
    result.push(right);
    return result;
};

function isArraySingle(arr){
    if(Array.isArray(arr) == false){
            return false;
    }
    
    return arr.length > 1 ? false : true;
}

function createTreeLeft(array,lnode){
    //this function creates tree for left side
    let arr = array;
    let nodes = [];
    let lastNode = lnode;
    if(array == []){
        console.log("Error: Array is empty");
    }
    while(!isArraySingle(arr)){
            let separatedArray;
            if(findLastSum(arr) != -1){
                    separatedArray = separate(arr,findLastSum);
            }else{
                    separatedArray = separate(arr,findLastMul);
            }
            let separatedValue = arr[separatedArray[0]];
            let separatedLeft = separatedArray[1];
            let separatedRight = separatedArray[2];

            arr = separatedLeft;
            if(lastNode != undefined){
                    nodes.push(new Node(separatedValue,separatedLeft,separatedRight,lastNode));
                    lastNode.left = nodes[nodes.length-1];
            }else{
                nodes.push(new Node(separatedValue,separatedLeft,separatedRight,null));
            }
            lastNode = nodes[nodes.length-1];

            if(!isArraySingle(separatedRight)){
                separatedRight = createTreeRight(separatedRight,lastNode)[0];
            }
    }
    return nodes;
}

function createTreeRight(array,lnode){
        //same except its builds tree for right side
        let arr = array;
        let nodes = [];
        let lastNode = lnode;
        if(array == []){
            console.log("Error: Array is empty");
        }
        while(!isArraySingle(arr)){
                let separatedArray;
                if(findLastSum(arr) != -1){
                        separatedArray = separate(arr,findLastSum);
                }else{
                        separatedArray = separate(arr,findLastMul);
                }
                let separatedValue = arr[separatedArray[0]];
                let separatedLeft = separatedArray[1];
                let separatedRight = separatedArray[2];
    
                arr = separatedRight;
                if(lastNode != undefined){
                        nodes.push(new Node(separatedValue,separatedLeft,separatedRight,lastNode));
                        lastNode.right = nodes[nodes.length-1];
                }else{
                        nodes.push(new Node(separatedValue,separatedLeft,separatedRight,null));
                }
                lastNode = nodes[nodes.length-1];

                if(!isArraySingle(separatedLeft)){
                        separatedRight = createTreeLeft(separatedLeft,lastNode)[0];
                }
        }
        return nodes;
}

//Part 3: Evaluate

function evaluate(expression){
        let tree = createTreeLeft(tokensToArray(expression),null)[0];
        let leftBottom = getLeftBottomNode(tree);
        let rightBottom = getRightBottomNode(tree);
        getSumOfLeft(leftBottom,tree);
        getSumOfRight(rightBottom,tree);
        return getNodeSum(tree);
}

function getSumOfLeft(leftBottom,limit){
        if(isArraySingle(leftBottom)){
                return;
        }
        while(leftBottom != limit){
                if(!isArraySingle(leftBottom.right)){
                        getSumOfRight(getRightBottomNode(leftBottom),leftBottom);
                }
                leftBottom = leftBottom.parent;
                leftBottom.left = [new Token(getNodeSum(leftBottom.left),0,0,"Eval")];
        }
}

function getSumOfRight(rightBottom,limit){
        if(isArraySingle(rightBottom)){
                return;
        }
        while(rightBottom != limit){
                if(!isArraySingle(rightBottom.left)){
                        getSumOfLeft(getLeftBottomNode(rightBottom),rightBottom);
                }
                rightBottom = rightBottom.parent;
                rightBottom.right = [new Token(getNodeSum(rightBottom.right),0,0,"Eval")];
        }
}

function getLeftBottomNode(tree){
        let cursor = tree.left;
        let lastNode = cursor; //this is because this algorithm will find the number at bottom . We get node of that
        while(!isArraySingle(cursor)){
                lastNode = cursor;
                cursor = cursor.left;
        }
        return lastNode;
}

function getRightBottomNode(tree){
        let cursor = tree.right;
        let lastNode = cursor; //this is because this algorithm will find the number at bottom . We get node of that
        while(!isArraySingle(cursor)){
                lastNode = cursor;
                cursor = cursor.right;
        }
        return lastNode;
}

function getNodeSum(node){
        let left = parseFloat(node.left[0].value);
        let right = parseFloat(node.right[0].value);
        if(node.value.value == "+"){
                return left+right;
        }
        else if(node.value.value == "-"){
                return left-right;
        }
        else if(node.value.value == "*"){
                return left*right;
        }
        if(node.value.value == "/"){
                return left/right;
        }
        console.log("Error: Cant get sum of node");
}

/*
    10/2*2*2+5/5
    25+50+3+20
    80*5+25/2-3
    80*5+25/2-80*5+25/2
*/
function SumbitValue(event){
        console.clear();
        let x = document.getElementById("txtbox").value;
        console.log(createTreeLeft(tokensToArray(x),null)[0]);
        cursor = 0;
        alert(evaluate(x)); 
        cursor = 0;
        event.preventDefault();
}
