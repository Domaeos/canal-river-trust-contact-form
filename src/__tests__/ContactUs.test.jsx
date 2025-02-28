import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactUs from '../pages/ContactUs';
import '@testing-library/jest-dom/extend-expect';
import { sendMessage } from '../api/sendMessage';

jest.mock('../api/sendMessage', () => ({
    sendMessage: jest.fn(),
}));

describe('ContactUs Page', () => {
    beforeEach(() => {
        sendMessage.mockReset();
    });

    it('renders the contact form with all fields', () => {
        render(<ContactUs />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /send message/i }),
        ).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        render(<ContactUs />);
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        expect(
            await screen.findByText(/name is required/i),
        ).toBeInTheDocument();
        expect(
            await screen.findByText(/email is required/i),
        ).toBeInTheDocument();
        expect(
            await screen.findByText(/subject is required/i),
        ).toBeInTheDocument();
        expect(
            await screen.findByText(/message is required/i),
        ).toBeInTheDocument();
    });

    it('prevents submission if honeypot field is filled', async () => {
        render(<ContactUs />);

        const honeypotInput = screen.getByTestId('honeypot');
        fireEvent.change(honeypotInput, { target: { value: 'bot content' } });

        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(sendMessage).not.toHaveBeenCalled();
        });

        expect(
            screen.queryByText(/message sent successfully/i),
        ).not.toBeInTheDocument();
    });

    it('submits the form successfully and resets fields', async () => {
        sendMessage.mockResolvedValue({
            success: true,
            message: 'Message sent successfully!',
        });

        render(<ContactUs />);
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Subject/i), {
            target: { value: 'Hello' },
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'This is a test message.' },
        });

        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        await screen.findByText(/message sent successfully/i);

        expect(sendMessage).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Hello',
            message: 'This is a test message.',
            _extra_field: '',
        });

        expect(screen.getByLabelText(/Name/i)).toHaveValue('');
        expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
        expect(screen.getByLabelText(/Subject/i)).toHaveValue('');
        expect(screen.getByLabelText(/Message/i)).toHaveValue('');
    });

    it('displays an error message if API fails', async () => {
        sendMessage.mockRejectedValue(new Error('Network Error'));

        render(<ContactUs />);
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Email Address/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Subject/i), {
            target: { value: 'Hello' },
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'This is a test message.' },
        });

        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        expect(
            await screen.findByText(
                /an error occurred while sending your message/i,
            ),
        ).toBeInTheDocument();
    });
});
