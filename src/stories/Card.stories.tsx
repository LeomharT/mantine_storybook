import {
	ActionIcon,
	Badge,
	Button,
	Card,
	Divider,
	Group,
	Image,
	Menu,
	SimpleGrid,
	Stack,
	Text,
	rem,
} from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
/**
 * Card with sections
 */
const meta = {
	tags: ['autodocs'],
	title: 'Example/Card',
	component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const OPTIONS_SIZE = ['xs', 'sm', 'md', 'lg', 'xl'];

const MAW = '340PX';

/**
 * `Card` is a wrapper around Paper component with some additional styles and Card.
 * Section component that allows to split card into sections.
 * If you do not need sections, you use Paper component instead.
 */
export const Usage: Story = {
	args: {
		size: 'md',
		shadow: 'sm',
		padding: 'lg',
		radius: 'md',
		withBorder: true,
	},
	argTypes: {
		size: {
			control: 'select',
			options: OPTIONS_SIZE,
		},
		padding: {
			control: 'select',
			options: OPTIONS_SIZE,
		},
		shadow: {
			control: 'select',
			options: OPTIONS_SIZE,
		},
		radius: {
			control: 'select',
			options: OPTIONS_SIZE,
		},
		withBorder: {
			contorl: 'boolean',
		},
	},
	render(props) {
		return (
			<Card {...props} maw={MAW} ml={'auto'} mr={'auto'}>
				<Card.Section>
					<Image
						src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
						height={160}
						alt='Norway'
					/>
				</Card.Section>
				<Group justify='space-between' mt='md' mb='xs'>
					<Text fw={500}>Norway Fjord Adventures</Text>
					<Badge color='pink'>On Sale</Badge>
				</Group>
				<Text size='sm' c='dimmed'>
					With Fjord Tours you can explore more of the magical fjord
					landscapes with tours and activities on and around the
					fjords of Norway
				</Text>
				<Button color='blue' fullWidth mt='md' radius='md'>
					Book classic tour now
				</Button>
			</Card>
		);
	},
};

/**
 * Card is a polymorphic component component, you can change its root element:
 */
export const Polymorphic_Component: Story = {
	...Usage,
	args: {
		...Usage.args,
		component: 'a',
	},
	render(props) {
		return (
			<Card
				maw={MAW}
				ml={'auto'}
				mr={'auto'}
				component='a'
				href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
				target='_blank'
				{...props}
			>
				<Card.Section>
					<Image
						src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
						h={160}
						alt='No way!'
					/>
				</Card.Section>
				<Text fw={500} size='lg' mt='md'>
					You&apos;ve won a million dollars in cash!
				</Text>
				<Text mt='xs' c='dimmed' size='sm'>
					Please click anywhere on this card to claim your reward,
					this is not a fraud, trust us
				</Text>
			</Card>
		);
	},
};

/**
 * `Card.Section` is a special component that is used to remove Card padding from its children while other elements still have horizontal spacing.
 * `Card.Section` works the following way:
 * - If component is the first child in Card, then it has negative top, left and right margins
 * - If it is the last child in Card, then it has negative bottom, left and right margins
 * - If it is in the middle then, only the left and right margins will be negative
 *
 * ```
 * import { Card } from '@mantine/core';
 * function Demo() {
 * return (
 *   <Card padding="xl">
 *
 * 	 //top, right, left margins are negative – -1 * theme.spacing.xl
 *      <Card.Section>First section</Card.Section>
 *
 *      //Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card
 *      <Text>Some other content</Text>
 *
 *      //right, left margins are negative – -1 * theme.spacing.xl
 *      <Card.Section>Middle section</Card.Section>
 *
 *      //bottom, right, left margins are negative – -1 * theme.spacing.xl
 *      <Card.Section>Last section</Card.Section>
 *   </Card>
 *  );
 * }
 * ```
 *
 * Note that `Card` relies on mapping direct children and you cannot use fragments or others wrappers for `Card.Section`:
 *
 * ```
 * import { Card } from '@mantine/core';
 * function Demo() {
 *   return (
 *     <Card padding="xl">
 *       <div>
 *         <Card.Section>Won't work</Card.Section>
 *       </div>
 *
 *       <>
 *        <Card.Section>Won't work either</Card.Section>
 *       </>
 *
 *       <Card.Section>Works fine</Card.Section>
 *   </Card>
 *  );
 * }
 * ```
 */
export const Card_Section: Story = {
	...Usage,
	render(props) {
		return (
			<Stack>
				<Card padding='xl' {...props} shadow='none'>
					{/* top, right, left margins are negative – -1 * theme.spacing.xl */}
					<Card.Section>First section</Card.Section>
					{/* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card */}
					<Text>Some other content</Text>
					{/* right, left margins are negative – -1 * theme.spacing.xl */}
					<Card.Section>Middle section</Card.Section>
					{/* bottom, right, left margins are negative – -1 * theme.spacing.xl */}
					<Card.Section>Last section</Card.Section>
				</Card>
				<Divider />
				<Card padding='xl' {...props} shadow='none'>
					<div>
						<Card.Section>Won't work</Card.Section>
					</div>
					<>
						<Card.Section>Won't work either</Card.Section>
					</>
					<Card.Section>Works fine</Card.Section>
				</Card>
			</Stack>
		);
	},
};

/**
 * - `withBorder` prop adds top and bottom border to `Card.Section` depending on its position relative to other content and sections
 * - `inheritPadding` prop adds the same left and right padding to `Card.Section` as set in Card component
 */
export const WithBorder_and_inheritPadding_props: Story = {
	...Usage,
	render(props) {
		const images = [
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
		];

		return (
			<Card
				mr={'auto'}
				ml={'auto'}
				maw={MAW}
				withBorder
				shadow='sm'
				radius='md'
				{...props}
			>
				<Card.Section withBorder inheritPadding py='xs'>
					<Group justify='space-between'>
						<Text fw={500}>Review pictures</Text>
						<Menu withinPortal position='bottom-end' shadow='sm'>
							<Menu.Target>
								<ActionIcon variant='subtle' color='gray'>
									<IconDots
										style={{
											width: rem(16),
											height: rem(16),
										}}
									/>
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item
									leftSection={
										<IconFileZip
											style={{
												width: rem(14),
												height: rem(14),
											}}
										/>
									}
								>
									Download zip
								</Menu.Item>
								<Menu.Item
									leftSection={
										<IconEye
											style={{
												width: rem(14),
												height: rem(14),
											}}
										/>
									}
								>
									Preview all
								</Menu.Item>
								<Menu.Item
									leftSection={
										<IconTrash
											style={{
												width: rem(14),
												height: rem(14),
											}}
										/>
									}
									color='red'
								>
									Delete all
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Card.Section>

				<Text mt='sm' c='dimmed' size='sm'>
					<Text span inherit c='var(--mantine-color-anchor)'>
						200+ images uploaded
					</Text>
					since last visit, review them to select which one should be
					added to your gallery
				</Text>

				<Card.Section mt='sm'>
					<Image src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png' />
				</Card.Section>

				<Card.Section inheritPadding mt='sm' pb='md'>
					<SimpleGrid cols={3}>
						{images.map((image) => (
							<Image src={image} key={image} radius='sm' />
						))}
					</SimpleGrid>
				</Card.Section>
			</Card>
		);
	},
};
