import SimpleBoxEditing from "./simpleboxediting";
import SimpleBoxUI from "./simpleboxui";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import './styles.css';

export default class SimpleBox extends Plugin {
  static get requires() {
    return [SimpleBoxEditing, SimpleBoxUI];
  }
}
