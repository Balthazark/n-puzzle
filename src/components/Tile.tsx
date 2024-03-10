import React from "react";
import styled from "styled-components";

type StyledTileProps = {
  $isEmpty: boolean;
};

const StyledTile = styled.button<StyledTileProps>`
  aspect-ratio: 1;
  font-weight: bold;
  font-size: clamp(0.5rem, 1vw + 0.5rem, 2rem);

  &:hover {
    background-color: ${(props) =>
      props.$isEmpty ? "" : props.theme.colors.primaryAccent};
    border: solid;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;

type TileProps = {
  value: number;
  isEmpty: boolean;
  isGameStarted: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Tile = ({ value, isEmpty, isGameStarted, onClick }: TileProps) => {
  return (
    <StyledTile
      onClick={onClick}
      disabled={isEmpty || !isGameStarted}
      $isEmpty={isEmpty}
      aria-label={isEmpty ? "Empty Tile" : `Tile ${value}`}
    >
      {!isEmpty ? value : ""}
    </StyledTile>
  );
};

export default Tile;
