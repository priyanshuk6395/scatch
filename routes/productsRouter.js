const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config"); // Make sure this is configured correctly
const productSchema = require("../models/product-model");

// Route to handle product creation
router.post("/create", upload.single("image"), async (req, res) => {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    
    try {
        // Create the new product document in MongoDB
        const product = await productSchema.create({
            image: req.file.buffer, // Adjust if needed based on multer configuration
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
        // Set a success flash message and redirect
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        // Set an error flash message and redirect on failure
        req.flash("error", `Failed to create product: ${err.message}`);
        res.redirect("/owners/admin");
    }
});

module.exports = router;