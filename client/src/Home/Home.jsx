import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import styles from './Home.module.css';
import FeedTrap from '../FeedTrap/FeedTrap.jsx';

function Home(){
    const navigate = useNavigate();
    const URL = "http://localhost:5174";

    function handleClick(appSelected) {
        if (appSelected == "TODO") navigate('/Todo');
        if (appSelected == "SHOP") navigate('/ShoppingList');
    }

    return(<>
        <Header />
        <div className={styles.appSelector}>
            <div className={styles.textCont}>
                <h1>Welcome Visitor!</h1>
                <p>
                    This project is still bound for greater heights,
                    there are features that are yet to be implemented. But please...&nbsp;
                    <b><u>FEEL FREE TO TRY EVERYTHING!!</u></b>.  
                </p>
                <p>
                    Kindly report any bugs/issues you have experienced in the app or maybe just share
                    something below. 🤐 It would mean a lot...
                </p>
            </div>
            <div className={styles.btnContainer}>
                <button onClick={() => handleClick("TODO")}>TO DO LIST</button>
                <button onClick={() => handleClick("SHOP")}> SHOPPING LIST</button>
            </div>
        </div>
        <FeedTrap URL={URL} />
    </>);
}

export default Home
