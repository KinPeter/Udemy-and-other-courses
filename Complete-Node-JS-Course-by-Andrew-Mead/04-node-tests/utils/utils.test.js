const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {
    it('should add two numbers', () => {
        var res = utils.add(33, 11);
        
        expect(res).toBe(44).toBeA('number');
    });
    
    it('should async add two numbers', (done) => {
        utils.asyncAdd(3, 4, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
        
    });
    
    it('should squarea number', () => {
        var res = utils.square(10);
        
        expect(res).toBe(100).toBeA('number');
    });
    
});

describe('Others', () => {
    it('should expect some values', () => {   
        // expect(12).toNotBe(11).toBeA('number');
        // expect({name: 'peter'}).toNotEqual({name: 'Peter'});
        // expect([2, 3, 4]).toInclude(2);
        // expect([2, 3, 4]).toExclude(5);
        // expect({
        //     name: 'Peter',
        //     age: 33,
        //     location: 'Budapest'
        // }).toInclude({
        //     age: 33
        // });

    });

    it('should set last and first name', () => {   
        var user = {
            age: 33,
            location: 'Budapest'
        };

        var res = utils.setName(user, 'Peter Kin');

        expect(res).toInclude({firstName: 'Peter', lastName: 'Kin'}).toBeA('object');

    });
});