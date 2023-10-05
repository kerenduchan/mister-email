import { useState } from 'react'
import { Dialog } from '../Dialog'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

// Dialog for creating an email label
export function EmailLabelCreate({ label, onCloseClick, onSaveClick }) {
    // the about-to-be created label's name
    const [draft, setDraft] = useState(label || { name: '' })

    function onFormSubmit(ev) {
        ev.preventDefault()
        onSaveClick(draft)
    }

    function onNameChange(ev) {
        setDraft((prev) => ({ ...prev, name: ev.target.value }))
    }

    const validationSchema = Yup.object().shape({
        labelName: Yup.string().required('Required'),
    })

    function Input(props) {
        return (
            <>
                <label htmlFor={props.id}>{props.label}</label>
                <input autoFocus {...props} />
            </>
        )
    }

    return (
        <Dialog
            title={label ? 'Edit Label' : 'New Label'}
            onCloseClick={onCloseClick}
        >
            <Formik
                initialValues={{
                    labelName: label ? label.name : '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    console.log(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form className="email-label-create-form">
                        <div className="email-label-create-form-field">
                            <Field
                                as={Input}
                                name="labelName"
                                id="labelName"
                                label="Label name:"
                            />
                            <div
                                className={`email-label-create-form-field-errors ${
                                    errors.labelName && touched.labelName
                                        ? 'visible'
                                        : ''
                                }`}
                            >
                                {errors.labelName}
                            </div>
                        </div>
                        <div className="email-label-create-form-actions">
                            <button
                                type="button"
                                className="weak-action-btn"
                                onClick={onCloseClick}
                            >
                                Cancel
                            </button>
                            <button className="strong-action-btn" type="submit">
                                {label ? 'Save' : 'Create'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}
