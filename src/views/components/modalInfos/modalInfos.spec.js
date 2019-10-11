import React from 'react';
import renderer from 'react-test-renderer';
//import 'jest-styled-components';

import { InfoWindow } from '.';

describe('Button', () => {
    test('primary', () => {
        const tree = renderer.create(<InfoWindow body={'test'} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
