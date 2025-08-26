import mongoose from "mongoose";
import User from "./user.model";

// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema(
  {
    // Name of the subscription
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },

    // Price of the subscription
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },

    // Currency type
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },

    // Billing frequency
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    // Category of subscription
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },

    // Payment method used for the subscription
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    // Status of the subscription
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    // Start date of the subscription
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(), // Must be in the past
        message: "Start date must be in the past",
      },
    },

    // Renewal date of the subscription
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate; // Must be after start date
        },
        message: "Renewal date must be after the start date",
      },
    },

    // User who owns this subscription
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Pre-save hook to auto-calculate renewalDate if missing and update status
subscriptionSchema.pre("save", function (next) {
  // If renewalDate is not set, calculate it based on frequency
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // If renewalDate is already in the past, mark subscription as expired
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next(); // Continue saving
});

// Export the Subscription model
const Subscription = mongoose.model("Subscripton", subscriptionSchema);

export default User;
