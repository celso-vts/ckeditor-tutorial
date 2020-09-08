import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
  isWidget,
} from "@ckeditor/ckeditor5-widget/src/utils";
import TagCommand from "./tagcommand";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  MouseEnterObserver,
  MouseOutObserver,
  FormikFocusObserver,
} from "./observers";

export default class TagEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
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
      types: ["commencement_date", "base_rent", "address"],
    });

    this.editor.editing.view.addObserver(MouseEnterObserver);
    this.editor.editing.view.addObserver(MouseOutObserver);
    this.editor.editing.view.addObserver(FormikFocusObserver);

    const tagHoverHandler = (event, data) => {
      const target = data.target;
      if (isWidget(target)) {
        const dataPath = target.getAttribute("data-path");
        if (dataPath) {
          const customEvent = new CustomEvent("taghover", {
            detail: { dataPath },
          });
          window.dispatchEvent(customEvent);
        }
      } else {
        const customEvent = new CustomEvent("taghover", {
          detail: { dataPath: null },
        });
        window.dispatchEvent(customEvent);
      }
    };

    this.listenTo(
      this.editor.editing.view.document,
      "mouseover",
      tagHoverHandler
    );

    this.listenTo(
      this.editor.editing.view.document,
      "mouseout",
      tagHoverHandler
    );

    this.listenTo(window, "formik:focus", console.log);
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
      allowAttributes: ["name", "data-path"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: ["tag"],
        "data-path": "test",
      },
      model: (viewElement, modelWriter) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getChild(0).data.slice(1, -1);

        return modelWriter.createElement("tag", { name, "data-path": name });
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
      view: (modelItem, viewWriter) => {
        const name = modelItem.getAttribute("name");
        const text = viewWriter.createText("{{" + name + "}}");
        return text;
      },
    });

    // Helper method for both downcast converters.
    function createTagView(modelItem, viewWriter) {
      const name = modelItem.getAttribute("name");

      const tagView = viewWriter.createContainerElement("span", {
        class: "tag",
        "data-path": name,
      });

      // Insert the Tag name (as a text).
      const innerText = viewWriter.createText("{{" + name + "}}");
      viewWriter.insert(viewWriter.createPositionAt(tagView, 0), innerText);

      return tagView;
    }
  }
}
