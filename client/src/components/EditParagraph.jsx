import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const EditParagraph = React.createClass({
  mixins: [PureRenderMixin],
  handleSave: function() {
    this.props.saveParagraph(this.refs.edit.value, this.props.parent);
  },
  handleEnter: function(event) {
    if(!event.shiftKey && event.keyCode == 13) {
        this.handleSave();
        return false;
    }
    return true;
  },
  componentDidMount: function(){
    this.refs.add.focus();
    this.refs.edit.focus();

    this.refs.edit.addEventListener('keypress', this.handleEnter);
  },
  componentWillUnmount: function() {
    this.refs.edit.addEventListener('keypress', this.handleEnter);
  },
  render: function() {

    return <div className="paragraph paragraph-edit">
        <p>
          <textarea ref="edit" name="edit" placeholder="Tell your story!" />
        </p>
        <div className="buttons">
          <button ref="add" onClick={() => this.handleSave()}><span>Add</span></button>
          <button onClick={() => this.props.hideCreateParagraph(this.props.parent)}><span>Cancel</span></button>
        </div>
      </div>;
  }
});