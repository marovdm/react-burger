import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired
});

export const footerLinksPropTypes = PropTypes.shape({
  'text': PropTypes.string.isRequired,
  'linkText': PropTypes.string.isRequired,
  'href': PropTypes.string.isRequired,
})