const avro = require('avsc');

module.exports.pack = function (schema, obj) {
  return wrapper.toBuffer({schema: schema, data: type[schema].toBuffer(obj)})
}
module.exports.unpack = function (buf) {
  var unwrapped = wrapper.fromBuffer(buf);
  return type[unwrapped.schema].fromBuffer(unwrapped.data);
}


const type = {};
type.map = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['map']}},
    {name:'units',type:{type:'array',items:{type:'array',items:'int'}}},
    {name:'owner',type:{type:'array',items:{type:'array',items:'int'}}},
    {name:'token',type:{type:'array',items:{type:'array',items:'int'}}}
  ]
});
type.mapbit = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['mapbit']}},
    {name:'units',type:{type:'array',items:'int'}},
    {name:'owner',type:{type:'array',items:'int'}},
    {name:'token',type:{type:'array',items:'int'}}
  ]
});
type.move = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['move']}},
    {name:'move',type:{type:'array',items:'int'}}
  ]
});
type.leaderboard = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['leaderboard']}},
    {name:'data',type:{type:'array',items:{type:'record',fields:[
      {name:'pid',type:'int'},
      {name:'units',type:'int'},
      {name:'cells',type:'int'}
    ]}}}
  ]
});
type.movedone = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['movedone']}},
    {name: 'x',type: 'int'},
    {name: 'y',type: 'int'}
  ]
});

// Server
type.q = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['q']}},
    {name: 'type',type: 'string'},
    {name: 'n',type: 'int'}
  ]
});
type.joinupdate = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'm', type: {name: 'M', type: 'enum', symbols: ['joinupdate']}},
    {name: 'players',type: 'int'},
    {name: 'force',type: 'int'},
    {name: 'timeout',type: 'long'},
    {name: 'note',type: 'string'}
  ]
});

const wrapper = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'schema', type: {type: 'enum', symbols: Object.keys(type)}},
    {name: 'data', type: 'bytes'}
  ]
});
