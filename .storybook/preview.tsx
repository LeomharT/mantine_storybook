import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { addons } from '@storybook/preview-api';
import type { Preview, StoryContext } from '@storybook/react';
import React, { useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

function ColorSchemeWrapper({
	children,
	context,
}: {
	children: React.ReactNode;
	context: StoryContext;
}) {
	const { setColorScheme } = useMantineColorScheme();

	const handleColorScheme = (value: boolean) => {
		setColorScheme(value ? 'dark' : 'light');
	};

	useEffect(() => {
		channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);

		return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
	}, [channel]);

	useEffect(() => {
		channel.emit(DARK_MODE_EVENT_NAME, context.globals.theme === 'dark');
	}, [context.globals.theme]);

	return children;
}

const decorators = [
	(renderStory: any, context: StoryContext) => (
		<ColorSchemeWrapper context={context}>
			{renderStory()}
		</ColorSchemeWrapper>
	),
	(renderStory: any, context: StoryContext) => (
		<MantineProvider
			defaultColorScheme={context.globals.theme as 'light' | 'dark'}
		>
			{renderStory()}
		</MantineProvider>
	),
];

const preview: Preview = {
	decorators,
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'sun',
				items: ['light', 'dark'],
				dynamicTitle: true,
			},
		},
	},
};

export default preview;
