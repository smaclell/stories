export function showCreateParagraph(parent) {
  return {
    type: 'SHOW_CREATE_PARAGRAPH',
    parent: parent
  };
}

export function hideCreateParagraph(parent) {
  return {
    type: 'HIDE_CREATE_PARAGRAPH',
    parent: parent
  };
}

export function saveParagraph(text, parent) {
  return {
    type: 'SAVE_PARAGRAPH',
    text: text,
    parent: parent
  };
}
