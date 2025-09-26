#!/usr/bin/env node
/*
 CLI Employee Management System Using Node.js and Arrays
 - Uses readline for interactive input
 - Stores employees in an in-memory array for the session
 - Supports: Add, List, Remove, Exit
*/

const readline = require('readline');

// Seed some initial employees for demo
const employees = [
  { name: 'Alice', id: 'E101' },
  { name: 'Bob', id: 'E102' },
  { name: 'Charlie', id: 'E103' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log('Employee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  console.log();
  rl.question('Enter your choice: ', handleMenuSelection);
}

function handleMenuSelection(choice) {
  const c = (choice || '').trim().toLowerCase();
  switch (c) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees(() => backToMenu());
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
    case 'q':
    case 'quit':
    case 'exit':
      exitApp();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      pauseThen(showMenu);
  }
}

function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    const trimmedName = (name || '').trim();
    if (!trimmedName) {
      console.log('Name cannot be empty.');
      return pauseThen(showMenu);
    }
    rl.question('Enter employee ID: ', (id) => {
      const trimmedId = (id || '').trim();
      if (!trimmedId) {
        console.log('ID cannot be empty.');
        return pauseThen(showMenu);
      }
      // Prevent duplicates by ID
      if (employees.some((e) => e.id.toLowerCase() === trimmedId.toLowerCase())) {
        console.log(`Employee with ID ${trimmedId} already exists.`);
        return pauseThen(showMenu);
      }
      employees.push({ name: trimmedName, id: trimmedId });
      console.log(`Employee ${trimmedName} (ID: ${trimmedId}) added successfully.`);
      pauseThen(showMenu);
    });
  });
}

function listEmployees(done) {
  console.log();
  console.log('Employee List:');
  if (employees.length === 0) {
    console.log('(no employees)');
  } else {
    employees.forEach((emp, idx) => {
      console.log(`${idx + 1}. Name: ${emp.name}, ID: ${emp.id}`);
    });
  }
  if (done) done();
}

function removeEmployee() {
  rl.question('Enter employee ID to remove: ', (id) => {
    const trimmedId = (id || '').trim();
    if (!trimmedId) {
      console.log('ID cannot be empty.');
      return pauseThen(showMenu);
    }
    const index = employees.findIndex((e) => e.id.toLowerCase() === trimmedId.toLowerCase());
    if (index === -1) {
      console.log(`No employee found with ID: ${trimmedId}`);
    } else {
      const [removed] = employees.splice(index, 1);
      console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
    }
    pauseThen(showMenu);
  });
}

function pauseThen(fn) {
  setTimeout(fn, 400);
}

function backToMenu() {
  console.log();
  rl.question('Press Enter to return to menu...', () => showMenu());
}

function exitApp() {
  console.log('Goodbye!');
  rl.close();
}

// Always show the menu, even when input is piped (non-TTY)
showMenu();

// Ensure we exit when input stream closes or on Ctrl+C
rl.on('close', () => process.exit(0));
rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});
