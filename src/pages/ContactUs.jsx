import { sendMessage } from '../api/sendMessage';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contactFormValidationSchema from '../schemas/contactFormValidationSchema';
import HoneyPot from '../components/HoneyPot';
import { useState } from 'react';

function ContactUs() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(contactFormValidationSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
            _extra_field: '',
        },
    });

    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const messageValue = watch('message', '');

    const onSubmit = async (data) => {
        if (data._extra_field) {
            return;
        }
        setSubmitting(true);

        try {
            const response = await sendMessage(data);
            setResult(response);

            if (response.success) {
                reset();
            }
        } catch (error) {
            setResult({
                success: false,
                message: 'An error occurred while sending your message.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.closest('form').requestSubmit();
        }
    };

    const formFields = [
        {
            label: 'Name',
            name: 'name',
            placeholder: 'John Doe',
            maxLength: 100,
        },
        {
            label: 'Email Address',
            name: 'email',
            type: 'email',
            placeholder: 'johndoe@example.com',
            maxLength: 100,
        },
        {
            label: 'Subject',
            name: 'subject',
            placeholder: 'Subject',
            maxLength: 100,
        },
        {
            label: 'Message',
            name: 'message',
            placeholder: 'Type your message here...',
            messageCount: 800 - messageValue.length,
            maxLength: 800,
            type: 'textarea',
            onKeyDown: handleKeyDown,
        },
    ];

    return (
        <div className="page-grid">
            <div className="contact-us-container">
                <h2 className="contact-form-header">Contact Us</h2>
                {result && (
                    <div
                        className={`form-result ${result.success ? 'success' : 'error'}`}
                    >
                        {result.message}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="contact-form"
                >
                    {formFields.map((field) => (
                        <Input
                            key={field.name}
                            register={register}
                            error={errors[field.name]}
                            {...field}
                            disabled={submitting}
                        />
                    ))}
                    <HoneyPot register={register} />
                    <div className="contact-form-button">
                        <input
                            type="submit"
                            disabled={submitting}
                            value={submitting ? 'Sending...' : 'Send Message'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
