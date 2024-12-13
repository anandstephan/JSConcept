//Memoization
const addThree = (a, b, c) => a + b + c;

const memo = (fn) => {
  const cache = {};
  return (...args) => {
    const argsToString = JSON.stringify(args);
    if (argsToString in cache) {
      // console.log("Result frm cahce",argsToString)
      console.log("Get data from cache", argsToString);
      return cache[argsToString];
    } else {
      const result = fn.apply(this, args);
      // console.log("Resutl without from chache",argsToString)
      console.log("computing value ", argsToString);
      cache[argsToString] = result;
      return result;
    }
  };
};

const add = memo(addThree);

const factorial = memo((x) => {
  if (x === 1) return 1;
  else return x * factorial(x - 1);
});

// console.log(factorial(5))
// console.log(factorial(7))

// console.log(add(1,2,3))
// console.log(add(2,3,1))

//Flatten the Array

const arr = [
  [[1, 2], [1.1]],
  [2, 3],
  [4, [[[5, 6]]]],
];

const flattenArray = (arr, res) => {
  // console.log("===",res)
  arr.forEach((item) =>
    Array.isArray(item) ? flattenArray(item, res) : res.push(item)
  );
};
let result = [];
flattenArray(arr, result);
// console.log(result)

//Flatten Object
const obj = {
  A: "Anand",
  S: ["Sakshi", "sriti"],
  H: "Hafsa",
  K: {
    slimgirl: "Kashish",
  },
  cute: {
    girl: ["shreeya", "sapna", "kritika"],
    harami: "poonam",
  },
  n: "nilakshi",
};
const flattenObj = (obj, res, parentKey = "") => {
  for (key in obj) {
    let newkey = parentKey ? parentKey + "." + key : key;
    if (typeof obj[key] === "object") {
      flattenObj(obj[key], res, newkey);
    } else {
      res[newkey] = obj[key];
    }
  }
};

let result1 = {};
flattenObj(obj, result1);
// console.log(result1);

//Polyfill of promise.all
const dummyDataAPI = (time) =>
  new Promise((resolve, reject) => setTimeout(resolve("hi"), time));

const taskArray = [dummyDataAPI(1000), dummyDataAPI(3000), dummyDataAPI(5000)];

const promisePolyFill = (taskArray) => {
  const output = [];
  return new Promise((resolve, reject) => {
    taskArray.forEach((promise, index) => {
      promise
        .then((data) => {
          output[index] = data;
          if (index === taskArray.length - 1) resolve(output);
        })
        .catch((err) => console.log("Error", err));
    });
  });
};

// promisePolyFill(taskArray).then((data) => console.log(data));

//PolyFill of filter

Array.prototype.myFilter = function (callbackFn) {
  let output = [];
  this.forEach((item) => {
    if (callbackFn(item)) output.push(item);
  });
  return output;
};

// console.log([1, 2, 3, 4, 5, 6].myFilter((item) => item % 2));

//PolyFill of Map
Array.prototype.myMap = function (cbFn) {
  let output = [];
  this.forEach((item) => output.push(cbFn(item)));
  return output;
};

// console.log([1, 2, 3, 4].myMap((item) => item * 3));

//PolyFill of split
String.prototype.mySplit = function (delimeter = "") {
  if (delimeter.length == 0) {
    console.log("==", Array.from(this));
  } else {
    let index = this.indexOf(delimeter);

    if (index >= 0) {
      recursiveFn(this, index);
    }
  }
};

function recursiveFn(str, idx) {
  if (str.length === 0) return [];
  let output = [];
  output.push(str.substring(0, idx));
  output.push(recursiveFn(str.substring(idx)));
  return output;
}

// console.log("Anand".mySplit("n"));

const getPathFromChildToParent = (parent, child) => {
  let currentNode = child;
  const pathArray = [];
  while (currentNode !== parent) {
    const parentElement = currentNode.parentElement;
    const childrenArray = Array.from(parentElement.children);
    //[]
    pathArray.push(childrenArray.indexOf(currentNode));
    currentNode = parentElement;
  }
  return pathArray;
};

const getValueFromPath = (parent, path) => {
  let currentNode = parent;

  while (path.length) {
    console.log(currentNode, "+===+");
    currentNode = currentNode.children[path.pop()];
    console.log(currentNode, "After");
  }

  return currentNode.innerText;
};

const findNodeValue = () => {
  const rootA = document.getElementById("rootA");
  const rootB = document.getElementById("rootB");
  const nodeA = document.getElementById("nodeA");
  const path = getPathFromChildToParent(rootA, nodeA);
  console.log(getValueFromPath(rootB, path));
};
// findNodeValue();

// Polfill for setTimeout
function createSetTimeout() {
  let timeId = 1;
  let timerMap = {};

  function setTimeoutPoly(cb, delay) {
    let id = timeId++;
    timerMap[id] = true;
    let start = Date.now();
    function tiggerCallback() {
      if (!timerMap[id]) return;
      if (Date.now() > start + delay) {
        requestIdleCallback(cb);
      } else {
        tiggerCallback();
      }
    }
    tiggerCallback();
    return id;
  }

  function clearTimeoutPoly(id) {
    delete timerMap[id];
  }
  return { setTimeoutPoly, clearTimeoutPoly };
}
// const { setTimeoutPoly, clearTimeoutPoly } = createSetTimeout();
// console.log("A");
// let id = setTimeoutPoly(() => {
//   console.log("B");
// }, 1);
// clearTimeoutPoly(id);

// console.log("C");

function createInterval() {
  let intervalId = 1;
  let intervalMap = {};
  let { setTimeoutPoly, clearTimeoutPoly } = createSetTimeout();

  function setIntervalPoly(cb, delay, ...args) {
    let id = intervalId++;
    function reiterate() {
      intervalMap[id] = setTimeoutPoly(function () {
        cb.apply(this, args);
        if (intervalMap[id]) {
          reiterate();
        }
      }, delay);
    }
    reiterate();
    return id;
  }
  return { setIntervalPoly };
}

const { setIntervalPoly } = createInterval();
// console.log(setIntervalPoly);
setIntervalPoly(() => console.log("hi"), 1000);
