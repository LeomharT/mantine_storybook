/** @jsxImportSource @emotion/react */
import { CSSObject } from '@emotion/react';
import { SimpleGrid, SimpleGridProps } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Example/SimpleGrid',
	component: SimpleGrid,
} satisfies Meta<SimpleGridProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const gridItemStyle: CSSObject = {
	padding: '1rem',
	background: '#e7f5ff',
	textAlign: 'center',
	fontWeight: 700,
	color: '#228be6',
};

export const Usage: Story = {
	args: {
		cols: 3,
	} as SimpleGridProps,
	argTypes: {
		cols: {
			control: { type: 'range', min: 1, max: 5, step: 1 },
		},
	},
	render(props) {
		return (
			<SimpleGrid {...props}>
				<div css={gridItemStyle}>1</div>
				<div css={gridItemStyle}>2</div>
				<div css={gridItemStyle}>3</div>
				<div css={gridItemStyle}>4</div>
				<div css={gridItemStyle}>5</div>
			</SimpleGrid>
		);
	},
};
