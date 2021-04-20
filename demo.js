const people = {
    age: 18
}
Object.seal(people)
delete people.age
people.name = 'JJ'
people.age = 29
console.log(people)// { age: 29 }