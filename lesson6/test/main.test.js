/**
 * Created by sylvie on 2016/6/3.
 */
var main = require('../main');
var should = require('should');

describe('this is a test for fibonacci',function(){
    it('should equal 55 when n = 10',function(){
        main.fibonacci(10).should.equal(55);
    });
    it('should be 0 when n = 0',function(){
        main.fibonacci(0).should.equal(0);
    });
    it('shoul be 1 when n = 1',function(){
        main.fibonacci(1).should.equal(1);
    });
    it('should throw when n<0',function(){
        (function(){
            main.fibonacci(-1)
        }).should.throw('n should >= 0');
    });
});