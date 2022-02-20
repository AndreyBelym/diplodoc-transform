import getHeadings from '../src/transform/headings';
import {tokenize} from './utils';

type Head = {
    title: string, level: number, href: string, items?: Head[]
}

function item(title: string, level: number, items?: Head[]) {
    const result: Head = {
        title,
        level,
        href: '#',
    };

    if (items) {
        result.items = items;
    }

    return result;
}

describe('Headings', () => {
    test('should have correct level nesting', () => {
        expect(
            getHeadings(tokenize([
                '# Level 1',
                '## Level 2 (1)',
                '### Level 3 (1)',
                '#### Level 4 (1)',
                '## Level 2 (2)',
                '## Level 2 (3)',
                '### Level 3 (2)',
                '### Level 3 (3)',
            ])),
        ).toEqual([
            item('Level 2 (1)', 2, [
                item('Level 3 (1)', 3, [
                    item('Level 4 (1)', 4),
                ]),
            ]),
            item('Level 2 (2)', 2),
            item('Level 2 (3)', 2, [
                item('Level 3 (2)', 3),
                item('Level 3 (3)', 3),
            ]),
        ]);
    });

    test('should skip not expected child levels', () => {
        expect(
            getHeadings(tokenize([
                '## Level 2 (1)',
                '#### Level 4 (1)',
                '### Level 3 (1)',
                '##### Level 5 (1)',
                '#### Level 4 (2)',
            ])),
        ).toEqual([
            item('Level 2 (1)', 2, [
                item('Level 3 (1)', 3, [
                    item('Level 4 (2)', 4),
                ]),
            ]),
        ]);
    });

    test('should skip till reaching level 2', () => {
        expect(
            getHeadings(tokenize([
                '#### Level 4',
                '## Level 2',
            ])),
        ).toEqual([
            item('Level 2', 2),
        ]);
    });

    test('should skip all levels', () => {
        expect(
            getHeadings(tokenize([
                '### Level 3 (1)',
                '### Level 3 (2)',
            ])),
        ).toEqual([]);
    });
});
