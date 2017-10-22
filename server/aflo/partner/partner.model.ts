import * as mongoose from 'mongoose';
let ObjectId = mongoose.Schema.ObjectId;

let PartnerSchema = new mongoose.Schema({
  companyName: String,
  description: String,
  uid: String, // can not use ObjectId for join(as of Category) as we store email here
  avatar: String,
  city: String,
  state: String,
  country: String,
  catalogSources: [{type: ObjectId, ref: 'CatalogSource'}],
  suggestedGoods: Array,
  created_at: { type: Date },
  updated_at: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  approved: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
export default mongoose.model('Partner', PartnerSchema);
