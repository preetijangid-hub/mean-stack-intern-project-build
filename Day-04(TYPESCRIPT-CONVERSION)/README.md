# Day 04 - TypeScript Conversion

## Objective

Convert an existing JavaScript module into **Strict TypeScript** by:

- Adding type annotations
- Removing implicit `any`
- Using interfaces
- Using type aliases
- Using enums
- Using generic functions
- Defining parameter and return types

---

## Folder Structure

```
Day-04(TYPESCRIPT-CONVERSION)

│── script.js
│── script.ts
│── tsconfig.json
└── README.md
```

---

## Concepts Used

- TypeScript
- Type Alias
- Union Type
- Interface
- Enum
- Generic Function
- Function Parameter Types
- Function Return Types
- Strict Mode
- tsconfig.json

---

## Files

### script.js
Original JavaScript module.

### script.ts
Strict TypeScript version of the JavaScript module.

### tsconfig.json
TypeScript compiler configuration.

### README.md
Project documentation.

---

## How to Run

1. Install TypeScript

```
npm install -g typescript
```

2. Open the project folder.

3. Compile the TypeScript file

```
tsc
```

4. The compiled JavaScript file will be generated in the **dist** folder.

5. Run the generated JavaScript file

```
node dist/script.js
```

---

## Sample Output

```
1 | Preeti | 22 | Mean Stack | Active
2 | Rahul | 21 | Data Science | Active
3 | Anjali | 23 | AI & ML | Active
```

---

## Learning Outcomes

- Learned how to convert JavaScript into TypeScript.
- Used strict typing to improve code quality.
- Implemented interfaces, enums, type aliases, and generics.
- Removed implicit `any` types.
- Configured TypeScript using `tsconfig.json`.

