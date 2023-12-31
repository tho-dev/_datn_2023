import { Schema, model } from "mongoose";
import slug from "mongoose-slug-updater";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import Category from "./category.model";

const plugins = [slug, mongoosePaginate, mongooseDelete];
const pluginsFilter = [slug, mongooseDelete];

// thuộc tính của sản phẩm
const optionSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  label: {
    type: String,
  },
  name: {
    type: String,
    slug: "label",
    unique: false,
    index: true,
    sparse: true,
    slugOn: { save: true, update: true, updateOne: true, updateMany: true, findOneAndUpdate: true },
  },
  position: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "options",
  timestamps: false,
  versionKey: false
})

// giá trị của từng thuộc tính
const optionValueSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  option_id: {
    type: Schema.Types.ObjectId,
    ref: 'Option'
  },
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'option_values',
  timestamps: false,
  versionKey: false
})

// mã của sản phẩm
const skuSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    SKU: {
      type: String
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
      index: true,
      sparse: true,
      slugOn: {
        save: true,
        update: true,
        updateOne: true,
        updateMany: true,
        findOneAndUpdate: true,
      },
    },
    shared_url: {
      type: String,
    },
    price: {
      type: Number,
      default: 200000,
    },
    price_before_discount: {
      type: Number,
    },
    price_discount_percent: {
      type: Number,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: {
        id: String,
        url: String,
      },
      default: {}
    },
    assets: [
      {
        id: String,
        url: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "skus",
    timestamps: false,
    versionKey: false,
  }
);

// biến thể của sản phẩm
const variantSchema = new Schema({
  sku_id: {
    type: Schema.Types.ObjectId,
    ref: 'Sku'
  },
  option_id: {
    type: Schema.Types.ObjectId,
    ref: 'Option'
  },
  option_value_id: {
    type: Schema.Types.ObjectId,
    ref: 'OptionValue'
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "variants",
  timestamps: false,
  versionKey: false
})

// chung
const productSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    name: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      default: true
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
      index: true,
      sparse: true,
      slugOn: {
        save: true,
        update: true,
        updateOne: true,
        updateMany: true,
        findOneAndUpdate: true,
      },
    },
    shared_url: {
      type: String,
      default: "",
    },
    images: [
      {
        id: String,
        url: String,
      },
    ],
    price: {
      type: Number,
      default: 200000,
    },
    price_before_discount: {
      type: Number,
    },
    price_discount_percent: {
      type: Number,
    },
    has_gift: {
      // check xem có khuyến mãi không
      type: Boolean,
      default: false,
    },
    video_review: {
      type: String,
      default: "",
    },
    specs: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    attributes: [
      {
        group_name: String,
        items: [
          {
            label: String,
            value: String,
          },
        ],
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
    seo: {
      meta_title: {
        type: String,
        default: ''
      },
      meta_description: {
        type: String,
        default: ''
      },
      tags: {
        type: Array,
        default: []
      }
    },
    is_avaiable: {
      // check xem có sẵn hay không
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "products",
    timestamps: false,
    versionKey: false,
  }
);

// plugins
plugins.forEach((item) =>
  productSchema.plugin(item, { overrideMethods: true })
);

[slug].forEach((item) =>
  optionSchema.plugin(item, { overrideMethods: true })
);

pluginsFilter.forEach((item) =>
  skuSchema.plugin(item, { overrideMethods: true })
);

pluginsFilter.forEach((item) =>
  variantSchema.plugin(item, { overrideMethods: true })
);

// middlewaves trong schema
skuSchema.pre('save', function (next) {
  this.slug = this.slug + "-" + this._id
  this.shared_url = this.shared_url + "-" + this._id
  next();
});

productSchema.pre("save", async function (next) {
  const category = await Category.findOne({
    _id: this.category_id
  })

  this.shared_url = `${category?.slug}/${this.slug}`
  this.price_discount_percent = Math.ceil(((this.price_before_discount - this.price) / this.price_before_discount) * 100)

  next()
})

const Product = model('Product', productSchema)
const Option = model('Option', optionSchema)
const OptionValue = model('OptionValue', optionValueSchema)
const Sku = model('Sku', skuSchema)
const Variant = model('Variant', variantSchema)

export { Product, Option, OptionValue, Sku, Variant };
