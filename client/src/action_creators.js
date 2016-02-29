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
    let tempId = 't' + (fakeId++).toString();

    dispatch({
      type: 'SAVE_TEMP_PARAGRAPH',
      parent: parent,
      text: text,
      tempId: tempId
    });

    let request = new Request(rootUrl + '/api/v1/paragraphs/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        paragraph: {
          parent: parent,
          text: text
        }
      })
    });

    fetch(request)
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        let paragraph = reformatParagraph(json);

        dispatch({
          type: 'REPLACE_TEMP_PARAGRAPH',
          parent: parent,
          tempId: tempId,
          paragraph: paragraph
        });
      });
  }
}

function reformatParagraph(data) {
  let paragraph = {id: data.id, text: data.text};

  let children = data._links.items;
  if(children && children.length > 0) {
    let links = [];
    for(let j in children) {
      let linkUrl = children[j].href;
      links.push(linkUrl);
    }

    paragraph.links = links;
  }

  return paragraph;
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