import React from 'react';

import './Layout.css';

import Navigation from '../../components/Navigation/Navigation';
    
const layout = (props) => {

    return (
        <div className="Layout">
            <div className="Layout__header-background"><Navigation /></div>
            <main className="Layout__main">
                {props.children}
            </main>
        </div>
    );
}

export default layout;