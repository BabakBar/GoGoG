# Manage Variables Values

---

## Go's Variable Types

Go is a statically typed language, meaning each variable has a fixed type determined at compile time. Types can be assigned explicitly or implicitly.

- **Declaration:**
  - Variables are declared using the `var` keyword.
  - Constants are declared using the `const` keyword.
  - Inside functions, the short declaration operator `:=` can be used for implicit typing.

- **Typing:**
  - **Explicit:** Specify the type directly using the `var` or `const` keyword followed by the variable name and type.
        ```go
        var age int = 42
        const Pi float64 = 3.14
        ```
  - **Implicit:** The compiler infers the type from the initial value using the `var` or `const` keyword without a type, or the `:=` operator.
        ```go
        var name = "This is Go." // inferred as string
        city := "Paris"          // inferred as string (using :=)
        const Greeting = "Hello" // inferred as string
        ```

- **Zero Values:** If a variable is declared without an initial value, it is assigned its type's default "zero value" (e.g., 0 for numbers, "" for strings, false for booleans).

- **Constants:** Values declared with `const` cannot be changed after initialization.

- **Built-in Data Types:** Go includes several built-in types:
  - **Boolean:** `bool` (`true` or `false`).
  - **String:** `string`.
  - **Integers:** Signed (`int`, `int8`, `int16`, `int32`, `int64`) and unsigned (`uint`, `uint8`, `uint16`, `uint32`, `uint64`, `byte`, `uintptr`).
    - Numeric value in the name indicates the number of bits.
    - `byte` is an alias for `uint8`.
    - `int` and `uint` are type aliases whose size (32 or 64 bits) depends on the underlying operating system and architecture.
  - **Floating-Point:** `float32`, `float64`. Numeric value indicates the number of bits.
  - **Complex Numbers:** `complex64`, `complex128` (composed of real and imaginary parts).

- **Other Types:** Go also supports collection types and organizational types:
  - **Data Collections:** Arrays, slices, maps, structs.
  - **Language Organization:** Functions (can be passed as arguments), interfaces, channels, pointers (reference memory addresses).

Remember that declared but unused variables or constants will cause a compile-time error in Go.

---

## Output Text to the Console

Go uses the `fmt` package to print text and values to the console. The `fmt` package provides several functions for output, including:

- `fmt.Print()`: Prints text or values without a newline.
- `fmt.Println()`: Prints text or values followed by a newline.
- `fmt.Printf()`: Prints formatted text using verbs (placeholders).

### Importing the fmt Package

To use these functions, import the package at the top of your Go file:

```go
import "fmt"
```

### Basic Printing

You can print strings and variables:

```go
str1 := "The quick red fox"
str2 := "jumped over"
str3 := "the lazy brown dog."
fmt.Println(str1, str2, str3)
// Output: The quick red fox jumped over the lazy brown dog.
```

### Printing Numeric Values

You can print numbers the same way:

```go
aNumber := 42
fmt.Println("The value is", aNumber)
// Output: The value is 42
```

### Return Values from Print Functions

The print functions return two values: the number of bytes written and an error (if any):

```go
stringLength, err := fmt.Println("The value is", aNumber)
if err == nil {
    fmt.Println("String length:", stringLength)
}
```

### Formatted Output with Printf

Use `fmt.Printf()` for formatted output. Placeholders (verbs) are used for variable values:

- `%v`: Value in default format
- `%T`: Type of the value
- `\n`: Newline character

Example:

```go
fmt.Printf("Value of number: %v\n", aNumber) // Output: Value of number: 42
fmt.Printf("Data type: %T\n", aNumber)       // Output: Data type: int
```

### More Information

For more details and formatting options, see the official documentation: https://pkg.go.dev/fmt

---

# Get Input from the Console

---

Go provides several ways to get input from the user. The most common approach for reading input from the console is to use a reader object from the `bufio` package, which can read input from various sources, including the console, files, and variables.

## Using bufio.NewReader and os.Stdin

To read input from the console, you can create a new reader object using `bufio.NewReader` and pass `os.Stdin` as the argument. This sets up the reader to get input from the console.

```go
reader := bufio.NewReader(os.Stdin)
```

## Reading a String from the User

To prompt the user and read a string:

```go
fmt.Print("Enter a text: ")
str, _ := reader.ReadString('\n')
fmt.Println(str)
```

- `fmt.Print` displays a prompt.
- `reader.ReadString('\n')` reads input until the user presses Enter (newline character). It returns the string and an error object. If you want to ignore the error, use `_`.
- `fmt.Println` outputs the entered string.

## Reading a Number from the User

To read a number, prompt the user and parse the input:

```go
fmt.Print("Enter a number: ")
str, _ = reader.ReadString('\n')
f, err := strconv.ParseFloat(strings.TrimSpace(str), 64)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("value of number:", f)
}
```

- Prompt the user for a number.
- Read the input as a string.
- Use `strings.TrimSpace` to remove any leading/trailing whitespace.
- Use `strconv.ParseFloat` to convert the string to a floating-point number (64-bit precision).
- Check for errors: if parsing fails, print the error; otherwise, print the value.

## Notes on Variable Declaration

- Use `:=` for declaring new variables with implicit typing.
- Use `=` to assign a new value to an already declared variable.
- The `ReadString` function returns two values: the input string and an error object. If you don't need the error, use `_`.

## Example: Complete Input Program

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter a text: ")
    str, _ := reader.ReadString('\n')
    fmt.Println(str)

    fmt.Print("Enter a number: ")
    str, _ = reader.ReadString('\n')
    f, err := strconv.ParseFloat(strings.TrimSpace(str), 64)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("value of number:", f)
    }
}
```

## Additional Notes

- If you enter a value that cannot be parsed as a number, you will see an error message (e.g., "invalid syntax").
- There are other ways to get input, such as using scan functions, but those require pointers and will be covered later.

---
