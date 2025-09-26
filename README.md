# CLI Employee Management System (Node.js)

A simple interactive CLI app that manages employees in memory using Node.js and arrays.

## Features
- Add employee (name + ID)
- List employees
- Remove employee by ID
- In-memory only (no files/databases)

## Prerequisites
- Node.js v14+ (any modern LTS works)

## Run
```sh
npm start --prefix "$(pwd)/EXP 1"
```
Or from inside the folder:
```sh
cd "EXP 1"
npm start
```

## Usage
Follow the menu prompts:
1. Add Employee
2. List Employees
3. Remove Employee
4. Exit

The app starts with 3 sample employees: Alice (E101), Bob (E102), Charlie (E103).

## Scripted (non-interactive) examples
You can pipe a sequence of choices to quickly demo flows.

- List employees then exit:
```sh
echo -e "2\n\n4\n" | node "EXP 1/index.js"
```

- Add Daniel (E104), list, then exit:
```sh
echo -e "1\nDaniel\nE104\n2\n\n4\n" | node "EXP 1/index.js"
```

- Remove Bob (E102), list, then exit:
```sh
echo -e "3\nE102\n2\n\n4\n" | node "EXP 1/index.js"
```
