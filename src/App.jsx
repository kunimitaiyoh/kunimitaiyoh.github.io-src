import classNames from "classnames";
import React from 'react';
import portrait from "../public/portrait_561x561.jpg";
import Account from "./views/Account"
import BioItem from "./views/BioItem"
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

const testLang = function(lang, environment) {
  return lang === environment.language;
}

/**
 * @see https://github.com/AlexGilleran/jsx-control-statements
 */
export default ({ buildDate, resources, environment, age }) => (
  <div id="app" className="ui container">
    <div>{ resources.resolveLastUpdate(buildDate) }</div>
    <div>
      <div className="ui tabular  menu">
        <h1 className=" header">{ resources.head }</h1>
        <div className="right menu">
          <a href="?lang=ja" className={ classNames("item", { active: testLang("ja", environment) }) }>日本語</a>
          <a href="?lang=en" className={ classNames("item", { active: testLang("en", environment) }) }>English</a>
        </div>
      </div>
      <div className="ui grid">
        <div className="row">

          <div className="four wide column">
            <div className="ui items">
              <div className="image">
                <img className="ui medium rounded image" src={ portrait } width="561" height="561" />
              </div>
              <div className="item">
                <div className="content">
                  <a className="header">{ resources.name }</a>
                  <div className="meta">{ resources.nameLatin }</div>
                </div>
              </div>
              <div className="ui list">
                <BioItem classes="birthday cake icon" content={ resources.birthday + " (" + age + ")" } />
                <BioItem classes="envelope icon" content={ resources.email } href={ "mailto:" + resources.email } />
                <BioItem classes="marker alternate icon" content={ resources.location } />
                <BioItem classes="building icon" content={ resources.company } />
              </div>
            </div>
          </div>

          <div className="twelve wide column">
            <h2 className="ui header">{ resources.digest.title }</h2>
            <p>{ resources.digest.text }</p>

            <div>

              <h2 className="ui dividing header">{ resources.education.title }</h2>
              <section>
                <ul>
                  <For each="item" index="i" of={ resources.education.items }>
                    <li key={ i }>{ resources.education.format(item) }</li>
                  </For>
                </ul>
              </section>

              <h2 className="ui dividing header">{ resources.workExperience.title }</h2>
              <section>
                <For each="employment" index="i" of={ resources.workExperience.employments }>
                  <div key={ i }>
                    <h3 style={ { marginBottom: "0" } }>{ employment.company }</h3>
                    <section>
                      <small>{ resources.workExperience.format(employment) }</small>
                    </section>
                    <ul>
                      <For each="work" index="j" of={ employment.works }>
                        <li key={ j }>{ work.description }</li>
                      </For>
                    </ul>
                  </div>
                </For>
              </section>

              <h2 className="ui dividing header">{ resources.privateActivities.title }</h2>
              <section>
                <ul>
                  <For each="item" index="i" of={ resources.privateActivities.items }>
                    <li key={ i }>{ item.description }</li>
                    <If condition={ item.annotations !== undefined && item.annotations.length > 0 }>
                      <ul>
                        <For each="annotation" index="j" of={ item.annotations }>
                          <li key={ j }>{ annotation }</li>
                        </For>
                      </ul>
                    </If>
                  </For>
                </ul>
              </section>

              <h2 className="ui dividing header">{ resources.skills.title }</h2>
              <section>
                <ul>
                  <For each="item" index="i" of={ resources.skills.items }>
                    <li key={ i }>{ item.description }</li>
                  </For>
                </ul>
              </section>

              <h2 className="ui dividing header">{ resources.qualifications.title }</h2>
              <section>
                <ul>
                  <For each="qualification" index="i" of={ resources.qualifications.items }>
                    <li key={ i }>{ resources.qualifications.format(qualification) }</li>
                  </For>
                </ul>
              </section>

              <h2 className="ui dividing header">{ resources.favoriteBooks.title }</h2>
              <section>
                <ul>
                  <For each="item" index="i" of={ resources.favoriteBooks.items }>
                    <li key={ i }>{ item.title }</li>
                  </For>
                </ul>
              </section>

              <h2 className="ui dividing header">{ resources.myAccounts.title }</h2>
              <section className="ui list">
                <Account classes="github" href="https://github.com/kunimitaiyoh" title="GitHub" />
                <Account classes="twitter" href="https://github.com/kunimitaiyoh" title="Twitter" />
                <Account classes="linkedin" href="https://www.linkedin.com/in/kunimitaiyoh/" title="LinkedIn" />
                <Account classes="user" href="https://www.wantedly.com/users/69028785" title="Wantedly" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);
