import classes from './tooltip.module.css';
import searchSmall from '../../assets/searchSmall.svg';
import closeSmall from '../../assets/closeSmall.svg';


const Tooltip = ({setShow}) => {
  return (
    <div
      className={classes.tooltip}
      onMouseOut={() => setShow(false)}
    > 
      Поиск - Enter или кликните <img src={searchSmall} alt="searchSmall" className={classes.searchSmall}/>
      <br />
      Отмена - кликните <img src={closeSmall} alt="closeSmall" className={classes.closeSmall}/>
    </div>
  )
}

export default Tooltip;