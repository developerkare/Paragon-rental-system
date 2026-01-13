import { Schema, model, Document } from 'mongoose';

export interface IApartment extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  hasUnitsConfigured?: boolean;
  createdAt?: Date;
}

const ApartmentSchema = new Schema<IApartment>({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  hasUnitsConfigured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default model<IApartment>('Apartment', ApartmentSchema);