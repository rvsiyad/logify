'use strict'

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { addConsole } = require('./commands')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "logify" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('logify.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from logify!')
	})

	const addConsoleCommand = vscode.commands.registerCommand('logify.addConsole', function () {
		addConsole()
		vscode.window.showInformationMessage('Activate console command')
	})

	const toggleShowVariableNameLog = vscode.commands.registerCommand('logify.toggleShowVariableNameLog', async () => {
		const config = vscode.workspace.getConfiguration('logify')
		const currentOptions = config.get('logOptions', [])

		const settingKey = 'showVariableNameLog'
		const isEnabled = currentOptions.includes(settingKey)

		const updatedOptions = isEnabled
			? currentOptions.filter(opt => opt !== settingKey)
			: [...currentOptions, settingKey]

		await config.update('logOptions', updatedOptions, vscode.ConfigurationTarget.Global)

		vscode.window.showInformationMessage(
			`Descriptive console log is ${isEnabled ? 'disabled' : 'enabled'}`
		)
	})

	context.subscriptions.push(disposable)
	context.subscriptions.push(addConsoleCommand)
	context.subscriptions.push(toggleShowVariableNameLog)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
