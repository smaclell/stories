import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {EditParagraph} from './EditParagraph';

export const Paragraph = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {

    var showCreate = this.props.showCreateParagraph;

    var editActions = {
      hideCreateParagraph: this.props.hideCreateParagraph,
      saveParagraph: this.props.saveParagraph
    }

    var paragraphs = null;
    if(this.props.paragraphs || this.props.creating) {
      paragraphs = <div className="paragraphs">
        {this.props.creating && <EditParagraph key={"new-paragraph-" + this.props.id } parent={this.props.id} {...editActions} />}
        {this.props.paragraphs && this.props.paragraphs.map( paragraph =>
          <ParagraphComponent key={"paragraph-" + paragraph.id} {...paragraph} />
        )}
      </div>;
    }

    return <div className="paragraph">
        <p>{this.props.text}</p>
        <div className="buttons">
          {this.props.canAdd && <button onClick={() => showCreate(this.props.id)}><span>New</span></button>}
        </div>
        {paragraphs}
      </div>;
  }
});

function mapStateToProps(state, ownProps) {

  return {
    canAdd: true,
    paragraphs: (ownProps.paragraphs || []).map(
      id => state.getIn(['paragraphs', id]).toJS()
    )
  }
}

export const ParagraphComponent = connect(
  mapStateToProps,
  actionCreators
)(Paragraph);