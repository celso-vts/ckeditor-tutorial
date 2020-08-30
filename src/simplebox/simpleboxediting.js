import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import InsertSimpleBoxCommand from "./insertsimpleboxcommand";

export default class SimpleBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("SimpleBoxEditing#init called");

    this.defineSchema();
    this.defineConverters();

    this.editor.commands.add(
      "insertSimpleBox",
      new InsertSimpleBoxCommand(this.editor)
    );
  }

  defineSchema() {
    const { schema } = this.editor.model;

    schema.register("simpleBox", {
      isObject: true,

      allowWhere: "$block",
    });

    schema.register("simpleBoxTitle", {
      isLimit: true,

      allowIn: "simpleBox",

      allowContentOf: "$block",
    });

    schema.register("simpleBoxDescription", {
      isLimit: true,

      allowIn: "simpleBox",

      allowContentOf: "$root",
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith("simpleBoxDescription") &&
        childDefinition.name === "simpleBox"
      ) {
        return false;
      }
    });
  }

  defineConverters() {
    // MODIFIED
    const conversion = this.editor.conversion;

    // <simpleBox> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "simple-box",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "simple-box",
      },
    });
    
    conversion.for("editingDowncast").elementToElement({
      model: "simpleBox",
      view: (modelElement, writer) => {
        const section = writer.createContainerElement("section", {
          class: "simple-box",
        });

        return toWidget(section, writer, { label: "simple box widget" });
      },
    });

    // <simpleBoxTitle> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h2",
        classes: "simple-box-title",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h2",
        classes: "simple-box-title",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "simpleBoxTitle",
      view: (modelElement, writer) => {
        // Note: You use a more specialized createEditableElement() method here.
        const h1 = writer.createEditableElement("h2", {
          class: "simple-box-title",
        });

        return toWidgetEditable(h1, writer);
      },
    });

    // <simpleBoxDescription> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBoxDescription",
      view: {
        name: "div",
        classes: "simple-box-description",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "simpleBoxDescription",
      view: {
        name: "div",
        classes: "simple-box-description",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "simpleBoxDescription",
      view: (modelElement, writer) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = writer.createEditableElement("div", {
          class: "simple-box-description",
        });

        return toWidgetEditable(div, writer);
      },
    });
  }
}
