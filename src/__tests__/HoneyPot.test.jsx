import React from 'react';
import { render, screen } from '@testing-library/react';
import HoneyPot from '../components/HoneyPot';
import '@testing-library/jest-dom/extend-expect';

describe('HoneyPot Component', () => {
    it('should render the off-screen input field', () => {
        const register = jest.fn();

        render(<HoneyPot register={register} />);
        const input = screen.getByRole('textbox');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('name', '_extra_field');
        expect(input.style.position).toBe('absolute');
        expect(input.style.left).toBe('-9999px');
    });
});
