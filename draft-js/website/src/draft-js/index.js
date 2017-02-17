/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var React = require('react');
var Site = require('Site');



var richExample = `
'use strict';

const {Editor, EditorState, RichUtils} = Draft;

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {   

    return (
      <div className="RichEditor-root">
        <div >
          <Editor
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <RichEditorExample />,
  document.getElementById('rich-example')
);
`;

var index = React.createClass({
  render: function() {
    return (
      <Site>
        <div className="hero">
          <div className="wrap">
            <div className="text"><strong>Draft.js</strong></div>
            <div className="minitext">
              Rich Text Editor Framework for React
            </div>
          </div>
        </div>

        <section className="content wrap">
          <section className="home-section home-getting-started">
            <p>
              Draft.js is a framework for building rich text editors in React,
              powered by an immutable model and abstracting over cross-browser
              differences.
            </p>

            <p>
              Draft.js makes it easy to build any type of rich text input,
              whether you're just looking to support a few inline text styles
              or building a complex text editor for composing long-form
              articles.
            </p>

            <p>
              In Draft.js, everything is customizable &ndash; we provide the
              building blocks so that you have full control over the user
              interface. Here's a simple example of a rich text editor built in
              Draft.js:
            </p>

            <div id="rich-example"></div>
          </section>

          <section className="home-bottom-section">
            <div className="buttons-unit">
              <a href="docs/overview.html#content" className="button">Learn more about Draft</a>
            </div>
          </section>
        </section>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.7.6/immutable.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

        <script src="lib/Draft.js"></script>
        <style dangerouslySetInnerHTML={{__html: `
          @import "lib/Draft.css";
          @import "lib/RichEditor.css";
        `}} />
        <script type="text/babel" dangerouslySetInnerHTML={{__html: richExample}} />

      </Site>
    );
  }
});


module.exports = index;