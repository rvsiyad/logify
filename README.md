# Logify

Logify makes debugging JavaScript objects easier by inserting `console.dir` statements with full depth and colors.

## ✨ Features

- Quickly insert `console.dir(obj, { depth: null, colors: true })`
- Helps inspect deeply nested structures
- Works with selected text or auto-generates a variable reference

## 💡 Usage

Select a variable and run **Logify: Insert console.dir** from the Command Palette.

Or keyboard shortcuts! Logify is bound to:

- **macOS**: <kbd>Ctrl</kbd>+<kbd>Option</kbd>+<kbd>L</kbd>
- **Windows/Linux**: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd>

## 📸 Screenshots

_Add a GIF or image showing it in action_

## 🛠️ Requirements

None — works out of the box with JavaScript.

## ⚙️ Extension Settings

Logify provides the following setting to customize logging behavior:

| Setting                               | Description                                                                                           | Default |
|---------------------------------------|-------------------------------------------------------------------------------------------------------|---------|
| `logify.enableDescriptiveLogging`     | If enabled, Logify will prepend a descriptive `console.log` statement (including the variable name) before the `console.dir` output. | `false` |

### Changing Settings in the UI

1. Open **Command Palette** (`Cmd/Ctrl + Shift + P`)
2. Choose **Preferences: Open Settings (UI)**
3. Search for **Logify**
4. Toggle **Enable Descriptive Logging** on or off

## 🚀 Release Notes

### 1.0.1
- Fixed indentation of inserted `console.log` and `console.dir` statements to match the highlighted line’s whitespace
- Ensured that logs inserted on the last line always appear on a new line (no concatenation with code)

### 1.0.0
- Initial release of Logify 🎉

## Repository

Source code and issue tracking:
👉 [github.com/rvsiyad/logify](https://github.com/rvsiyad/logify)
