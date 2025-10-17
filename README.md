# Windowsify Paths

A Visual Studio Code extension that adds commands to copy file paths in Windows format (with backslashes).

## Features

This extension adds two new commands to the editor tab context menu:

- **Copy Windows Path**: Copies the absolute file path with Windows-style backslashes (`\`)
- **Copy Windows Relative Path**: Copies the relative file path (from workspace root) with Windows-style backslashes (`\`)

These commands are useful when you need to share or use file paths in Windows environments, where backslashes are the standard path separator.

## Usage

1. Right-click on any editor tab
2. Select either:
   - "Copy Windows Path" for the full path
   - "Copy Windows Relative Path" for the workspace-relative path
3. The path is copied to your clipboard in Windows format

You can also access these commands from the Command Palette (Ctrl+Shift+P):

- Type "Copy Windows Path"
- Type "Copy Windows Relative Path"

## Example

If your file is located at: `/c:/Projects/my-app/src/components/Button.tsx`

- **Copy Windows Path** will copy: `c:\Projects\my-app\src\components\Button.tsx`
- **Copy Windows Relative Path** will copy: `src\components\Button.tsx`

## Installation

### From Source

1. Clone or download this repository
2. Open the folder in VS Code
3. Run `npm install` to install dependencies
4. Press F5 to launch the extension in a new Extension Development Host window
5. Test the extension by right-clicking on any editor tab

### Package and Install

1. Install vsce: `npm install -g @vscode/vsce`
2. Package the extension: `vsce package`
3. Install the generated `.vsix` file: Extensions → Install from VSIX...

## Requirements

- Visual Studio Code version 1.80.0 or higher

## License

MIT
