import React, { useCallback, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useEventListener } from "../useEventListener";
import classnames from "classnames";

export const ProposalForm = () => {
  const [hoveredTag, setHoveredTag] = useState();

  const hoverHandler = useCallback((event) => {
    setHoveredTag(event.detail.dataPath);
  }, []);

  useEventListener("taghover", hoverHandler);

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <Field name="name">
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <div>
                <input
                  className={classnames(
                    "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                    {
                      "border-indigo-600 shadow border-4":
                        hoveredTag === "name",
                    }
                  )}
                  type="text"
                  placeholder="Name"
                  {...field}
                  onFocus={(event) => {
                    const ev = new CustomEvent("formik:focus", {
                      detail: {
                        name: event.target.name,
                        value: event.target.value,
                      },
                    });
                    window.dispatchEvent(ev);
                  }}
                />
                {/* {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )} */}
              </div>
            )}
          </Field>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="commencement_date"
          >
            Commencement Date
          </label>
          <Field name="commencement_date">
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
              <div>
                <input
                  className={classnames(
                    "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                    {
                      "border-indigo-600 shadow border-4":
                        hoveredTag === "commencement_date",
                    }
                  )}
                  type="date"
                  {...field}
                  onFocus={(event) => {
                    const ev = new CustomEvent("formik:focus", {
                      detail: {
                        name: event.target.name,
                        value: event.target.value,
                      },
                    });
                    window.dispatchEvent(ev);
                  }}
                />
                {/* {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )} */}
              </div>
            )}
          </Field>
        </div>
      </Form>
    </Formik>
  );
};
