import * as classNames from "classnames";
import * as React from 'react';

export function BioItem({ classes, href, content }: Props) {
  function getContent() {
    if (href !== undefined)
      return (<a href={ href } >{ content }</a>);
    else
      return (<text>{ content }</text>);
  }

  return (
    <div className="item">
      <i className={ classNames(classes) }></i>
      <div className="content">
        { getContent() }
      </div>
    </div>
  );
}

interface Props {
  classes: string;
  content: string;
  href?: string;
}
