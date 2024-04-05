import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { DocsContainer as BaseContainer } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import type { Preview, StoryContext } from '@storybook/react';
import { themes } from '@storybook/theming';
import React, { useEffect, useState } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
const channel = addons.getChannel();

function ColorSchemeWrapper({
	children,
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

	return children;
}

function DocsContainer({ children, context }) {
	const [dark, setDark] = useState(false);

	const handleColorScheme = (value: boolean) => {
		setDark(value);
	};

	useEffect(() => {
		channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);

		return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
	}, [channel]);

	return (
		<BaseContainer
			context={context}
			theme={dark ? themes.dark : themes.light}
		>
			{children}
		</BaseContainer>
	);
}

const decorators = [
	(Story: any, context: StoryContext) => (
		<ColorSchemeWrapper context={context}>
			<Story />
		</ColorSchemeWrapper>
	),
	(Story: any, context: StoryContext) => (
		<MantineProvider
			defaultColorScheme={context.globals.theme as 'light' | 'dark'}
		>
			<Story />
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
		docs: {
			container: DocsContainer,
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
