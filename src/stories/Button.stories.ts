import { Button, ButtonProps, ButtonVariant } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	tags: ['autodocs'],
	title: 'Example/Button',
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	args: {
		children: 'Button',
		variant: 'filled',
		size: 'md',
		color: '#228be6',
		fullWidth: false,
	} satisfies ButtonProps,
	argTypes: {
		size: {
			control: 'select',
			options: [
				'xs',
				'sm',
				'md',
				'lg',
				'xl',
				'compact-xs',
				'compact-sm',
				'compact-md',
				'compact-lg',
				'compact-xl',
			],
		},
		variant: {
			type: 'select',
			options: [
				'default',
				'filled',
				'light',
				'outline',
				'subtle',
				'transparent',
				'white',
			] as ButtonVariant[],
		},
	},
};
