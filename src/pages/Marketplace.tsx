import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '@/components/Marketplace.css';

const products = [
    {
        name: "UPL Saaf Fungicide",
        crops: "Potato, Tomato, Grape, Apple",
        diseases: "Early/Late Blight, Black Rot, Scab",
        description: "A proven combination of Carbendazim and Mancozeb. Provides both systemic and contact action to cure and prevent fungal growth.",
        buyLink: "https://www.bighaat.com/products/saaf",
        platform: "BigHaat"
    },
    {
        name: "Copper Oxychloride (Blitox)",
        crops: "Orange, Tomato, Cherry, Peach",
        diseases: "Bacterial Spot, Citrus Greening, Leaf Mold",
        description: "A broad-spectrum contact fungicide and bactericide. Excellent for controlling bacterial spots and heavy fungal infections.",
        buyLink: "https://www.amazon.in/s?k=copper+oxychloride+for+plants",
        platform: "Amazon"
    },
    {
        name: "Syngenta Ridomil Gold",
        crops: "Potato, Tomato, Grapes",
        diseases: "Late Blight, Downy Mildew",
        description: "The gold standard for Oomycete diseases. It penetrates the plant quickly to provide internal protection to new growth.",
        buyLink: "https://www.bighaat.com/products/ridomil-gold",
        platform: "BigHaat"
    },
    {
        name: "Neem Oil (Cold Pressed)",
        crops: "Squash, Pepper, Strawberry, Tomato",
        diseases: "Powdery Mildew, Spider Mites, Mosaic Virus",
        description: "An organic 3-in-1 solution (Fungicide, Miticide, and Insecticide). Helps manage whiteflies that spread Tomato Yellow Leaf Curl Virus.",
        buyLink: "https://www.amazon.in/s?k=organic+neem+oil+for+plants",
        platform: "Amazon"
    },
    {
        name: "Potassium Phosphite (Foliar)",
        crops: "Corn, Blueberry, Raspberry",
        diseases: "Rust, Northern Leaf Blight, Root Health",
        description: "A specialized fertilizer that boosts the plant’s immune system (SAR) against rust and blight while providing essential Potassium.",
        buyLink: "https://www.flipkart.com/search?q=potassium+phosphite+fertilizer",
        platform: "Flipkart"
    },
    {
        name: "Bayer Antracol",
        crops: "Apple, Potato, Tomato",
        diseases: "Scab, Early Blight, Leaf Spot",
        description: "Contains Propineb which provides Zinc to the plant while forming a protective shield against fungal spores.",
        buyLink: "https://www.bighaat.com/products/antracol",
        platform: "BigHaat"
    },
    {
        name: "Multiplex Neel (Chelated Zinc/Copper)",
        crops: "Orange, Peach, Bell Pepper",
        diseases: "Healthy Growth, Bacterial Resistance",
        description: "A micronutrient fertilizer that corrects deficiencies, making plants resistant to Haunglongbing (Greening) and Bacterial Spot.",
        buyLink: "https://www.amazon.in/s?k=chelated+micronutrient+fertilizer",
        platform: "Amazon"
    },
    {
        name: "Tata Master (Metalaxyl + Mancozeb)",
        crops: "Potato, Tomato, Grapes",
        diseases: "Late Blight, Black Rot, Downy Mildew",
        description: "Highly effective against soil-borne and foliar diseases. Ideal for rainy seasons when blight spreads rapidly.",
        buyLink: "https://www.flipkart.com/search?q=tata+master+fungicide",
        platform: "Flipkart"
    },
    {
        name: "Wettable Sulfur (Sulfex)",
        crops: "Cherry, Squash, Apple, Grapes",
        diseases: "Powdery Mildew, Apple Scab, Mites",
        description: "A dual-action product that acts as a fertilizer (Sulfur nutrient) and a fungicide to kill powdery mildew spores.",
        buyLink: "https://www.amazon.in/s?k=wettable+sulfur+for+plants",
        platform: "Amazon"
    },
    {
        name: "Amistar Top",
        crops: "Tomato, Corn, Rice",
        diseases: "Target Spot, Grey Leaf Spot, Leaf Mold",
        description: "A premium systemic fungicide that improves 'greening' of the plant, increasing yield and fighting complex spots.",
        buyLink: "https://www.bighaat.com/products/amistar-top",
        platform: "BigHaat"
    }
];

const Marketplace = () => {
    const navigate = useNavigate();

    return (
        <div className="marketplace-container">
            <button className="back-button" onClick={() => navigate('/')}>
                <ArrowLeft size={20} />
                Back to Home
            </button>
            <h1 className="market-title">Agro Marketplace</h1>
            <p className="market-subtitle">Recommended Fertilizers & Fungicides for your Crops</p>

            <div className="product-grid">
                {products.map((item: any, index: number) => (
                    <div key={index} className="product-card">
                        <h3>{item.name}</h3>
                        <div className="tag-container">
                            <span className="tag-crop">{item.crops}</span>
                        </div>
                        <p className="disease-info"><strong>Targets:</strong> {item.diseases}</p>
                        <p className="description">{item.description}</p>
                        <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="buy-button">
                            Buy on {item.platform}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;