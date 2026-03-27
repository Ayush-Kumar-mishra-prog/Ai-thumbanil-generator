import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI thumnil/mo",
            "Basic Templats",
            "Standured resolution",
            "No watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimted AI thumbnils",
            "Premium templates",
            "4k resolution",
            "A/B Testing Tools",
            "Priourity Support",
            "Custom fonts",
            "Brand kit Analysis"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API access",
            "Team collabaration",
            "Custom Branding",
            "Dedicated account manager"
        ],
        mostPopular: false
    }
];