import * as React from 'react';

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
                    <select {...input}  className="form-control">
                    {children}
                    </select>
                    {touched &&
                        ((error && <span className="help-block">{error}</span>) ||
                            (warning && <span>{warning}</span>))}
                </div>
            </div> 
        )