import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SimpleBoxEditing extends Plugin {
  init() {
    console.log("SimpleBoxEditing#init called");

    this.defineSchema();
  }

  defineSchema() {
    const { schema } = this.editor.model;

    schema.register("simpleBox", {
      isObject: true,

      allowWhere: "$block",
    });
  
    schema.register("simpleBoxTitle", {
      isLimit: true,

      allowIn: 'simpleBox',

      allowContentOf: "$block",
    });

    schema.register("simpleBoxDescription", {
      isLimit: true,

      allowIn: 'simpleBox', 

      allowContentOf: "$root",
    });

  }

  
}
