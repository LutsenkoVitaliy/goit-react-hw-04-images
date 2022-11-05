import PropTypes from "prop-types";
import { MoreButton } from "./Button.styled";

export default function Button({onLoadMore}) {
  return (
    <MoreButton
      type="button"
      onClick={onLoadMore}>
      Load more
    </MoreButton>
  )
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired
}