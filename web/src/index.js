/**
 * Created by Administrator on 2017/8/15 0015.
 */

import  dva from 'dva';
// 1. Initialize
const app = dva({
    // history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/common'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');