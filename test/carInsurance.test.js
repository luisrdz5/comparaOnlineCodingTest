const expect = require('chai').expect;

const CarInsurance = require('../src/lib/carInsurance');
const Product = require('../src/lib/product');

describe("carInsuranse Tests", function() {
    describe("Create Product test" , () => {
        it("should foo", function() {
            const coTest = new CarInsurance([ new Product("foo", 0, 0) ]);
            const products = coTest.updatePrice();
            expect(products[0].name).equal("foo");
          });

    })

    describe("Once the sell by date has passed, price degrades twice as fast" , () => { 
        it("Normal product must decrease in 2 Once the sell by date has passed", function() {
            const coTest = new CarInsurance([ new Product("Normal Product", -2, 8) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(6);
          });        
        it("Super Sale product must decrease in 4 Once the sell by date has passed", function() {
            const coTest = new CarInsurance([ new Product("Super Sale", -2, 8) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(4);
        });   
        it("Full Coverage product must increase in 2 Once the sell by date has passed", function() {
            const coTest = new CarInsurance([ new Product("Full Coverage", -2, 8) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(10);
        });       
    })
    describe("The price of a product is never negative" , () => { 
        it("Normal product never should be negative ", function() {
            const coTest = new CarInsurance([ new Product("Normal Product", -2, 0) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(0);
        });
        it("Super Sale product never should be negative ", function() {
            const coTest = new CarInsurance([ new Product("Super Sale", -2, 0) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(0);
        });
    })
    describe("The price of a product is never more than 50" , () => { 
        it("Normal product is never more than 50 ", function() {
            const coTest = new CarInsurance([ new Product("Normal Product", 6, 55) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(50);
          });
        it("Super Sale product is never more than 50 ", function() {
            const coTest = new CarInsurance([ new Product("Super Sale", 6, 60) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(50);
        });
        it("Full Coverage product is never more than 50 ", function() {
            const coTest = new CarInsurance([ new Product("Full Coverage", 6, 50) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(50);
            const coTest2 = new CarInsurance([ new Product("Full Coverage", 6, 55) ]);
            const products2 = coTest2.updatePrice();
            expect(products2[0].price).equal(50);
        });
        it("Special Full Coverage product is never more than 50 ", function() {
            const coTest = new CarInsurance([ new Product("Special Full Coverage", 6, 50) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(50);
            const coTest2 = new CarInsurance([ new Product("Special Full Coverage", 6, 55) ]);
            const products2 = coTest2.updatePrice();
            expect(products2[0].price).equal(50);
        });
    })
    describe("Full Coverage product tests" , () => { 
        it("Full Coverage product increases in price the older it gets. ", function() {
            const coTest = new CarInsurance([ new Product("Full Coverage", 6, 10) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(11);
        });
    })
    describe("Mega Coverage product tests" , () => { 
        it("Mega Coverage product never has to be sold or decreases in price ", function() {
            const coTest = new CarInsurance([ new Product("Mega Coverage", 6, 80) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(80);
        });
          it("Mega Coverage product always should have a price equal 80  ", function() {
            const coTest = new CarInsurance([ new Product("Mega Coverage", 6, 50) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(80);
        });
        
    })
    describe("Special Full Coverage product tests" , () => { 
        it("Special Full Coverage product increases in price the older it gets when there are 11 days or more ", function() {
            const coTest = new CarInsurance([ new Product("Special Full Coverage", 15, 10) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(11);
        });
        it("Special Full Coverage product price increases by 2 when there are 10 days or less ", function() {
            const coTest = new CarInsurance([ new Product("Special Full Coverage", 6, 10) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(12);
        });
        it("Special Full Coverage product price increases by 3 when there are 5 days or less ", function() {
            const coTest = new CarInsurance([ new Product("Special Full Coverage", 3, 10) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(13);
        });
        it("Special Full Coverage product price drops to 0 when no more days left ", function() {
            const coTest = new CarInsurance([ new Product("Special Full Coverage", 0, 10) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(0);
        });                  
    })
    describe("Super Sale product tests" , () => { 
        it("Super Sale product degrade in price twice as fast as normal Products", function() {
            const coTest = new CarInsurance([ new Product("Super Sale", 5, 8) ]);
            const products = coTest.updatePrice();
            expect(products[0].price).equal(6);
        });    
    })



});