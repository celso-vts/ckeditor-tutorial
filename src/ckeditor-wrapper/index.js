/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import React from "react";
import PropTypes from "prop-types";

export class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    // After mounting the editor, the variable will contain a reference to the created editor.
    // @see: https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
    this.editor = null;
    if (props.data) {
      Object.keys(props.data).forEach((d) => {
        this[d] = React.createRef();
      });
    }
    this.toolbarRef = React.createRef();
    // this.headerRef = React.createRef();
    // this.domContainer = React.createRef();
  }

  // This component should never be updated by React itself.
  shouldComponentUpdate(nextProps) {
    if (!this.editor) {
      return false;
    }

    if (this._shouldUpdateContent(nextProps)) {
      this.editor.setData(nextProps.data);
    }

    if ("disabled" in nextProps) {
      this.editor.isReadOnly = nextProps.disabled;
    }

    return false;
  }

  // Initialize the editor when the component is mounted.
  componentDidMount() {
    this._initializeEditor();
  }

  // Destroy the editor before unmouting the component.
  componentWillUnmount() {
    this._destroyEditor();
  }

  // Render a <div> element which will be replaced by CKEditor.
  render() {
    const { data } = this.props;

    // We need to inject initial data to the container where the editable will be enabled. Using `editor.setData()`
    // is a bad practice because it initializes the data after every new connection (in case of collaboration usage).
    // It leads to reset the entire content. See: #68
    return (
      <>
        <div className="toolbar" ref={this.toolbarRef} />
        {Object.keys(data).map((d) => (
          <section
            className="box-border border-4 border-gray-400"
            key={d}
            ref={this[d]}
            dangerouslySetInnerHTML={{ __html: data[d] || "" }}
          />
        ))}
     
      </>
    );
  }

  _initializeEditor() {
    const roots = Object.keys(this.props.data)
      .map((d) => ({ [d]: this[d].current }))
      .reduce((prev, curr) => {
        return { ...prev, ...curr };
      }, {});

    this.props.editor
      .create(
        roots,
        this.props.config
      )
      .then((editor) => {
        this.editor = editor;

        if ("disabled" in this.props) {
          editor.isReadOnly = this.props.disabled;
        }

        if (this.props.onInit) {
          this.props.onInit(editor);
        }

        const modelDocument = editor.model.document;
        const viewDocument = editor.editing.view.document;

        modelDocument.on("change:data", (event) => {
          if (this.props.onChange) {
            this.props.onChange(event, editor);
          }
        });

        viewDocument.on("focus", (event) => {
          if (this.props.onFocus) {
            this.props.onFocus(event, editor);
          }
        });

        viewDocument.on("blur", (event) => {
          if (this.props.onBlur) {
            this.props.onBlur(event, editor);
          }
        });

        this.toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
      })
      .catch((error) => {
        const onErrorCallback = this.props.onError || console.error;

        onErrorCallback(error);
      });
  }

  _destroyEditor() {
    if (this.editor) {
      this.editor.destroy().then(() => {
        this.editor = null;
      });
    }
  }

  _shouldUpdateContent(nextProps) {
    // Check whether `nextProps.data` is equal to `this.props.data` is required if somebody defined the `#data`
    // property as a static string and updated a state of component when the editor's content has been changed.
    // If we avoid checking those properties, the editor's content will back to the initial value because
    // the state has been changed and React will call this method.
    if (this.props.data === nextProps.data) {
      return false;
    }

    // We should not change data if the editor's content is equal to the `#data` property.
    // if (this.editor.getData() === nextProps.data) {
    //   return false;
    // }

    return true;
  }
}

// Properties definition.
CKEditor.propTypes = {
  editor: PropTypes.func.isRequired,
  data: PropTypes.object,
  config: PropTypes.object,
  onChange: PropTypes.func,
  onInit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onError: PropTypes.func,
  disabled: PropTypes.bool,
};

// Default values for non-required properties.
CKEditor.defaultProps = {
  config: {},
};
