import { Input, InputProps } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Example/Input',
	component: Input,
} satisfies Meta<InputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	args: {},
	render() {
		return <Input placeholder='Input component' />;
	},
};
