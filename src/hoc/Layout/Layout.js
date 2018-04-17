import React from 'react';

import './Layout.css';

import Navigation from '../../components/Navigation/Navigation';
    
const layout = (props) => {

    return (
        <div className="Layout">
            <div className="HeaderBackground"><Navigation /></div>
            <main className="Layout__main">
                {props.children}
            </main>
        </div>
    );
}

export default layout;