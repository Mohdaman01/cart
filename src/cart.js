import './Cart.css'
import react from 'react';
import CartItem from './cartItem';

class Cart extends react.Component {
    constructor(){
        super();
        
        this.state = {
            products : [
                {
                    id: 1,
                    name: 'Laptop',
                    qty:5
                },
                {
                    id:2,
                    name: 'Smart Phone',
                    qty: 10
                },
                {
                    id:3,
                    name: 'washing machine',
                    qty:16
                }
            ]
        }

    }

    increaseQty =(product)=>{
         const {products} = this.state;
         const index = products.indexOf(product);

         products[index].qty += 1;
         this.setState({
            products
         })
    }

    decreaseQty=(product)=>{
        if(product.qty === 0){
            return;
        }

        const {products} = this.state;
        const index = products.indexOf(product);
        products[index].qty -=1;

        this.setState({
            products
        })
    }

    deleteProduct = (id) => {
        const {products} = this.state;

        const items = products.filter((item)=> item.id !== id);

        this.setState({
            products: items
        })
    }

    render(){
           return (
                <div className='cart'>
                    {this.state.products.map((product)=>{
                        return <CartItem product={product} 
                        increaseQty={this.increaseQty} 
                        decreaseQty={this.decreaseQty}
                        deleteProduct={this.deleteProduct}
                        key={product.id}
                        />
                    })}
                </div>
            ) 
    }
}

export default Cart;