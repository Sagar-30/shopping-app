import { Link, Outlet, useNavigate } from "react-router-dom";
import headerStyle from "./header.module.css";
import { useValue } from "../../AppContext";

export default function Header() {
    const { isLogin, setIsLogin } = useValue()
    const Navigate = useNavigate();
    return (
        <>
            <div className={headerStyle.mainDiv}>
                <div className={headerStyle.leftSection}>
                    <h2>Busy Buy</h2>
                </div>
                <div className={headerStyle.rightSection}>
                    <Link to="/">
                        <section className={headerStyle.menuItem}>
                            <img src="https://cdn-icons-png.flaticon.com/128/609/609803.png" alt="Home" />
                            <p>Home</p>
                        </section>
                    </Link>

                    {isLogin &&
                        <>
                            <Link to="/orders">
                                <section className={headerStyle.menuItem}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/1632/1632670.png" alt="Order" />
                                    <p>Order</p>
                                </section>
                            </Link>
                            <Link to="/cart">
                                <section className={headerStyle.menuItem}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/3500/3500833.png" alt="Cart" />
                                    <p>Cart</p>
                                </section>
                            </Link>
                        </>
                    }
                    <section className={headerStyle.menuItem}>
                        <Link to="/login">
                            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828466.png" alt="Login" />
                            <p>Login</p>
                        </Link>
                    </section>
                    {isLogin &&
                        <section className={headerStyle.menuItem} onClick={() => {setIsLogin(false); Navigate("/")}}>
                            <img src="https://cdn-icons-png.flaticon.com/128/15992/15992835.png" alt="Logout" />
                            <p>Logout</p>
                        </section>
                    }
                </div>
            </div>
            <Outlet />
        </>
    );
}
