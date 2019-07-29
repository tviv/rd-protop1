const delayedDataProvider = (type, resource, params) =>
    new Promise(resolve => setTimeout(() => resolve({}), 1000));

export default delayedDataProvider;
