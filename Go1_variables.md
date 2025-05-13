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
