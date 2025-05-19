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

# Using Math Operators in Go

---

Go supports a standard set of mathematical operators similar to other C-style languages:

- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Remainder (modulo): `%`
- Bitwise operators: `&`, `|`, `^`, `<<`, `>>`, etc.

## Type Consistency in Operations

A key rule in Go: **all operands in a mathematical operation must be of the same type**. Go does not perform implicit type conversion. For example, you cannot add an `int` and a `float64` directly:

```go
// This will cause a compile-time error:
// total := i1 + f2 // invalid operation: mismatched types int and float64
```

To fix this, convert one type to match the other:

```go
total := float64(i1) + f2 // Now both are float64
```

Each built-in type has a matching conversion function (e.g., `float64()`, `int()`).

## Declaring Multiple Variables

You can declare multiple variables of the same type in a single statement:

```go
i1, i2, i3 := 12, 45, 68
```

## Example: Math Operations

```go
package main

import "fmt"

func main() {
    i1, i2, i3 := 12, 45, 68
    intSum := i1 + i2 + i3
    fmt.Println("Integer sum:", intSum)

    f1, f2, f3 := 23.5, 65.1, 76.3
    floatSum := f1 + f2 + f3
    fmt.Println("Float sum:", floatSum)

    // Mixing types requires explicit conversion
    total := float64(i1) + f2
    fmt.Println("Result:", total)

    // Multiplication with conversion
    product := float64(i1) * f2
    fmt.Println("Product:", product)
}
```

## Notes

- Go does not perform implicit type conversion in math operations.
- Use explicit conversion functions to match types.
- Floating-point math may have precision issues (common in most languages).
- Try other operators (subtraction, division, remainder) on your own.
- For advanced math, see the `math` package (covered later).

---

# Using the math Package in Go

---

Go's `math` package provides mathematical constants and functions commonly used in programming, such as rounding, trigonometry, exponentiation, and more.

## Floating-Point Precision and Rounding

Floating-point values in Go (as in many languages) are stored in binary format, which can lead to precision issues. For example, adding several float values may not yield the exact decimal result you expect.

To round a floating-point value to a specific precision, you can use `math.Round`:

```go
sum = math.Round(sum*100) / 100 // Rounds to two decimal places
```

## Mathematical Constants

The `math` package includes useful constants, such as:
- `math.Pi` (the value of π)

Example:

```go
fmt.Println("The value of PI is:", math.Pi)
```

## Example: Using math Package

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    f1, f2, f3 := 23.5, 65.1, 76.3
    sum := f1 + f2 + f3
    fmt.Println("Float sum:", sum)

    // Round to two decimal places
    sum = math.Round(sum*100) / 100
    fmt.Printf("The sum is now %v\n\n", sum)

    // Use math.Pi constant
    fmt.Println("The value of PI is:", math.Pi)

    // Calculate circumference of a circle
    circleRadius := 15.5
    circumference := circleRadius * 2 * math.Pi
    fmt.Printf("Circumference: %.2f\n", circumference)
}
```

- `math.Round(x)` rounds to the nearest integer.
- To round to a specific number of decimal places, multiply, round, then divide.
- `math.Pi` provides the value of π for geometry calculations.
- Use `fmt.Printf("%.2f", value)` to format output to two decimal places.

## More Functions

The `math` package includes many other functions (abs, sqrt, pow, sin, cos, etc.). See the [Go math package documentation](https://pkg.go.dev/math) for more details.

---
