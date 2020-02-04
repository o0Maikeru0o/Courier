import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

configure({ adapter: new Adapter() });
