console.log('hello')

let data = []
let data2 = [
             {'1':{name:'name',pass:'pass',}},
             {'2':{a:'a',b:'b',}}
            ]
for(let i=0;i<5;i++){
    data.push({name:"name",pass:'pass'})
}
console.log(data)

for(let i in Object.keys(data2)){
    console.log(i)
    console.log(data2[i])
}