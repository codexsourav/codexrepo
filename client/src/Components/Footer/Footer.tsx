import React from 'react';
import styles from './styles/footer.module.css'

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                Footer Page Content
            </div>
        </>
    );
};

export default  React.memo(Footer);

