import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();

    function handleClick(){
        navigate('/')
    }

    return(
        <div className={styles.titleCont}>
            <img src='logo.png' onClick={() => handleClick()} className={styles.logo}></img>
            <h1>Planner</h1>
        </div>
    );
}

export default Header
