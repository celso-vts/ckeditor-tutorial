import Command from "@ckeditor/ckeditor5-core/src/command";

export default class TagCommand extends Command {
  execute( { value } ) {
      const editor = this.editor;

      editor.model.change( writer => {
          // Create a <Tag> elment with the "name" attribute...
          const tag = writer.createElement( 'tag', { name: value } );

          // ... and insert it into the document.
          editor.model.insertContent( tag );

          // Put the selection on the inserted element.
          writer.setSelection( tag, 'on' );
      } );
  }

  refresh() {
      const model = this.editor.model;
      const selection = model.document.selection;

      const isAllowed = model.schema.checkChild( selection.focus.parent, 'tag' );

      this.isEnabled = isAllowed;
  }
}
