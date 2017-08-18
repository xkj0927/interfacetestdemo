/**
 * Created by Administrator on 2017/8/15 0015.
 */

import dva from 'dva';
import createLoading from 'dva-loading';
import message from 'antd/lib/message';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import {addLocaleData} from 'react-intl';

addLocaleData([...en, ...zh]);

// 1. Initialize
const app = dva({
  onError: (e) => {
    message.error(e.message);
  },
});

// 2. Plugins
app.use(createLoading({effects: true}));

// 3. Model

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
