import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { sendMessage } from './api/sendMessage';
import Input from './components/Input';
import './index.css';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const sendEmail =  async(event) => {
        setSubmitting(true);
        event.preventDefault();
        const response = await sendMessage(formData);
        setResult(response);

        if (response.success) {
            setFormData({ name: '', email: '', subject: '', message: '' });
        }

        setSubmitting(false);
    };

    const onInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleKeyDown = (event) => {

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.closest('form').requestSubmit();
        }

    };

    const formFields = [
        { label: 'Name', name: 'name', placeholder: 'John Doe', maxLength: 100, required: true },
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'johndoe@example.com', maxLength: 100, required: true },
        { label: 'Subject', name: 'subject', placeholder: 'Subject', maxLength: 100 },
        { label: 'Message', name: 'message', placeholder: 'Type your message here...', maxLength: 800, type: 'textarea', "onKeyDown": handleKeyDown},
    ];

    return (
        <div className='page-grid'>
            <div className='contact-us-container'>
                <h2 className='contact-form-header'>Contact Us</h2>

                {result && (
                    <div className={`form-result ${result.success ? 'success' : 'error'}`}>
                        {result.message}
                    </div>
                )}

                <form onSubmit={sendEmail} className='contact-form'>
                    {formFields.map((field) => (
                        <Input key={field.name} {...field} value={formData[field.name]} disabled={submitting} onChange={onInputChange} />
                    ))}

                    <small className='message-length-count'>
                        {800 - formData.message.length} characters remaining
                    </small>

                    <div className='contact-form-button'>
                        <input type='submit'
                         disabled={submitting}
                         value={submitting
                            ? 'Sending...'
                            : 'Send Message'
                        } />
                    </div>
                </form>
            </div>
        </div>
    );
}

ReactDOM.render(<Form />, document.getElementById('root'));
