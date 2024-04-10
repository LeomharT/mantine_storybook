import { CloseButton, TextInput } from '@mantine/core';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { IconAt, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const meta = {
	title: 'Example/TextInput',
	component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const OPTIONS_SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * `Input` component is used as base for some other inputs (NativeSelect, TextInput, Textarea, etc.).
 * The purpose of the `Input` is to provide shared styles and features to other inputs.
 */
export const Usage: Story = {
	args: {
		disabled: false,
		error: undefined,
		id: undefined,
		size: 'sm',
		placeholder: 'Input component',
	},
	argTypes: {
		disabled: {
			description: 'Sets `disabled` attribute on the input element',
			type: 'boolean',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		error: {
			description:
				'Determines whether the input should have error styles and `aria-invalid` attribute',
			type: 'React.ReactNode',
			control: 'text',
			table: {
				defaultValue: { summary: undefined },
			},
		},
		id: {
			description: 'Input element id',
			type: 'string',
			control: 'text',
			table: {
				defaultValue: { summary: undefined },
			},
		},
		size: {
			type: 'MantineSize | (string & {})',
			control: 'select',
			options: OPTIONS_SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
		placeholder: {
			type: 'string',
			control: 'text',
			table: {
				defaultValue: { summary: 'Input component' },
			},
		},
	} as Partial<ArgTypes<{}>>,
};

/**
 * Input supports `leftSection` and `rightSection` props.
 * These sections are rendered with absolute position inside the input wrapper.
 * You can use them to display icons, input controls or any other elements.
 *
 * You can use the following props to control sections styles and content:
 * - `rightSection`/`leftSection` – React node to render on the corresponding side of input
 *
 * - `rightSectionWidth`/`leftSectionWidth` – controls width of the right section and padding on the corresponding side of the input.
 * By default, it is controlled by component `size` prop.
 *
 * - `rightSectionPointerEvents`/`leftSectionPointerEvents` – controls `pointer-events` property of the section.
 * If you want to render a non-interactive element, set it to `none` to pass clicks through to the input.
 */
export const Left_and_right_sections: Story = {
	...Usage,
	render(props) {
		const [value, setValue] = useState('Clear me');
		return (
			<>
				<TextInput
					{...props}
					placeholder='Your email'
					leftSection={<IconAt size={16} />}
				/>
				<TextInput
					{...props}
					placeholder='Clearable input'
					value={value}
					onChange={(event) => setValue(event.currentTarget.value)}
					rightSectionPointerEvents='all'
					mt='md'
					rightSection={
						<CloseButton
							aria-label='Clear input'
							onClick={() => setValue('')}
							style={{ display: value ? undefined : 'none' }}
						/>
					}
				/>
			</>
		);
	},
};

/**
 * Input is a polymorphic component, the default root element is `input`, but it can be changed to any other element or component.
 *
 * Example of using react-imask with Input:
 *
 * ```js
 * import { Input } from '@mantine/core';
 * import { IMaskInput } from 'react-imask';
 *
 * function Demo() {
 *   return <Input component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="Your phone" />;
 * }
 * ```
 *
 * Example of using Input as button and select:
 */
export const Change_input_element: Story = {
	...Usage,
	render(props) {
		return (
			<>
				<TextInput {...props} component='button' pointer>
					Button input
				</TextInput>

				<TextInput
					{...props}
					component='select'
					rightSection={<IconChevronDown size={14} stroke={1.5} />}
					pointer
					mt='md'
				>
					<option value='1'>1</option>
					<option value='2'>2</option>
				</TextInput>
			</>
		);
	},
};
