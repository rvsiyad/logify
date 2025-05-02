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
  const hv = getHighlightedVariable()
  if (!hv) return

  const { highlightedText, indentation, linePosition } = hv
  const config = vscode.workspace.getConfiguration('logify')
  const enableDescriptiveLog = config.get('enableDescriptiveLogging', false)

  // Build the lines to insert
  const lines = []
  if (enableDescriptiveLog) {
    lines.push(`${indentation}console.log('🚀🚀🚀 ~ ${highlightedText}:')`)
  }
  lines.push(`${indentation}console.dir(${highlightedText}, { depth: null, colors: true })`)
  const logText = lines.join('\n')

  const isLastLine = linePosition === document.lineCount - 1
  const position = new vscode.Position(linePosition + 1, 0)

  // If last line, prepend exactly one newline; otherwise, append a newline after our block
  const insertText = isLastLine
    ? `\n${logText}`
    : `${logText}\n`

  editor.edit(editBuilder => {
    editBuilder.insert(position, insertText)
  })
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
		const document = editor.document
		const linePosition = selection.end.line

    const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character)

    const highlightedText = editor.document.getText(selectionRange)
		const indentation = getLineIndentation(document, linePosition)

		return {
			highlightedText,
			indentation,
			linePosition
		}
	}

	return null
}

/**
 * Returns the leading whitespace (indentation) of a given line in the document.
 * This includes both spaces and tabs, and stops at the first non-whitespace character.
 *
 * @param {vscode.TextDocument} document - The active text document in the editor.
 * @param {number} lineNumber - The zero-based line number to retrieve indentation from.
 * @returns {string} The indentation string (spaces and/or tabs) at the beginning of the line.
 */
function getLineIndentation(document, lineNumber) {
  if (lineNumber >= document.lineCount) return ''

  const lineText = document.lineAt(lineNumber).text
  return lineText.match(/^\s*/)[0]
}

module.exports = {
  addConsole
}