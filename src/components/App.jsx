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
    totalPages: null,
    itemsAmount: 12,
  };

  imgItemRef = React.createRef(null);

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, items } = this.state;

    try {
      if (prevState.query !== query) {
        this.setState({ page: 1, isLoading: true, error: null });
        const fetchedItems = await fetchData(query, page);
        if (fetchedItems.hits.length === 0) {
          throw new Error('Nothing found! Check that the input is correct');
        }
        this.setState({
          totalPages: Math.ceil(fetchedItems.totalHits / 12),
          items: fetchedItems.hits,
          isLoading: false,
        });
      }

      if (prevState.page !== page && page !== 1) {
        this.setState({ isLoading: true });
        const items = await fetchData(query, page);
        this.setState({
          items: [...prevState.items, ...items.hits],
          isLoading: false,
          itemsAmount: items.hits.length,
        });
      }

      if (prevState.items !== items && items !== 0) {
        this.imgItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

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
    const {
      items,
      isLoading,
      modalData,
      error,
      page,
      totalPages,
      itemsAmount,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {error === null ? (
          <ImageGallery
            items={items}
            openModal={this.openModal}
            imgItemRef={this.imgItemRef}
            itemsAmount={itemsAmount}
          />
        ) : (
          <p
            style={{
              fontSize: '24px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {error}
          </p>
        )}
        {items.length > 0 &&
          !isLoading &&
          error === null &&
          page !== totalPages && <Button onChangePage={this.onChangePage} />}
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
