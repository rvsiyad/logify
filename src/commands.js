'use strict'

const vscode = require('vscode')

function addConsole() {
	const editor = vscode.window.activeTextEditor
	const document = editor.document
	const highlightedVariable = getHighlightedVariable()

	if (highlightedVariable) {
		const { linePosition, highlightedText } = highlightedVariable

		if (linePosition >= 0 && linePosition <= document.lineCount) {
			editor.edit((editBuilder) => {
					if (linePosition + 1 === document.lineCount) {
							const position = new vscode.Position(linePosition + 1, 0)
							editBuilder.insert(position, '\n' + `console.dir(${highlightedText}, { depth: null, color: true })`)
					} else {
							const position = new vscode.Position(linePosition + 1, 0)
							editBuilder.insert(position, `console.dir(${highlightedText}, { depth: null, color: true })` + '\n')
					}
			}).then(success => {
					if (success) {
							console.log('Console statement added successfully.')
					} else {
							console.error('Failed to add console statement.')
					}
			})
		}
	}
}
function getHighlightedVariable() {
	const editor = vscode.window.activeTextEditor
	const selection = editor.selection

	if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character)

    const highlightedText = editor.document.getText(selectionRange)
		const linePosition = selection.end.line

		return {
			highlightedText,
			linePosition
		}
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