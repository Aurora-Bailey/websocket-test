const avro = require('avsc');

module.exports.pack = function (obj) {
  let schema = obj.s
  delete obj.s
  return wrapper.toBuffer({schema: schema, data: type[schema].toBuffer(obj)})
}
module.exports.unpack = function (buf) {
  var unwrapped = wrapper.fromBuffer(buf);
  let obj = type[unwrapped.schema].fromBuffer(unwrapped.data);
  obj.s = unwrapped.schema
  return obj
}


const type = {};
type.mouse = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'x',type: 'int'},
    {name: 'y',type: 'int'}
  ]
});

const wrapper = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'schema', type: {type: 'enum', symbols: Object.keys(type)}},
    {name: 'data', type: 'bytes'}
  ]
});
