import { TextInput } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextInput> = {
	title: 'Example/TextInput',
	component: TextInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

const OPTIONS_SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Usage: Story = {
	args: {
		size: 'md',
		placeholder: 'Input component',
	},
	argTypes: {
		size: {
			control: 'select',
			options: OPTIONS_SIZE,
		},
	},
};
