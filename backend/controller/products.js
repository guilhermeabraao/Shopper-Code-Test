const knex = require("../connection");

const ValidateProducts = async (req, res) => {
    const products = req.file;

    try {
        if (!products || !products.mimetype || products.mimetype !== 'text/csv') {
            return res.status(400).json({ message: 'Invalid file type' });
        }
        const csvData = products.buffer.toString();
        const rows = csvData.split('\n').slice(1);
        const newPriceProducts = rows.map(row => {
            const [productCode, newPrice] = row.split(',');
            return { productCode, newPrice };
        });

        const validatedProducts = [];
        for (let product of newPriceProducts) {
            const productNewPrice = {
                code: product.productCode,
                name: '',
                actualPrice: '',
                newPrice: product.newPrice,
                valid: true,
                invalidArgument: ''
            };

            if (await validateCode(productNewPrice)) {
                validatedProducts.push(productNewPrice)
                continue;
            }

            const productInDB = await knex('products').where({ code: product.productCode }).first();

            productNewPrice.name = productInDB.name;
            productNewPrice.actualPrice = productInDB.sales_price;

            ValidatePrice(productNewPrice, product, productInDB);

            if (await IsPack(product.productCode)) {
                const packInfos = await knex('packs').where({ pack_id: product.productCode })
                let packNewPrice = 0;
                for (let packInfo of packInfos) {
                    const filteredProduct = validatedProducts.filter(obj => obj.code === packInfo.product_id);
                    if (filteredProduct.length < 1) {
                        productNewPrice.valid = false;
                        productNewPrice.invalidArgument = 'Produtos do pacote não informados no arquivo'
                    } else {
                        packNewPrice += Math.fround(filteredProduct[0].newPrice * packInfo.qty)
                    }
                }
                if (packNewPrice !== 0) {
                    packNewPrice = packNewPrice.toFixed(2);
                    if (packNewPrice !== product.newPrice) {
                        productNewPrice.valid = false;
                        productNewPrice.invalidArgument = 'Preço do pacote não condiz com o valor unitário dos produtos'
                    }
                }
            }
            validatedProducts.push(productNewPrice)
        }

        return res.status(200).json(validatedProducts)
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

const UpdatePrices = async (req, res) => {
    const { productsNewPrices } = req.body;
    try {
        for (let product of productsNewPrices) {
            await knex('products').where({ code: product.code }).update({ sales_price: product.newPrice })
        }
        return res.status(200).json({ mensagem: 'Produtos atualizados com sucesso!' })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const validateCode = async (productNewPrice) => {
    if (!(productNewPrice.code > 1)) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Código não corresponde a um produto'
        return true;
    }
    const productExist = await knex('products').where({ code: productNewPrice.code });
    if (productExist.length === 0) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Código não corresponde a um produto'
        return true;
    }
    return false;
}

const ValidatePrice = (productNewPrice, product, productInDB) => {
    if (product.newPrice === "\r" || !(product.newPrice > 1)) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Sem preço informado';
        productNewPrice.newPrice = ""
        return;
    }
    if (product.newPrice > productInDB.sales_price * 1.1) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Novo preço maior que 10% do preço atual';
        return;
    }
    if (product.newPrice < productInDB.sales_price * 0.9) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Novo preço menor que 10% do preço atual';
        return;
    }
    if (product.newPrice < productInDB.cost_price) {
        productNewPrice.valid = false;
        productNewPrice.invalidArgument = 'Novo preço menor que preço de custo';
        return;
    }
}
const IsPack = async (code) => {
    try {
        const pack = await knex('packs').where({ pack_id: code }).first()
        if (pack) {
            return true;
        }
        return false

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { ValidateProducts, UpdatePrices };