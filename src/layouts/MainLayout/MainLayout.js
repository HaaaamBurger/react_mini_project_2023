import React from 'react';

import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header";


const MainLayout = () => {
    return (
        <div className={'layoutWrapper'} style={{height: '100vh', overflow: 'auto'}}>
            <div>
                <Header/>
            </div>
            <div style={{height: '100%',overflow: 'auto'}}>
                <Outlet/>
            </div>
        </div>
    );
};

export {
    MainLayout,
};