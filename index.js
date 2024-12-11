//Memoization
const addThree = (a,b,c) => a+b+c


const memo = (fn) =>{
        const cache = {}
    return (...args) =>{
        const argsToString = JSON.stringify(args)
        if(argsToString in cache){
            // console.log("Result frm cahce",argsToString)
            console.log("Get data from cache",argsToString)
            return cache[argsToString]
        }else{
            const result = fn.apply(this,args)
            // console.log("Resutl without from chache",argsToString)
            console.log("computing value ",argsToString)
            cache[argsToString] = result
            return result
        }
    }
}

const add = memo(addThree)


const factorial= memo((x) =>{
    if(x===1) return 1
    else return x*factorial(x-1)
})

// console.log(factorial(5))
// console.log(factorial(7))

// console.log(add(1,2,3))
// console.log(add(2,3,1))


//Flatten the Array

const arr = [[[1,2],[1.1]],[2,3],[4,[[[5,6]]]]]


const flattenArray = (arr,res) =>{
    // console.log("===",res)
    arr.forEach(item => Array.isArray(item) ? flattenArray(item,res):res.push(item))
}
let result = []
flattenArray(arr,result)
// console.log(result)


const obj = {
    'A':"Anand",
    "S":["Sakshi","sriti"],
    "H":"Hafsa",
    "K":{
        "slimgirl":"Kashish"
    },
    "cute":{
        "girl":["shreeya","sapna"],
        "harami":"poonam"
    },
    "n":"nilakshi"
    
}
const flattenObj = (obj,res) =>{
    let finalObj = {}
    for(key in obj){
        const newparent = res+key
        console.log("type",typeof key,key)
        if(typeof obj[key] === 'object')
        flattenObj(obj[key],newparent+".")
        else
        finalObj[newparent] = obj[key]
    }
    return finalObj

}

let result1 = flattenObj(obj,"")
console.log(result1)