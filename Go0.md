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

- Go's syntax borrows from C, C++, Pascal, Modula, and Oberon.
- It aims to reduce typing and potential bugs.
- **Case Sensitivity:** Go is case-sensitive. Identifiers must be spelled exactly.
- **Naming Conventions:** Variable and package names are typically lowercase or camel case. Package names should be single words, all lowercase (convention).
- **Exported Names:** Exported (public) functions and fields start with an uppercase letter.
- **Semicolons:** Generally not needed; a line feed implies one and the lexer adds them.
- **Code Blocks:** Indicated by braces `{}`. The opening brace **must** be on the same line as the preceding statement.
- **Built-in Functions:** Functions from the `builtin` package (like `len`, `panic`, `recover`) are always available without explicit import. More details can be found at `golang.org/pkg/builtin`.

---

## Writing and Running Your First Go Application

To create and run a basic Go application, follow these steps:

1.  **Create the Application File:** Create a file named `hello.go` in your desired project directory (e.g., `D:\Tools\GitHub\GoGoG\Ch01\01_05b`).

2.  **Add Basic Go Code:** Inside `hello.go`, add the following code:

    ```go
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, world!")
    }
    ```

    *   `package main`: Declares the package as `main`, making it an executable program.
    *   `import "fmt"`: Imports the `fmt` package, which provides functions for formatted I/O (like printing to the console).
    *   `func main()`: The main function where program execution begins.
    *   `fmt.Println("Hello, world!")`: Prints the string "Hello, world!" followed by a newline.

3.  **Initialize a Go Module:** Open your terminal in the project directory (e.g., `D:\Tools\GitHub\GoGoG\Ch01\01_05b`) and run the following command:

    ```bash
    go mod init com.example/hello
    ```

    This command creates a `go.mod` file, which defines your module path and manages dependencies. You might see a suggestion to run `go mod tidy` afterwards; this command synchronizes the module's dependencies.

4.  **Run or Debug the Application:** You can now run the application. In VS Code, you can use the Run and Debug feature. Select `Run and Debug` from the sidebar, and VS Code should detect the Go file and provide options to run or debug. Clicking `Run and Debug` will execute the `main` function, and you will see the output "Hello, world!" in the integrated terminal or debug console. Alternatively, you can run the application directly from the terminal using `go run .`.

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

---