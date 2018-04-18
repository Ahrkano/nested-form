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
            <div className="Layout__footer">
                <span>
                    developed by <a target="_blank" href="https://wojteki.github.io/portfolio/">WojteKi</a>
                </span>
            </div>
        </div>
    );
}

export default layout;