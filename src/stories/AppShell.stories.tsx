import {
	AppShell,
	AppShellProps,
	Burger,
	Group,
	Skeleton,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Example/AppShell',
	component: AppShell,
} satisfies Meta<AppShellProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	tags: ['autodocs'],
	render() {
		return <AppShellExample />;
	},
};

function AppShellExample() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding='md'
		>
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom='sm'
						size='sm'
					/>
					<MantineLogo size={30} />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p='md'>
				Navbar
				{Array(15)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} h={28} mt='sm' animate={false} />
					))}
			</AppShell.Navbar>
			<AppShell.Main>Main</AppShell.Main>
		</AppShell>
	);
}
