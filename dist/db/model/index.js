"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var id = {
    id: (0, pg_core_1.serial)('id').primaryKey(),
};
var timestamps = {
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
    deletedAt: (0, pg_core_1.timestamp)('deleted_at'),
};
var schemaBase = __assign(__assign({}, id), timestamps);
exports.todo = (0, pg_core_1.pgTable)('todo', __assign(__assign({}, schemaBase), { title: (0, pg_core_1.varchar)('title', { length: 20 }).notNull(), content: (0, pg_core_1.varchar)('content', { length: 256 }).notNull() }));
