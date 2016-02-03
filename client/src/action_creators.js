export function createParagraph(starter = undefined) {
  return {
    type: 'CREATE_PARAGRAPH',
    starter
  };
}

export function saveParagraph(text) {
  return {
    type: 'SAVE_PARAGRAPH',
    text: text
  };
}
