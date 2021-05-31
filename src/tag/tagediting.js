import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";

import TagCommand from "./tagcommand";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

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
        viewElement.hasClass("loi-tag")
      )
    );
    this.editor.config.define("tagConfig", {
      tags: [],
    });
  }

  _defineSchema() {
    const { schema } = this.editor.model;

    schema.register("tag", {
      inheritAllFrom: "$text",
      allowWhere: "$text",
      isInline: true,
      isObject: true,
      allowAttributes: ["tag", "expression", "unsubstituted"],
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: "loi-tag",
      },
      model: (viewElement, modelWriter) => {
        const tagMetadata = this.editor.config.get("tagConfig");
        const children = viewElement.getChildren();

        if (viewElement.hasClass("nested")) {
          const nestedTags = [];

          for (const child of children) {
            nestedTags.push(
              child.data
                ? buildTagElement(viewElement, modelWriter, child.data, tagMetadata)
                : child
            );
          }

          return modelWriter.createElement(
            "span",
            {
              class: "loi-tag-nested",
              "data-expression": viewElement.getAttribute("data-expression"),
            },
            nestedTags
          );
        }

        if (viewElement.getChild(0)?.data) {
          return buildTagElement(
            viewElement,
            modelWriter,
            viewElement.getChild(0)?.data,
            tagMetadata
          );
        }
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "tag",
      view: (modelItem, viewWriter) => {
        const widgetElement = createTagView(modelItem, viewWriter);

        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "tag",
      view: createTagView,
    });

    function buildTagElement(viewElement, modelWriter, tag, tagDictionary) {
      if (tag) {
        const expression = viewElement.getAttribute("data-expression");
        const elementAttrs = { tag, expression, classes: viewElement.getClassNames() };

        return modelWriter.createElement("tag", elementAttrs);
      }
    }

    function createTagView(modelItem, viewWriter) {
      const tag = modelItem.getAttribute("tag");
      const expression = modelItem.getAttribute("expression");
      const unsubstituted = modelItem.getAttribute("unsubstituted");
      const classes = modelItem.getAttribute("classes");
      const tagView = viewWriter.createContainerElement("span", {
        class: classes.toArray().join(" "),
        "data-expression": expression,
        "data-unsubstituted": unsubstituted,
      });
      const innerText = viewWriter.createText(`${tag}`);

      viewWriter.insert(viewWriter.createPositionAt(tagView, 0), innerText);

      return tagView;
    }
  }
}
