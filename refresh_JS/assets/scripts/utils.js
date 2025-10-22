/*export default "hola exported";
export const abc = "abc exported";
export const def = "def exported"; Diferntes forma de expotar*/

//Declaracion de un objeto con propiedades y métodos
/*const user = {
    name: "Elisa",
    age: 30,
    greet() {
        console.log("Hello!");
        console.log(this.name);
    }
}

console.log(user.name);
user.greet();*/ //Llamada al método del objeto


//Declaracion de una clase con constructor y métodos
/*class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    greet(){
        console.log("Hello from class!");
        console.log(this.name);
    }
}

const user1 = new User("Carlos", 25);
console.log(user1.name);
user1.greet();*/ //Llamada al método de la clase

//Uso de findIndex para encontrar el índice de un elemento en un array con arrow function
/*const hobbies = ["Reading", "Traveling", "Cooking"];

const index = hobbies.findIndex(hobbie => hobbie === "Traveling");
console.log(index);*/

//Uso de map para crear un nuevo array con modificaciones a los elementos originales usando arrow function
/*const editedHobbies = hobbies.map(hobbie => hobbie + "!");
console.log(editedHobbies);*/


//Otra forma de usar map para crear un array de objetos a partir de un array de strings con arrow function
/*const editedHobbies2 = hobbies.map(hobbie => ({ text: hobbie }));
console.log(editedHobbies2);*/


//const [firstName, lastName] = ["John", "Doe"]; //Desestructuración de arrays


//const { title, author } = { title: "1984", author: "George Orwell" }; //Desestructuración de objetos


//Uso de setTimeout para ejecutar funciones después de un retraso
function handleTimeOut1() {
    console.log("Time out!");
}

const handleTimeOut2 = () => {
    console.log("Time out arrow function!");
};

setTimeout(handleTimeOut1, 2000); //Llamada a función después de 2 segundos
setTimeout(handleTimeOut2, 3000); //Llamada a arrow function después de 3 segundos
setTimeout(() => {
    console.log("Time out anonymous arrow function!");
}, 4000); //Llamada a arrow function anónima después de 4 segundos




//Función que recibe otra función como argumento y la ejecuta
function greeter(greeterFn) {
    greeterFn();
}

greeter(() => {
    console.log("Hello from greeter!");
}); //Llamada a función con arrow function anónima como argumento