import * as classNames from "classnames";
import { h } from "preact";
import { Link } from "preact-router";
import { Account } from "@/components/Account"
import { BioItem } from "@/components/BioItem"
import "semantic-ui-css/semantic.min.css";
import "@/views/Profile.scss";
import { Environments } from "@/util";
import { AppProps } from "@/App";

const testLang = function(lang: string, environment: Environments) {
  return lang === environment.language;
}

/**
 * @see https://github.com/AlexGilleran/jsx-control-statements
 */
export default (props: AppProps) => {
  const { buildDate, resources, environment, age } = props;
  return (
    <div id="app" className="ui container">
      <div>{ resources.resolveLastUpdate(buildDate) }</div>
      <div>
        <div className="ui tabular  menu">
          <h1 className=" header">{ resources.head }</h1>
          <div className="right menu">
            <Link href="?lang=ja" activeClassName={ classNames("item", { active: testLang("ja", environment) }) }>日本語</Link>
            <Link href="?lang=en" activeClassName={ classNames("item", { active: testLang("en", environment) }) }>English</Link>
          </div>
        </div>
        <div className="ui grid">
          <div className="row">
            <div className="four wide column">
              <div className="ui items">
                <div className="image">
                  <img className="ui medium rounded image" src="/portrait_561x561.jpg" width="561" height="561" />
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
                    { resources.education.items.map((item, i) => (
                      <li key={ i }>{ resources.education.format(item) }</li>
                    )) }
                  </ul>
                </section>

                <h2 className="ui dividing header">{ resources.workExperience.title }</h2>
                <section>
                  { resources.workExperience.employments.map((employment, i) => (
                    <div key={ i }>
                      <h3 style={ { marginBottom: "0" } }>{ employment.company }</h3>
                      <section>
                        <small>{ resources.workExperience.format(employment) }</small>
                      </section>
                      <ul>
                        { employment.works.map((work, j) => (
                          <li key={ j }>{ work.description }</li>
                        )) }
                      </ul>
                    </div>
                  )) }
                </section>

                <h2 className="ui dividing header">{ resources.privateActivities.title }</h2>
                <section>
                  <ul>
                    { resources.privateActivities.items.map((item, i) => (
                      <div>
                        <li key={ i }>{ item.description }</li>
                        {
                          (() => {
                            if (item.annotations !== undefined && item.annotations.length > 0) {
                              return (
                                <ul>
                                  { item.annotations.map((annotation, j) => (
                                    <li key={ j }>{ annotation }</li>
                                  )) }
                                </ul>
                              )
                            } else {
                              return null;
                            }
                          })()
                        }
                      </div>
                    )) }
                  </ul>
                </section>

                <h2 className="ui dividing header">{ resources.skills.title }</h2>
                <section>
                  <ul>
                    { resources.skills.items.map((item, i) => (
                      <li key={ i }>{ item.description }</li>
                    )) }
                  </ul>
                </section>

                <h2 className="ui dividing header">{ resources.qualifications.title }</h2>
                <section>
                  <ul>
                    { resources.qualifications.items.map((qualification, i) => (
                      <li key={ i }>{ resources.qualifications.format(qualification) }</li>
                    )) }
                  </ul>
                </section>

                <h2 className="ui dividing header">{ resources.favoriteBooks.title }</h2>
                <section>
                  <ul>
                    { resources.favoriteBooks.items.map((item, i) => (
                      <li key={ i }>{ item.title }</li>
                    )) }
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
}
