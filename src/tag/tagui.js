import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { addListToDropdown, createDropdown } from "@ckeditor/ckeditor5-ui/src/dropdown/utils";

import Model from "@ckeditor/ckeditor5-ui/src/model";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";

export default class TagUI extends Plugin {
  init() {
    const { editor } = this;
    const { t } = editor;

    const tags = editor.config.get("tagConfig.tags");

    editor.ui.componentFactory.add("tags", (locale) => {
      const dropdownView = createDropdown(locale);

      addListToDropdown(dropdownView, getDropdownItemsDefinition(tags));

      dropdownView.buttonView.set({
        label: t("tags"),
        tooltip: true,
        withText: true,
      });

      const command = editor.commands.get("tag");

      dropdownView.bind("isEnabled").to(command);

      this.listenTo(dropdownView, "execute", (event) => {
        editor.execute("tag", { value: event.source.commandParam });
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
}

function getDropdownItemsDefinition(tags) {
  const itemDefinitions = new Collection();

  for (const name of tags) {
    const definition = {
      type: "button",
      model: new Model({
        commandParam: name,
        label: name,
        withText: true,
      }),
    };

    itemDefinitions.add(definition);
  }

  return itemDefinitions;
}
