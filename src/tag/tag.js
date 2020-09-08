import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import TagEditing from './tagediting'
import TagUI from './tagui'
import './theme/tag.css';

export default class Tag extends Plugin {
  static get requires() {
    return [TagEditing, TagUI];
  }
}