class CarInsurance {
    constructor(products){
        this.products=products 
    }
    updatePrice(){
        this.products.map((product) => {
            product.sellIn--;
            switch(product.name){
                case 'Full Coverage':
                    this.fullCoverageprice(product);
                    break;
                case 'Mega Coverage':
                    product.sellIn++;
                    break;
                case 'Special Full Coverage':
                    this.specialFullCoveragePrice(product);
                    break;    
                case 'Super Sale':
                    this.supersalePrice(product);
                    break;
                default:
                    this.defaultPrice(product);
                    break;  
            }
        })
        return this.products;
    }
    fullCoverageprice(product){
        let increase=1;
        if(product.sellIn<0){
            increase=2;
        }
        if(product.price+increase <= 50){
            product.price=product.price+increase;
        }
    }
    specialFullCoveragePrice(product){
        let increase=1;
        if(product.sellIn<10){
            increase=2;
        }
        if(product.sellIn<5){
            increase=3;
        }
        if(product.price+increase<=50){
            product.price=product.price+increase;
        }else {
            product.price=50
        }

        if(product.sellIn < 0){
            product.price=0;
        }
    }
    supersalePrice(product){
        this.decreasePrice(product, 2)
    }
    defaultPrice(product){
        this.decreasePrice(product, 1)
    }
    decreasePrice(product, decrease){
        if(product.sellIn<0){
            decrease=decrease*2;
        }
        if(product.price-decrease>=0){
            product.price=product.price-decrease;
        }else {
            product.price=0;
        }
    }
}

module.exports=CarInsurance;