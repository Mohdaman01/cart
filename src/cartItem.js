import React from 'react';
import './cartItem.css';

const CartItem = (props) => {
    const { price, title, qty } = props.product;
    const {
        product,
        onIncreaseQuantity,
        onDecreaseQuantity,
        onDeleteProduct
    } = props;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img style={styles.image} src={product.img} alt='' />
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}>{title}</div>
                <div style={{ color: '#777' }}>Rs {price} </div>
                <div style={{ color: '#777' }}>Qty: {qty} </div>

                <div className="cart-item-actions">
                     
                    <div onClick={() => onIncreaseQuantity(product)}>
                        <i className="fa-solid fa-circle-plus" ></i>
                    </div>

                    <div onClick={() => onDecreaseQuantity(product)}>
                        <i className="fa-solid fa-circle-minus"></i>
                    </div>

                    <div onClick={() => onDeleteProduct(product.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>

                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;