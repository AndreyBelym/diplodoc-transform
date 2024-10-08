import {LanguageFn} from 'highlight.js';
import DefaultMarkdownIt from 'markdown-it';
import DefaultStateCore from 'markdown-it/lib/rules_core/state_core';
import {SanitizeOptions} from './sanitize';
import {MarkdownItPluginCb} from './plugins/typings';
import {LogLevels} from './log';
import {ChangelogItem} from './plugins/changelog/types';

export interface MarkdownIt extends DefaultMarkdownIt {
    assets?: string[];
    meta?: string[];
}

export interface StateCore extends DefaultStateCore {
    md: MarkdownIt;
}

export interface CacheContext {
    get(key: string): string | null | undefined;
    set(key: string, value: string | null | undefined): void;
}

export type HighlightLangMap = Record<string, LanguageFn>;

export type Heading = {
    title: string;
    href: string;
    level: number;
    items?: Heading[];
};

export interface OptionsType {
    vars?: Record<string, string>;
    path?: string;
    extractTitle?: boolean;
    needTitle?: boolean;
    allowHTML?: boolean;
    linkify?: boolean;
    linkifyTlds?: string | string[];
    breaks?: boolean;
    conditionsInCode?: boolean;
    disableLiquid?: boolean;
    leftDelimiter?: string;
    rightDelimiter?: string;
    isLiquided?: boolean;
    needToSanitizeHtml?: boolean;
    sanitizeOptions?: SanitizeOptions;
    needFlatListHeadings?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins?: MarkdownItPluginCb<any>[];
    highlightLangs?: HighlightLangMap;
    extractChangelogs?: boolean;
    root?: string;
    rootPublicPath?: string;
    transformLink?: (href: string) => string;
    getPublicPath?: (options: OptionsType, href?: string) => string;
    renderInline?: boolean;
    cache?: CacheContext;
    tableBorder?: string;
    [x: string]: unknown;
}

export interface OutputType {
    result: {
        html: string;
    } & EnvType;
    logs: Record<LogLevels, string[]>;
}

export type EnvType<Extras extends {} = {}> = {
    title?: string;
    headings: Heading[];
    assets?: unknown[];
    meta?: object;
    changelogs?: ChangelogItem[];
} & Extras;
