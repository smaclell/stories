let fakeId = 0;
const rootUrl = 'http://localhost:3000'

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

// TODO: Actually save to the backend
export function saveParagraph(text, parent) {
  return dispatch => {
    dispatch({
      type: 'SAVE_TEMP_PARAGRAPH',
      text: text,
      parent: parent,
      tempId: 't' + (fakeId++).toString()
    });
  }
}

function reformatParagraph(data) {
  let starter = {id: data.id, text: data.text};

  let children = data._links.items;
  if(children && children.length > 0) {
    let links = [];
    for(let j in children) {
      let linkUrl = children[j].href;
      links.push(linkUrl);
    }

    starter.links = links;
  }

  return starter;
}

// TODO: Show loading in progress

function fetchParagraph(dispatch, parent, url) {
  fetch(rootUrl + url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let paragraph = reformatParagraph(json);

      dispatch({
        type: 'RECIEVE_PARAGRAPH',
        parent: parent,
        url: url,
        paragraph: paragraph
      });

      loadChildren(dispatch, paragraph);
    })
    .catch(function(ex) {
      console.log(
        'failed to fetch paragraph', url,
        'from the parent', parent,
        'due to the exception', ex
      );
    });
}

function loadChildren(dispatch, paragraph) {
  if(!paragraph || !paragraph.links || paragraph.links.length === 0) {
    return;
  }

  paragraph.links.forEach(
    url => fetchParagraph(dispatch, paragraph.id, url)
  );
}

// TODO: This is crazy chatty.
// You should load to a specific depth then trigger more loading as needed
export function fetchStarters() {
  return dispatch => {
    fetch(rootUrl + "/api/v1/starters/")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let starters = [];

        json._links.items.forEach(
          data => starters.push(reformatParagraph(data))
        );

        if(starters.length === 0) {
          return;
        }

        dispatch({
          type: 'RECIEVE_STARTERS',
          starters: starters
        });

        dispatch({
          type: 'SHOW_STORY',
          starter: starters[0].id
        });

        starters.forEach(
          starter => loadChildren(dispatch, starter)
        );

      }).catch(function(ex) {
        console.log('failed to get starters', ex);
      });
    }
}