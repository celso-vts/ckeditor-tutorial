import React, { Component, useState } from "react";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import SimpleBox from "./simplebox/simplebox";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import Tag from "./tag/tag";
import { MultirootEditor } from "./multiroot-editor";
import { CKEditor } from "./ckeditor-wrapper";
import { ProposalForm } from "./ProposalForm";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import { Blocks } from "./Blocks";
// import ExportWord from "@ckeditor/ckeditor5-export-word/src/exportword";
// import ExportPdf from "@ckeditor/ckeditor5-export-pdf/src/exportpdf";

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Heading,
    List,
    SimpleBox,
    Tag,
    PasteFromOffice,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage,
    PageBreak,
    // ExportWord,
    // ExportPdf,
  ],
  toolbar: [
    "heading",
    "bold",
    "italic",
    "numberedList",
    "bulletedList",
    "simpleBox",
    "|",
    "tags",
    "pageBreak",
    // "exportPdf",
    // "|",
    // "exportWord",
  ],
  placeholder: {
    header: "Header",
  },
};

const initialData = {
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
  section: `Test`,

  content: `
            <h3>Destination of the Month</h3>

            <h4>Valletta</h4>

            <figure class="image image-style-align-right">
                <img alt="Picture of a sunlit facade of a Maltan building." src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Malta_Gozo%2C_Azure_Window_%2810264176345%29.jpg/320px-Malta_Gozo%2C_Azure_Window_%2810264176345%29.jpg">
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
};

const App = () => {
  const [blocks, setBlocks] = useState(initialData);
  return (
    <div className="flex flew-row">
      <div className="container flex-1 prose m-4">
        <h2>Form</h2>
        <ProposalForm />
      </div>
      <article className="container flex-2 prose m-4">
        <h2>Editor</h2>
        <CKEditor
          editor={MultirootEditor}
          config={editorConfiguration}
          data={blocks}
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
      <Blocks
        blocks={blocks}
        onAdd={() => {
          setBlocks({ ...blocks, "new-block": "" });
        }}
        onRemove={(key) => {
          const newBlocks = { ...blocks };
          delete newBlocks[key];
          setBlocks(newBlocks);
        }}
      />
    </div>
  );
};

export default App;
