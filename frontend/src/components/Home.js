import '../Styles/Comp.css';
import { NavLink } from 'react-router-dom';
const Home = () => {
    return (
        <div className="home">
            <div className="txt1"> Weather at Your Fingertips </div>
            <div className="txt1"> Accurate, Reliable, Real-Time </div>
            <NavLink to='/login' style={{textDecoration:'none'}}>
                <div className="get-start">Get Started  !</div>
            </NavLink>
        </div>
    );
}

export default Home;