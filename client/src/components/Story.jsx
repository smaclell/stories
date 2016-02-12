import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Starter} from './Starter'
import {ParagraphComponent} from './Paragraph'
import {EditParagraph} from './EditParagraph'

export const Story = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {

    var editActions = {
      hideCreateParagraph: this.props.hideCreateParagraph,
      saveParagraph: this.props.saveParagraph
    }

    return <div className="story">
      <Starter {...this.props.starter} />
      <div className="paragraphs">
        {this.props.creating && <EditParagraph key={"new-paragraph-" + this.props.id } parent={this.props.starter.id} {...editActions} />}
        {this.props.paragraphs.map(paragraph =>
          <ParagraphComponent key={"paragraph-" + paragraph.id} {...paragraph} />
        )}
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  const starterId = state.getIn(['story', 'starter']);
  const starter = state.getIn(['paragraphs', starterId]).toJS();
  const creating = !!starter.creating;

  return {
    starter,
    creating: creating,
    actions: actionCreators,
    paragraphs: starter.paragraphs && starter.paragraphs.map(
      id => state.getIn(['paragraphs', id]).toJS()
    )
  }
}

export const StoryContainer = connect(
  mapStateToProps,
  actionCreators
)(Story);
