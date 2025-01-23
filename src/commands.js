'use strict'

const vscode = require('vscode')

function getHighlightedVariable() {
	const editor = vscode.window.activeTextEditor
	const selection = editor.selection

	if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character)
    const highlighted = editor.document.getText(selectionRange)

		return highlighted
	}

	return null
}

function addConsole() {
	const selection = getHighlightedVariable()
	console.log(selection)
}

module.exports = {
  addConsole
}