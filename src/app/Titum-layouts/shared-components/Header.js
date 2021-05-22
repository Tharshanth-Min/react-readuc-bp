import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'app/auth/store/userSlice';

function Header( props ) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    return (
        <header>
            {user.role.length !== 0 ? (
              <>
                  <h2 >{user.data.user.firstName}</h2>
                  <li><Link to="#" onClick={() => dispatch(logoutUser())}>Logout</Link></li>
              </>

            ):(
                <li >
                    <Link to="/login">Sign in / Sign up</Link>
                </li>
            )}
        </header>
    )
}

export default Header ;

