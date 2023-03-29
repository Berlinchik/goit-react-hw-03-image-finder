import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.scss';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };
  onChange = e => {
    this.setState({ searchQuery: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Field is empty, please enter some text', {
        theme: 'colored',
      });
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <FiSearch size={20} />
          </button>

          <input
            onChange={this.onChange}
            value={searchQuery}
            className={s.SearchFormInput}
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
