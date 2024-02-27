import { useEffect, useState } from 'react';
import './products.css';
import Product from '../product/Product';
import { Pagination } from '@mui/material';
import { getAllIdsAndProducts, getAllProducts, searchItems, getOptions } from './requests';
import Input from '../../UI/input/Input';
import search from '../../assets/search.svg';
import close from '../../assets/close.svg';
import Button from '../../UI/button/Button';
import Select from '../../UI/select/Select';
import Tooltip from '../../UI/tooltip/Tooltip';
import ButtonClear from '../../UI/button/ButtonClear';

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [ids, setIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [indexOfFirstProject, setIndexOfFirstProject] = useState(0);
  const [indexOfLastProject, setIndexOfLastProject] = useState(50);
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(false);
  const [options, setOptions] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [searchValue, setSearchValue] = useState({
    searchProduct: '',
    searchPrice: '',
  })
  const limit = 50;

  const onHover = (e) => {
    if (e.currentTarget.id === 'productSearch') {
      setShow1(true);  
      setShow2(false);  
    } else {
      setShow1(false);
      setShow2(true);
    }
  };
   
  // FOR PAGINATION
  const handleChangePage = async (event, newPage) => {
    setIsLoading(true);
    setPage(newPage);
    setIndexOfLastProject(newPage * limit);
    setIndexOfFirstProject(newPage * limit - limit);
    await getAllProducts(ids, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject);
  };

  // SEARCH FOR INPUTS
  const handleProductSearch = (e) => {
    e.preventDefault();
    setIndexOfFirstProject(0);
    setIndexOfLastProject(50);
    if (e.target.id === 'productSearch') {
      setSelectedBrand('Все бренды');
      setSearchValue({...searchValue, searchPrice: ""});
      if (searchValue.searchProduct !== "") {
        searchItems("product", searchValue.searchProduct, setCount, setIds, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject);
      } else {
        getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
      }  
    } else if (e.target.id === 'priceSearch') {
      setSelectedBrand('Все бренды');
      setSearchValue({...searchValue, searchProduct: ""});
      searchItems("price", +searchValue.searchPrice, setCount, setIds, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject);
    }
    setPage(1);
  };

  // FOR SELECT BRAND
  const handleSelectChange = (value) => {
    setIndexOfFirstProject(0);
    setIndexOfLastProject(50);
    setOpen(false);
    if (value !== "Все бренды") {
      setSearchValue({searchProduct: "", searchPrice: ""});
      setSelectedBrand(value);
      searchItems("brand", value, setCount, setIds, setProducts, setIsLoading, indexOfFirstProject, indexOfLastProject);
    } else if(selectedBrand !== "Все бренды" || searchValue.searchProduct !== "" || searchValue.searchPrice !== "") {
      setSearchValue({searchProduct: "", searchPrice: ""});
      setSelectedBrand(value);
      getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
    }
    setPage(1);
  };

  // FOR CANSEL SEARCH
  const cancelSearch = (e) => {
    if (e.currentTarget.id === 'productClose' && searchValue.searchProduct !== "") {
      setIndexOfFirstProject(0);
      setIndexOfLastProject(50);
      setSearchValue({...searchValue, searchProduct: ""});
      getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
        setPage(1);
    } else if (e.currentTarget.id === 'priceClose' && searchValue.searchPrice !== "") {
      setIndexOfFirstProject(0);
      setIndexOfLastProject(50);
      setSearchValue({...searchValue, searchPrice: ""});
      getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
      setPage(1);
    } else if (e.target.id === 'allClose' && (searchValue.searchProduct !== "" || searchValue.searchPrice !== "" || selectedBrand !== "Все бренды")) {
      setIndexOfFirstProject(0);
      setIndexOfLastProject(50);
      setSearchValue({searchProduct: "", searchPrice: ""});
      setSelectedBrand("Все бренды");
      getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
      setPage(1);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllIdsAndProducts(setCount, setIds, setProducts, setIsLoading);
    getOptions(setOptions);
  }, []);

  return (
    <div>
      {isLoading && <div className="products forScreenMessage">
        <h1>Загрузка <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></h1>
      </div>}
      {!isLoading &&  
      <div className='products'>
        <div className='filters'>
          <form className='searchForm' id='productSearch' onSubmit={handleProductSearch}
            onMouseOver={onHover} 
            onMouseOut={() => setShow1(false)} 
            onMouseDown={() => setShow1(false)}
          > 
            {show1 && <Tooltip setShow={setShow1}/>}
            <Input
              value={searchValue.searchProduct}
              onChange={e => setSearchValue({ ...searchValue, searchProduct: e.target.value })}
              type="text"
              placeholder="Название"
              order={1}
            />
            <Button type='submit'>
              <img src={search} alt="search" className='search'/>
            </Button>
            <Button type='button' id='productClose' onClick={cancelSearch}>
              <img src={close} alt="close" className='inputClose'/>
            </Button>
          </form>

          <form className='searchForm' id='priceSearch' onSubmit={handleProductSearch}
            onMouseOver={onHover} 
            onMouseOut={() => setShow2(false)} 
            onMouseDown={() => setShow2(false)}
          >
            {show2 && <Tooltip setShow={setShow2}/>}
            <Input
              value={searchValue.searchPrice}
              onChange={e => setSearchValue({ ...searchValue, searchPrice: e.target.value })}
              type="number"
              placeholder="Цена"
              order={2}
            />
            <Button type='submit'>
              <img src={search} alt="search" className='search'/>
            </Button>
            <Button type='button' id='priceClose' onClick={cancelSearch}>
              <img src={close} alt="close" className='inputClose'/>
              {/* cls */}
            </Button>
          </form>

          <Select
            options={options}
            setOptions={setOptions}
            selectedValue={selectedBrand || "Выберите бренд"}
            onChange={handleSelectChange}
            open={open}
            setOpen={setOpen}
            className="order-3"
            order={3}
          />

          <ButtonClear type="button" id='allClose' onClick={cancelSearch} order={4}>Очистить</ButtonClear>
        </div>
        
        <table>
          <thead>
            <tr className="product_header header_title">
              <th className="product_number">№</th>
              <th className="product_id">ID товара</th>
              <th className="product_title">Название</th>
              <th className="product_price">Цена</th>
              <th className="product_brand">Бренд</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product, i) => (
              <Product
                key={product.id}
                product={product}
                idx={indexOfFirstProject + i + 1}
              />
            ))}
          </tbody>
        </table>
        
        {/* PAGINATION */}
        {products.length > 0 ?  <Pagination
          tabIndex={-1}
          className='pagination'
          count={Math.ceil(count / limit)}
          page={page}
          onChange={handleChangePage}
        /> : <h1 className='forScreenMessage' style={{height: "calc(100vh - 85px - 60px - 42px - 100px)"}}>Нет данных</h1>}
      </div>
      }
    </div>
  );
};

export default Products;