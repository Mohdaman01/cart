import react from 'react';
import './CartItem.css'

class CartItem extends react.Component {
    render(){
        const product = this.props.product;
        return( 

            <div className='cartItem'>
                <div className='product-name'>
                    <h2>{product.name}</h2>
                </div>

                <div className='product-qty'>
                    <h2>{product.qty}</h2>
                </div>

                <div className='icons-container'>
                    <div onClick={()=>this.props.increaseQty(product)} className='icons'><i className="fa-solid fa-circle-plus"></i></div>
                    <div className='icons' onClick={()=>{this.props.decreaseQty(product)}}><i className="fa-solid fa-circle-minus"></i></div>
                    <div className='icons' onClick={()=>{this.props.deleteProduct(product.id)}}><i className="fa-solid fa-trash"></i> </div> 
                </div>
                  
            </div> 
        )
    }
}

export default CartItem;