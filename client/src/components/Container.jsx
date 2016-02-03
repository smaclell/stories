import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Starter} from './Starter';

export const Container = React.createClass({
  mixins: [PureRenderMixin],
  getStories: function() {
    return this.props.stories || [];
  },
  render: function() {
    return <div className="container">
      <div className="starters">
        {this.getStories().map(story =>
            <Starter key={story.id} {...story} />
          )}
      </div>
    </div>;
  }
});