import { Button, ButtonVariant, Group } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowRight, IconDownload, IconPhoto } from '@tabler/icons-react';

/**
 * Button component to render button or link
 */
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
		radius: 'sm',
		color: '#228be6',
		fullWidth: false,
	},
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
			control: 'select',
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
		radius: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
 * > ####Polymorphic components with TypeScript
 * Note that polymorphic components props types are different from regular components – they do not extend HTML element props of the default element.
 * For example, `ButtonProps` does not extend `React.ComponentPropsWithoutRef'<'div'>'` although button is the default element.
 * If you want to create a wrapper for a polymorphic component that is not polymorphic (does not support component prop), then your `component` props interface should extend HTML element props, for example:
 *
 * ```
 * import type { ButtonProps, ElementProps } from '@mantine/core';
 * interface MyButtonProps extends ButtonProps,
 * ElementProps<'a', keyof ButtonProps> {}
 * ```
 *
 * If you want your component to remain polymorphic after wrapping, use createPolymorphicComponent function described in this guide.
 */
export const Polymorphic_component: Story = {
	...Usage,
	args: {
		...Usage.args,
		component: 'button',
	},
};
