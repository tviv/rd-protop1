import React from 'react';
import { storiesOf } from '@storybook/react';

import { InfoWindow, LegendWindow } from '.';
import { Button, Row, Col } from 'reactstrap';
import { LegendDescriptionType } from './LegendWindow';

storiesOf('InfoWindow', module)
    .addDecorator(storyFn => (
        <div style={{ minHeight: '300px' }}>{storyFn()}</div>
    ))
    .add('default', () => <InfoWindow body={legendBody} />)
    .add('jsx body', () => <InfoWindow title="Rich text" body={jsxBody} />)
    .add('custom button', () => (
        <InfoWindow
            body={jsxBody}
            element={<Button>Custom info button</Button>}
        />
    ))
    .add('Legend window', () => (
        <LegendWindow legend={legendBody} isLarge={true} />
    ));

const body = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.`;

const jsxBody = (
    <div>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
            attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
    </div>
);

const legendBody: LegendDescriptionType = {
    title: 'Daily report',
    desc: 'Report intended to show the level of profit the company by devisions.',
    signsCaption: 'Signs',
    termsCaption: 'Terms',
    signs: [
        { color: '#ffaa77', desc: 'Middle values' },
        { color: '#aaff77', desc: 'High values' },
        { color: '#77aaff', desc: 'Warning values' },
    ],
    terms: [
        { term: 'SLC', desc: 'Level of sales' },
        { term: 'B/E', desc: 'Basement on E' },
    ],
};
