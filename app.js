const connection = require("./assets/connection");
const inquirer = require("inquirer")

console.log('test')


inquirer.prompt(
    
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Update Department",
            "Update Employee Role",
            "Update Employee",
            "Review Status",
            "Exit",
        ]
    }
  
).then(() => {
    console.log('works?')
})