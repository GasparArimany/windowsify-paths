import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Converts a path to Windows format (with backslashes)
 */
function toWindowsPath(filePath: string): string {
  // Replace forward slashes with backslashes
  return filePath.replace(/\//g, '\\');
}

/**
 * Gets the relative path from workspace root to the file
 */
function getRelativePath(filePath: string): string | null {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return null;
  }

  // Try to find the workspace folder that contains this file
  for (const folder of workspaceFolders) {
    const folderPath = folder.uri.fsPath;
    if (filePath.startsWith(folderPath)) {
      return path.relative(folderPath, filePath);
    }
  }

  // If not in any workspace folder, use the first workspace folder
  return path.relative(workspaceFolders[0].uri.fsPath, filePath);
}

/**
 * Copies the Windows-formatted absolute path to clipboard
 */
async function copyWindowsPath(uri?: vscode.Uri) {
  let filePath: string | undefined;

  if (uri) {
    // Called from context menu with URI
    filePath = uri.fsPath;
  } else {
    // Called from command palette, use active editor
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      filePath = activeEditor.document.uri.fsPath;
    }
  }

  if (!filePath) {
    vscode.window.showWarningMessage('No file selected');
    return;
  }

  const windowsPath = toWindowsPath(filePath);
  await vscode.env.clipboard.writeText(windowsPath);
  vscode.window.setStatusBarMessage(`Copied: ${windowsPath}`, 3000);
}

/**
 * Copies the Windows-formatted relative path to clipboard
 */
async function copyWindowsRelativePath(uri?: vscode.Uri) {
  let filePath: string | undefined;

  if (uri) {
    // Called from context menu with URI
    filePath = uri.fsPath;
  } else {
    // Called from command palette, use active editor
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      filePath = activeEditor.document.uri.fsPath;
    }
  }

  if (!filePath) {
    vscode.window.showWarningMessage('No file selected');
    return;
  }

  const relativePath = getRelativePath(filePath);
  if (!relativePath) {
    vscode.window.showWarningMessage('File is not in workspace');
    return;
  }

  const windowsPath = toWindowsPath(relativePath);
  await vscode.env.clipboard.writeText(windowsPath);
  vscode.window.setStatusBarMessage(`Copied: ${windowsPath}`, 3000);
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Windowsify Paths extension is now active');

  // Register the copy Windows path command
  const copyPathDisposable = vscode.commands.registerCommand(
    'windowsify-paths.copyWindowsPath',
    copyWindowsPath
  );

  // Register the copy Windows relative path command
  const copyRelativePathDisposable = vscode.commands.registerCommand(
    'windowsify-paths.copyWindowsRelativePath',
    copyWindowsRelativePath
  );

  context.subscriptions.push(copyPathDisposable);
  context.subscriptions.push(copyRelativePathDisposable);
}

export function deactivate() {}
