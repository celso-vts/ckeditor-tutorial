import Command from "@ckeditor/ckeditor5-core/src/command";

export default class TagCommand extends Command {
  execute({ value }) {
    const { editor } = this;

    editor.model.change((writer) => {
      const tag = writer.createElement("tag", { name: value });

      editor.model.insertContent(tag);
      writer.setSelection(tag, "on");
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const isAllowed = model.schema.checkChild(selection.focus.parent, "tag");

    this.isEnabled = isAllowed;
  }
}
