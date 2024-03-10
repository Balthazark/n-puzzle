import React from "react";
import styled from "styled-components";

type StyledTileProps = Pick<TileProps, "isEmpty">;

const StyledTile = styled.button<StyledTileProps>`
  aspect-ratio: 1;
  font-weight: bold;
  font-size: clamp(0.5rem, 1vw + 0.5rem, 2rem);

  &:hover {
    background-color: ${(props) =>
      props.isEmpty ? "" : props.theme.colors.primaryAccent};
    border: solid;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type TileProps = {
  value: number;
  isEmpty: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Tile = ({ value, isEmpty, onClick }: TileProps) => {
  return (
    <StyledTile onClick={onClick} disabled={isEmpty} isEmpty={isEmpty}>
      {!isEmpty ? value : ""}
    </StyledTile>
  );
};

export default Tile;
