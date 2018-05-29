import classNames from "classnames";
import React from 'react';

export default ({ classes, href, content, style }) => (
  <div className="item">
    <i className={ classNames(classes) }></i>
    <div className="content">
      <Choose>
        <When condition={ href !== undefined }>
          <a href={ href } >{ content }</a>
        </When>
        <Otherwise>
          <text>{ content }</text>
        </Otherwise>
      </Choose>
    </div>
  </div>
);
