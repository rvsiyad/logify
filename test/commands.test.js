'use strict'

const { it, describe, before, afterEach } = require('mocha')

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vscode = require('vscode')

describe('Commands', function () {
  let tempWorkspacePath

  before(async function () {
    // Set up a clean workspace before each test
    console.log("log 1: Before commands.js test execution is running")

    tempWorkspacePath = path.join(__dirname, 'tempWorkspace')

    if (!fs.existsSync(tempWorkspacePath)) {
      fs.mkdirSync(tempWorkspacePath)
    }

    // Constructs a new file path for a file
    const workspaceFolder = vscode.Uri.file(tempWorkspacePath)
    vscode.workspace.updateWorkspaceFolders(0, null, { uri: workspaceFolder })

    // Create a new .js file and add content
    const document = await vscode.workspace.openTextDocument({
      content: 'const variableOne = 42\n\nconst variableTwo = 24\n//This is a comment\n//This is another comment',
      language: 'javascript'
    })

    await vscode.window.showTextDocument(document)

    console.log("log 2: Before commands.js test execution finished running")
  })

  afterEach(function () {
    // Clean up the workspace after each test
    return new Promise((resolve, reject) => {
      if (fs.existsSync(tempWorkspacePath)) {
        fs.rmdir(tempWorkspacePath, (err) => {
          if (err) reject(err)
          resolve()
        })
      } else {
        resolve()
      }
    })
  })

  describe('addConsole() command', function () {
    describe('when there is no content surrounding the variable', function () {
      it('adds a console underneath the highlighted variable', async function () {
        console.log("Before commands.js test execution is running")
        // Select the highlighted variable
        const editor = vscode.window.activeTextEditor
        editor.selection = new vscode.Selection(0, 6, 0, 17)

        await vscode.commands.executeCommand('logify.addConsole')

        const result = await editor.document.getText()

        assert.strictEqual(result, 'const variableOne = 42\nconsole.dir(variableOne, { depth: null, color: true })\n\nconst variableTwo = 24\n//This is a comment\n//This is another comment')
      })
    })

    describe('when there is content surrounding the variable', function () {
      it('adds a console underneath the highlighted variable with the content directly underneath', async function () {
        // Select the highlighted variable
        const editor = vscode.window.activeTextEditor
        editor.selection = new vscode.Selection(3, 6, 3, 17)

        // Execute the command and wait 0.2 seconds as the tests are running too fast
        await vscode.commands.executeCommand('logify.addConsole')
        await new Promise(resolve => setTimeout(resolve, 200))

        const result = await editor.document.getText()

        // Check if the console is added in the correct location
        const expectedText = 'const variableOne = 42\nconsole.dir(variableOne, { depth: null, color: true })\n\nconst variableTwo = 24\nconsole.dir(variableTwo, { depth: null, color: true })\n//This is a comment\n//This is another comment'

        assert.strictEqual(result, expectedText)
      })
    })
  })
})
