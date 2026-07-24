import { Schema, model, Document, Types } from 'mongoose';

export interface ICharge {
  id: string;
  name: string;
  amount: number;
  isOptional: boolean;
  type: string;
}

export interface IUnit extends Document {
  apartment?: Types.ObjectId;
  tenantId?: Types.ObjectId;
  unitNumber: string;
  unitType?: string;
  baseRent: number;
  charges: ICharge[];
  status?: string;
  floor?: number;
  squareFeet?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ChargeSchema = new Schema<ICharge>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  isOptional: { type: Boolean, default: false },
  type: { type: String, default: 'fixed' }
}, { _id: false });

const UnitSchema = new Schema<IUnit>({
  apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  unitNumber: { type: String, required: true },
  unitType: { type: String },
  baseRent: { type: Number, required: true },
  charges: { type: [ChargeSchema], default: [] },
  status: { type: String, default: 'vacant', enum: ['occupied', 'vacant'] },
  floor: { type: Number },
  squareFeet: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IUnit>('Unit', UnitSchema);