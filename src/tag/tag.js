import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import TagEditing  from "./tagediting";
import TagUI from "./tagui";

// eslint-disable-next-line import/no-default-export
export default class Tag extends Plugin {
  static get requires() {
    return [TagEditing, TagUI];
  }
}
