import PropTypes from "prop-types";

export const Songs = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  albumId: PropTypes.string, // có thể là null
  imageUrl: PropTypes.string.isRequired,
  audioUrl: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired,
});

export const Albums = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  songs: PropTypes.arrayOf(Songs).isRequired,
});
