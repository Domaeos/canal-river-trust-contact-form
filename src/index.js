import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

function Form() {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [result, setResult] = useState(null);

    const sendEmail = (event) => {
        event.preventDefault();

        fetch('/send', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...state }),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                setResult(response);
                setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            })
            .catch(() => {
                setResult({
                    success: false,
                    message: 'Something went wrong. Try again later',
                });
            });
    };

    const onInputChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        });
    };

    return (
        <div className='page-grid'>
            <div className="contact-us-container">
                <h1 className='contact-form-header'>Contact Us</h1>

                {result && (
                    <p className={`${result.success ? 'success' : 'error'}`}>
                        {result.message}
                    </p>
                )}

                <form onSubmit={sendEmail} className='contact-form'>
                    <formGroup>
                        <label for="name">Name:</label>
                        <input
                            placeholder='John Doe'
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={onInputChange}
                        />
                    </formGroup>

                    <formGroup>
                        <label for="email">Email Address:</label>
                        <input
                            placeholder='johndoe@yahoo.com'
                            type="text"
                            name="email"
                            value={state.email}
                            onChange={onInputChange}
                        />
                    </formGroup>

                    <formGroup>
                        <label for="subject">Subject:</label>
                        <input
                            placeholder='Subject'
                            type="text"
                            name="subject"
                            value={state.subject}
                            onChange={onInputChange}
                        />
                    </formGroup>

                    <formGroup>
                        <label for="message">Message:</label>
                        <textarea
                            placeholder='Type your message here...'
                            name="message"
                            value={state.message}
                            onChange={onInputChange}
                            maxLength={800}
                        />
                        <small className='message-length-count'>{800 - state.message.length} characters remaining</small>
                    </formGroup>

                    <formGroup className='contact-form-button'>
                        <input type="submit" value="Send Message" />
                    </formGroup>
                </form>
            </div>
        </div>
    );
}

ReactDOM.render(<Form />, document.getElementById('root'));
