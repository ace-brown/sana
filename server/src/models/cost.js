const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    expert: { type: String, required: true }
});

const predefinedServices = [
    { serviceName: "Brainstorming Session", price: 0, expert: "" },
    { serviceName: "Market Research", price: 0, expert: "" },
    { serviceName: "Competitor Analysis", price: 0, expert: "" },
    { serviceName: "Feasibility Study", price: 0, expert: "" },
    { serviceName: "Initial Design", price: 0, expert: "" },
    { serviceName: "Build Prototype", price: 0, expert: "" },
    { serviceName: "Prototype Testing", price: 0, expert: "" },
    { serviceName: "Unit Testing", price: 0, expert: "" },
    { serviceName: "Integration Testing", price: 0, expert: "" },
    { serviceName: "User Feedback", price: 0, expert: "" },
    { serviceName: "Website and Hosting Setup", price: 0, expert: "" },
    { serviceName: "Production Configuration", price: 0, expert: "" },
    { serviceName: "Product Launch", price: 0, expert: "" }
]
    ;

const costSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        reportId: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
        selectedServices: {
            type: [
                {
                    serviceName: {
                        type: String,
                        required: true,
                        enum: predefinedServices.map(service => service.serviceName)
                    },
                    paid: { type: Boolean, default: false },
                    price: { type: Number, required: true },
                    expert: { type: String },
                }
            ],
        }
    },
    { timestamps: true }
);


const Cost = mongoose.model("Cost", costSchema);

module.exports = {
    Cost,
    predefinedServices,
};