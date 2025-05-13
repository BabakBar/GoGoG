# Basic Programming Concepts and Object-Oriented Principles in Go

---

## Go's Essential Characteristics

- **Compiled Language:** Go is a compiled language. Source code is turned into an executable specific to the target operating system. Unlike Java, which compiles to platform-independent bytecode, Go executables are OS-specific.
- **Statically Typed:** All variables in Go have a specific type known at compile time. Types can be explicitly declared or inferred, but are always determined during compilation.
- **Feels Like Scripting, But Isn't:** You can run Go source files directly, but behind the scenes, Go compiles them to a temporary executable before running.
- **Statically Linked Runtime:** Go applications include a statically linked runtime in the compiled executable. This makes the executable larger, but there is no need for an external virtual machine.
- **Object-Oriented Features (with Differences):**
  - Go supports object-oriented concepts like interfaces, methods, and custom data structures (structs), which can feel similar to classes in other languages.
  - Go does **not** support type inheritance. There are no super types or subtypes, and you cannot inherit features from another type.
  - No method or operator overloading: Each function or method must have a unique name within its scope.
- **Error Handling:** Go does not have structured exception handling (no try/catch/finally). Instead, functions return error objects, and you use conditional logic to handle errors.
- **Explicit Conversions:** There are no implicit numeric conversions. All type conversions must be explicit.
- **Simplicity and Clarity:** Go avoids features that make code harder to read or more error-prone. The language is designed so that everything you need to know is visible in the code itself, with minimal hidden rules.

---

## Basic Go Syntax

Go's syntax is designed to be simple and readable, borrowing elements from languages like C, Pascal, Modula, and Oberon, while aiming to reduce verbosity and common programming errors.

- **Case Sensitivity:** Go is case-sensitive. `myVariable` is different from `MyVariable`.
- **Identifiers:** Names for functions, variables, types, etc., must be spelled precisely.
- **Naming Conventions:**
  - Variable and package names are typically lowercase or mixed case (camelCase).
  - Package names should be single words and all lowercase (a strong convention).
- **Exported Names:**
  - Identifiers starting with an **uppercase letter** is **exported** (public) and accessible from other packages.
  - Identifiers starting with a **lowercase letter** is **unexported** (private) and only accessible within their own package.
- **Semicolons:** Semicolons are generally **not required** at the end of statements. The Go lexer automatically inserts semicolons at the end of lines where appropriate. While they are part of the formal language specification, you rarely need to type them manually.
- **Code Blocks:** Defined by curly braces `{}`. Similar to C and Java.
- **Opening Brace Placement:** The opening brace `{` for a code block **must** be on the **same line** as the preceding control statement (e.g., `if`, `for`, `func`). This rule is related to the automatic semicolon insertion.

    ```go
    if x > 0 { // Correct: Brace on the same line
        fmt.Println("Positive")
    }
    // Incorrect:
    // if x < 0
    // { // Go inserts a semicolon after '0', causing a syntax error
    //     fmt.Println("Negative")
    // }
    ```

- **Built-in Functions:** Go provides a set of pre-declared functions and types in the `builtin` package. These are always available without needing an explicit `import`. Examples include `len()` (length), `panic()` (stop execution), and `recover()` (manage panicking goroutines).
  - Detailed documentation for built-in functions is available at [`golang.org/pkg/builtin`](https://golang.org/pkg/builtin).

Go enforces these rules to maintain code consistency and prevent certain classes of errors.

---

## Writing and Running Your First Go Application

To create and run a basic Go application, follow these steps:

1. **Create the Application File:** Create a file named `hello.go` in your desired project directory (e.g., `D:\Tools\GitHub\GoGoG\Ch01\01_05b`).

2. **Add Basic Go Code:** Inside `hello.go`, add the following code:

    ```go
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, world!")
    }
    ```

    - `package main`: Declares the package as `main`, making it an executable program.
    - `import "fmt"`: Imports the `fmt` package, which provides functions for formatted I/O (like printing to the console).
    - `func main()`: The main function where program execution begins.
    - `fmt.Println("Hello, world!")`: Prints the string "Hello, world!" followed by a newline.

3. **Initialize a Go Module:** Open your terminal in the project directory (e.g., `D:\Tools\GitHub\GoGoG\Ch01\01_05b`) and run the following command:

    ```bash
    go mod init com.example/hello
    ```

    This command creates a `go.mod` file, which defines your module path and manages dependencies. You might see a suggestion to run `go mod tidy` afterwards; this command synchronizes the module's dependencies.

4. **Run or Debug the Application:** You can now run the application. In VS Code, you can use the Run and Debug feature. Select `Run and Debug` from the sidebar, and VS Code should detect the Go file and provide options to run or debug. Clicking `Run and Debug` will execute the `main` function, and you will see the output "Hello, world!" in the integrated terminal or debug console. Alternatively, you can run the application directly from the terminal using `go run .`.

---

## Building an Executable Application

While you can run Go source files directly using `go run`, you need to build an executable file to distribute your application.

1. **Build the Executable:** Use the `go build` command followed by the name of your source file (e.g., `hello.go`). Navigate to the directory containing your Go file in the terminal (e.g., `D:\Tools\GitHub\GoGoG\Ch01\01_06b`) and run:

    ```bash
    go build hello.go
    ```

2. **Resulting Executable:** This command compiles the source code and creates an executable file in the current directory.
    - On **Windows**, the executable will have a `.exe` extension (e.g., `hello.exe`).
    - On **Mac** and **Linux**, it will have no file extension (e.g., `hello`).
    - The executable is operating system specific and includes the statically linked Go runtime.

3. **Run the Executable:** You can run the compiled executable directly from the terminal. For example, on Mac/Linux:

    ```bash
    ./hello
    ```

    On Windows, you would typically just type the executable name:

    ```bash
    hello.exe
    ```

4. **Control Output Name:** You can specify the name of the output executable using the `-o` flag:

    ```bash
    go build -o helloworld hello.go
    ```

    This will create an executable named `helloworld` (or `helloworld.exe` on Windows).

Note: For applications with multiple source files, setting up Go workspaces might be necessary in more complex projects, but is not required for basic examples.

---

---

## Variables and Constants

In Go, you use variables to store values that can change during program execution and constants for values that remain fixed.

- **Variables:** Declared using the `var` keyword.
  - Can be declared with or without an initial value.
  - If no initial value is provided, variables are assigned their type's **zero value** (e.g., `0` for numeric types, `""` for strings, `false` for booleans).
  - Go can infer the type if an initial value is given.
  - Multiple variables can be declared together.
  - Inside functions, you can use the **short declaration operator** `:=` to declare and initialize a variable with type inference. This operator cannot be used outside functions or for constants.

    ```go
    var name string = "Roo" // Explicit type and value
    var age int             // Declared, will get zero value (0)
    city := "Paris"         // Short declaration (within a function)
    ```

- **Constants:** Declared using the `const` keyword.
  - Values are fixed at compile time and cannot be changed during execution.
  - Must be initialized when declared.
  - Can be declared with or without an explicit type (type inference is common).
  - Multiple constants can be declared together.

    ```go
    const Pi = 3.14 // Type inferred as float64
    const Gravity float64 = 9.81 // Explicit type
    ```

- **Important:** Variables or constants that are declared but not used will result in a compile-time error.

---

## Package, Import, and Export

Go code is organized into **packages**.

- **Package Declaration:** Every Go source file must belong to a package, declared with the `package` keyword at the beginning of the file.
  - Executable programs must use the `package main` declaration.
  - Other packages are typically named after the directory they reside in.
  - Package names should be single words, all lowercase (convention).

    ```go
    package main // For an executable program
    // or
    package utils // For a utility package
    ```

- **Importing Packages:** To use code from another package, you must `import` it.
  - Use the `import` keyword followed by the package path (usually a string literal).
  - Multiple imports can be grouped in parentheses.

    ```go
    import "fmt" // Import the fmt package
    // or
    import (
        "fmt"
        "net/http" // Import multiple packages
    )
    ```

- **Exporting Identifiers:** Go uses capitalization to control the visibility of identifiers (variables, constants, functions, types, methods).
  - An identifier starting with an **uppercase** letter is **exported** (public) and can be accessed from outside its package.
  - An identifier starting with a **lowercase** letter is **unexported** (private) and can only be accessed from within its own package.

    ```go
    func ExportedFunction() { ... } // Can be called from other packages
    var exportedVariable int         // Can be accessed from other packages

    func unexportedFunction() { ... } // Only accessible within the same package
    const unexportedConstant = "private" // Only accessible within the same package
    ```

---

## 1. Basic Programming Concepts

### a) Variables

Variables are named storage locations for values. In Go, variables must be declared with a specific type, although Go can infer the type in many cases.

**Example:**

```go
var age int = 30
name := "Alice" // type inferred as string
```

- `var age int = 30`: Explicit declaration of an integer variable.
- `name := "Alice"`: Shorthand declaration with type inference.

### b) Functions

Functions are reusable blocks of code that perform specific tasks. They can take parameters and return results.

**Example:**

```go
func Add(a int, b int) int {
    return a + b
}
result := Add(2, 3) // result is 5
```

- `Add` takes two integers and returns their sum.

### c) Methods

Methods are functions associated with a specific type (often a struct). In Go, methods are defined with a receiver.

**Example:**

```go
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}
```

- `Area` is a method on the `Circle` type.

### d) Conditionals

Conditionals (like `if`, `else`, and `switch`) allow programs to make decisions based on certain conditions.

**Example:**

```go
if age >= 18 {
    fmt.Println("Adult")
} else {
    fmt.Println("Minor")
}
```

- The program prints "Adult" if `age` is 18 or higher; otherwise, it prints "Minor".

---

## 2. Object-Oriented Principles in Go

Go is not a traditional object-oriented language, but it supports many OOP principles using its own idioms.

### a) Encapsulation

**Definition:**  
Encapsulation is the bundling of data (fields) and methods that operate on that data within one unit (usually a struct), and restricting access to some of the object's components.

**In Go:**  

- Encapsulation is achieved by using `struct` types and controlling visibility using uppercase (exported/public) and lowercase (unexported/private) names.
- Fields and methods starting with an uppercase letter are **exported** (public), while those starting with a lowercase letter are **unexported** (private).

**Example:**

```go
type person struct {
    name string // private (unexported)
    Age  int    // public (exported)
}

func (p *person) SetName(n string) {
    p.name = n
}

func (p person) Name() string {
    return p.name
}
```

- `name` is private to the package.
- `Age` is accessible outside the package.
- Getter/setter methods can provide controlled access.

### b) Polymorphism

**Definition:**  
Polymorphism allows objects of different types to be treated through a common interface, enabling code to be more flexible and extensible.

**In Go:**  

- Go achieves polymorphism through **interfaces** rather than inheritance.
- An interface specifies a set of method signatures. Any type that implements those methods satisfies the interface.

**Example:**

```go
type Shape interface {
    Area() float64
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func printArea(s Shape) {
    fmt.Println(s.Area())
}
```

- Both `Rectangle` and `Circle` implement the `Shape` interface.
- `printArea` can accept any type that fulfills the `Shape` interface, demonstrating polymorphism.

---

## 3. Key Takeaways

- **Variables** store data; **functions** encapsulate reusable logic.
- **Methods** in Go are functions tied to types, typically structs.
- **Conditionals** control the flow based on logic.
- **Encapsulation** in Go is managed by structs and visibility rules (capitalization).
- **Polymorphism** is achieved through interfaces, not inheritance. Any type satisfying an interface’s methods can be used polymorphically.

Go’s distinct approach to OOP means you use **composition** (structs and interfaces) rather than classes and inheritance to create modular, reusable, and flexible code.
