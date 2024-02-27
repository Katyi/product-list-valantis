import axios from 'axios';
import { md5 } from 'js-md5';
import formatDate from "../../utils/formatDate";

const PASSWORD = import.meta.env.VITE_STRIPE;
const TODAY = formatDate(new Date());
const MD5PASSWORD = md5(`${PASSWORD}_${TODAY}`);
const apiUrl = 'https://api.valantis.store:41000/';
const headers = {
  'X-Auth': MD5PASSWORD,
};

// GET ALL IDS AND 50 PRODUCTS
export const getAllIdsAndProducts = async(setCount, setIds, setProducts, setIsLoading) => {
  // get all ids of products
  setIsLoading(true)
  let res = null;
  let retries = 0;
  let unique = [];
  while (retries <= 10) {
    try {
      res = await axios.post(apiUrl, {action: 'get_ids'}, {headers: headers});
      unique = [...new Set(res.data.result)];
      setCount(unique.length);
      setIds(unique);
      break
    } catch (error) {
      console.log('Идентификатор ошибки:', error.response.status);
    }
    retries++
  }
  if (retries > 10) {console.log('Too many request retries')}
  
  // get 50 products
  await getAllProducts(unique, setProducts, setIsLoading, 0, 50);
}

// GET ALL PRODUCTS
export const getAllProducts = async(idsArr, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject) => {
  let res = null;
  let retries = 0;
  while (retries <= 10) {
    try {
      res = await axios.post(apiUrl, {action: 'get_items', params: {ids: idsArr.slice(indexOfFirstProject, indexOfLastProject)}}, {headers: headers});
      const uniqueIds = [];
      let uniqueItems = res.data.result.filter((item) => {
      const isDuplicate = uniqueIds.includes(item.id);
      if (!isDuplicate) {
        uniqueIds.push(item.id);
        return true;
      }
        return false;
      });
      setProducts(uniqueItems);
      setIsLoading(false);
      break;
    } catch (error) {
      console.log('Идентификатор ошибки:', error.response.status);
    }
    retries++
  }
  if (retries > 10) console.log('Too many request retries');
};

// SEARCH FILTERS
export const searchItems = async(searchParam, value, setCount, setIds, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject) => {
  setIsLoading(true);
  let res = null;
  let retries = 0;
  let unique = [];
  while (retries <= 10) {
    try {
      {searchParam === 'product' 
        ? res = await axios.post(apiUrl, {action: 'filter', params: {'product': value}}, {headers: headers})
        : searchParam === 'price'
        ? res = await axios.post(apiUrl, {action: 'filter', params: {'price': value}}, {headers: headers})
        : res = await axios.post(apiUrl, {action: 'filter', params: {'brand': value}}, {headers: headers})
      }
      unique = [...new Set(res.data.result)];
      setCount(unique.length);
      setIds(unique);
      break
    } catch (error) {
      console.log('Идентификатор ошибки:', error.response.status);
    }
    retries++
  }
  if (retries > 10) {console.log('Too many request retries')}
  
  // GET 50 PRODUCTS
  if (unique.length < 50) {
    getAllProducts(unique, setProducts, setIsLoading, 0, unique.length);  
  } else {
    getAllProducts(unique, setProducts, setIsLoading, 0, 50);
  }
}

// GET ALL BRANDS FOR SELECT
export const getOptions = async(setOptions) => {
  let res = null;
  let retries = 0;
  let unique = [];
  while (retries <= 10) {
    try {
      res = await axios.post(apiUrl, {action: 'get_fields', params: {'field': 'brand'}}, {headers: headers});
      unique = [...new Set(res.data.result)].filter(item => item !== null).sort((a,b) => a > b ? 1 : -1);
      let newArr = unique.map(item => item = {value: item});
      newArr.splice(0, 0, {value: "Все бренды"});
      setOptions(newArr);
      break
    } catch (error) {
      console.log('Идентификатор ошибки:', error.response.status);
    }
    retries++
  }
  if (retries > 10) {console.log('Too many request retries')}
}