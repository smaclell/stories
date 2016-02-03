import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Starter = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var css = "starter paragraph";
    if( this.props.highlight ) {
      css += " highlight"
    }

    return <div className={css}>
        <p>{this.props.text}</p>
        <button>
          <span>↓</span>
        </button>
      </div>;
  }
});