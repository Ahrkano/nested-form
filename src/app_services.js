import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Aux from './hoc/Auxiliary/Auxiliary';

import PreviewTab from './containers/PreviewTab/PreviewTab';
import ExportTab from './containers/ExportTab/ExportTab';

export const returnAdditionalRoutes = areInputsFilled => {
    if (areInputsFilled) {
        return (
            <Aux>
                <Route path="/Preview" component={PreviewTab} />
                <Route path="/Export" component={ExportTab} />
            </Aux>
        );
    } else {
        return null;
    }
};

export const returnAdditionalRedirections = areInputsFilled => {
    if (!areInputsFilled) {
        return (
            <Aux>
                <Redirect from="/Preview" exact to="/Create" />
                <Redirect from="/Export" exact to="/Create" />
            </Aux>
        );
    } else {
        return null;
    }
};
