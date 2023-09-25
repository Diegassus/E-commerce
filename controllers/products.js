import Product from '../models/products.js'

export const createProduct = async (req, res) => {
    const { name, price, description, image } = req.body;
    const validateProduct = await Product.findOne({ name });
    if (validateProduct) return res.status(400).json({ msg: "the product already exists" });

    const newProduct = new Product({ name, price, description, image});
    await newProduct.save();
    res.json(newProduct);
}

export const getProduct = async (req,res) => { // Consultar perfil externo ADMINS
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return res.status(400).json({message:"Product not found"});
    res.json(product);
}

export const getAllProducts = async (req,res) => {
    // const filter = req.query.filter; implementacion para mas adelante (filtrar x categoria)
    // let users;
    // switch (filter) {
    //     case 'admins':
    //         users = await User.find({role:true});
    //         break;
    //     case 'users':
    //         users = await User.find({role:false});
    //         break;
    //     default:
    //         users = await User.find();
    // }
    const products = await Product.find();
    res.json(products);
}

export const updateProduct = async (req,res) => {
    const id = req.params.id;
    const { price, description, image, name } = req.body;
    const errors = [];

    const product = await Product.findOne({name});
    if(product) return res.status(400).json({message:"Product already exists"});
    
    await Product.findByIdAndUpdate(id,{ name, price, description, image});

    res.json({message:"Product updated"});
}

export const deleteProduct = async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return res.status(400).json({message:"Product not found"});
    await Product.findByIdAndDelete(id);
    res.json({message:"Product deleted"});
}