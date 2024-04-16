import { TextInput, rem } from '@mantine/core';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { IconAt } from '@tabler/icons-react';

const meta = {
	title: 'Example/TextInput',
	component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

const INPUT_VARIANT = ['default', 'filled', 'unstyled'];

/**
 * `TextInput` component supports [Input](/docs/example-input--docs) and
 * [Input.Wrapper](/docs/example-input--docs) components features and all `input` element props.
 * `TextInput` documentation does not include all features supported by the component – see Input documentation to learn about all available features.
 */
export const Usage: Story = {
	args: {
		variant: INPUT_VARIANT[0],
		size: SIZE[1],
		radius: SIZE[1],
		label: 'Input label',
		withAsterisk: false,
		description: 'Input description',
		error: '',
	},
	argTypes: {
		variant: {
			control: 'select',
			type: '"default"|"filled"|"unstyled"',
			description: 'Input variant',
			options: INPUT_VARIANT,
			table: {
				defaultValue: { summary: 'default' },
			},
		},
		size: {
			control: 'select',
			type: 'MantineSize | (string & {})',
			description:
				"Controls input `height` and horizontal `padding`, `'sm'` by default",
			options: SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
		radius: {
			control: 'select',
			type: 'MantineRadius | number',
			description:
				'Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default',
			options: SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
		label: {
			control: 'text',
			type: 'React.ReactNode',
			description:
				'Contents of `Input.Label` component. If not set, label is not rendered.',
			table: {
				defaultValue: { summary: 'Input label' },
			},
		},
		withAsterisk: {
			control: 'boolean',
			type: 'boolean	',
			description:
				'Determines whether the required asterisk should be displayed. Overrides `required` prop. Does not add required attribute to the input. `false` by default',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		description: {
			control: 'text',
			type: 'React.ReactNode',
			description:
				'Contents of `Input.Description` component. If not set, description is not rendered.',
			table: {
				defaultValue: { summary: 'Input description' },
			},
		},
		error: {
			control: 'text',
			type: 'React.ReactNode',
			description:
				'Contents of `Input.Error` component. If not set, error is not rendered.',
			table: {
				defaultValue: { summary: '' },
			},
		},
	} as Partial<ArgTypes<{}>>,
};

/**
 * `TextInput` supports `leftSection` and `rightSection` props. These sections are rendered with absolute position inside the input wrapper.
 * You can use them to display icons, input controls or any other elements.
 * You can use the following props to control sections styles and content:
 *
 * - `rightSection`/`leftSection` – React node to render on the corresponding side of input
 * - `rightSectionWidth`/`leftSectionWidth` – controls width of the right section and padding on the corresponding side of the input.
 * By default, it is controlled by component `size` prop.
 * - `rightSectionPointerEvents`/`leftSectionPointerEvents` – controls `pointer-events` property of the section.
 * If you want to render a non-interactive element, set it to `none` to pass clicks through to the input.
 */
export const Left_and_right_sections: Story = {
	...Usage,
	render: (props) => {
		const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
		return (
			<>
				<TextInput
					{...props}
					leftSectionPointerEvents='none'
					leftSection={icon}
					label='Your email'
					placeholder='Your email'
				/>
				<TextInput
					{...props}
					mt='md'
					rightSectionPointerEvents='none'
					rightSection={icon}
					label='Your email'
					placeholder='Your email'
				/>
			</>
		);
	},
};

export const Error_state: Story = {
	...Usage,
	render: (props) => {
		return (
			<>
				<TextInput
					{...props}
					label='Boolean error'
					placeholder='Boolean error'
					error
				/>
				<TextInput
					{...props}
					mt='md'
					label='With error message'
					placeholder='With error message'
					error='Invalid name'
				/>
			</>
		);
	},
};

export const Disabled_state: Story = {
	...Usage,
	render(props) {
		return (
			<TextInput
				{...props}
				disabled
				label='Disabled input'
				placeholder='Disabled input'
			/>
		);
	},
};
