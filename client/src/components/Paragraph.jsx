import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Paragraph = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    console.log(this.props);
    return <div className="paragraph">
        <p>{this.props.edit ? <textarea ref="edit" name="edit" placeholder="Tell your story!" /> : this.props.text}</p>
        <div className="buttons">
          {this.props.edit ? <button onClick={() => this.props.saveParagraph(this.refs.edit.value)}><span>Add</span></button> : ""}
          {this.props.canAdd ? <button onClick={() => this.props.createParagraph()}><span>New</span></button> : ""}
        </div>
      </div>;
  }
});