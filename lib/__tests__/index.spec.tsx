import * as React from 'react';
import {HashRouter, Link} from "react-router-dom";
import {CacheSwitch, CacheRoute} from "../index";
import {fireEvent, render} from '@testing-library/react';

test("render router", () => {
    const component = render(
        <HashRouter>
            <CacheSwitch>
                <CacheRoute path="/" exact render={() => <div><Link to="/home">123</Link></div>}/>
                <CacheRoute path="/home" exact render={() => <div>home page </div>}/>
            </CacheSwitch>
        </HashRouter>
    );
    component.debug();
    fireEvent.click(component.getByText(/123/i));
    component.debug();

    expect(component).toMatchSnapshot();
});
