import s from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ onChangePage }) => {
  return (
    <button className={s.Button} onClick={onChangePage}>
      Load more
    </button>
  );
};

export default Button;
Button.propTypes = {
  onChangePage: PropTypes.func.isRequired,
};
