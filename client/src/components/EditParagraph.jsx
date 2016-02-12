import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const EditParagraph = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {

    return <div className="paragraph paragraph-edit">
        <p>
          <textarea ref="edit" name="edit" placeholder="Tell your story!" />
        </p>
        <div className="buttons">
          <button onClick={() => this.props.saveParagraph(this.refs.edit.value,this.props.parent)}><span>Add</span></button>
          <button onClick={() => this.props.hideCreateParagraph(this.props.parent)}><span>Cancel</span></button>
        </div>
      </div>;
  }
});