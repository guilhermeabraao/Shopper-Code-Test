import Button from '@mui/material/Button';
import { useProductsContext } from '../context/productsContext';
import { api } from '../config/api';

export default function UpdateButton() {
    const { products, setOpenNotification, setNotification } = useProductsContext();

    const handleUpdate = async () => {
        try {
            const { data } = await api.put('/update', { productsNewPrices: products });

            setNotification({
                type: 'success',
                message: data.mensagem
            })
            setOpenNotification(true)

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            {(products === undefined || products?.filter(product => product.valid === false).length > 0) &&
                <Button variant="contained" disabled>Atualizar</Button>
            }
            {(products?.filter(product => product.valid === false).length < 1) && < Button variant="contained" sx={{ background: 'black' }} onClick={handleUpdate}>
                Atualizar
            </Button >}

        </>
    );
}