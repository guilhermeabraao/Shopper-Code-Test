import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { api } from '../config/api';
import { useProductsContext } from '../context/productsContext';

export default function FileInput() {
    const { file, setFile, setProducts, setOpenNotification, setNotification } = useProductsContext();
    const hiddenFileInput = useRef();

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    }

    const handleChange = (event) => {
        setFile({ products: event.target.files[0] })
        event.target.value = null;
    }

    const handleValidation = async (event) => {
        try {
            const { data } = await api.post('/validate', file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setProducts(data)
            setFile({ products: '' })
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Escolha um arquivo csv !'
            })
            setOpenNotification(true)
            console.log(error.message)
        }
    }


    return (
        <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button variant="contained" style={{ background: 'black' }} onClick={handleClick}>Selecione o arquivo</Button>
            <Button variant="contained" style={{ background: 'black' }} onClick={handleValidation}>Validar</Button>
            <input type='file' style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} />

        </Box>
    )
}