/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

import {
	Buttons,
	ButtonsOption,
	Controls,
	IProgressBar,
	IToolbarCollection
} from './toolbar';
import { IComponent, IDictionary } from './types';
import { Attributes } from './create';
import { IStorage } from './storage';
import { IUIButtonState } from './ui';

interface ILanguageOptions {
	language?: string;
	debugLanguage?: boolean;
	i18n?: IDictionary<IDictionary<string>> | false;
}

interface IToolbarOptions {
	theme?: string;
	toolbar?: boolean | string | HTMLElement;
	toolbarButtonSize?: IUIButtonState['size'];
	textIcons?: boolean;

	extraButtons: Buttons;
	removeButtons: string[];

	buttons: ButtonsOption;

	showTooltip?: boolean;
	showTooltipDelay?: number;
	useNativeTooltip?: boolean;

	direction?: string;
}

type NodeFunction = (elm: HTMLElement) => void;

interface IViewOptions extends ILanguageOptions, IToolbarOptions {
	basePath?: string;

	disabled?: boolean;
	readonly?: boolean;
	iframe?: boolean;

	activeButtonsInReadOnly?: string[];

	allowTabNavigation?: boolean;

	zIndex?: number;
	fullsize?: boolean;
	globalFullsize?: boolean;

	controls?: Controls;

	createAttributes?: IDictionary<Attributes | NodeFunction>;
}

interface IPanel<T = IViewOptions> extends IComponent {
	container: HTMLElement;

	isLockedNotBy(name: string): boolean;
	isLocked(): boolean;

	lock(name?: string): boolean;
	unlock(): boolean;

	isFullSize: () => boolean;
	toggleFullSize(isFullSize?: boolean): void;

	options: T;
	o: this['options'];
}

interface IViewBased<T = IViewOptions> extends IPanel<T> {
	jodit: IViewBased;

	/**
	 * @property {string} ID attribute for source element, id add {id}_editor it's editor's id
	 */
	id: string;

	basePath: string;

	buffer: IStorage;

	progressbar: IProgressBar;

	options: T;
	// alias
	o: this['options'];

	i18n: (text: string, ...params: Array<string | number>) => string;

	defaultTimeout: number;

	getInstance<T = IComponent>(moduleName: string, options?: object): T;

	getVersion: () => string;

	components: Set<IComponent>;
}

interface IViewWithToolbar<T = IViewOptions> extends IViewBased<T> {
	toolbar: IToolbarCollection;
	toolbarContainer: HTMLElement;

	setPanel(element: HTMLElement | string): void;
}
