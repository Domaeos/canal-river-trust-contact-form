import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from '../components/Input';

describe('Input component', () => {
    const dummyRegister = jest.fn(() => ({}));

    beforeEach(() => {
        dummyRegister.mockClear();
    });

    test('renders a label with the given text', () => {
        render(
            <Input
                register={dummyRegister}
                name="username"
                label="Username"
                type="text"
            />,
        );

        const inputElement = screen.getByLabelText('Username');
        expect(inputElement).toBeInTheDocument();
    });

    test('renders an input element when type is not "textarea"', () => {
        render(
            <Input
                register={dummyRegister}
                name="username"
                label="Username"
                type="text"
            />,
        );

        const inputElement = screen.getByRole('textbox');

        expect(inputElement.tagName).toBe('INPUT');
    });

    test('renders a textarea element when type is "textarea"', () => {
        render(
            <Input
                register={dummyRegister}
                name="message"
                label="Message"
                type="textarea"
            />,
        );

        const textareaElement = screen.getByRole('textbox');

        expect(textareaElement.tagName).toBe('TEXTAREA');
    });

    test('displays error message when error prop is provided', () => {
        const error = { message: 'Required field' };

        render(
            <Input
                register={dummyRegister}
                name="username"
                label="Username"
                type="text"
                error={error}
            />,
        );

        const errorMessage = screen.getByText('Required field');
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays message count for textarea when messageCount is provided', () => {
        render(
            <Input
                register={dummyRegister}
                name="message"
                label="Message"
                type="textarea"
                messageCount={150}
            />,
        );

        const messageCountText = screen.getByText('150 characters remaining');
        expect(messageCountText).toBeInTheDocument();
    });

    test('calls onKeyDown handler when key is pressed in textarea', () => {
        const onKeyDown = jest.fn();

        render(
            <Input
                register={dummyRegister}
                name="message"
                label="Message"
                type="textarea"
                onKeyDown={onKeyDown}
            />,
        );
        const textareaElement = screen.getByRole('textbox');
        fireEvent.keyDown(textareaElement, { key: 'Enter', code: 'Enter' });

        expect(onKeyDown).toHaveBeenCalled();
    });

    test('spreads additional props onto the input element', () => {
        render(
            <Input
                register={dummyRegister}
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
            />,
        );
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveAttribute(
            'placeholder',
            'Enter your username',
        );
    });
});
