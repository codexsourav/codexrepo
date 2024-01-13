import React from 'react';
import styles from './styles/tabinputbox.module.css'
import { ReactSearchAutocomplete, } from 'react-search-autocomplete'

const TabInputBox = ({ title, data, hint, onChange }: { title: string, hint: string, onChange: ((result: unknown) => void) | undefined, data: Object[] }) => {

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    return (
        <>

            <div className={styles.tabinputbox}>

                <label >{title}</label>
                <ReactSearchAutocomplete
                    items={data}
                    onSearch={onChange}
                    onSelect={onChange}
                    autoFocus
                    placeholder={hint}
                    showIcon={false}
                    showClear
                    className={`${styles.inputbox} tabsearchBox`}
                    formatResult={formatResult}
                />

            </div >
        </>
    );
};

export default React.memo(TabInputBox);

