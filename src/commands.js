'use strict'

const vscode = require('vscode')

/**
 * Inserts a print statement underneath the highlighted variable. Determines if the highlighted variable is on the last
 * line in the document and works accordingly to add a new line to populate with a print statement.
 */
function addConsole() {
	const editor = vscode.window.activeTextEditor
	if (!editor) return

	const document = editor.document
	const highlightedVariable = getHighlightedVariable()
	if (!highlightedVariable) return

	const { linePosition, highlightedText } = highlightedVariable

	const config = vscode.workspace.getConfiguration('logify')
	const options = config.get('logOptions', [])
	const showVariableNameLog = options.includes('showVariableNameLog')

	let logText = ''

	if (showVariableNameLog) {
		logText += `console.log('🚀🚀🚀 ~ ${highlightedText}:')\n`
	}

	logText += `console.dir(${highlightedText}, { depth: null, colors: true })\n`

	if (linePosition >= 0 && linePosition <= document.lineCount) {
		editor.edit((editBuilder) => {
			const position = new vscode.Position(linePosition + 1, 0)
			const insertText = (linePosition + 1 === document.lineCount ? '\n' : '') + logText
			editBuilder.insert(position, insertText)
		}).then(success => {
			if (success) {
				console.log('Console statement added successfully.')
			} else {
				console.error('Failed to add console statement.')
			}
		})
	}
}



/**
 * Retrieves the currently highlighted text from the document and returns the highlighted variable and its
 * line position.
 *
 * @returns {object} Returns the highlighted text and the line it is located at on the document.
 */
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

module.exports = {
  addConsole
}