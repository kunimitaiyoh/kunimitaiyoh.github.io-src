import * as classNames from "classnames";
import { h } from "preact";
import { Link, route } from "preact-router";
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
            {/* XXX: suspicious routing */}
            <Link onClick={ e => route("?lang=ja") } path="?lang=ja" className={ classNames("item", { active: testLang("ja", environment) }) }>日本語</Link>
            <Link onClick={ e => route("?lang=en") } path="?lang=en" className={ classNames("item", { active: testLang("en", environment) }) }>English</Link>
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
                      <li key={ i }>
                        <span>{ item.description }</span>
                        {
                          (() => {
                            if (item.annotations !== undefined && item.annotations.length > 0) {
                              return (
                                <ul>
                                  { item.annotations.map((annotation, j) => (
                                    <li key={ j }>{ annotation }</li>
                                  )) }
                                </ul>
                              );
                            } else {
                              return null;
                            }
                          })()
                        }
                      </li>
                    )) }
                  </ul>
                </section>

                <h2 className="ui dividing header">{ resources.skills.title }</h2>
                <section>
                  <table>
                    { resources.skills.groups.map((group, i) => (
                      <tr key={ i }>
                        <th>{ group.name }</th>
                        <td>{ group.content }</td>
                      </tr>
                    )) }
                  </table>

                  <h3>{ resources.skills.others.title }</h3>
                  <section>
                    <ul>
                      { resources.skills.others.items.map((item, i) => (
                        <li key={ i }>{ item }</li>
                      )) }
                    </ul>
                  </section>
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
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
