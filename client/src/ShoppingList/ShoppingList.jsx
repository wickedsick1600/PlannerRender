import React, { useState, useEffect } from 'react';
import styles from './ShoppingList.module.css';
import axios from "axios";
import Header from '../Header/Header.jsx';
function ShoppingList(){

    const[item, setItem] = useState([]);
    const[newItem, setNewItem] = useState("");
    const[quantity, setQuantity] = useState(1);
    const [disabled, setDisabled] = useState(false)

    const URL = "https://plannerrender.onrender.com";

    // Fetch All data in the cart
    useEffect(() => {
        async function fetchCartTable (){
            try{
                const res = await axios.get(`${URL}/cart`);
                setItem(res.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchCartTable();
    }, [item])

    // Add Item Function
    async function addItem(e){
        e.preventDefault();

        if (newItem.length > 100) {
            alert("Not more than 100 characters");
        }
        const unit = document.getElementById("selectedUnit").value;
        const data = {
            "product_name": newItem,
            "quantity": quantity,
            "unit": unit
        };
        try{
            await axios.post(`${URL}/add_cart`, data);
            setDisabled(true);
            setTimeout(() => setDisabled(false), 3000)
        }
        catch(error){
            console.error(error);
        }
        setNewItem("");
        setQuantity(1);
    }
    // Adjust Button function
    async function adjustQuan(index, itemQuantity, operation) {

        if (operation == "+" ){
            itemQuantity++;
        }
        else{
            if (itemQuantity < 2){
                itemQuantity = 2;
            }
            itemQuantity--;
        }
        
        try{
            const value = {"quantity": itemQuantity};
            axios.patch(`${URL}/updateCount/${index}`, value);
            setDisabled(true);
            setTimeout(() => setDisabled(false), 2000)
        }
        catch (error){
            console.log(error);
        }
    }
    // Delete an item from the cart
    async function removeItem(index){
        try{
            axios.delete(`${URL}/deleteProduct/${index}`)
            setDisabled(true);
            setTimeout(() => setDisabled(false), 3000)
        }
        catch(error){
            console.log(error)
        }
    }

    return(<>
    <Header />
    <div className={styles.shoppingListCont}>
        <h1 id={styles.shoppingTitle}>SHOPPING LIST</h1>
        <form onSubmit={addItem}>
            <input className={styles.shoppingListInput} type="number" min="1" style={{width: "50px"}} placeholder="No." onChange={(event) => setQuantity(event.target.value)} value={quantity} required/>
            <select className={styles.shoppingListSelect} id="selectedUnit">
                <option value="PCS">PCS</option>
                <option value="L">L</option>
                <option value="G">G</option>
                <option value="Kg">Kg</option>
                <option value="Bx">Bx</option>
            </select>
            <input className={styles.shoppingListInput} type="text" placeholder="Enter a product" onChange={(event) => setNewItem(event.target.value)} value={newItem} required/>
            <button className={styles.formBtn} type="submit" disabled={disabled}>Add to Cart </button>
        </form>
        <div className={styles.cartList}>
            <div className={styles.header}>
                <span>QUANTITY</span>
                <span>UNIT</span>
                <span>PRODUCT</span>
            </div>     
            {item.map((item) => 
            <div key={item.id} className={styles.itemRow}>
                <div className={styles.quantityContainer}>
                <span style={{margin: "5px"}}>{item.quantity}</span>
                    <div className={styles.buttonContainer}>
                        <button className={styles.quanBtnAdd} disabled={disabled} onClick={() => adjustQuan(item.id, item.quantity, "+")}>+</button>
                        <button className={styles.quanBtnSubt} disabled={disabled} onClick={() => adjustQuan(item.id, item.quantity, "-")}>-</button>
                    </div>
                </div>
                <span>{item.unit}</span>
                <span>{item.product_name}<button className={styles.removeBtn} disabled={disabled} onClick={() => removeItem(item.id)}>Remove Item</button></span>
            </div>
                )}
        </div>  
    </div>
    </>);
}
export default ShoppingList
