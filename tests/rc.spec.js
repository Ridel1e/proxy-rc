import sinon from 'sinon';
import chai from 'chai';
import createRCBuilder from '../src/proxy-rc.builder';

chai.should();

const rcBuilder = createRCBuilder();
const rc = rcBuilder.baseUrl('www.test.ru').build();

describe ('RestClient', () => {});
