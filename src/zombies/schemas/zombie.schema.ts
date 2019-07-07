import * as mongoose from 'mongoose';

export const ZombieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: false
    },
    items: {
        type: Array,
        required: false
    }
});


ZombieSchema.pre('validate', function(next) {
    const self = this;
    if (!self.created_at) {
        self.created_at = new Date();
    }
    next();
});


ZombieSchema.pre('update', function(next) {
    const self = this;
    self.updated_at = new Date();
    next();
});