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

function startApp() {
    //create manager
    function createManger() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managersName',
                message: "What is the manager's name?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character.";
                }
            },
            {
                type: 'input',
                name: 'managersId',
                message: "What is the manager's Id?",
                validate: answer => {
                    const valid = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (valid) {
                        return true;
                    }
                    return "Please enter a number greater then 0";
                }
            },
            {
                type: 'input',
                name: 'managersEmail',
                message: "What is the manager's Email address?",
                validate: answer => {
                    const mail = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (mail) {
                        return true;
                    }
                    return "Please enter a valid Email address.";
                }

            },
            {
                type: 'input',
                name: 'managersOffice',
                message: "What is the manager's office number?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter an office number";

                }
            }
        ]).then(answer => {
            // console.log(answer.managersName, answer.managersId, answer.managersEmail, answer.managersOffice)
            const manager = new Manager(answer.managersName, answer.managersId, answer.managersEmail, answer.managersOffice);
            teamBuild.push(manager);
            teamId.push(answer.managersId);
            newMember();
        })
    }
    function newMember() {
        inquirer.prompt([
            {
                type: "list",
                name: "addRole",
                message: "What type of member would you like to add",
                choices: ["Engineer", "Intern", "No new memembers needed."]
            }
        ]).then(memberChoice => {
            switch (memberChoice.addRole) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateT();
            }
        });
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineName',
                message: "What is the name of your Engineer?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character";
                }
            },
            {
                type: 'input',
                name: 'engineId',
                message: "What is the Engineer's ID?",
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
                name: 'engineEmail',
                message: "Please enter the Engineer's Email address",
                validate: answer => {
                    const mail = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (mail) {
                        return true;
                    }
                    return "Please enter a valid Email address.";
                }
            },
            {
                type: 'input',
                name: 'engineGit',
                message: "What is your Engineer's Github username?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character.";
                }
            }
        ]).then(answer => {
            const engineer = new Engineer(answer.engineName, answer.engineId,answer.engineEmail, answer.engineGit);
            teamBuild.push(engineer);
            teamId.push(answer.engineId);
            newMember();
        });

    }
    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'interName',
                message: "What is the name of the Intern?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character.";
                }
            },
            {
                type: 'input',
                name: 'interId',
                message: "What is the ID of the Intern?",
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
                name: 'interEmail',
                message: "What is the Intern's Email address?",
                validate: answer => {
                    const mail = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (mail) {
                        return true;
                    }
                    return "Please enter a valid Email address.";
                }
            },
            {
                type: 'input',
                name: 'interSchool',
                message: "What university is the Intern attending?",
                validate: answer => {
                    if (answer != "") {
                        return true;
                    }
                    return "Please enter a character.";
                },
            }
        ]).then(answer => {
            const intern = new Intern(answer.interName, answer.interId, answer.interEmail, answer.interSchool);
            teamBuild.push(intern);
            teamId.push(answer.interId);
            newMember();
        });
    }
    function generateT() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        };
        return fs.writeFileSync(outputPath, render(teamBuild), "utf8")


    }
    createManger();
}
startApp();


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


//create prompts and prompt them to the use        one mnagers has 8 amount of engineers and interns = one team
//  - cretae a manager first 
//      - mangers name
//      - manahers id
//         -mangers email
//      -mangers officeNumber
// push to teambuild
// - createEngineer
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