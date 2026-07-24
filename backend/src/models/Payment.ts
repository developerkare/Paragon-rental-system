import { Schema, model, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  tenant?: Types.ObjectId;
  apartment?: Types.ObjectId;
  tenantName: string;
  unit: string;
  amount: number;
  date: Date;
  method: 'cash' | 'bank_transfer' | 'online' | 'check';
  status: 'claimed' | 'unclaimed';
  transactionId?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    tenantName: { type: String, required: true },
    unit: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: { 
      type: String, 
      enum: ['cash', 'bank_transfer', 'online', 'check'],
      default: 'bank_transfer'
    },
    status: { 
      type: String, 
      enum: ['claimed', 'unclaimed'],
      default: 'claimed'
    },
    transactionId: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export default model<IPayment>('Payment', PaymentSchema);
