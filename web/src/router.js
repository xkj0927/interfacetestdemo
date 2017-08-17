/**
 * Created by Administrator on 2017/8/15 0015.
 */
import React from 'react';
import { Router, Route } from 'dva/router';
import HomeLayout from './components/layouts/HomeLayout';

// const cached = {};
// function registerModel(app, model) {
//     if (!cached[model.namespace]) {
//         app.model(model);
//         cached[model.namespace] = 1;
//     }
// }
//
// function requireModel(app, ...models){
//     require.ensure([],(require) =>{
//         for(let i in models){
//             registerModel(app, require("./models/" + models[i]));
//         }
//     });
// }
function requireRoute(cb, ...routes){
    require.ensure([], (require) => {
        for(let i in routes){
            cb(null, require("./routes/" + routes[i]));
        }
    });
}

function RouterConfig({ history, app}) {
   debugger;
    const routes=[
        {
            path:"/",
            // onEnter: () => {
            //     requireModel(app, 'common', 'i18n');
            // },
            // getComponent(nextState, cb) {
            //     requireRoute(cb, 'App');
            // },
            indexRoute:{
                getComponent(nextstate, cb){
                    requireRoute(cb,'LoginPage');
                },
            },
            childRoutes:[{
                component:HomeLayout,
                childRoutes:[
                    {
                        path: 'home',
                        getComponent(nextState, cb){
                            requireRoute(cb, 'HomePage');
                    },
                    },
                ]
            }]
        }
    ];

    return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
