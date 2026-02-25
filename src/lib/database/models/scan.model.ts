import { Document, Schema, model, models, Types} from "mongoose";

export interface SScan extends Document {
  user: Types.ObjectId;

  barcode: string;

  productName?: string;
  brand?: string;
  imageUrl?: string;

  nutrition?: {
    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;
    sugar?: number;
    salt?: number;
  };

  ingredients?: string[];

  nutriScore?: string;
  ecoScore?: string;

  rawData?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

const ScanSchema = new Schema({
  title: { type: String, required: true },
  barcode: {
      type: String,
      required: true,
    },
  publicId: { type: String, required: true },
  secureURL: { type: String, required: true },
  productName: {type: String,},
  brand: {type: String},
  imageUrl: {type: String},
  config: { type: Object },
   nutrition: {
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
      sugar: Number,
      salt: Number,
    },

    ingredients: [String],

    nutriScore: {type: String},
    ecoScore: {type: String},

  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Scan = models?.scan || model('Scan', ScanSchema);

export default Scan;