import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';

import TagCommand from "./tagcommand";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class TagEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("TagEditing#init() got called");

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add("tag", new TagCommand(this.editor));

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("tag")
      )
    );
    this.editor.config.define("tagConfig", {
      types: ["date", "first name", "surname"],
    });
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("tag", {
      // Allow wherever text is allowed:
      allowWhere: "$text",

      // The Tag will act as an inline node:
      isInline: true,

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // The Tag can have many types, like date, name, surname, etc:
      allowAttributes: ["name"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: ["tag"],
      },
      model: (viewElement, modelWriter) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getChild(0).data.slice(1, -1);

        return modelWriter.createElement("tag", { name });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "tag",
      view: (modelItem, viewWriter) => {
        const widgetElement = createTagView(modelItem, viewWriter);

        // Enable widget handling on a Tag element inside the editing view.
        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "tag",
      view: createTagView,
    });

    // Helper method for both downcast converters.
    function createTagView(modelItem, viewWriter) {
      const name = modelItem.getAttribute("name");

      const tagView = viewWriter.createContainerElement("span", {
        class: "tag",
      });

      // Insert the Tag name (as a text).
      const innerText = viewWriter.createText("{" + name + "}");
      viewWriter.insert(viewWriter.createPositionAt(tagView, 0), innerText);

      return tagView;
    }
  }
}
