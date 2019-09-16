import classNames from "classnames";
import React from 'react';

export default ({ classes, href, title }) => (
  <div className="item">
    <i className={ classNames(classes, "icon") }></i>
    <div className="content"><a href={ href }>{ title }</a></div>
  </div>
);
