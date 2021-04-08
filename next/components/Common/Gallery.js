import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import style from "./Gallery.module.css";

import { Dimmer, Icon, Image, Button } from "semantic-ui-react";

class Gallery extends PureComponent {
  state = {
    activeImage: this.props.currentIndex,
    touchStart: 0,
    touchEnd: 0,
  };

  handleThumbnailClick = (index) => this.setState({ activeImage: index });

  handleNavigateLeft = () => {
    if (this.props.currentIndex > 0) {
      this.props.setCurrentIndex(this.props.currentIndex - 1);
    }
  };

  handleNavigateRight = () => {
    if (this.props.currentIndex < this.props.images.length - 1) {
      this.props.setCurrentIndex(this.props.currentIndex + 1);
    }
  };

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === 27) this.props.onClose();
    if (this.props.keyboardNavigation !== false) {
      if (keyCode === 37 || keyCode === 38) this.handleNavigateLeft();
      if (keyCode === 39 || keyCode === 40) this.handleNavigateRight();
    }
  };

  handleTouchStart = (e) => {
    this.setState({ touchStart: e.targetTouches[0].clientX });
  };

  handleTouchMove = (e) => {
    this.setState({ touchEnd: e.targetTouches[0].clientX });
  };

  handleTouchEnd = () => {
    if (this.state.touchStart - this.state.touchEnd > 150) {
      // do your stuff here for left swipe

      this.handleNavigateLeft();
    }

    if (this.state.touchStart - this.state.touchEnd < -150) {
      // do your stuff here for right swipe
      this.handleNavigateRight();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const {
      active,
      images,
      onClickOutside,
      onClose,
      currentIndex,
    } = this.props;
    let activeImage = currentIndex;

    if (images.length >= 1) {
      // let thumbnails = images.map((image, index) => {
      //   return { src: image.src, key: index };
      // });

      // let highlight = activeImage;

      // if (thumbnails.length > 5) {
      //   if (activeImage > 2) {
      //     thumbnails = thumbnails.slice(activeImage - 2, activeImage + 3);
      //     highlight = 2;
      //   } else {
      //     thumbnails = thumbnails.slice(0, 5);
      //   }
      // }

      return (
        <Fragment>
          <Dimmer page active={active} onClickOutside={onClickOutside}>
            <div className={style.inner}>
              <Button
                className={style.close}
                onClick={onClose}
                icon="close"
                basic
                inverted
              />
              <div className={`${style.gutter} ${style.leftGutter}`}>
                <Button
                  onClick={this.handleNavigateLeft}
                  disabled={activeImage === 0}
                  basic
                  size="huge"
                  circular
                  icon
                  inverted
                >
                  <Icon name="arrow left" />
                </Button>
              </div>
              <div className={style.activeImage}>
                <Image src={images[activeImage].urls.regular} />
              </div>
              <div className={`${style.gutter} ${style.rightGutter}`}>
                <Button
                  onClick={this.handleNavigateRight}
                  disabled={activeImage === images.length - 1}
                  size="huge"
                  basic
                  circular
                  icon
                  inverted
                >
                  <Icon name="arrow right" />
                </Button>
              </div>
              <div className={style.detail}>
                <span>{`${activeImage + 1} of ${images.length}`}</span>
              </div>
            </div>
          </Dimmer>
        </Fragment>
      );
    }

    return null;
  }
}

Gallery.propTypes = {
  currentIndex: PropTypes.number,
  active: PropTypes.bool,
  keyboardNavigation: PropTypes.bool,
  images: PropTypes.array,
  onClickOutside: PropTypes.func,
  onClose: PropTypes.func,
  setCurrentIndex: PropTypes.func,
};

export default Gallery;
