import { DEFAULT_TIMEZONE } from '../constants/common';

const moment = require('moment-timezone');
moment.tz.setDefault(DEFAULT_TIMEZONE);

export default moment;