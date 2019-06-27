import React from 'react';

export const Footer = (props) => {
    return (
        <footer>
            <div className="footer-copyright text-center py-3">© {new Date().getFullYear()} Copyright:
                <a href="https://www.anuelaa.com/"> Real hasta la muerte</a>
            </div>
        </footer>
    );
};