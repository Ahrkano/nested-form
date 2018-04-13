import React from 'react';

import './Layout.css';

import Navigation from '../../components/Navigation/Navigation';
    
const layout = (props) => {

    return (
        <div className="Layout">
            <Navigation />
            <main className="Layout__main">
                {props.children}
            </main>
        </div>
    );
}

export default layout;