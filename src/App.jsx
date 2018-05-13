import classNames from "classnames";
import React from 'react';
import portrait from "../public/portrait_561x561.jpg";

const testLang = function(lang, environment) {
  return lang === environment.language;
}

export default ({ errors, r, environment, age }) => (
  <div id="app" className="ui container">
    <div className="ui tabular  menu">
      <h1 className=" header">{ r("head") }</h1>
      <div className="right menu">
        <a href="?lang=ja" className={ classNames("item", { active: testLang("ja", environment) }) }>日本語</a>
        <a href="?lang=en" className={ classNames("item", { active: testLang("en", environment) }) }>English</a>
      </div>
    </div>
    {
      (() => {
        if (errors.length > 0) {
          return (
            <div className="ui negative message">
              <div className="header">Errors</div>
              <ul className="list">
                {
                  errors.map(error =>
                    <li>{{ error }}</li>
                  )
                }
              </ul>
            </div>
          );
        }
      })()
    }
    <div className="ui grid">
      <div className="row">
        <div className="four wide column">
          <div className="ui items">
            <div className="image">
              <img className="ui medium rounded image" src={ portrait } width="561" height="561" />
            </div>
            <div className="item">
              <div className="content">
                <a className="header">{ r("name") }</a>
                <div className="meta">{ r("nameLatin") }</div>
              </div>
            </div>
            <div className="ui list">
              <div className="item">
                <i className="birthday cake icon"></i>
                <div className="content">{ r("birthday") + " (" + age + ")" }</div>
              </div>
              <div className="item">
                <i className="envelope icon"></i>
                <div className="content">
                  <a href={ "mailto:" + r("email") } >{ r("email") }</a>
                </div>
              </div>
              <div className="item">
                <i className="marker alternate icon"></i>
                <div className="content">{ r("location") }</div>
              </div>
              <div className="item" style={ { display: "none" } }>
                <i className="building icon"></i>
                <div className="content">?????? Inc.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="twelve wide column">
          <h2 className="ui header">{ r("digest") }</h2>
          <p>{ r("digestContent") }</p>
        </div>
      </div>
      <div className="row">
        <div className="sixteen wide column">
          <section style={ { display: "none" } }>
            <h2 className="ui dividing header">{ r("workExperience") }</h2>
            <section>
            </section>
          </section>
          <section style={ { display: "none" } }>
            <h2 className="ui dividing header">{ r("skills") }</h2>
            <section>
            </section>
          </section>
          <section>
            <h2 className="ui dividing header">{ r("myAccounts") }</h2>
            <section className="ui list">
              <div className="item">
                <i className="github icon"></i>
                <div className="content"><a href="https://github.com/kunimitaiyoh">GitHub</a></div>
              </div>
              <div className="item">
                <i className="twitter icon"></i>
                <div className="content"><a href="https://twitter.com/kunimitaiyoh">Twitter</a></div>
              </div>
              <div className="item">
                <i className="linkedin icon"></i>
                <div className="content"><a href="  https://www.linkedin.com/in/kunimitaiyoh/">LinkedIn</a></div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
);
