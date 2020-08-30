import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SimpleBoxEditing extends Plugin {
  init() {
    console.log("SimpleBoxEditing#init called");

    this.defineSchema();
    this.defineConverters();
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
  }

  defineConverters() {
    const { conversion } = this.editor;

    conversion.elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "simple-box",
      },
    });

    conversion.elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h2",
        classes: "simple-box-title",
      },
    });

    conversion.elementToElement({
      model: "simpleBoxDescription",
      view: {
        name: "div",
        classes: "simple-box-description",
      },
    });
  }
}
