'use strict'

const { it, describe, before, afterEach } = require('mocha')

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vscode = require('vscode')

describe('Commands', function () {
  let tempWorkspacePath

  before(async function () {
    console.log("log 1: Before commands.js test execution is running")

    tempWorkspacePath = path.join(__dirname, 'tempWorkspace')

    console.log("log 2: After tempWorkspacePath")

    if (!fs.existsSync(tempWorkspacePath)) {
      fs.mkdirSync(tempWorkspacePath)
    }

    console.log("log 3: After creating directory")

    try {
      // Wait for the workspace to be ready
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create a new .js file and add content
      const document = await vscode.workspace.openTextDocument({
        content: 'const variableOne = 42\n\nconst variableTwo = 24\n//This is a comment\n//This is another comment',
        language: 'javascript'
      })

      console.log("log 5: After creating the .js file")

      const editor = await vscode.window.showTextDocument(document, { preview: false, preserveFocus: false })

      console.log("log 6: After opening the text document")

      // Ensure the editor is ready before moving on
      await new Promise(resolve => setTimeout(resolve, 500))

      if (!editor) {
        throw new Error("Failed to open text document in the editor")
      }

      console.log("log 7: Before commands.js test execution finished running")
    } catch (error) {
      console.error("Error in before hook:", error)
      throw error
    }
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
