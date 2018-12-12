
export default function clearNullValues(obj){
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') clearNullValues(obj[key]);
      else if (obj[key] == null) delete obj[key];
    });
    return obj;
  };