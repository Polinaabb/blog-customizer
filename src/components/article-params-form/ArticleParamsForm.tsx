import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	ArticleStateType,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

import { useState, FormEvent, useRef } from 'react';
import clsx from 'clsx';

import { useOpenCloseForm } from './hooks/useOpenCloseForm';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	params,
	onChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState(
		params.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(params.fontSizeOption);

	const [fontColor, setFontColor] = useState(params.fontColor);

	const [backgroundColor, setBackground] = useState(params.backgroundColor);

	const [contentWidth, setContentWidth] = useState(params.contentWidth);

	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleArrowButtonClick = useOpenCloseForm({
		isOpen,
		setIsOpen,
		wrapperRef,
	});

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	const handleResetForm = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onChange(defaultArticleState);
	};

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={setFontSizeOption}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={setBackground}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
