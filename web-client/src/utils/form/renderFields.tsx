import * as React from 'react';
import Textarea from "react-textarea-autosize"

export const renderFieldInput: React.StatelessComponent<any> = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )


export const renderFieldTextArea: React.StatelessComponent<any> = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <div>

                <Textarea {...input} className="form-control" minRows={5} />
                {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )


export const renderFieldSelect: React.StatelessComponent<any> = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    children
}) => (

        <div className="form-group">
            <label className="control-label">{label}</label>
            <div>
                <select {...input} className="form-control">
                    {children}
                </select>
                {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )


export const renderFieldFile: React.StatelessComponent<any> = ({
    input: { onChange },
    label,
    accept,
    meta: { touched, error, warning },
}) => (

        <div className="form-group">
            <label className="control-label">{label}</label>
            <div>
                <input
                    type="file"
                    onChange={(e) => onChange(e && e.target && e.target.files
                        && e.target.files.length > 0 ? e.target.files[0] : "")}
                    accept={accept}
                    className="form-control"
                />
                {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )