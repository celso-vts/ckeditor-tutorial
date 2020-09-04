import React, { Component } from "react";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import SimpleBox from "./simplebox/simplebox";

import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import Tag from "./tag/tag";
import { MultirootEditor } from "./multiroot-editor";
import { CKEditor } from "./ckeditor-wrapper";

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, Heading, List, SimpleBox, Tag],
  toolbar: [
    "heading",
    "bold",
    "italic",
    "numberedList",
    "bulletedList",
    "simpleBox",
    "|",
    "tags",
  ],
  placeholder: {
    header: "Header",
  },
};

class App extends Component {
  render() {
    return (
      <article className="App container mx-auto prose">
        <h1 className="">Using CKEditor 5 from source in React</h1>
        <CKEditor
          editor={MultirootEditor}
          config={editorConfiguration}
          data={{
            header: `
                  <p>Hello from CKEditor 5!</p>
                      <section class="simple-box">
                      <h2 class="simple-box-title">Simple Box</h2>
                      <div class="simple-box-description">
                        Simple Box Description
                        <ol>
                          <li>Option 1</li>
                          <li>Option 2</li>
                        </ol>
                      </div>
                      </section>
                    `,

            content: `
                      <h3>Destination of the Month</h3>

                      <h4>Valletta</h4>

                      <figure class="image image-style-align-right">
                          <img alt="Picture of a sunlit facade of a Maltan building." src="../../../../assets/img/malta.jpg">
                          <figcaption>It's siesta time in Valletta.</figcaption>
                      </figure>

                      <p>The capital city of <a href="https://en.wikipedia.org/wiki/Malta" target="_blank" rel="external">Malta</a> is the top destination this summer. It’s home to a cutting-edge contemporary architecture, baroque masterpieces, delicious local cuisine and at least 8 months of sun. It’s also a top destination for filmmakers, so you can take a tour through locations familiar to you from Game of Thrones, Gladiator, Troy and many more.</p>
                  `,
            footer: `

                      <div class="demo-row__half">
                          <div id="footer-left">
                              <h3>The three greatest things you learn from traveling</h3>
                              <p><a href="#">Find out more</a></p>
                          </div>
                      </div>

                      <div class="demo-row__half">
                          <div id="footer-right">
                              <h3>Walking the capitals of Europe: Warsaw</h3>
                              <p><a href="#">Find out more</a></p>
                          </div>
                      </div>
                    `,
          }}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            CKEditorInspector.attach("editor", editor);
            window.editor = editor;
          }}
          onChange={(event, editor) => {
            const data = editor.getData({ rootName: "header" });
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </article>
    );
  }
}

export default App;
