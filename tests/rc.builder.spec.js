import sinon from 'sinon';
import chai from 'chai';
import createRCBuilder from '../src/proxy-rc.builder';

chai.should();

describe('createRCBuilder', () => {
   it ('should create an object', () => {
     const rcBuilder = createRCBuilder();

     rcBuilder.should.be.an('object');
   });
});

describe('RCBuilder', () => {
  describe ('#baseUrl', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should return current base url if it calls without args', () => {
      rcBuilder.baseUrl().should.be.equal('');
    });

    it ('should throw error if first argument is not a string', () => {
      rcBuilder.baseUrl.bind(rcBuilder, 1).should.throw();
    });

    it ('should set current base url if it calls with correct args', () => {
      rcBuilder.baseUrl('www.test.ru');
      rcBuilder.baseUrl().should.be.equal('www.test.ru');
    });

    it ('should return this if it calls with correct args', () => {
      rcBuilder.baseUrl('www.test.ru').should.be.equal(rcBuilder);
    });
  });

  describe ('#suffix', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should return current suffix if it calls without args', () => {
      // (rcBuilder.suffix() === null).should.be.true;
    });

    it ('should throw error if first argument is not a string', () => {
      rcBuilder.suffix.bind(rcBuilder, {}).should.throw();
    });

    it ('should set current suffix if it calls with correct args', () => {
      rcBuilder.suffix('json');
      rcBuilder.suffix().should.be.equal('json');
    });

    it ('should return this if it calls with correct args', () => {
      rcBuilder.suffix('json').should.be.equal(rcBuilder);
    });
  });

  describe ('#contentType', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should return current content type if it calls without args', () => {
      rcBuilder.contentType().should.be.equal('application/json');
    });

    it ('should throw error if first argument is not a string', () => {
      rcBuilder.contentType.bind(rcBuilder, {}).should.throw();
    });

    it ('should set content type if it calls with correct args', () => {
      rcBuilder.contentType('application/xml');
      rcBuilder.contentType().should.be.equal('application/xml');
    });

    it ('should return this if it calls with correct args', () => {
      rcBuilder.contentType('application/xml').should.be.equal(rcBuilder);
    });
  });

  describe ('#trailing', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should return current trailing symbol if it calls without args', () => {
      rcBuilder.trailing().should.be.equal(''); 
    });

    it ('should throw error if first arg is not a string', () => {
      rcBuilder.trailing.bind(rcBuilder, {}).should.throw();
    });

    it ('should set trailing symbol if it calls with correct args', () => {
      rcBuilder.trailing('/');
      rcBuilder.trailing().should.be.equal('/');
    });

    it ('should return this if it calls with correct args', () => {
      rcBuilder.trailing('/').should.be.equal(rcBuilder);
    });
  });

  describe ('on', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should throw error if first argument is not a string', () => {
      rcBuilder.on.bind(rcBuilder, {}).should.throw();
    });

    it ('should throw error if second argument is not a function', () => {
      rcBuilder.on.bind(rcBuilder, 'request', {}).should.throw();
    });

    it ('should add new interceptor if it calls with correct args', () => {
      const noop = () => {};
      rcBuilder.on('request', noop);

      rcBuilder._conf.interceptors.request[0].should.be.equal(noop);
    });

    it ('should return this if it calls with correct args', () => {
      rcBuilder.on('request', () => {}).should.be.equal(rcBuilder);
    });
  });

  describe ('#config', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should return current config if it calls without args', () => {
      rcBuilder.config().should.be.equal(rcBuilder._conf);
    });

    it ('should throw error if first arg is not an object', () => {
      rcBuilder.config.bind(rcBuilder, '').should.throw();
    });

    it ('should set new value to nesessary prop if it calls with correct arg', () => {
      rcBuilder.config({ baseUrl: 'www.test.ru'});
      rcBuilder.config().baseUrl.should.be.equal('www.test.ru');
    });

    it ('should return this if it calls with correct arg', () => {
      rcBuilder.config({ baseUrl: 'www.test.ru' }).should.be.equal(rcBuilder);
    });
  });

  describe ('#addMime', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should throw error if first argument is not a string', () => {
      rcBuilder.addMime.bind(rcBuilder, {}).should.throw();
    });

    it ('should throw error if second arg is not an object', () => {
      rcBuilder.addMime.bind(rcBuilder, 'test', 123).should.throw();
    });

    it ('should throw error if decode/encode prop of second arg is not a function', () => {
      rcBuilder.addMime.bind(rcBuilder, 'test', { encode: '123' }).should.throw();
    });

    it ('should add new mime if it calls with correct args', () => {
      const mime = {encode: () => {}, decode: () => {}};

      rcBuilder.addMime('test', mime);
      rcBuilder._conf.mimes['test'].should.be.equal(mime);
    });

    it ('should return this if it calls with correct args', () => {
      const mime = {encode: () => {}, decode: () => {}};

      rcBuilder.addMime('test', mime).should.be.equal(rcBuilder);
    })
  });

  describe ('#build', () => {
    let rcBuilder;

    beforeEach(() => rcBuilder = createRCBuilder());

    it ('should create an object', () => {
      rcBuilder.build().should.be.an('object');
    });
  })
});
