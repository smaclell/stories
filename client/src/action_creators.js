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

function receivedStarters() {

}

export function fetchStarters() {
  return dispatch => {
    fetch( "http://localhost:3000/api/v1/starters/")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log('parsed json', json);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
    }
}