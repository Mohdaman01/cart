import react from 'react';
import CartItem from './cartItem';

class Cart extends react.Component {
    constructor(){
        super();
        
        this.state = {
            products : ['phone', 'laptop']
        }
    }

    render(){
           return (
                <div className='cart'>
                    {this.state.products.map((product)=>{
                        return <CartItem product={product}/>
                    })}
                </div>
            ) 
    }
}

export default Cart;