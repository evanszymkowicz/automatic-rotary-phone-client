import React from 'react';
import { shallow } from 'enzyme';

import {Header} from './header';

describe('<Header/>', () => {
    let props = {firstName: "John"}
    it('Renders without crashing', () => {
        shallow(<Header {...props} />);
    });
});
