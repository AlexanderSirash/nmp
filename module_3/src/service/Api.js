export default class API {

  filterModel(model, data) {
    const isArray = Array.isArray(data);
    const filtered = [];

    if (isArray) {
      data.forEach((item) => {
        filtered.push(API.dropUselessKeys(this.filterObject(model, item)));
      });

      return filtered;
    } else {
      return API.dropUselessKeys(this.filterObject(model, data));
    }
  }

  static dropUselessKeys(data) {
    const clearObj = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== undefined) clearObj[key] = data[key];
    }

    return clearObj;
  }

  filterObject(model, data) {
    return Object.keys(model).reduce(function (obj, key) {
      const objKey = model[key];
      const isFunction = typeof objKey === 'function';
      let newKey;
      if (isFunction) {
        newKey = key;
      } else {
        newKey = objKey ? objKey : key;
      }
      obj[newKey] = isFunction ? model[key](data) : data[key];

      return obj;
    }, {});
  }
}
