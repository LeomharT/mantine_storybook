import { ButtonProps, CloseButton } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Example/CloseButton',
	component: CloseButton,
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'fielld',
		size: 'md',
		fullWidth: false,
	} satisfies ButtonProps,
	argTypes: {
		size: {
			type: 'select',
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
	},
};
