import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { addons } from '@storybook/preview-api';
import type { Preview, StoryContext } from '@storybook/react';
import { themes } from '@storybook/theming';
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
		darkMode: {
			// Override the default dark theme
			dark: { ...themes.dark },
			// Override the default light theme
			light: { ...themes.normal },
		},
	},
	globalTypes: {
		locale: {
			description: 'Internationalization locale',
			defaultValue: 'en',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'en', right: '🇺🇸', title: 'English' },
					{ value: 'zh', right: '🇨🇳', title: '简体中文' },
				],
			},
		},
	},
};

export default preview;
