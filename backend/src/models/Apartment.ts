import { Schema, model, Document } from 'mongoose';

export interface IApartment extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  hasUnitsConfigured?: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ApartmentSchema = new Schema<IApartment>({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  address: { type: String },
  hasUnitsConfigured: { type: Boolean, default: false },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IApartment>('Apartment', ApartmentSchema);