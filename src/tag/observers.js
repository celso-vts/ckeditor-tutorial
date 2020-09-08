import DomEventObserver from "@ckeditor/ckeditor5-engine/src/view/observer/domeventobserver";

export class MouseEnterObserver extends DomEventObserver {
  get domEventType() {
    return "mouseover";
  }

  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
}
export class MouseOutObserver extends DomEventObserver {
  get domEventType() {
    return "mouseout";
  }

  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
}

export class FormikFocusObserver extends DomEventObserver {
  get domEventType() {
    return "formik:focus";
  }

  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
}
