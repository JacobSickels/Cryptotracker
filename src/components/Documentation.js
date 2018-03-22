import React from 'react';
import { Row, Col, SideNav, SideNavItem, Icon, Collapsible, CollapsibleItem } from 'react-materialize';

class Documentation extends React.Component {
    render() {
        return (
            <div className="doc">
                <header>
                    <SideNav
                        trigger={<button className="button hide-on-large-only"><Icon>menu</Icon></button>}
                        options={{ closeOnClick: true }}
                        className="side-nav fixed"
                        >
                        <li className="logo" href='/dashboard'>
                            <img src="/images/loader.gif" />
                        </li>
                        <Collapsible>
                            <CollapsibleItem header='Components'>
                                <a href='#!icon'>First Link With Icon</a>
                            </CollapsibleItem>
                            <CollapsibleItem header='Tests'>
                                <a href='#!icon'>First Link With Icon</a>
                            </CollapsibleItem>
                            <CollapsibleItem header='Redux' icon='whatshot'>
                                <a href='#redux-store'>Store</a>
                                <a href='#redux-reducers'>Reducers</a>
                                <a href='#redux-actions'>Actions</a>
                            </CollapsibleItem>
                        </Collapsible> 
                    </SideNav>
                </header>
                <main>
                    <div className="doc-header">
                        <div className="container">
                            <h1>Documentation</h1>
                        </div>
                    </div>
                    <div className="doc-content">
                        <div className="container">
                            Here is some more content;
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Documentation;