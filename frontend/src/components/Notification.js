
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';
import { useProductsContext } from '../context/productsContext';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification() {
    const { notification, openNotification, setOpenNotification } = useProductsContext();

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotification(false);
    };

    return (

        <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
    );
}