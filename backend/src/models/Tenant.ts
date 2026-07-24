import { Schema, model, Document, Types } from 'mongoose';

export interface ITenant extends Document {
  apartment?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  unit: string;
  rentAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  avatar: string;
  joiningDate: string;
  paymentDeadline?: string;
  status: 'active' | 'left' | 'vacant';
  idNumber: string;
  birthDate: string;
  numberOfRooms?: number;
  waterUnits?: number;
  leftReason?: string;
  leftDate?: string;
  hasAccount?: boolean;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    unit: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    paymentStatus: { 
      type: String, 
      enum: ['paid', 'unpaid', 'partial'],
      default: 'unpaid' 
    },
    avatar: { type: String, default: '#' },
    joiningDate: { type: String, required: true },
    paymentDeadline: { type: String },
    status: { 
      type: String, 
      enum: ['active', 'left', 'vacant'],
      default: 'active' 
    },
    idNumber: { type: String, required: true },
    birthDate: { type: String, required: true },
    numberOfRooms: { type: Number },
    waterUnits: { type: Number },
    leftReason: { type: String },
    leftDate: { type: String },
    hasAccount: { type: Boolean, default: false },
    username: { type: String },
    password: { type: String }
  },
  { timestamps: true }
);

export default model<ITenant>('Tenant', TenantSchema);
