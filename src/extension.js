'use strict'

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { addConsole } = require('./commands')

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is execute
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Main command that adds console.dir
	const addConsoleCommand = vscode.commands.registerCommand('logify.addConsole', function () {
		addConsole()
	})

	// Toggles the boolean setting "logify.showVariableNameLog"
	const toggleShowVariableNameLog = vscode.commands.registerCommand('logify.toggleShowVariableNameLog', async () => {
		const config = vscode.workspace.getConfiguration('logify')
		const isEnabled = config.get('enableDescriptiveLog', false)

		await config.update('enableDescriptiveLog', !isEnabled, vscode.ConfigurationTarget.Global)

		vscode.window.showInformationMessage(
			`Descriptive console log is now ${!isEnabled ? 'enabled' : 'disabled'}`
		)
	})

	// Register all commands
	context.subscriptions.push(addConsoleCommand)
	context.subscriptions.push(toggleShowVariableNameLog)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
