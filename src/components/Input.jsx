import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            {type === 'textarea' ? (
                <textarea name={name} value={value} onChange={onChange} {...rest} />
            ) : (
                <input type={type} name={name} value={value} onChange={onChange} {...rest} />
            )}
        </div>
    );
};

export default Input;
