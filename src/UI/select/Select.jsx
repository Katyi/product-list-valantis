import { useEffect, useRef, useState} from 'react';
import './select.css';
import downArrow from '../../assets/down-arrow.svg';
import close from '../../assets/close.svg';
import { getOptions } from '../../components/products/requests';

const Select = ({options, setOptions, selectedValue, onChange, open, setOpen}) => {
  const selectRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleFilter = (e) => {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      let newArr = options.filter(item => item.value.toLowerCase().includes(e.target.value.toLowerCase()));
      setOptions(newArr);
    } else {
      getOptions(setOptions);
    }
  };

  const cancelSearch = () => {
    setQuery("");
    getOptions(setOptions);
  };

  useEffect(() => {    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleSelectKeyDown);
    return () => document.removeEventListener('keydown', handleSelectKeyDown);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="selectContainer" ref={selectRef}>
      <div className="selectButton" onClick={() => setOpen(!open)}>
        <div className='selectTitle'>{selectedValue}</div>
        <img src={downArrow} alt="downArrow" className={`"downArrow" ${open ? "rotate" : ""}`} />
      </div>
      <div className={`dropdownStyle ${open ? "show" : "hidden"}`}>
        <div className='inputWrap'>
          <input placeholder='Поиск' type="text"
            className="dropdownInput"
            onChange={handleFilter}
            value={query}
          />
          <img src={close} alt="close" className='inputClose' onClick={cancelSearch}/>
        </div>
        <div style={{marginTop:'30px'}}>
        {options?.map((opt, index) => (
          <div className="dropdownItem" key={index} onClick={()=> onChange(opt.value)}>
            <div className="optionTitle">{opt.value}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Select;