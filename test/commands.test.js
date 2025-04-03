'use strict'

const { it, describe, before, beforeEach, afterEach } = require('mocha')

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vscode = require('vscode')

describe('Commands', function () {
  let tempWorkspacePath

  beforeEach(async function () {
    // Create the temporary workspace folder
    tempWorkspacePath = path.join(__dirname, 'tempWorkspace')

    if (!fs.existsSync(tempWorkspacePath)) {
      fs.mkdirSync(tempWorkspacePath)
    }

    // Constructs a new file path for a file
    const workspaceFolder = vscode.Uri.file(tempWorkspacePath)
    await vscode.workspace.updateWorkspaceFolders(0, null, { uri: workspaceFolder })
  })

  afterEach(function () {
    if (!fs.existsSync(tempWorkspacePath)) {
      fs.rmdir(tempWorkspacePath)
    }


  })

  describe('addConsole() command', function () {
    describe('when a file has only the variable', function () {
      before(async function () {
        // Create a new .js file and add content
        const document = await vscode.workspace.openTextDocument({
          content: 'const myVariable = 42',
          language: 'javascript'
        })

        await vscode.window.showTextDocument(document)
      })

      it('Adds a console underneath the highlighted variable', async function () {
        // Select the highlighted variable
        const editor = vscode.window.activeTextEditor
        editor.selection = new vscode.Selection(0, 6, 0, 16)

        await vscode.commands.executeCommand('logify.addConsole')

        const result = editor.document.getText()

        assert.strictEqual(result, 'const myVariable = 42\nconsole.dir(myVariable, { depth: null, color: true })')
      })
    })
  })
})