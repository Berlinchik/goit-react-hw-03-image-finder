import React, { Component } from 'react';
import { fetchData } from '../api/api';
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    items: [],
    error: null,
    isLoading: false,
    modalData: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ page: 1, isLoading: true });
      const items = await fetchData(query, page);
      this.setState({ items, isLoading: false });
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      const items = await fetchData(query, page);
      this.setState({
        items: [...prevState.items, ...items],
        isLoading: false,
      });
    }
  }

  onLoadingToogle = () => {
    this.setState(prev => ({ isLoading: !prev.isLoading }));
  };

  onChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onHandleSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  openModal = modalData => {
    this.setState({ modalData });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { items, isLoading, modalData } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onHandleSubmit} />
        <ImageGallery items={items} openModal={this.openModal} />
        {items.length > 0 && !isLoading && (
          <Button onChangePage={this.onChangePage} />
        )}
        {isLoading && (
          <div style={{ margin: '0 auto' }}>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {modalData && <Modal {...modalData} closeModal={this.closeModal} />}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
