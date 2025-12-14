// Minimal polyfill for Object.hasOwn for older browsers (e.g., older Safari/WebViews)
if (typeof Object.hasOwn !== 'function') {
  Object.hasOwn = function hasOwn(target, propertyKey) {
    if (target == null) {
      throw new TypeError('Object.hasOwn called on null or undefined')
    }
    return Object.prototype.hasOwnProperty.call(Object(target), propertyKey)
  }
}


