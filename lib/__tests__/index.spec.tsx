import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {HashRouter} from "react-router-dom";
import {CacheSwitch, CacheRoute} from "../index";

test("render router", () => {
    const component = renderer.create(
        <HashRouter>
            <CacheSwitch>
                <CacheRoute path="/" render={() => <div>123321</div>}/>
            </CacheSwitch>
        </HashRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
