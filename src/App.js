import React from 'react';
import Cart from './cart';
import Navbar from './Navbar';
import { app } from './index';

//-> you can import all instances by using this method
import * as firestore from 'firebase/firestore';

//-> or you can import spacific instance by name importind them like this
// import { getFirestore, collection } from 'firebase/firestore';
// import {getDocs, doc} from 'firebase/firestore'
// import { onSnapshot, query, addDoc } from 'firebase/firestore';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }

    this.db = firestore.getFirestore(app);
    this.products = firestore.collection(this.db, 'products');
  }

  async componentDidMount() {

    //-> This method you to make query and fetch multiple document from database <- //
    const q = firestore.query(this.products);


    //-> this method will contiously load whole collection from database when changes occur <-//
    firestore.onSnapshot(q, (querySnapshot) => {
      const productsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;

      });
      
      this.setState({
        products: productsList,
        loading: false
      })
    })

    //-> this method will continosly load the data for single document form database when changes in occur <-//

    //   const unsub = onSnapshot(doc(db, "products",'TPk8EMtpisj2VYDqxPkj'), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });

    
    //-> this method will only call ones when app is loading for the first time.  <-//

    // const Snapshot = await getDocs(products);
    // const productsList = Snapshot.docs.map(doc => {
    //   const data = doc.data();
    //   data['id'] = doc.id;
    //   return data;
    // });
    // this.setState({
    //   products: productsList,
    //   loading: false
    // })
  }

  addProduct = async () => {

    const docRef = await firestore.addDoc(this.products, {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BqA3IvwVoTWdVPwh8W8Y-2fowOTdwFGgxQ&usqp=CAU',
      price: 5000,
      qty: 10,
      title: 'Washing Machine'
    })

    console.log('added document:', docRef.data);
  }

  handleIncreaseQuantity =async (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = firestore.doc(this.db, 'products', products[index].id);

    await firestore.updateDoc(docRef, {
      qty: products[index].qty + 1
    })

  };

  handleDecreaseQuantity = async (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = firestore.doc(this.db,'products', products[index].id);

    await firestore.updateDoc(docRef,{
      qty: products[index].qty - 1
    })

  };

  handleDeleteProduct = async (id) => {
    // const { products } = this.state;

    const docRef = firestore.doc(this.db, 'products' , id);

    await firestore.deleteDoc(docRef);
  
    // const items = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items
    // })

  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price
      }
      return '';
    });

    return cartTotal;
  }
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={()=> this.addProduct()}>add product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
