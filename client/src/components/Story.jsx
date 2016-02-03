import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Starter} from './Starter'
import {Paragraph} from './Paragraph'

export const Story = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="story">
      <Starter {...this.props.starter} />
      <div className="paragraphs">
        {this.props.paragraphs.map(paragraph =>
          <Paragraph key={paragraph.id} {...paragraph} createParagraph={this.props.createParagraph} />
        )}
        {this.props.creating ? <Paragraph key={-1} edit={true} saveParagraph={this.props.saveParagraph} /> : "" }
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  const story = state.get('story').toJS();
  const starter = (state.getIn(['starters', story.starter.toString()]) || {}).toJS();
  const creating = !!story.creating;

  const paragraphs = story.paragraphs;
  if(paragraphs.length > 0) {
    paragraphs[paragraphs.length-1].canAdd = !creating;
  }
  console.log(paragraphs);
  return {
    starter,
    paragraphs: paragraphs,
    creating: creating
  }
}

export const StoryContainer = connect(
  mapStateToProps,
  actionCreators
)(Story);
