import * as classNames from "classnames";
import { h } from "preact";

export function Account({ classes, href, title }: Props) {
  return (
    <div className="item">
      <i className={ classNames(classes, "icon") }></i>
      <div className="content"><a href={ href }>{ title }</a></div>
    </div>
  );
}

interface Props {
  classes: string;
  href: string;
  title: string;
}
