import React from 'react';

function Input({
    register,
    name,
    label,
    error,
    messageCount,
    type,
    onKeyDown,
    ...rest
}) {
    const isTextArea = type === 'textarea';

    return (
        <div className="form-field-container">
            <label className="input-label" htmlFor={name}>
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={name}
                    {...register(name)}
                    onKeyDown={onKeyDown}
                    className={error ? 'input-error' : ''}
                    {...rest}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    {...register(name)}
                    className={error ? 'input-error' : ''}
                    {...rest}
                />
            )}
            <div className="form-field-footer">
                <div
                    className={
                        isTextArea
                            ? 'textarea-error-message'
                            : 'input-error-message'
                    }
                >
                    {error && error.message}
                </div>

                {isTextArea && messageCount !== undefined && (
                    <small className="message-length-count">
                        {messageCount} characters remaining
                    </small>
                )}
            </div>
        </div>
    );
}

export default Input;
