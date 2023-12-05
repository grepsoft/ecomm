import { products } from "../data";

const service = {
  getData: ({from, to}) => {
        return new Promise((resolve, reject) => {
        
            const data = products.slice(from, to);

      resolve({
        count: products.length,
        data: data,
      });
    });
  },
};


export default service;