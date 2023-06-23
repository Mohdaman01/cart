import React from 'react';
import Cart from './cart';
import Navbar from './Navbar';
import { getFirestore, collection} from 'firebase/firestore';
// import {getDocs, doc} from 'firebase/firestore'
import {onSnapshot, query} from 'firebase/firestore';
import {app} from './index';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }

  }

  async componentDidMount(){

    const db = getFirestore(app);

    const products = collection(db, 'products');
    // const Snapshot = await getDocs(products);

    //-> This method you to make query and fetch multiple document from database <- //
    const q = query(products);


    //-> this method will contiously load whole collection from database when changes occur <-//
    onSnapshot(q, (querySnapshot) =>{
      const productsList =  querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        // console.log(doc.data());
        return data;
        
    });
    // console.log(productsList)
    this.setState({
      products : productsList,
      loading: false
    })
    })

  //-> this method will continosly load the data for single document form database when changes in occur <-//

  //   const unsub = onSnapshot(doc(db, "products",'TPk8EMtpisj2VYDqxPkj'), (doc) => {
  //     console.log("Current data: ", doc.data());
  // });

  //-> this method will only call ones when app is loading for the first time.  <-//
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


  handleIncreaseQuantity = (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products
    })

  };

  handleDecreaseQuantity = (product) => {

    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
    })

  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })

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
    const { products, loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading...</h1> }
        <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
