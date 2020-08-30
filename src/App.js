import React, { Component } from "react";
import "./App.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import SimpleBox from "./simplebox/simplebox";

import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, Heading, List, SimpleBox],
  toolbar: ["heading", "bold", "italic", "numberedList", "bulletedList", "simpleBox"],
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 from source in React</h2>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={`<p>Hello from CKEditor 5!</p>
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
                    `}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
            CKEditorInspector.attach("editor", editor);
            window.editor = editor;
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
