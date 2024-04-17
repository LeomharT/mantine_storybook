import { Button, ButtonProps, Group } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowRight, IconDownload, IconPhoto } from '@tabler/icons-react';

/**
 * Button component to render button or link
 */
const meta = {
	title: 'Example/Button',
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

const SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

const BUTTON_SIZE = [
	...SIZE,
	'compact-xs',
	'compact-sm',
	'compact-md',
	'compact-lg',
	'compact-xl',
];

const BUTTON_VARIANT = [
	'default',
	'filled',
	'light',
	'outline',
	'subtle',
	'transparent',
	'white',
];

type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	args: {
		children: 'Button',
		variant: 'filled',
		size: 'sm',
		radius: 'sm',
		color: '#228be6',
		fullWidth: false,
	},
	argTypes: {
		children: {
			control: 'text',
			type: 'React.ReactNode',
			description: 'Button content',
			table: {
				defaultValue: { summary: 'Button' },
			},
		},
		variant: {
			control: 'select',
			description: 'Button variant',
			options: BUTTON_VARIANT,
			table: {
				defaultValue: { summary: 'filled' },
			},
		},
		size: {
			control: 'select',
			type: 'MantineSize | (string & {}) | "compact-xs" | "compact-sm" | "compact-md" | "compact-lg" | "compact-xl"',
			description: `Controls button height, font-size and horizontal padding, 'sm' by default`,
			options: BUTTON_SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
		radius: {
			control: 'select',
			type: 'MantineRadius | number',
			description:
				'Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default',
			options: SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
		color: {
			control: 'color',
			type: 'string',
			description:
				'Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default',
			table: { defaultValue: { summary: '#228be6' } },
		},
		fullWidth: {
			control: 'boolean',
			type: 'boolean',
			description:
				'Determines whether button should take 100% width of its parent container, `false` by default',
			table: { defaultValue: { summary: false } },
		},
	},
};

/**
 * If `fullWidth` prop is set `Button` will take 100% of parent width:
 */
export const Full_Width: Story = {
	...Usage,
	args: {
		...Usage.args,
		fullWidth: true,
	},
};

/**
 * `leftSection` and `rightSection` allow adding icons or any other element to the left and right side of the button.
 * When a section is added, padding on the corresponding side is reduced.
 * Note that `leftSection` and `rightSection` are flipped in RTL mode (`leftSection` is displayed on the right and `rightSection` is displayed on the left).
 */
export const Left_and_right_sections: Story = {
	...Usage,
	args: {
		...Usage.args,
	},
	render: (props) => (
		<Group justify='center'>
			<Button
				{...props}
				leftSection={<IconPhoto size={14} />}
				variant='default'
			>
				Gallery
			</Button>

			<Button {...props} rightSection={<IconDownload size={14} />}>
				Download
			</Button>

			<Button
				{...props}
				variant='light'
				leftSection={<IconPhoto size={14} />}
				rightSection={<IconArrowRight size={14} />}
			>
				Visit gallery
			</Button>
		</Group>
	),
};

/**
 * `justify` prop sets `justify-content` of `inner` element.
 * You can use it to change the alignment of left and right sections.
 * For example, to spread them across the button set `justify="space-between"`.
 *
 * If you need to align just one section to the side of the button set `justify` to` space-between` and add empty `<span />`to the opposite section.
 */
export const Sections_position: Story = {
	...Usage,
	args: {
		...Usage.args,
		fullWidth: true,
		variant: 'default',
		justify: 'center',
	},
	argTypes: {
		...Usage.argTypes,
		justify: {
			control: 'select',
			description:
				'Sets `justify-content`of inner element, can be used to change distribution of sections and label, `"center"` by default',
			type: 'JustifyContent',
			table: {
				defaultValue: { summary: 'center' },
			},
			options: ['center', 'space-between'],
		},
	},
	render(props) {
		const icon = <IconPhoto size={14} />;

		return (
			<>
				<Button {...props} leftSection={icon} rightSection={icon}>
					Button label
				</Button>
				<Button {...props} leftSection={icon} mt='md'>
					Button label
				</Button>
				<Button {...props} rightSection={icon} mt='md'>
					Button label
				</Button>
				<Button
					{...props}
					rightSection={icon}
					leftSection={<span />}
					mt='md'
				>
					Button label
				</Button>
			</>
		);
	},
};

/**
 * Button supports `xs` – `xl` and `compact-xs` – `compact-xl` sizes.
 * `compact` sizes have the same font-size as `xs` – `xl` but reduced padding and height.
 */
export const Compact_size: Story = {
	...Usage,
	argTypes: {
		size: {
			control: 'select',
			type: 'MantineSize | (string & {}) | "compact-xs" | "compact-sm" | "compact-md" | "compact-lg" | "compact-xl"',
			description: `Controls button height, font-size and horizontal padding, 'sm' by default`,
			options: SIZE,
			table: {
				defaultValue: { summary: 'sm' },
			},
		},
	},
	render: (props: Partial<ButtonProps>) => {
		const compact_size = `compact-${props.size}`;

		return (
			<Group justify='center'>
				<Button {...props}>Regular md</Button>
				<Button {...props} size={compact_size}>
					Compact md
				</Button>
			</Group>
		);
	},
};

/**
 * When `variant` prop is set to `gradient`, you can control gradient with `gradient` prop, it accepts an object with `from`, `to` and `deg` properties.
 * If thegradient prop is not set, Button will use theme.defaultGradient which can be configured on the theme object.
 * gradient prop is ignored when `variant` is not `gradient`.
 *
 * Note that `variant="gradient"` supports only linear gradients with two colors.
 * If you need a more complex gradient, then use Styles API to modify `Button` styles.
 */
export const Gradient_variant: Story = {
	args: { gradient_from: '#228be6', gradient_to: '#15aabf', deg: 90 },
	argTypes: {
		gradient_from: {
			control: 'color',
			type: 'string',
			description:
				'Gradient configuration used when `variant="gradient"`, default value is t`heme.defaultGradient`',
			table: { defaultValue: { summary: '#228be6' } },
		},
		gradient_to: {
			control: 'color',
			type: 'string',
			description:
				'Gradient configuration used when `variant="gradient"`, default value is t`heme.defaultGradient`',
			table: { defaultValue: { summary: '#15aabf' } },
		},
		deg: {
			control: 'range',
			min: 0,
			max: 360,
			step: 1,
		},
	},
	render(props: any) {
		return (
			<Button
				{...props}
				variant='gradient'
				gradient={{
					from: props.gradient_from,
					to: props.gradient_to,
					deg: props.deg,
				}}
			>
				Gradient button
			</Button>
		);
	},
};

/**
 * To make `Button` disabled, set `disabled` prop, this will prevent any interactions with the button and add disabled styles.
 * If you want the button to just look disabled but still be interactive, set `data-disabled` prop instead.
 * Note that disabled styles are the same for all variants.
 */
export const Disabled_state: Story = {
	args: {
		disabled: true,
	},
	argTypes: {
		disabled: {
			control: 'boolean',
		},
	},
	render(props) {
		return <Button {...props}>Disabled button</Button>;
	},
};

/**
 * `<a />` element does not support `disabled` attribute.
 * To make `Button` disabled when it is rendered as a link, set `data-disabled` attribute instead and prevent default behavior in onClick event handler.
 */
export const Disabled_state_when_Button_is_link: Story = {
	...Disabled_state,
	render(props: any) {
		return (
			<Button
				{...props}
				component='a'
				href='https://mantine.dev'
				data-disabled={props.disabled}
				onClick={(event) => event.preventDefault()}
			>
				Disabled link
			</Button>
		);
	},
};

/**
 * When `loading` prop is set, `Button` will be disabled and `Loader` with overlay will be rendered in the center of the button.
 * `Loader` color depends on Button variant.
 */
export const Loading_state: Story = {
	args: {
		loading: true,
	},
	render(props) {
		return (
			<>
				<Group>
					<Button {...props}>Filled button</Button>
					<Button variant='light' {...props}>
						Light button
					</Button>
					<Button variant='outline' {...props}>
						Outline button
					</Button>
				</Group>
			</>
		);
	},
};

/**
 * You can customize Loader with loaderProps prop, it accepts all props that Loader component has:
 */
export const Loader_props: Story = {
	...Loading_state,
	render(props) {
		return (
			<Button {...props} loaderProps={{ type: 'dots' }}>
				Loading button
			</Button>
		);
	},
};
