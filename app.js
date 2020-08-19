const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamBuild = [];
const teamId = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//Global Varibles
// teamArray=[]


//create prompts and prompt them to the use        one mnagers has 8 amount of engineers and interns = one team
//  - cretae a manager first 
//      - mangers name
//      - manahers id
//         -mangers email
//      -mangers officeNumber
//var manager = new Manager(anser.name, answer.id)
// push to teamArray

// - create Engineer
//      - engineer name
//      - engineer id
//         -engineer email
//      - engineer github name
//  -create intern
//      - intern name
//      - intern id
//         -intern email
//      - what school did you attend




// After we are done creating employees
// want to create our team
//      - by calling the render function and passsing an 'array' as an argument , what should be returned is an HTML template
// use fs pckg to create to OUTPUT dir
//With HTML templ. we are going to create team.html file


function startApp() {

    //function to create manager
    function createManger() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managersName',
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character";
                }
            },
            {
                type: 'input',
                name: 'managersId',
                message: "What is your manager's Id?",
                validate: answer => {
                    const valid = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (valid) {
                        return true;
                    }
                    return "Please enter a number gretaer then 0";
                }
            },
            {
                type: 'input',
                name: 'managersEmail',
                message: "What is your manager's Email address?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter an Email address";
                },
            },
            {
                type: 'input',
                name: 'managersOffice',
                message: "What is your manager's office number?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter an office number";


                }
            }
        ]).then(answers => {
            const newManager = new Manager(value.name, value.managersId, value.managersEmail, value.managersOffice)

                    //console.log(answers.managersName, answers.managersId, answers.managersEmail, answers.managersOffice)
                })

    }
    createManger()
}
startApp();

// function addMembers() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "teamMemeber",
//             choices: ["Engineer", "Intern", "No more members need to be added"],
//             message: "What role do you want to add to your team?",
//         }
//     ])
// }
// addMembers();

//   functio to decide who to crerate or stop created (switch case)

//     function for create engineer
//     funct for creater intern
// function addEmployee() {
//     inquirer.prompt({
//         type: "list",
//         choices: ["Engineer", "Intern", "DONE"],
//         name: "adding",


//     })
// }
// addEmployee();


