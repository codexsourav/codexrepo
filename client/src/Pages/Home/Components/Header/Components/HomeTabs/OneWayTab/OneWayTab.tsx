import React from 'react';
import styles from './styles/onewaytab.module.css'
import TabInputBox from '@/Components/TabInputBox/TabInputBox';
import TabInputDateTimeBox from '@/Components/TabInputDateTimeBox/TabInputDateTimeBox';

const OneWayTab = () => {
    return (
        <>
            <div className={styles.onewaytab}>
                <TabInputBox title='From' hint='ex: Mumbai' data={[{ name: 'kolkata' }, { name: 'delhi' }]} onChange={(res) => {
                    console.log(res);
                }} />
                <TabInputBox title='To' hint='ex: Mumbai' data={['kolkata', 'delhi']} onChange={(res) => {
                    console.log(res);
                }} />
                <TabInputDateTimeBox title='Pickup Date' showDate />
                <TabInputDateTimeBox title='Pickup Time' showDate={false} />
            </div>
        </>
    );
};

export default React.memo(OneWayTab);

