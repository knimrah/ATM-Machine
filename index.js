#! /usr/bin/env node
import inquirer from "inquirer";
// set account balance and user PIN.
let accountBalance = 50000;
const userPin = 4130;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin code",
        type: "number",
    },
]);
// when the PIN is correct the machine will further proceed to ask account type.
if (pinAnswer.pin === userPin) {
    console.log("Correct P.I.N code!!! You may proceed.");
    let operationAns = await inquirer.prompt([
        {
            name: "operationType",
            message: "Select your account type",
            type: "list",
            choices: ["Current", "Savings"],
        },
    ]);
    // When the you select the account type the machine will show the options to continue.
    let operationAns2 = await inquirer.prompt([
        {
            name: "actions",
            type: "list",
            message: "Please select one option.",
            choices: [
                "Fast Cash",
                "Cash Withdrawals",
                "Account balance Check",
                "Transfer of funds",
            ],
        },
    ]);
    // fast cash method
    if (operationAns2.actions === "Fast Cash") {
        let fastCash = await inquirer.prompt([
            {
                name: "action1",
                type: "list",
                message: "Please select what amount you would like to withdraw",
                choices: [1000, 2000, 5000, 10000, 20000],
            },
        ]);
        let withdrawalAmount = fastCash.action1;
        if (withdrawalAmount <= accountBalance) {
            accountBalance -= withdrawalAmount;
            console.log(`Your remaining account balance is ${accountBalance}`);
        }
        else {
            console.log("Insufficient Funds");
        }
    }
    // cash withdrawal method
    if (operationAns2.actions === "Cash Withdrawals") {
        let withdraw = await inquirer.prompt([
            {
                name: "action2",
                type: "number",
                message: "Please enter the amount would you like to withdraw",
            },
        ]);
        if (withdraw.action2 > accountBalance) {
            console.log("Insufficient Funds");
        }
        else {
            accountBalance -= withdraw.action2;
            console.log(`You have withdrawn ${withdraw.action2}\nYour remaining account balance is ${accountBalance}`);
        }
    }
    // check account balance
    if (operationAns2.actions === "Account balance Check") {
        console.log(`Your account balance is: ${accountBalance}`);
    }
    if (operationAns2.actions === "Transfer of funds") {
        let transferFunds = await inquirer.prompt([
            {
                name: "action3",
                type: "number",
                message: "Please enter the amount would you like to transfer",
            },
        ]);
        if (transferFunds.action3 > accountBalance) {
            console.log("Insufficient Funds");
            // Transfer of funds
        }
        else {
            let recipient = await inquirer.prompt({
                name: "recipient",
                type: "input",
                message: "Please enter the recipient's account name:",
            });
            console.log(`Transferred ${transferFunds.action3} to ${recipient.recipient} successfully.`);
            accountBalance -= transferFunds.action3;
            console.log(`Your remaining account balance is ${accountBalance}`);
        }
    }
}
else {
    console.log("Invalid P.I.N");
}
