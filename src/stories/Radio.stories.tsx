import { CheckIcon, Radio, Stack } from '@mantine/core';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
	title: 'Example/Radio',
	component: Radio,
	decorators: [withActions],
} satisfies Meta<typeof Radio>;

export default meta;

const SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	args: {
		checked: true,
		labelPosition: 'right',
		label: 'I cannot be unchecked',
		description: '',
		error: '',
		size: 'sm',
		color: '#228be6',
		variant: 'filled',
	},
	argTypes: {
		checked: {
			control: 'boolean',
			type: 'boolean',
			description: 'Radio checked',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		labelPosition: {
			control: 'select',
			type: '"left" | "right"' as 'string',
			description:
				"Position of the label relative to the input, 'right' by default",
			table: {
				defaultValue: { summary: 'right' },
			},
			options: ['left', 'right'],
		},
		label: {
			control: 'text',
			type: 'React.ReactNode' as 'string',
			description: 'Content of the `label` associated with the radio',
			table: {
				defaultValue: { summary: 'I cannot be unchecked' },
			},
		},
		description: {
			control: 'text',
			type: 'React.ReactNode' as 'string',
			description: 'Description displayed below the label',
			table: {
				defaultValue: { summary: '' },
			},
		},
		error: {
			control: 'text',
			type: 'React.ReactNode' as 'string',
			description: 'Error displayed below the label',
			table: {
				defaultValue: { summary: '' },
			},
		},
		size: {
			control: 'select',
			type: 'MantineSize' as 'string',
			description: "Controls size of the component, `'sm'` by default",
			table: {
				defaultValue: { summary: 'sm' },
			},
			options: SIZE,
		},
		variant: {
			control: 'select',
			type: 'filled | outline' as 'string',
			description: "Controls size of the component, `'sm'` by default",
			table: {
				defaultValue: { summary: 'filled' },
			},
			options: ['filled', 'outline'],
		},
		onChange: fn(),
	},
};

export const States: Story = {
	render() {
		return (
			<Stack>
				<Radio
					checked={false}
					onChange={() => {}}
					label='Default radio'
				/>
				<Radio checked onChange={() => {}} label='Checked radio' />
				<Radio
					checked
					variant='outline'
					onChange={() => {}}
					label='Outline checked radio'
				/>
				<Radio disabled label='Disabled radio' />
				<Radio
					disabled
					checked
					onChange={() => {}}
					label='Disabled checked radio'
				/>
			</Stack>
		);
	},
};

export const Change_icon: Story = {
	render() {
		return (
			<Radio
				icon={CheckIcon}
				label='Custom check icon'
				name='check'
				value='check'
				defaultChecked
			/>
		);
	},
};
