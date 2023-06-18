import react from 'react';

class CartItem extends react.Component {
    render(){
        return(
            <div className='cartItem'>
                <h2>{this.props.product}</h2>
            </div> 
        )
    }
}

export default CartItem;